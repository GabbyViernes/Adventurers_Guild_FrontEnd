// index.js (Backend - Full Code with New Quest Endpoints)

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
    host: 'localhost',           // Your MySQL host
    user: 'root',                // Your MySQL user
    password: '',                // Your MySQL password
    database: 'adventurersguild22',   // Your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
const pool = mysql.createPool(dbConfig);

// Test DB Connection
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

// GET /api/vault/items - Fetch all items currently in the guild vault
app.get('/api/vault/items', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `
            SELECT
                i.item_id, i.name, i.rarity, i.value, i.item_condition, i.magical, i.registration_date, i.vault_id, i.image_url, i.quantity
            FROM item i
            WHERE i.vault_id IS NOT NULL
            ORDER BY i.name ASC;
        `;
        const [items] = await connection.execute(sql);
        connection.release();
        res.json(items);
    } catch (error) {
        if (connection) connection.release();
        console.error('Get Vault Items API error:', error);
        res.status(500).json({ message: 'Server error fetching vault items.' });
    }
});

// POST /api/vault/withdraw - Withdraw items from the vault with quantity
app.post('/api/vault/withdraw', async (req, res) => {
    const { item_id, member_id, quantity } = req.body;

    // Validate input
    if (!item_id || isNaN(parseInt(item_id))) {
        return res.status(400).json({ message: 'Valid item_id is required.' });
    }
    if (!member_id || isNaN(parseInt(member_id))) {
        return res.status(400).json({ message: 'Valid member_id is required.' });
    }
    if (!quantity || isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
        return res.status(400).json({ message: 'A positive quantity is required for withdrawal.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Check if the item exists in the vault and has sufficient quantity
        const [itemRows] = await connection.execute(
            "SELECT item_id, name, quantity, vault_id FROM `item` WHERE `item_id` = ? AND `vault_id` IS NOT NULL FOR UPDATE",
            [item_id]
        );

        if (itemRows.length === 0) {
            await connection.rollback();
            connection.release();
            return res.status(404).json({ message: 'Item not found in the vault.' });
        }

        const vaultItem = itemRows[0];
        const requestedQuantity = parseInt(quantity);

        if (vaultItem.quantity < requestedQuantity) {
            await connection.rollback();
            connection.release();
            return res.status(400).json({ message: `Insufficient quantity in vault. Available: ${vaultItem.quantity}.` });
        }

        // 2. Check if the member exists
        const [memberRows] = await connection.execute(
            "SELECT member_id FROM `member` WHERE `member_id` = ?",
            [member_id]
        );

        if (memberRows.length === 0) {
            await connection.rollback();
            connection.release();
            return res.status(404).json({ message: 'Member not found.' });
        }

        // 3. Decrease item quantity in the vault
        const newVaultQuantity = vaultItem.quantity - requestedQuantity;
        if (newVaultQuantity === 0) {
            // If quantity becomes 0, remove the item from the vault entirely
            await connection.execute(
                "UPDATE `item` SET `vault_id` = NULL, `quantity` = 0 WHERE `item_id` = ?",
                [item_id]
            );
        } else {
            await connection.execute(
                "UPDATE `item` SET `quantity` = ? WHERE `item_id` = ?",
                [newVaultQuantity, item_id]
            );
        }

        // 4. Add or update item in member's inventory (member_item table)
        const [memberItemRows] = await connection.execute(
            "SELECT quantity FROM `member_item` WHERE `member_id` = ? AND `item_id` = ?",
            [member_id, item_id]
        );

        if (memberItemRows.length > 0) {
            // Item already in member's inventory, update quantity
            const currentMemberItemQuantity = memberItemRows[0].quantity;
            const newMemberItemQuantity = currentMemberItemQuantity + requestedQuantity;
            await connection.execute(
                "UPDATE `member_item` SET `quantity` = ? WHERE `member_id` = ? AND `item_id` = ?",
                [newMemberItemQuantity, member_id, item_id]
            );
        } else {
            // Item not in member's inventory, insert new record
            await connection.execute(
                "INSERT INTO `member_item` (member_id, item_id, quantity, acquisition_date, storage_location) VALUES (?, ?, ?, CURDATE(), 'Personal Inventory')",
                [member_id, item_id, requestedQuantity]
            );
        }

        await connection.commit();
        connection.release();
        res.status(200).json({
            success: true,
            message: `Successfully withdrew ${requestedQuantity} of ${vaultItem.name} from the vault.`,
            item_id: item_id,
            member_id: member_id,
            withdrawn_quantity: requestedQuantity,
            new_vault_quantity: newVaultQuantity
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.error('Withdraw Item API error:', error);
        res.status(500).json({ message: 'Server error during item withdrawal.' });
    }
});

// POST /api/quests/complete-solo - Complete a SOLO quest and add item to member's inventory
app.post('/api/quests/complete-solo', async (req, res) => {
    const { quest_id, member_id } = req.body;

    if (!quest_id || isNaN(parseInt(quest_id))) {
        return res.status(400).json({ message: 'Valid quest_id is required.' });
    }
    if (!member_id || isNaN(parseInt(member_id))) {
        return res.status(400).json({ message: 'Valid member_id is required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Get quest details including reward_item_id, reward_quantity, and quest_type
        // Use FOR UPDATE to lock the row during the transaction
        const [questResults] = await connection.execute(
            'SELECT reward_item_id, reward_quantity, quest_type, title FROM `quest` WHERE quest_id = ? AND completed = 0 FOR UPDATE',
            [quest_id]
        );

        if (questResults.length === 0) {
            await connection.rollback();
            connection.release();
            return res.status(404).json({ message: 'Quest not found or already completed.' });
        }

        const quest = questResults[0];

        if (quest.quest_type !== 'solo') {
            await connection.rollback();
            connection.release();
            return res.status(400).json({ message: 'This is not a solo quest. Use the party quest endpoint.' });
        }

        const { reward_item_id, reward_quantity, title: questTitle } = quest;

        if (!reward_item_id || reward_quantity <= 0) {
            await connection.rollback();
            connection.release();
            return res.status(400).json({ message: 'This quest does not offer a valid reward.' });
        }

        // 2. Add or update item in member's inventory (member_item table)
        const [memberItemRows] = await connection.execute(
            'SELECT quantity FROM `member_item` WHERE `member_id` = ? AND `item_id` = ?',
            [member_id, reward_item_id]
        );

        if (memberItemRows.length > 0) {
            // Item exists, update quantity
            await connection.execute(
                'UPDATE `member_item` SET `quantity` = `quantity` + ? WHERE `member_id` = ? AND `item_id` = ?',
                [reward_quantity, member_id, reward_item_id]
            );
        } else {
            // Item does not exist, insert new entry
            await connection.execute(
                'INSERT INTO `member_item` (`member_id`, `item_id`, `quantity`, `acquisition_date`, `storage_location`) VALUES (?, ?, ?, CURDATE(), "Personal Inventory")',
                [member_id, reward_item_id, reward_quantity]
            );
        }

        // 3. Mark the quest as completed
        await connection.execute(
            'UPDATE `quest` SET `completed` = 1, `client_satisfaction` = 1.0 WHERE `quest_id` = ?',
            [quest_id]
        );

        // 4. Update member's quest completion rate (optional, if you have this logic)
        // You'd need to fetch current completion rate, increment, and update.
        // For now, we'll assume a trigger handles this or it's a separate process.

        await connection.commit();
        connection.release();
        res.status(200).json({
            success: true,
            message: `Solo quest "${questTitle}" completed! You received ${reward_quantity} of item ID ${reward_item_id}.`,
            reward: { item_id: reward_item_id, quantity: reward_quantity, type: 'personal_inventory' }
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.error('Complete Solo Quest API error:', error);
        res.status(500).json({ message: 'Failed to complete solo quest. ' + (error.sqlMessage || error.message) });
    }
});

// POST /api/quests/complete-party - Complete a PARTY quest and add item to guild vault
app.post('/api/quests/complete-party', async (req, res) => {
    const { quest_id, member_id, party_id } = req.body; // member_id is the leader's ID

    if (!quest_id || isNaN(parseInt(quest_id))) {
        return res.status(400).json({ message: 'Valid quest_id is required.' });
    }
    if (!member_id || isNaN(parseInt(member_id))) {
        return res.status(400).json({ message: 'Valid member_id (leader) is required.' });
    }
    if (!party_id || isNaN(parseInt(party_id))) {
        return res.status(400).json({ message: 'Valid party_id is required for party quests.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Get quest details including reward_item_id, reward_quantity, and quest_type
        const [questResults] = await connection.execute(
            'SELECT reward_item_id, reward_quantity, quest_type, title FROM `quest` WHERE quest_id = ? AND completed = 0 FOR UPDATE',
            [quest_id]
        );

        if (questResults.length === 0) {
            await connection.rollback();
            connection.release();
            return res.status(404).json({ message: 'Quest not found or already completed.' });
        }

        const quest = questResults[0];

        if (quest.quest_type !== 'party') {
            await connection.rollback();
            connection.release();
            return res.status(400).json({ message: 'This is not a party quest. Use the solo quest endpoint.' });
        }

        const { reward_item_id, reward_quantity, title: questTitle } = quest;

        if (!reward_item_id || reward_quantity <= 0) {
            await connection.rollback();
            connection.release();
            return res.status(400).json({ message: 'This quest does not offer a valid reward.' });
        }

        // 2. Verify the member_id is the leader of the chosen party
        const [partyLeaderCheck] = await connection.execute(
            'SELECT leader_id FROM `party` WHERE party_id = ?',
            [party_id]
        );

        if (partyLeaderCheck.length === 0 || partyLeaderCheck[0].leader_id !== parseInt(member_id)) {
            await connection.rollback();
            connection.release();
            return res.status(403).json({ message: 'You are not the leader of the selected party or the party does not exist.' });
        }

        // 3. Get all members of the selected party
        const [partyMembers] = await connection.execute(
            'SELECT member_id FROM `party_member` WHERE party_id = ?',
            [party_id]
        );

        if (partyMembers.length === 0) {
            await connection.rollback();
            connection.release();
            return res.status(400).json({ message: 'The selected party has no members.' });
        }

        // Calculate total reward quantity for the message
        const totalRewardQuantityGiven = reward_quantity * partyMembers.length;

        const rewardedMembers = [];

        // 4. Distribute rewards to each party member (each gets the full reward_quantity)
        for (const pMember of partyMembers) {
            // Each member receives the full `reward_quantity`
            const memberReward = reward_quantity;

            const [memberItemRows] = await connection.execute(
                'SELECT quantity FROM `member_item` WHERE `member_id` = ? AND `item_id` = ?',
                [pMember.member_id, reward_item_id]
            );

            if (memberItemRows.length > 0) {
                // Item exists, update quantity
                await connection.execute(
                    'UPDATE `member_item` SET `quantity` = `quantity` + ? WHERE `member_id` = ? AND `item_id` = ?',
                    [memberReward, pMember.member_id, reward_item_id]
                );
            } else {
                // Item does not exist, insert new entry
                await connection.execute(
                    'INSERT INTO `member_item` (`member_id`, `item_id`, `quantity`, `acquisition_date`, `storage_location`) VALUES (?, ?, ?, CURDATE(), "Personal Inventory")',
                    [pMember.member_id, reward_item_id, memberReward]
                );
            }
            rewardedMembers.push({ member_id: pMember.member_id, quantity: memberReward });
        }

        // 5. Mark the quest as completed
        await connection.execute(
            'UPDATE `quest` SET `completed` = 1, `client_satisfaction` = 1.0, `assigned_party_id` = ? WHERE `quest_id` = ?',
            [party_id, quest_id] // Assign the quest to the party that completed it
        );

        await connection.commit();
        connection.release();
        res.status(200).json({
            success: true,
            message: `Party quest "${questTitle}" completed! Each member received ${reward_quantity} of item ID ${reward_item_id}. (Total ${totalRewardQuantityGiven} items distributed.)`,
            reward: {
                item_id: reward_item_id,
                total_quantity_given: totalRewardQuantityGiven, // Renamed for clarity
                type: 'personal_inventories',
                distributed_to: rewardedMembers
            }
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.error('Complete Party Quest API error:', error);
        res.status(500).json({ message: 'Failed to complete party quest. ' + (error.sqlMessage || error.message) });
    }
});

// NEW: GET /api/member/:memberId/parties/leader - Fetch parties where the member is the leader
app.get('/api/member/:memberId/parties/leader', async (req, res) => {
    const { memberId } = req.params;

    if (isNaN(parseInt(memberId))) {
        return res.status(400).json({ message: 'Valid memberId is required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        const [parties] = await connection.execute(
            'SELECT party_id, party_name FROM `party` WHERE leader_id = ? AND active_status = 1',
            [memberId]
        );
        connection.release();
        res.json(parties);
    } catch (error) {
        if (connection) connection.release();
        console.error('Get Leader Parties API error:', error);
        res.status(500).json({ message: 'Server error fetching parties.' });
    }
});

// NEW: GET /api/all-quests - Fetch all quests (active and uncompleted) with reward details
app.get('/api/all-quests', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `
    SELECT
        q.quest_id,
        q.title,
        q.description,
        q.difficulty_rating,
        q.post_date,
        q.deadline,
        q.assigned_party_id,
        q.completed,
        q.client_satisfaction,
        q.reward_item_id,
        q.reward_quantity,
        q.quest_type,
        q.quest_image_url,
        i.name AS reward_item_name,
        i.image_url AS reward_item_image_url
    FROM quest q
    LEFT JOIN item i ON q.reward_item_id = i.item_id
    -- WHERE q.completed = 0
    ORDER BY q.post_date DESC;
`;
        const [quests] = await connection.execute(sql);
        connection.release();
        res.json(quests);
    } catch (error) {
        if (connection) connection.release();
        console.error('Get All Quests API error:', error);
        res.status(500).json({ message: 'Server error fetching quests.' });
    }
});


// POST /api/signup - Register a new member
app.post('/api/signup', async (req, res) => {
    let {
        email, name, password, adventurerClass, newsletterEmail
    } = req.body;
    if (!email || !name || !password) { return res.status(400).json({ message: 'Email, name, and password are required.' }); }
    if (!adventurerClass || String(adventurerClass).trim() === "") { adventurerClass = "Warrior"; }
    let connection;
    try {
        connection = await pool.getConnection();
        const [existingUsers] = await connection.execute("SELECT email FROM `member` WHERE `email` = ?", [email]);
        if (existingUsers.length > 0) { connection.release(); return res.status(409).json({ message: 'Email already exists.' }); }
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
    if (!email || !password) { return res.status(400).json({ message: 'Email and password are required.' }); }
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = "SELECT member_id, name, email, password_hash, class, newsletter_opt_in, join_date, profile_picture_url FROM `member` WHERE `email` = ?";
        const [users] = await connection.execute(sql, [email]);
        if (users.length === 0) { connection.release(); return res.status(401).json({ message: 'Invalid email or password.' }); }
        const user = users[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordMatch) { connection.release(); return res.status(401).json({ message: 'Invalid email or password.' }); }
        connection.release();
        const userInfo = {
            member_id: user.member_id, name: user.name, email: user.email, class: user.class,
            newsletter_opt_in: user.newsletter_opt_in, join_date: user.join_date, profile_picture_url: user.profile_picture_url
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
        if (users.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'User not found.' }); }
        const userProfile = users[0];

        const partiesSql = `
            SELECT p.party_id, p.party_name, pm.role, p.leader_id AS party_leader_id
            FROM party_member pm JOIN party p ON pm.party_id = p.party_id
            WHERE pm.member_id = ? ORDER BY p.party_name ASC`;
        const [parties] = await connection.execute(partiesSql, [userId]);
        userProfile.parties = parties;

        const inventorySql = `
            SELECT i.item_id, i.name, i.rarity, i.value, i.item_condition, i.magical, i.image_url, mi.quantity
            FROM member_item mi JOIN item i ON mi.item_id = i.item_id
            WHERE mi.member_id = ? ORDER BY i.name ASC;
        `;
        const [inventoryItems] = await connection.execute(inventorySql, [userId]);
        userProfile.inventory = inventoryItems;

        await connection.commit(); connection.release();
        res.json(userProfile);
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error('Profile API error:', error);
        res.status(500).json({ message: 'Server error fetching profile.' });
    }
});

// PUT /api/profile/:userId/picture - Update user's profile picture URL
app.put('/api/profile/:userId/picture', async (req, res) => {
    const { userId } = req.params; const { profilePictureUrl } = req.body;
    if (!userId || isNaN(parseInt(userId))) { return res.status(400).json({ success: false, message: 'Valid User ID is required.' }); }
    const newUrlToSave = (profilePictureUrl && String(profilePictureUrl).trim() !== "") ? String(profilePictureUrl).trim() : null;
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = "UPDATE `member` SET `profile_picture_url` = ? WHERE `member_id` = ?";
        const [result] = await connection.execute(sql, [newUrlToSave, userId]);
        connection.release();
        if (result.affectedRows === 0) { return res.status(404).json({ success: false, message: 'User not found.' }); }
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
        if (currentUserId && !isNaN(parseInt(currentUserId))) { sql += " WHERE `member_id` != ?"; params.push(currentUserId); }
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
    const { partyName, partyDescription, leader_id, additional_member_id, partyImageUrl } = req.body;
    if (!partyName || !leader_id) { return res.status(400).json({ message: 'Party name and leader ID are required.' }); }
    if (isNaN(parseInt(leader_id))) { return res.status(400).json({ message: 'Valid Leader ID is required.' }); }
    if (additional_member_id && (isNaN(parseInt(additional_member_id)) || parseInt(additional_member_id) === 0) ) { return res.status(400).json({ message: 'Valid Additional Member ID is required if provided.' }); }
    if (additional_member_id && parseInt(additional_member_id) === parseInt(leader_id)) { return res.status(400).json({ message: 'Leader cannot be added as an additional member to their own party.' }); }
    let connection;
    try {
        connection = await pool.getConnection(); await connection.beginTransaction();
        const [leaderExists] = await connection.execute("SELECT member_id FROM `member` WHERE `member_id` = ?", [leader_id]);
        if (leaderExists.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Leader (member) not found.' }); }
        if (additional_member_id) {
            const [additionalMemberExists] = await connection.execute("SELECT member_id FROM `member` WHERE `member_id` = ?", [additional_member_id]);
            if (additionalMemberExists.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: `Additional member with ID ${additional_member_id} not found.` }); }
        }
        const formationDate = new Date().toISOString().slice(0, 10);
        const activeStatus = 1; const initialSuccessRate = 0.0; const defaultMaxMembers = 8;
        const sql = `
            INSERT INTO party (party_name, description, leader_id, formation_date, active_status, success_rate, max_members, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [partyResult] = await connection.execute(sql, [
            partyName, partyDescription || null, leader_id, formationDate,
            activeStatus, initialSuccessRate, defaultMaxMembers, partyImageUrl || null
        ]);
        const newPartyId = partyResult.insertId;
        const leaderMemberSql = `INSERT INTO party_member (party_id, member_id, join_date, role) VALUES (?, ?, ?, ?)`;
        await connection.execute(leaderMemberSql, [newPartyId, leader_id, formationDate, 'Leader']);
        if (additional_member_id) {
            const additionalMemberSql = `INSERT INTO party_member (party_id, member_id, join_date, role) VALUES (?, ?, ?, ?)`;
            await connection.execute(additionalMemberSql, [newPartyId, additional_member_id, formationDate, 'Member']);
        }
        await connection.commit(); connection.release();
        res.status(201).json({
            message: 'Party created successfully!',
            party_id: newPartyId, party_name: partyName, description: partyDescription || null,
            image_url: partyImageUrl || null, leader_id: leader_id,
            members_added: additional_member_id ? [leader_id, parseInt(additional_member_id)] : [leader_id]
        });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error('Create Party API error:', error);
        if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage && error.sqlMessage.includes('party_member.PRIMARY')) { return res.status(409).json({ message: 'A selected member might already be in this party.' }); }
        res.status(500).json({ message: 'Server error during party creation.' });
    }
});

// GET /api/parties - List all available parties (no change)
app.get('/api/parties', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `
            SELECT p.party_id, p.party_name, p.description, p.image_url, p.max_members, p.leader_id,
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

// GET /api/parties/:partyId - Get details for a specific party (no change)
app.get('/api/parties/:partyId', async (req, res) => {
    const { partyId } = req.params;
    if (isNaN(parseInt(partyId))) { return res.status(400).json({ message: 'Valid Party ID is required.' }); }
    let connection;
    try {
        connection = await pool.getConnection(); await connection.beginTransaction();
        const partySql = "SELECT party_id, party_name, description, leader_id, formation_date, active_status, success_rate, max_members, image_url FROM `party` WHERE `party_id` = ?";
        const [partyRows] = await connection.execute(partySql, [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({message: "Party not found"}); }
        const partyDetails = partyRows[0];
        const membersSql = `
            SELECT m.member_id, m.name, m.class, pm.role
            FROM party_member pm JOIN member m ON pm.member_id = m.member_id
            WHERE pm.party_id = ? ORDER BY FIELD(pm.role, 'Leader', 'Officer', 'Member'), m.name ASC`;
        const [members] = await connection.execute(membersSql, [partyId]);
        partyDetails.members = members;
        partyDetails.current_member_count = members.length;
        await connection.commit(); connection.release();
        res.json(partyDetails);
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Get Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error fetching party details.' });
    }
});

// POST /api/parties/:partyId/join - User joins a party (no change)
app.post('/api/parties/:partyId/join', async (req, res) => {
    const { partyId } = req.params; const { member_id } = req.body;
    if (isNaN(parseInt(partyId)) || !member_id || isNaN(parseInt(member_id))) { return res.status(400).json({ message: 'Valid Party ID and Member ID are required.' }); }
    let connection;
    try {
        connection = await pool.getConnection(); await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT party_id, max_members FROM `party` WHERE `party_id` = ? AND active_status = 1", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party not found or is not active.'}); }
        const party = partyRows[0];
        const [memberCountRows] = await connection.execute("SELECT COUNT(*) AS count FROM `party_member` WHERE `party_id` = ?", [partyId]);
        const currentMemberCount = memberCountRows[0].count;
        if (party.max_members && currentMemberCount >= party.max_members) { await connection.rollback(); connection.release(); return res.status(409).json({ message: 'Party is full.'}); }
        const [existingMembership] = await connection.execute("SELECT member_id FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, member_id]);
        if (existingMembership.length > 0) { await connection.rollback(); connection.release(); return res.status(409).json({ message: 'You are already a member of this party.'}); }
        const joinDate = new Date().toISOString().slice(0, 10); const role = 'Member';
        const joinSql = "INSERT INTO `party_member` (party_id, member_id, join_date, role) VALUES (?, ?, ?, ?)";
        await connection.execute(joinSql, [partyId, member_id, joinDate, role]);
        await connection.commit(); connection.release();
        res.status(200).json({ success: true, message: 'Successfully joined the party!', party_id: parseInt(partyId) });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Join Party API error for party ${partyId}:`, error);
        res.status(500).json({ message: 'Server error joining party.' });
    }
});

// POST /api/parties/:partyId/leave - User leaves a party (no change)
app.post('/api/parties/:partyId/leave', async (req, res) => {
    const { partyId } = req.params; const { member_id } = req.body;
    if (isNaN(parseInt(partyId)) || !member_id || isNaN(parseInt(member_id))) { return res.status(400).json({ message: 'Valid Party ID and Member ID are required.' }); }
    let connection;
    try {
        connection = await pool.getConnection(); await connection.beginTransaction();
        const [partyInfo] = await connection.execute("SELECT leader_id FROM party WHERE party_id = ?", [partyId]);
        if (partyInfo.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: "Party not found." }); }
        const isLeader = parseInt(partyInfo[0].leader_id) === parseInt(member_id);
        if (isLeader) {
            const [memberCountResult] = await connection.execute("SELECT COUNT(*) AS count FROM party_member WHERE party_id = ?", [partyId]);
            if (memberCountResult[0].count > 1) { await connection.rollback(); connection.release(); return res.status(400).json({ message: "Leader cannot leave the party if other members exist. Delete the party or remove other members first." }); }
        }
        const deleteSql = "DELETE FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?";
        const [result] = await connection.execute(deleteSql, [partyId, member_id]);
        if (result.affectedRows === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: "You are not a member of this party or failed to leave." }); }
        if (isLeader && result.affectedRows > 0) {
             const [memberCountAfterLeave] = await connection.execute("SELECT COUNT(*) AS count FROM party_member WHERE party_id = ?", [partyId]);
             if (memberCountAfterLeave[0].count === 0) {
                 console.log(`Party ${partyId} is now empty. Deleting party.`);
                 await connection.execute("DELETE FROM party WHERE party_id = ?", [partyId]);
             }
        }
        await connection.commit(); connection.release();
        res.status(200).json({ success: true, message: 'Successfully left the party.' });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Leave Party API error for party ${partyId}, member ${member_id}:`, error);
        res.status(500).json({ message: 'Server error while leaving party.' });
    }
});

// POST /api/parties/:partyId/members - Leader adds a member to a party (no change)
app.post('/api/parties/:partyId/members', async (req, res) => {
    const { partyId } = req.params; const { leader_id, member_id_to_add } = req.body;
    if (isNaN(parseInt(partyId)) || !leader_id || isNaN(parseInt(leader_id)) || !member_id_to_add || isNaN(parseInt(member_id_to_add))) { return res.status(400).json({ message: 'Valid Party ID, Leader ID, and Member ID to add are required.' }); }
    if (parseInt(leader_id) === parseInt(member_id_to_add)) { return res.status(400).json({ message: "Cannot add yourself to the party again." });}
    let connection;
    try {
        connection = await pool.getConnection(); await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id, max_members FROM `party` WHERE `party_id` = ? AND active_status = 1", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party not found or is not active.' }); }
        const party = partyRows[0];
        if (parseInt(party.leader_id) !== parseInt(leader_id)) { await connection.rollback(); connection.release(); return res.status(403).json({ message: 'Only the party leader can add members.' }); }
        const [memberToAddExists] = await connection.execute("SELECT member_id FROM `member` WHERE `member_id` = ?", [member_id_to_add]);
        if (memberToAddExists.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: `Member with ID ${member_id_to_add} not found.` }); }
        const [memberCountRows] = await connection.execute("SELECT COUNT(*) AS count FROM `party_member` WHERE `party_id` = ?", [partyId]);
        const currentMemberCount = memberCountRows[0].count;
        if (party.max_members && memberCountRows[0].count >= party.max_members) { await connection.rollback(); connection.release(); return res.status(409).json({ message: 'Party is full.' }); }
        const [existingMembership] = await connection.execute("SELECT member_id FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, member_id_to_add]);
        if (existingMembership.length > 0) { await connection.rollback(); connection.release(); return res.status(409).json({ message: 'This user is already a member of this party.' }); }
        const joinDate = new Date().toISOString().slice(0, 10); const role = 'Member';
        const addSql = "INSERT INTO `party_member` (party_id, member_id, join_date, role) VALUES (?, ?, ?, ?)";
        await connection.execute(addSql, [partyId, member_id_to_add, joinDate, role]);
        await connection.commit(); connection.release();
        res.status(200).json({ success: true, message: 'Member added to party successfully.' });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Add member to Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error adding member to party.' });
    }
});

// DELETE /api/parties/:partyId/members/:memberIdToRemove - Leader removes a member (no change)
app.delete('/api/parties/:partyId/members/:memberIdToRemove', async (req, res) => {
    const { partyId, memberIdToRemove } = req.params; const { leader_id } = req.body;
    if (isNaN(parseInt(partyId)) || isNaN(parseInt(memberIdToRemove)) || !leader_id || isNaN(parseInt(leader_id))) { return res.status(400).json({ message: 'Valid Party ID, Member ID to remove, and Leader ID are required.' }); }
    if (parseInt(leader_id) === parseInt(memberIdToRemove)) { return res.status(400).json({ message: "Leader cannot remove themselves using this action." }); }
    let connection;
    try {
        connection = await pool.getConnection(); await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party not found.' }); }
        if (parseInt(partyRows[0].leader_id) !== parseInt(leader_id)) { await connection.rollback(); connection.release(); return res.status(403).json({ message: 'Only the party leader can remove members.' }); }
        const deleteSql = "DELETE FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?";
        const [result] = await connection.execute(deleteSql, [partyId, memberIdToRemove]);
        if (result.affectedRows === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Member not found in this party or already removed.' }); }
        await connection.commit(); connection.release();
        res.status(200).json({ success: true, message: 'Member removed from party successfully.' });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Remove member from Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error removing member from party.' });
    }
});

// POST /api/vault/deposit - Deposit items into the vault with quantity
app.post('/api/vault/deposit', async (req, res) => {
    const { item_id, member_id, quantity } = req.body;

    // Validate input
    if (!item_id || isNaN(parseInt(item_id))) {
        return res.status(400).json({ message: 'Valid item_id is required.' });
    }
    if (!member_id || isNaN(parseInt(member_id))) {
        return res.status(400).json({ message: 'Valid member_id is required.' });
    }
    if (!quantity || isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
        return res.status(400).json({ message: 'A positive quantity is required for deposit.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Check if the item exists in the member's inventory and has sufficient quantity
        const [memberItemRows] = await connection.execute(
            "SELECT quantity FROM `member_item` WHERE `member_id` = ? AND `item_id` = ? FOR UPDATE",
            [member_id, item_id]
        );

        if (memberItemRows.length === 0) {
            await connection.rollback();
            connection.release();
            return res.status(404).json({ message: 'Item not found in your inventory.' });
        }

        const memberItem = memberItemRows[0];
        const requestedQuantity = parseInt(quantity);

        if (memberItem.quantity < requestedQuantity) {
            await connection.rollback();
            connection.release();
            return res.status(400).json({ message: `Insufficient quantity in your inventory. Available: ${memberItem.quantity}.` });
        }

        // 2. Decrease item quantity from member's inventory
        const newMemberItemQuantity = memberItem.quantity - requestedQuantity;
        if (newMemberItemQuantity === 0) {
            // If quantity becomes 0, remove the item from member_item table
            await connection.execute(
                "DELETE FROM `member_item` WHERE `member_id` = ? AND `item_id` = ?",
                [member_id, item_id]
            );
        } else {
            await connection.execute(
                "UPDATE `member_item` SET `quantity` = ? WHERE `member_id` = ? AND `item_id` = ?",
                [newMemberItemQuantity, member_id, item_id]
            );
        }

        // 3. Add or update item in the vault (item table, by setting vault_id and adjusting quantity)
        const defaultVaultId = 1; // IMPORTANT: Adjust this if your vault_id scheme is different

        const [vaultItemRows] = await connection.execute(
            "SELECT quantity, vault_id FROM `item` WHERE `item_id` = ? FOR UPDATE",
            [item_id]
        );

        if (vaultItemRows.length === 0) {
             await connection.rollback();
             connection.release();
             return res.status(404).json({ message: 'Master item record not found for deposit.' });
        }

        const currentItemInMaster = vaultItemRows[0];
        let newVaultQuantity;

        if (currentItemInMaster.vault_id === defaultVaultId) {
            // Item is already associated with *the* vault, just add to its quantity in the item table
            newVaultQuantity = currentItemInMaster.quantity + requestedQuantity;
            await connection.execute(
                "UPDATE `item` SET `quantity` = ? WHERE `item_id` = ?",
                [newVaultQuantity, item_id]
            );
        } else {
            // Item is not currently in this specific vault (vault_id is not 1 for this item_id),
            // or perhaps it's not associated with *any* vault (vault_id is NULL).
            // We need to move it to the default vault and set its quantity.
            newVaultQuantity = requestedQuantity;
            await connection.execute(
                "UPDATE `item` SET `vault_id` = ?, `quantity` = ? WHERE `item_id` = ?",
                [defaultVaultId, newVaultQuantity, item_id]
            );
        }

        await connection.commit();
        connection.release();
        res.status(200).json({
            success: true,
            message: `Successfully deposited ${requestedQuantity} of item ${item_id} into the vault.`,
            item_id: item_id,
            member_id: member_id,
            deposited_quantity: requestedQuantity,
            new_member_item_quantity: newMemberItemQuantity,
            new_vault_quantity: newVaultQuantity
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.error('Deposit Item API error:', error);
        res.status(500).json({ message: 'Server error during item deposit.' });
    }
});

// DELETE /api/parties/:partyId - Leader deletes/disbands a party (no change)
app.delete('/api/parties/:partyId', async (req, res) => {
    const { partyId } = req.params; const { leader_id } = req.body;
    if (isNaN(parseInt(partyId)) || !leader_id || isNaN(parseInt(leader_id))) { return res.status(400).json({ message: 'Valid Party ID and authenticating Leader ID are required.' }); }
    let connection;
    try {
        connection = await pool.getConnection(); await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party not found.' }); }
        if (parseInt(partyRows[0].leader_id) !== parseInt(leader_id)) { await connection.rollback(); connection.release(); return res.status(403).json({ message: 'Only the party leader can delete the party.' }); }
        await connection.execute("DELETE FROM `party_member` WHERE `party_id` = ?", [partyId]);
        const [deletePartyResult] = await connection.execute("DELETE FROM `party` WHERE `party_id` = ?", [partyId]);
        if (deletePartyResult.affectedRows === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party could not be deleted (it may have already been removed).' }); }
        await connection.commit(); connection.release();
        res.status(200).json({ success: true, message: 'Party successfully deleted.' });
    } catch (error) {
        if (connection) { await connection.rollback(); connection.release(); }
        console.error(`Delete Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error deleting party.' });
    }
});

// POST /api/parties/:partyId/transfer-leadership - Current leader transfers leadership (no change)
app.post('/api/parties/:partyId/transfer-leadership', async (req, res) => {
    const { partyId } = req.params; const { current_leader_id, new_leader_member_id } = req.body;
    if (isNaN(parseInt(partyId)) || !current_leader_id || isNaN(parseInt(current_leader_id)) || !new_leader_member_id || isNaN(parseInt(new_leader_member_id))) { return res.status(400).json({ message: 'Valid Party ID, Current Leader ID, and New Leader Member ID are required.' }); }
    if (parseInt(current_leader_id) === parseInt(new_leader_member_id)) { return res.status(400).json({ message: "You cannot transfer leadership to yourself." }); }
    let connection;
    try {
        connection = await pool.getConnection(); await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'Party not found.' }); }
        if (parseInt(partyRows[0].leader_id) !== parseInt(current_leader_id)) { await connection.rollback(); connection.release(); return res.status(403).json({ message: 'Only the current party leader can transfer leadership.' }); }
        const [newLeaderMembership] = await connection.execute("SELECT member_id, role FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, new_leader_member_id]);
        if (newLeaderMembership.length === 0) { await connection.rollback(); connection.release(); return res.status(404).json({ message: 'The selected user is not a member of this party.' }); }
        const updatePartySql = "UPDATE `party` SET `leader_id` = ? WHERE `party_id` = ?";
        await connection.execute(updatePartySql, [new_leader_member_id, partyId]);
        const updateNewLeaderRoleSql = "UPDATE `party_member` SET `role` = 'Leader' WHERE `party_id` = ? AND `member_id` = ?";
        await connection.execute(updateNewLeaderRoleSql, [partyId, new_leader_member_id]);
        const updateOldLeaderRoleSql = "UPDATE `party_member` SET `role` = 'Member' WHERE `party_id` = ? AND `member_id` = ?";
        await connection.execute(updateOldLeaderRoleSql, [partyId, current_leader_id]);
        await connection.commit(); connection.release();
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