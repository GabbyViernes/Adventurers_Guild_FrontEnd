// index.js (Backend - Full Corrected Code)

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

// --- API Endpoints ---

// POST /api/signup - Register a new member
app.post('/api/signup', async (req, res) => {
    let { 
        email,
        name,
        password,
        adventurerClass, 
        newsletterEmail
    } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: 'Email, name, and password are required.' });
    }

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
        const defaultRankId = 1; 
        const defaultActiveStatus = 1;
        const defaultQuestCompletionRate = 0.0;

        const sql = `
            INSERT INTO member 
                (name, email, password_hash, class, newsletter_opt_in, join_date, active_status, quest_completion_rate, rank_id, profile_picture_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL) 
        `;
        const [result] = await connection.execute(sql, [
            name, email, hashedPassword, adventurerClass, 
            isSubscribedToNewsletter, joinDate, defaultActiveStatus, 
            defaultQuestCompletionRate, defaultRankId 
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
            member_id: user.member_id,
            name: user.name,
            email: user.email,
            class: user.class, 
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
    const { userId } = req.params; 
    if (!userId || isNaN(parseInt(userId))) {
        return res.status(400).json({ message: 'Valid User ID is required.' });
    }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const userSql = "SELECT member_id, name, email, class, newsletter_opt_in, join_date, created_at, profile_picture_url FROM `member` WHERE `member_id` = ?";
        const [users] = await connection.execute(userSql, [userId]);
        if (users.length === 0) {
            await connection.rollback(); connection.release();
            return res.status(404).json({ message: 'User not found.' });
        }
        const userProfile = users[0];
        const partiesSql = `
            SELECT p.party_id, p.party_name, pm.role, p.leader_id AS party_leader_id
            FROM party_member pm
            JOIN party p ON pm.party_id = p.party_id
            WHERE pm.member_id = ? ORDER BY p.party_name ASC`;
        const [parties] = await connection.execute(partiesSql, [userId]);
        userProfile.parties = parties; 
        await connection.commit();
        connection.release();
        res.json(userProfile);
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error('Profile API error:', error);
        res.status(500).json({ message: 'Server error fetching profile.' });
    }
});

// PUT /api/profile/:userId/picture - Update user's profile picture URL
app.put('/api/profile/:userId/picture', async (req, res) => {
    const { userId } = req.params;
    const { profilePictureUrl } = req.body;
    if (!userId || isNaN(parseInt(userId))) {
        return res.status(400).json({ success: false, message: 'Valid User ID is required.' });
    }
    const newUrlToSave = (profilePictureUrl && String(profilePictureUrl).trim() !== "") ? String(profilePictureUrl).trim() : null;
    let connection;
    try {
        connection = await pool.getConnection();
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

// GET /api/users - Fetch all registered users
app.get('/api/users', async (req, res) => {
    const currentUserId = req.query.excludeUserId; 
    let connection;
    try {
        connection = await pool.getConnection();
        let sql = "SELECT member_id, name FROM `member`";
        const params = [];
        if (currentUserId && !isNaN(parseInt(currentUserId))) {
            sql += " WHERE `member_id` != ?";
            params.push(currentUserId);
        }
        sql += " ORDER BY name ASC";
        const [users] = await connection.execute(sql, params);
        connection.release();
        res.json(users);
    } catch (error) {
        if (connection) connection.release();
        console.error('Get Users API error:', error);
        res.status(500).json({ message: 'Server error fetching users.' });
    }
});

// POST /api/parties - Create a new party
app.post('/api/parties', async (req, res) => {
    const { partyName, partyDescription, leader_id, additional_member_id, partyImageUrl } = req.body; // Added partyImageUrl

    if (!partyName || !leader_id) {
        return res.status(400).json({ message: 'Party name and leader ID are required.' });
    }
    // ... (other validations for leader_id, additional_member_id as before) ...

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // ... (leader and additional member existence checks as before) ...

        const formationDate = new Date().toISOString().slice(0, 10);
        const activeStatus = 1; 
        const initialSuccessRate = 0.0;
        const defaultMaxMembers = 8; 

        const partySql = `
            INSERT INTO party (party_name, description, leader_id, formation_date, active_status, success_rate, max_members, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `; 
        const [partyResult] = await connection.execute(partySql, [
            partyName, 
            partyDescription || null, 
            leader_id, 
            formationDate, 
            activeStatus, 
            initialSuccessRate, 
            defaultMaxMembers,
            (partyImageUrl && partyImageUrl.trim() !== "") ? partyImageUrl.trim() : null // Save URL or NULL
        ]);
        const newPartyId = partyResult.insertId; 

        // ... (add leader and additional member to party_member table as before) ...
        const leaderMemberSql = `INSERT INTO party_member (party_id, member_id, join_date, role) VALUES (?, ?, ?, ?)`;
        await connection.execute(leaderMemberSql, [newPartyId, leader_id, formationDate, 'Leader']);
        if (additional_member_id) {
            const additionalMemberSql = `INSERT INTO party_member (party_id, member_id, join_date, role) VALUES (?, ?, ?, ?)`;
            await connection.execute(additionalMemberSql, [newPartyId, additional_member_id, formationDate, 'Member']);
        }

        await connection.commit();
        connection.release();
        res.status(201).json({ 
            message: 'Party created successfully!', 
            party_id: newPartyId, party_name: partyName, description: partyDescription || null,
            image_url: (partyImageUrl && partyImageUrl.trim() !== "") ? partyImageUrl.trim() : null,
            leader_id: leader_id,
            // ... other response data
        });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error('Create Party API error:', error);
        res.status(500).json({ message: 'Server error during party creation.' });
    }
});
app.get('/api/parties', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `
            SELECT 
                p.party_id, p.party_name, p.description, p.image_url, p.max_members, p.leader_id,
                (SELECT m.name FROM member m WHERE m.member_id = p.leader_id) AS leader_name,
                (SELECT COUNT(*) FROM party_member pm WHERE pm.party_id = p.party_id) AS current_member_count
            FROM party p WHERE p.active_status = 1 ORDER BY p.party_name ASC;
        `;
        const [parties] = await connection.execute(sql);
        connection.release();
        res.json(parties);
    } catch (error) {
        if (connection) connection.release();
        console.error('Get All Parties API error:', error);
        res.status(500).json({ message: 'Server error fetching parties.' });
    }
});

