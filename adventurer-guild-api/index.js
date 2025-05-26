// index.js (Backend)

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection Pool Configuration
const dbConfig = {
    host: 'localhost',              // Your MySQL host
    user: 'root',                   // Your MySQL user
    password: '',                  // Your MySQL password
    database: 'adventurersguild',   // Your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test DB Connection (Optional)
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to MySQL database.');
        connection.release();
    } catch (error) {
        console.error('Error connecting to MySQL database:', error.message);
    }
})();

// POST /api/signup - Register a new member
app.post('/api/signup', async (req, res) => {
    let { // Use let to allow modification for adventurerClass default
        email,
        name,
        password,
        adventurerClass, // Frontend should send the class value under this key
        newsletterEmail
    } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: 'Email, name, and password are required.' });
    }

    // Default to "Warrior" if adventurerClass is empty, null, or undefined
    if (!adventurerClass || String(adventurerClass).trim() === "") {
        adventurerClass = "Warrior";
    }

    let connection;
    try {
        connection = await pool.getConnection();

        const [existingUsers] = await connection.execute("SELECT email FROM `member` WHERE `email` = ?", [email]);
        if (existingUsers.length > 0) {
            connection.release();
            return res.status(409).json({ message: 'Email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const joinDate = new Date().toISOString().slice(0, 10);
        const isSubscribedToNewsletter = !!newsletterEmail;

        // Insert into 'member' table, using 'class' column for the adventurer's class
        const sql = `
            INSERT INTO member 
                (name, email, password_hash, class, newsletter_opt_in, join_date, active_status, quest_completion_rate)
            VALUES (?, ?, ?, ?, ?, ?, 1, 0.0) 
        `; // Added defaults for active_status and quest_completion_rate as per original schema
        const [result] = await connection.execute(sql, [
            name,
            email,
            hashedPassword,
            adventurerClass, // This is the user's input or "Warrior"
            isSubscribedToNewsletter,
            joinDate
        ]);
        connection.release();

        res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });

    } catch (error) {
        if (connection) connection.release();
        console.error('Signup API error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// POST /api/login - Log in an existing member
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        // Select necessary fields, including 'class' and 'member_id'
        const sql = "SELECT member_id, name, email, password_hash, class, newsletter_opt_in, join_date, profile_picture_url FROM `member` WHERE `email` = ?";
        const [users] = await connection.execute(sql, [email]);

        if (users.length === 0) {
            connection.release();
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = users[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordMatch) {
            connection.release();
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        connection.release();

        const userInfo = {
            member_id: user.member_id, // Frontend will use this ID
            name: user.name,
            email: user.email,
            class: user.class, // Send the 'class' as is
            newsletter_opt_in: user.newsletter_opt_in,
            join_date: user.join_date,
            profile_picture_url: user.profile_picture_url
        };
        
        res.json({ message: 'Login successful!', user: userInfo });

    } catch (error) {
        if (connection) connection.release();
        console.error('Login API error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// GET /api/profile/:userId - Fetch user profile information
app.get('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params; // This will be member_id

    if (!userId || isNaN(parseInt(userId))) {
        return res.status(400).json({ message: 'Valid User ID is required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        // Select necessary fields, including 'class' and 'profile_picture_url'
        const sql = "SELECT member_id, name, email, class, newsletter_opt_in, join_date, created_at, profile_picture_url FROM `member` WHERE `member_id` = ?";
        const [users] = await connection.execute(sql, [userId]);
        connection.release();

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        res.json(users[0]); // Send the raw user profile data

    } catch (error) {
        if (connection) connection.release();
        console.error('Profile API error:', error);
        res.status(500).json({ message: 'Server error fetching profile.' });
    }
});

// PUT /api/profile/:userId/picture - Update user's profile picture URL
app.put('/api/profile/:userId/picture', async (req, res) => {
    const { userId } = req.params; // This will be member_id
    const { profilePictureUrl } = req.body;

    if (!userId || isNaN(parseInt(userId))) {
        return res.status(400).json({ success: false, message: 'Valid User ID is required.' });
    }

    if (!profilePictureUrl || typeof profilePictureUrl !== 'string' || profilePictureUrl.trim() === "") {
        // Allow empty string to remove picture, or enforce URL format if needed
        // For now, an empty string might be undesirable, let's require a non-empty one for an update.
        // return res.status(400).json({ success: false, message: 'A valid profile picture URL is required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        const newUrlToSave = profilePictureUrl.trim() === "" ? null : profilePictureUrl.trim();

        const sql = "UPDATE `member` SET `profile_picture_url` = ? WHERE `member_id` = ?";
        const [result] = await connection.execute(sql, [newUrlToSave, userId]);
        connection.release();

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.json({ success: true, message: 'Profile picture updated successfully!', profilePictureUrl: newUrlToSave });

    } catch (error) {
        if (connection) connection.release();
        console.error('Update Profile Picture API error:', error);
        res.status(500).json({ success: false, message: 'Server error updating profile picture.' });
    }
});


app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});