// GET /api/parties/:partyId - Get details (Ensure image_url is selected)
app.get('/api/parties/:partyId', async (req, res) => {
    const { partyId } = req.params;
    // ... (validation) ...
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        // Added image_url to selection
        const partySql = "SELECT party_id, party_name, description, leader_id, formation_date, active_status, success_rate, max_members, image_url FROM `party` WHERE `party_id` = ?";
        const [partyRows] = await connection.execute(partySql, [partyId]);
        // ... (rest of the logic to fetch members and commit as before) ...
        if (partyRows.length === 0) { /* ... handle not found ... */ await connection.rollback(); connection.release(); return res.status(404).json({message: "Party not found"});}
        const partyDetails = partyRows[0];
        const membersSql = `
            SELECT m.member_id, m.name, m.class, pm.role 
            FROM party_member pm JOIN member m ON pm.member_id = m.member_id
            WHERE pm.party_id = ? ORDER BY FIELD(pm.role, 'Leader', 'Officer', 'Member'), m.name ASC`;
        const [members] = await connection.execute(membersSql, [partyId]);
        partyDetails.members = members;
        partyDetails.current_member_count = members.length;
        await connection.commit();
        connection.release();
        res.json(partyDetails);
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Get Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error fetching party details.' });
    }
});
app.put('/api/parties/:partyId/picture', async (req, res) => {
    const { partyId } = req.params;
    const { leader_id, partyImageUrl } = req.body; // leader_id for verification

    if (isNaN(parseInt(partyId)) || !leader_id || isNaN(parseInt(leader_id))) {
        return res.status(400).json({ success: false, message: 'Valid Party ID and Leader ID are required.' });
    }

    const newUrlToSave = (partyImageUrl && String(partyImageUrl).trim() !== "") ? String(partyImageUrl).trim() : null;

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Verify requester is the leader
        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) {
            await connection.rollback(); connection.release();
            return res.status(404).json({ success: false, message: 'Party not found.' });
        }
        if (parseInt(partyRows[0].leader_id) !== parseInt(leader_id)) {
            await connection.rollback(); connection.release();
            return res.status(403).json({ success: false, message: 'Only the party leader can change the party picture.' });
        }

        // Update party picture URL
        const updateSql = "UPDATE `party` SET `image_url` = ? WHERE `party_id` = ?";
        const [result] = await connection.execute(updateSql, [newUrlToSave, partyId]);
        
        if (result.affectedRows === 0) {
            // Should not happen if previous checks passed, but as a safeguard
            await connection.rollback(); connection.release();
            return res.status(404).json({ success: false, message: 'Party picture not updated. User may not be leader or party not found.' });
        }
        
        await connection.commit();
        connection.release();
        res.json({ success: true, message: 'Party picture updated successfully!', imageUrl: newUrlToSave });

    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Update Party Picture API error for party ${partyId}:`, error);
        res.status(500).json({ success: false, message: 'Server error updating party picture.' });
    }
});


// GET /api/parties/:partyId - Get details for a specific party, including members
app.get('/api/parties/:partyId', async (req, res) => {
    const { partyId } = req.params;
    if (isNaN(parseInt(partyId))) {
        return res.status(400).json({ message: 'Valid Party ID is required.' });
    }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const partySql = "SELECT party_id, party_name, description, leader_id, formation_date, active_status, success_rate, max_members FROM `party` WHERE `party_id` = ?";
        const [partyRows] = await connection.execute(partySql, [partyId]);
        if (partyRows.length === 0) { 
            await connection.rollback(); connection.release(); 
            return res.status(404).json({message: "Party not found"});
        }
        const partyDetails = partyRows[0];
        const membersSql = `
            SELECT m.member_id, m.name, m.class, pm.role 
            FROM party_member pm JOIN member m ON pm.member_id = m.member_id
            WHERE pm.party_id = ? ORDER BY FIELD(pm.role, 'Leader', 'Officer', 'Member'), m.name ASC`;
        const [members] = await connection.execute(membersSql, [partyId]);
        partyDetails.members = members;
        partyDetails.current_member_count = members.length;
        await connection.commit();
        connection.release();
        res.json(partyDetails);
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Get Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error fetching party details.' });
    }
});

// POST /api/parties/:partyId/join - User joins a party
app.post('/api/parties/:partyId/join', async (req, res) => {
    const { partyId } = req.params;
    const { member_id } = req.body; 

    if (isNaN(parseInt(partyId))) {
        return res.status(400).json({ message: 'Valid Party ID is required.' });
    }
    if (!member_id || isNaN(parseInt(member_id))) {
        return res.status(400).json({ message: 'Valid Member ID is required to join.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [partyRows] = await connection.execute("SELECT party_id, max_members FROM `party` WHERE `party_id` = ? AND active_status = 1", [partyId]);
        if (partyRows.length === 0) { /* ... handle party not found ... */ await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party not found or is not active.'}); }
        const party = partyRows[0];

        const [memberCountRows] = await connection.execute("SELECT COUNT(*) AS count FROM `party_member` WHERE `party_id` = ?", [partyId]);
        const currentMemberCount = memberCountRows[0].count;

        if (party.max_members && currentMemberCount >= party.max_members) { /* ... handle party full ... */ await connection.rollback(); connection.release(); return res.status(409).json({ message: 'Party is full.'}); }

        const [existingMembership] = await connection.execute("SELECT member_id FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, member_id]);
        if (existingMembership.length > 0) { /* ... handle already member ... */ await connection.rollback(); connection.release(); return res.status(409).json({ message: 'You are already a member of this party.'}); }
        
        const joinDate = new Date().toISOString().slice(0, 10);
        const role = 'Member'; 
        const joinSql = "INSERT INTO `party_member` (party_id, member_id, join_date, role) VALUES (?, ?, ?, ?)";
        await connection.execute(joinSql, [partyId, member_id, joinDate, role]);

        await connection.commit();
        connection.release();
        res.status(200).json({ success: true, message: 'Successfully joined the party!', party_id: parseInt(partyId) });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Join Party API error for party ${partyId}:`, error);
        res.status(500).json({ message: 'Server error joining party.' });
    }
});

// POST /api/parties/:partyId/leave - User leaves a party
app.post('/api/parties/:partyId/leave', async (req, res) => {
    const { partyId } = req.params;
    const { member_id } = req.body; 

    if (isNaN(parseInt(partyId)) || !member_id || isNaN(parseInt(member_id))) {
        return res.status(400).json({ message: 'Valid Party ID and Member ID are required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [partyInfo] = await connection.execute("SELECT leader_id FROM party WHERE party_id = ?", [partyId]);
        if (partyInfo.length === 0) { /* Party not found */ await connection.rollback(); connection.release(); return res.status(404).json({ message: "Party not found." }); }
        
        const isLeader = parseInt(partyInfo[0].leader_id) === parseInt(member_id);

        if (isLeader) {
            const [memberCountResult] = await connection.execute("SELECT COUNT(*) AS count FROM party_member WHERE party_id = ?", [partyId]);
            if (memberCountResult[0].count > 1) { /* Leader can't leave if others exist */ await connection.rollback(); connection.release(); return res.status(400).json({ message: "Leader cannot leave if other members exist. Delete the party or remove other members first." }); }
        }

        const deleteSql = "DELETE FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?";
        const [result] = await connection.execute(deleteSql, [partyId, member_id]);

        if (result.affectedRows === 0) { /* Not a member or failed */ await connection.rollback(); connection.release(); return res.status(404).json({ message: "You are not a member of this party or failed to leave." }); }
        
        if (isLeader && result.affectedRows > 0) { // If leader was the only one and left
             const [memberCountAfterLeave] = await connection.execute("SELECT COUNT(*) AS count FROM party_member WHERE party_id = ?", [partyId]);
             if (memberCountAfterLeave[0].count === 0) {
                 console.log(`Party ${partyId} is now empty. Deleting party.`);
                 await connection.execute("DELETE FROM party WHERE party_id = ?", [partyId]); 
             }
        }

        await connection.commit();
        connection.release();
        res.status(200).json({ success: true, message: 'Successfully left the party.' });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Leave Party API error for party ${partyId}, member ${member_id}:`, error);
        res.status(500).json({ message: 'Server error while leaving party.' });
    }
});

// POST /api/parties/:partyId/members - Leader adds a member to a party
app.post('/api/parties/:partyId/members', async (req, res) => {
    const { partyId } = req.params;
    const { leader_id, member_id_to_add } = req.body;
    // ... (Full validation as provided previously, ensure all checks are robust) ...
    if (isNaN(parseInt(partyId)) || !leader_id || isNaN(parseInt(leader_id)) || !member_id_to_add || isNaN(parseInt(member_id_to_add))) {
        return res.status(400).json({ message: 'Valid Party ID, Leader ID, and Member ID to add are required.' });
    }
    if (parseInt(leader_id) === parseInt(member_id_to_add)) { return res.status(400).json({ message: "Cannot add yourself to the party again." });}


    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id, max_members FROM `party` WHERE `party_id` = ? AND active_status = 1", [partyId]);
        if (partyRows.length === 0) { /* ... */ await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party not found or is not active.' });}
        const party = partyRows[0];
        if (parseInt(party.leader_id) !== parseInt(leader_id)) { /* ... */ await connection.rollback(); connection.release(); return res.status(403).json({ message: 'Only the party leader can add members.' });}
        const [memberToAddExists] = await connection.execute("SELECT member_id FROM `member` WHERE `member_id` = ?", [member_id_to_add]);
        if (memberToAddExists.length === 0) { /* ... */ await connection.rollback(); connection.release(); return res.status(404).json({ message: `Member with ID ${member_id_to_add} not found.` });}
        const [memberCountRows] = await connection.execute("SELECT COUNT(*) AS count FROM `party_member` WHERE `party_id` = ?", [partyId]);
        if (party.max_members && memberCountRows[0].count >= party.max_members) { /* ... */ await connection.rollback(); connection.release(); return res.status(409).json({ message: 'Party is full.' });}
        const [existingMembership] = await connection.execute("SELECT member_id FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, member_id_to_add]);
        if (existingMembership.length > 0) { /* ... */ await connection.rollback(); connection.release(); return res.status(409).json({ message: 'This user is already a member of this party.' });}
        const joinDate = new Date().toISOString().slice(0, 10);
        const role = 'Member';
        const addSql = "INSERT INTO `party_member` (party_id, member_id, join_date, role) VALUES (?, ?, ?, ?)";
        await connection.execute(addSql, [partyId, member_id_to_add, joinDate, role]);
        await connection.commit();
        connection.release();
        res.status(200).json({ success: true, message: 'Member added to party successfully.' });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Add member to Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error adding member to party.' });
    }
});

// DELETE /api/parties/:partyId/members/:memberIdToRemove - Leader removes a member
app.delete('/api/parties/:partyId/members/:memberIdToRemove', async (req, res) => {
    const { partyId, memberIdToRemove } = req.params;
    const { leader_id } = req.body; 
    if (isNaN(parseInt(partyId)) || isNaN(parseInt(memberIdToRemove)) || !leader_id || isNaN(parseInt(leader_id))) {
        return res.status(400).json({ message: 'Valid Party ID, Member ID to remove, and Leader ID are required.' });
    }
    if (parseInt(leader_id) === parseInt(memberIdToRemove)) { return res.status(400).json({ message: "Leader cannot remove themselves using this action." }); }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) { /* ... */ await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party not found.' }); }
        if (parseInt(partyRows[0].leader_id) !== parseInt(leader_id)) { /* ... */ await connection.rollback(); connection.release(); return res.status(403).json({ message: 'Only the party leader can remove members.' }); }
        const deleteSql = "DELETE FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?";
        const [result] = await connection.execute(deleteSql, [partyId, memberIdToRemove]);
        if (result.affectedRows === 0) { /* ... */ await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Member not found in this party or already removed.' }); }
        await connection.commit();
        connection.release();
        res.status(200).json({ success: true, message: 'Member removed from party successfully.' });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Remove member from Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error removing member from party.' });
    }
});

// DELETE /api/parties/:partyId - Leader deletes/disbands a party
app.delete('/api/parties/:partyId', async (req, res) => {
    const { partyId } = req.params;
    const { leader_id } = req.body; // Authenticated leader's ID

    if (isNaN(parseInt(partyId)) || !leader_id || isNaN(parseInt(leader_id))) {
        return res.status(400).json({ message: 'Valid Party ID and authenticating Leader ID are required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) { /* Party not found */ await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party not found.' }); }
        if (parseInt(partyRows[0].leader_id) !== parseInt(leader_id)) { /* Not the leader */ await connection.rollback(); connection.release(); return res.status(403).json({ message: 'Only the party leader can delete the party.' }); }

        // Delete all members from party_member table for this party
        await connection.execute("DELETE FROM `party_member` WHERE `party_id` = ?", [partyId]);

        // Delete the party itself from party table
        const [deletePartyResult] = await connection.execute("DELETE FROM `party` WHERE `party_id` = ?", [partyId]);

        if (deletePartyResult.affectedRows === 0) {
            await connection.rollback(); connection.release();
            return res.status(404).json({ message: 'Party could not be deleted (it may have already been removed).' });
        }

        await connection.commit();
        connection.release();
        res.status(200).json({ success: true, message: 'Party successfully deleted.' });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Delete Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error deleting party.' });
    }
});
app.post('/api/parties/:partyId/transfer-leadership', async (req, res) => {
    const { partyId } = req.params;
    const { current_leader_id, new_leader_member_id } = req.body; // ID of user making request, ID of member to promote

    if (isNaN(parseInt(partyId)) || !current_leader_id || isNaN(parseInt(current_leader_id)) || !new_leader_member_id || isNaN(parseInt(new_leader_member_id))) {
        return res.status(400).json({ message: 'Valid Party ID, Current Leader ID, and New Leader Member ID are required.' });
    }

    if (parseInt(current_leader_id) === parseInt(new_leader_member_id)) {
        return res.status(400).json({ message: "You cannot transfer leadership to yourself." });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Verify the party exists and the requester (current_leader_id) is indeed the current leader
        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) {
            await connection.rollback(); connection.release();
            return res.status(404).json({ message: 'Party not found.' });
        }
        if (parseInt(partyRows[0].leader_id) !== parseInt(current_leader_id)) {
            await connection.rollback(); connection.release();
            return res.status(403).json({ message: 'Only the current party leader can transfer leadership.' });
        }

        // 2. Verify the new_leader_member_id is a member of this party (and not already the leader)
        const [newLeaderMembership] = await connection.execute(
            "SELECT member_id, role FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?",
            [partyId, new_leader_member_id]
        );
        if (newLeaderMembership.length === 0) {
            await connection.rollback(); connection.release();
            return res.status(404).json({ message: 'The selected user is not a member of this party.' });
        }
        // Not strictly necessary to check if new leader is already leader, as the first check covers current_leader_id !== new_leader_member_id

        // 3. Update leader_id in the 'party' table
        const updatePartySql = "UPDATE `party` SET `leader_id` = ? WHERE `party_id` = ?";
        await connection.execute(updatePartySql, [new_leader_member_id, partyId]);

        // 4. Update roles in 'party_member' table
        // Set new leader's role to 'Leader'
        const updateNewLeaderRoleSql = "UPDATE `party_member` SET `role` = 'Leader' WHERE `party_id` = ? AND `member_id` = ?";
        await connection.execute(updateNewLeaderRoleSql, [partyId, new_leader_member_id]);

        // Optionally, change old leader's role (e.g., to 'Member' or 'Officer')
        // If you want to keep them in the party with a different role. If not, this step can be skipped
        // or they could have a separate "Leave Party" action. For now, let's change to 'Member'.
        const updateOldLeaderRoleSql = "UPDATE `party_member` SET `role` = 'Member' WHERE `party_id` = ? AND `member_id` = ?";
        await connection.execute(updateOldLeaderRoleSql, [partyId, current_leader_id]);
        
        await connection.commit();
        connection.release();
        res.status(200).json({ success: true, message: 'Leadership transferred successfully.' });

    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Transfer Leadership API error for party ${partyId}:`, error);
        res.status(500).json({ message: 'Server error transferring leadership.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Adventurer's Guild API server running on http://localhost:${port}`);
});