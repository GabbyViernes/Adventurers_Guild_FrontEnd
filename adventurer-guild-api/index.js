// index.js (Backend - Full Code with Ranking, XP/Gold, Quest Skills, Profile Skills, AND Quest Cooldown)

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
    host: 'localhost',
    user: 'root',
    password: '', // Your MySQL password
    database: 'adventurersguild22',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    flags: ['-FOUND_ROWS', '+BIGINT_STRINGS', '+DECIMAL_NUMBERS_AS_STRINGS']
};
const pool = mysql.createPool(dbConfig);

// Test DB Connection
(async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Successfully connected to MySQL database.');
    } catch (error) {
        console.error('Error connecting to MySQL database:', error.message);
    } finally {
        if (connection) connection.release();
    }
})();

// --- Helper function for Rank-Up Logic ---
async function checkAndProcessRankUp(member_id, connection) {
    // This function MUST be called within an active transaction if `connection` is part of one.
    let memberCurrentXP, memberCurrentRankId;

    const [memberRows] = await connection.execute('SELECT current_xp, rank_id FROM `member` WHERE member_id = ? FOR UPDATE', [member_id]);
    if (memberRows.length === 0) {
        console.error(`RankUpCheck: Member ${member_id} not found.`);
        return { rankedUp: false, error: "Member not found for rank check." };
    }
    memberCurrentXP = memberRows[0].current_xp;
    memberCurrentRankId = memberRows[0].rank_id;

    const [ranks] = await connection.execute('SELECT rank_id, xp_threshold FROM `rank` ORDER BY xp_threshold ASC');
    if (ranks.length === 0) {
        console.error("RankUpCheck: No ranks found in the database.");
        return { rankedUp: false, error: "No rank definitions found." };
    }

    let newRankId = memberCurrentRankId;
    for (const rank of ranks) {
        if (memberCurrentXP >= rank.xp_threshold) {
            newRankId = rank.rank_id;
        } else {
            break;
        }
    }

    if (newRankId !== memberCurrentRankId) {
        await connection.execute('UPDATE `member` SET rank_id = ? WHERE member_id = ?', [newRankId, member_id]);
        const [newRankInfo] = await connection.execute('SELECT rank_name FROM `rank` WHERE rank_id = ?', [newRankId]);
        return {
            rankedUp: true,
            newRankId: newRankId,
            newRankName: newRankInfo.length > 0 ? newRankInfo[0].rank_name : 'Unknown Rank'
        };
    }
    return { rankedUp: false };
}


// --- API Endpoints ---

// GET /api/vault/items
app.get('/api/vault/items', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT i.item_id, i.name, i.rarity, i.value, i.item_condition, i.magical, i.registration_date, i.vault_id, i.image_url, i.quantity FROM item i WHERE i.vault_id IS NOT NULL ORDER BY i.name ASC;`;
        const [items] = await connection.execute(sql);
        res.json(items);
    } catch (error) {
        console.error('Get Vault Items API error:', error);
        res.status(500).json({ message: 'Server error fetching vault items.' });
    } finally {
        if (connection) connection.release();
    }
});

// POST /api/vault/withdraw
app.post('/api/vault/withdraw', async (req, res) => {
    const { item_id, member_id, quantity } = req.body;
    if (!item_id || isNaN(parseInt(item_id)) || !member_id || isNaN(parseInt(member_id)) || !quantity || isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
        return res.status(400).json({ message: 'Valid item_id, member_id, and a positive quantity are required.' });
    }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [itemRows] = await connection.execute("SELECT item_id, name, quantity, vault_id FROM `item` WHERE `item_id` = ? AND `vault_id` IS NOT NULL FOR UPDATE", [item_id]);
        if (itemRows.length === 0) {
            await connection.rollback(); res.status(404).json({ message: 'Item not found in the vault.' }); return;
        }
        const vaultItem = itemRows[0];
        const requestedQuantity = parseInt(quantity);
        if (vaultItem.quantity < requestedQuantity) {
            await connection.rollback(); res.status(400).json({ message: `Insufficient quantity in vault. Available: ${vaultItem.quantity}.` }); return;
        }
        const [memberRows] = await connection.execute("SELECT member_id FROM `member` WHERE `member_id` = ?", [member_id]);
        if (memberRows.length === 0) {
            await connection.rollback(); res.status(404).json({ message: 'Member not found.' }); return;
        }
        const newVaultQuantity = vaultItem.quantity - requestedQuantity;
        if (newVaultQuantity === 0) {
            await connection.execute("UPDATE `item` SET `vault_id` = NULL, `quantity` = 0 WHERE `item_id` = ?", [item_id]);
        } else {
            await connection.execute("UPDATE `item` SET `quantity` = ? WHERE `item_id` = ?", [newVaultQuantity, item_id]);
        }
        const [memberItemRows] = await connection.execute("SELECT quantity FROM `member_item` WHERE `member_id` = ? AND `item_id` = ?", [member_id, item_id]);
        if (memberItemRows.length > 0) {
            const newMemberItemQuantity = memberItemRows[0].quantity + requestedQuantity;
            await connection.execute("UPDATE `member_item` SET `quantity` = ? WHERE `member_id` = ? AND `item_id` = ?", [newMemberItemQuantity, member_id, item_id]);
        } else {
            await connection.execute("INSERT INTO `member_item` (member_id, item_id, quantity, acquisition_date, storage_location) VALUES (?, ?, ?, CURDATE(), 'Personal Inventory')", [member_id, item_id, requestedQuantity]);
        }
        await connection.commit();
        res.status(200).json({ success: true, message: `Successfully withdrew ${requestedQuantity} of ${vaultItem.name}.`});
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Withdraw Item API error:', error);
        res.status(500).json({ message: 'Server error during item withdrawal.' });
    } finally {
        if (connection) connection.release();
    }
});

// POST /api/vault/deposit
app.post('/api/vault/deposit', async (req, res) => {
    const { item_id, member_id, quantity } = req.body;
     if (!item_id || isNaN(parseInt(item_id)) || !member_id || isNaN(parseInt(member_id)) || !quantity || isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
        return res.status(400).json({ message: 'Valid item_id, member_id, and a positive quantity are required.' });
    }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [memberItemRows] = await connection.execute("SELECT quantity FROM `member_item` WHERE `member_id` = ? AND `item_id` = ? FOR UPDATE", [member_id, item_id]);
        if (memberItemRows.length === 0) {
            await connection.rollback(); res.status(404).json({ message: 'Item not found in your inventory.' }); return;
        }
        const memberItem = memberItemRows[0];
        const requestedQuantity = parseInt(quantity);
        if (memberItem.quantity < requestedQuantity) {
            await connection.rollback(); res.status(400).json({ message: `Insufficient quantity in inventory. Available: ${memberItem.quantity}.` }); return;
        }
        const newMemberItemQuantity = memberItem.quantity - requestedQuantity;
        if (newMemberItemQuantity === 0) {
            await connection.execute("DELETE FROM `member_item` WHERE `member_id` = ? AND `item_id` = ?", [member_id, item_id]);
        } else {
            await connection.execute("UPDATE `member_item` SET `quantity` = ? WHERE `member_id` = ? AND `item_id` = ?", [newMemberItemQuantity, member_id, item_id]);
        }
        const defaultVaultId = 1;
        const [vaultItemRows] = await connection.execute("SELECT quantity, vault_id FROM `item` WHERE `item_id` = ? FOR UPDATE", [item_id]);
        if (vaultItemRows.length === 0) {
             await connection.rollback(); res.status(404).json({ message: 'Master item record not found for deposit.' }); return;
        }
        const currentItemInMaster = vaultItemRows[0];
        let newVaultQuantity;
        if (currentItemInMaster.vault_id === defaultVaultId) {
            newVaultQuantity = currentItemInMaster.quantity + requestedQuantity;
            await connection.execute("UPDATE `item` SET `quantity` = ? WHERE `item_id` = ?", [newVaultQuantity, item_id]);
        } else {
            newVaultQuantity = (currentItemInMaster.vault_id === null || currentItemInMaster.quantity === 0 ? 0 : currentItemInMaster.quantity) + requestedQuantity;
            await connection.execute("UPDATE `item` SET `vault_id` = ?, `quantity` = ? WHERE `item_id` = ?", [defaultVaultId, newVaultQuantity, item_id]);
        }
        await connection.commit();
        res.status(200).json({ success: true, message: `Successfully deposited ${requestedQuantity} of item with ID ${item_id}.`});
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Deposit Item API error:', error);
        res.status(500).json({ message: 'Server error during item deposit.' });
    } finally {
        if (connection) connection.release();
    }
});


// --- Quest Endpoints ---
app.get('/api/all-quests', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Step 1: Reset quests whose cooldown has expired (Lazy Reset)
        const resetSql = `
            UPDATE quest
            SET completed = 0, available_again_at = NULL
            WHERE completed = 1 AND available_again_at IS NOT NULL AND available_again_at <= NOW();
        `;
        await connection.execute(resetSql);

        // Step 2: Fetch currently available quests
        const questsSql = `
            SELECT
                q.quest_id, q.title, q.description, q.difficulty_rating, q.post_date, q.deadline,
                q.assigned_party_id, q.completed, q.client_satisfaction, q.reward_item_id,
                q.reward_quantity, q.quest_type, q.quest_image_url,
                q.xp_reward, q.gold_reward, q.available_again_at,
                i.name AS reward_item_name,
                i.image_url AS reward_item_image_url
            FROM quest q
            LEFT JOIN item i ON q.reward_item_id = i.item_id
            WHERE q.completed = 0
            ORDER BY q.post_date DESC, q.quest_id DESC;
        `;
        const [questsData] = await connection.execute(questsSql);

        const questsWithDetails = await Promise.all(questsData.map(async (quest) => {
            const requiredSkillsSql = `
                SELECT s.skill_id, s.skill_name, s.skill_desc
                FROM quest_required_skill qrs
                JOIN skill s ON qrs.skill_id = s.skill_id
                WHERE qrs.quest_id = ?
                ORDER BY s.skill_name ASC;
            `;
            const [skills] = await connection.execute(requiredSkillsSql, [quest.quest_id]);
            return { ...quest, required_skills: skills };
        }));
        
        await connection.commit();
        res.json(questsWithDetails);
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Get All Quests API error:', error);
        res.status(500).json({ message: 'Server error fetching quests.' });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/quests/complete-solo', async (req, res) => {
    const { quest_id, member_id } = req.body;
    if (!quest_id || isNaN(parseInt(quest_id)) || !member_id || isNaN(parseInt(member_id))) {
        return res.status(400).json({ message: 'Valid quest_id and member_id are required.' });
    }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [currentQuestStateRows] = await connection.execute('SELECT completed, available_again_at, title, quest_type, reward_item_id, reward_quantity, xp_reward, gold_reward FROM `quest` WHERE quest_id = ? FOR UPDATE', [quest_id]);
        if (currentQuestStateRows.length === 0) {
            await connection.rollback(); res.status(404).json({ message: 'Quest not found.' }); return;
        }
        const quest = currentQuestStateRows[0];
        if (quest.completed === 1) {
            await connection.rollback();
            const availableTime = quest.available_again_at ? new Date(quest.available_again_at).toLocaleString() : "soon";
            res.status(403).json({ message: `Quest "${quest.title}" is currently on cooldown. Available again around: ${availableTime}.` }); return;
        }
        if (quest.quest_type !== 'solo') {
            await connection.rollback(); res.status(400).json({ message: 'This is not a solo quest.' }); return;
        }

        const [requiredSkillsRows] = await connection.execute('SELECT qrs.skill_id, s.skill_name FROM `quest_required_skill` qrs JOIN skill s ON qrs.skill_id = s.skill_id WHERE qrs.quest_id = ?', [quest_id]);
        if (requiredSkillsRows.length > 0) {
            const requiredSkillIds = requiredSkillsRows.map(r => r.skill_id);
            const [memberSkillsRows] = await connection.execute('SELECT skill_id FROM `member_skill` WHERE member_id = ?', [member_id]);
            const memberSkillIds = memberSkillsRows.map(r => r.skill_id);
            const hasAtLeastOneRequiredSkill = requiredSkillIds.some(reqSkillId => memberSkillIds.includes(reqSkillId));
            if (!hasAtLeastOneRequiredSkill) {
                await connection.rollback();
                const requiredSkillNames = requiredSkillsRows.map(s => s.skill_name).join(' OR ');
                res.status(403).json({ message: `You lack at least one of the required skills: ${requiredSkillNames || 'specific skill(s)'}.` }); return;
            }
        }

        if (quest.reward_item_id && quest.reward_quantity > 0) {
            const [memberItemRows] = await connection.execute('SELECT quantity FROM `member_item` WHERE `member_id` = ? AND `item_id` = ?', [member_id, quest.reward_item_id]);
            if (memberItemRows.length > 0) {
                await connection.execute('UPDATE `member_item` SET `quantity` = `quantity` + ? WHERE `member_id` = ? AND `item_id` = ?', [quest.reward_quantity, member_id, quest.reward_item_id]);
            } else {
                await connection.execute('INSERT INTO `member_item` (`member_id`, `item_id`, `quantity`, `acquisition_date`, `storage_location`) VALUES (?, ?, ?, CURDATE(), "Personal Inventory")', [member_id, quest.reward_item_id, quest.reward_quantity]);
            }
        }
        await connection.execute('UPDATE `member` SET current_xp = current_xp + ?, gold = gold + ? WHERE member_id = ?', [quest.xp_reward || 0, quest.gold_reward || 0, member_id]);
        const rankUpResult = await checkAndProcessRankUp(member_id, connection);

        await connection.execute('UPDATE `quest` SET `completed` = 1, `available_again_at` = DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE `quest_id` = ?', [quest_id]);
        // Note: Your `Set_Completion_Date` trigger will also set `deadline = CURDATE()` here.

        await connection.commit();
        res.status(200).json({ success: true, message: `Solo quest "${quest.title}" completed! It will be available again in 5 minutes. XP & Gold awarded.`, rankUpInfo: rankUpResult });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Complete Solo Quest API error:', error);
        res.status(500).json({ message: 'Failed to complete solo quest. ' + (error.sqlMessage || error.message) });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/quests/complete-party', async (req, res) => {
    const { quest_id, member_id, party_id } = req.body;
    if (!quest_id || isNaN(parseInt(quest_id)) || !member_id || isNaN(parseInt(member_id)) || !party_id || isNaN(parseInt(party_id))) {
        return res.status(400).json({ message: 'Valid quest_id, member_id (leader), and party_id are required.' });
    }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [currentQuestStateRows] = await connection.execute('SELECT * FROM `quest` WHERE quest_id = ? FOR UPDATE', [quest_id]); // Fetch all quest fields
        if (currentQuestStateRows.length === 0) {
            await connection.rollback(); res.status(404).json({ message: 'Quest not found.' }); return;
        }
        const quest = currentQuestStateRows[0];
        if (quest.completed === 1) {
            await connection.rollback();
            const availableTime = quest.available_again_at ? new Date(quest.available_again_at).toLocaleString() : "soon";
            res.status(403).json({ message: `Quest "${quest.title}" is currently on cooldown. Available again around: ${availableTime}.` }); return;
        }
        if (quest.quest_type !== 'party') {
            await connection.rollback(); res.status(400).json({ message: 'This is not a party quest.' }); return;
        }
        const [partyLeaderCheck] = await connection.execute('SELECT leader_id FROM `party` WHERE party_id = ?', [party_id]);
        if (partyLeaderCheck.length === 0 || partyLeaderCheck[0].leader_id !== parseInt(member_id)) {
            await connection.rollback(); res.status(403).json({ message: 'You are not the leader of this party or party does not exist.' }); return;
        }

        const [requiredSkillsRows] = await connection.execute('SELECT qrs.skill_id, s.skill_name FROM `quest_required_skill` qrs JOIN skill s ON qrs.skill_id = s.skill_id WHERE qrs.quest_id = ?', [quest_id]);
        if (requiredSkillsRows.length > 0) {
            const requiredSkillIds = requiredSkillsRows.map(r => r.skill_id);
            const [partyMemberIdsRows] = await connection.execute('SELECT member_id FROM `party_member` WHERE party_id = ?', [party_id]);
            if (partyMemberIdsRows.length === 0) {
                await connection.rollback(); res.status(400).json({ message: 'Party has no members.' }); return;
            }
            const partyMemberIds = partyMemberIdsRows.map(pm => pm.member_id);
            if (partyMemberIds.length > 0) { // Check if array is not empty before IN clause
                const placeholders = partyMemberIds.map(() => '?').join(',');
                const [collectivePartySkillsRows] = await connection.execute(`SELECT DISTINCT skill_id FROM \`member_skill\` WHERE member_id IN (${placeholders})`, partyMemberIds);
                const collectivePartySkillIds = collectivePartySkillsRows.map(r => r.skill_id);
                const partyHasAllRequiredSkills = requiredSkillIds.every(reqSkillId => collectivePartySkillIds.includes(reqSkillId));
                if (!partyHasAllRequiredSkills) {
                    await connection.rollback();
                    const missingSkills = requiredSkillsRows.filter(reqSkill => !collectivePartySkillIds.includes(reqSkill.skill_id));
                    const missingSkillNames = missingSkills.map(s => s.skill_name).join(', ');
                    res.status(403).json({ message: `Party lacks required skills: ${missingSkillNames || 'Unknown required skill(s)'}.` }); return;
                }
            } else { // Should not happen if partyMemberIdsRows.length > 0 check passed, but defensive
                 await connection.rollback(); res.status(400).json({ message: 'No members found in party for skill check.' }); return;
            }
        }

        const [partyMembersForReward] = await connection.execute('SELECT member_id FROM `party_member` WHERE party_id = ?', [party_id]);
        let totalItemRewardQuantityGiven = 0;
        const rewardedMembersForItem = [];
        const rankUpNotifications = [];

        if (partyMembersForReward.length > 0) {
            for (const pMember of partyMembersForReward) {
                await connection.execute('UPDATE member SET current_xp = current_xp + ?, gold = gold + ? WHERE member_id = ?', [quest.xp_reward || 0, quest.gold_reward || 0, pMember.member_id]);
                const rankUpResult = await checkAndProcessRankUp(pMember.member_id, connection);
                if(rankUpResult.rankedUp) {
                    rankUpNotifications.push({member_id: pMember.member_id, newRankName: rankUpResult.newRankName});
                }
                if (quest.reward_item_id && quest.reward_quantity > 0) {
                    const memberItemReward = quest.reward_quantity;
                    totalItemRewardQuantityGiven += memberItemReward;
                    rewardedMembersForItem.push({ member_id: pMember.member_id, quantity: memberItemReward });
                    const [memberItemRows] = await connection.execute('SELECT quantity FROM `member_item` WHERE `member_id` = ? AND `item_id` = ?', [pMember.member_id, quest.reward_item_id]);
                    if (memberItemRows.length > 0) {
                        await connection.execute('UPDATE `member_item` SET `quantity` = `quantity` + ? WHERE `member_id` = ? AND `item_id` = ?', [memberItemReward, pMember.member_id, quest.reward_item_id]);
                    } else {
                        await connection.execute('INSERT INTO `member_item` (`member_id`, `item_id`, `quantity`, `acquisition_date`, `storage_location`) VALUES (?, ?, ?, CURDATE(), "Personal Inventory")', [pMember.member_id, quest.reward_item_id, memberItemReward]);
                    }
                }
            }
        }
        await connection.execute('UPDATE `quest` SET `completed` = 1, `available_again_at` = DATE_ADD(NOW(), INTERVAL 5 MINUTE), `assigned_party_id` = ? WHERE `quest_id` = ?', [party_id, quest_id]);
        // Note: Your `Set_Completion_Date` trigger will also set `deadline = CURDATE()` here.

        await connection.commit();
        res.status(200).json({
            success: true, message: `Party quest "${quest.title}" completed! It will be available again in 5 minutes. Rewards distributed.`,
            itemRewardInfo: { item_id: quest.reward_item_id, total_quantity_given: totalItemRewardQuantityGiven, distributed_to: rewardedMembersForItem },
            rankUpInfo: rankUpNotifications
        });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Complete Party Quest API error:', error);
        res.status(500).json({ message: 'Failed to complete party quest. ' + (error.sqlMessage || error.message) });
    } finally {
        if (connection) connection.release();
    }
});

app.get('/api/member/:memberId/parties/leader', async (req, res) => {
    const { memberId } = req.params;
    if (isNaN(parseInt(memberId))) return res.status(400).json({ message: 'Valid memberId is required.' });
    let connection;
    try {
        connection = await pool.getConnection();
        const [parties] = await connection.execute('SELECT party_id, party_name FROM `party` WHERE leader_id = ? AND active_status = 1', [memberId]);
        res.json(parties);
    } catch (error) {
        console.error('Get Leader Parties API error:', error);
        res.status(500).json({ message: 'Server error fetching parties.' });
    } finally {
        if (connection) connection.release();
    }
});

// --- User, Auth, Profile, Skills, Ranks ---
app.get('/api/skills', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [skills] = await connection.execute('SELECT skill_id, skill_name, skill_desc FROM `skill` ORDER BY skill_name ASC');
        res.json(skills);
    } catch (error) {
        console.error('Get All Skills API error:', error);
        res.status(500).json({ message: 'Server error fetching skills.' });
    } finally {
        if (connection) connection.release();
    }
});

app.get('/api/ranks', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [ranks] = await connection.execute('SELECT rank_id, rank_name, xp_threshold, reward_multiplier, quest_access FROM `rank` ORDER BY xp_threshold ASC');
        res.json(ranks);
    } catch (error) {
        console.error('Get Ranks API error:', error);
        res.status(500).json({ message: 'Server error fetching ranks.' });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/signup', async (req, res) => {
    let { email, name, password, adventurerClass, newsletterEmail } = req.body;
    if (!email || !name || !password) { return res.status(400).json({ message: 'Email, name, and password are required.' }); }
    adventurerClass = adventurerClass || "Warrior";
    let connection;
    try {
        connection = await pool.getConnection();
        const [existingUsers] = await connection.execute("SELECT email FROM `member` WHERE `email` = ?", [email]);
        if (existingUsers.length > 0) { res.status(409).json({ message: 'Email already exists.' }); return; }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const joinDate = new Date().toISOString().slice(0, 10);
        const sql = `INSERT INTO member (name, email, password_hash, class, newsletter_opt_in, join_date, active_status, quest_completion_rate, rank_id, current_xp, gold) VALUES (?, ?, ?, ?, ?, ?, 1, 0.0, 1, 0, 100)`;
        const [result] = await connection.execute(sql, [name, email, hashedPassword, adventurerClass, !!newsletterEmail, joinDate]);
        res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
    } catch (error) {
        console.error('Signup API error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { return res.status(400).json({ message: 'Email and password are required.' }); }
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = "SELECT member_id, name, email, password_hash, class, newsletter_opt_in, join_date, profile_picture_url, current_xp, gold, rank_id FROM `member` WHERE `email` = ?";
        const [users] = await connection.execute(sql, [email]);
        if (users.length === 0) { res.status(401).json({ message: 'Invalid email or password.' }); return; }
        const user = users[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordMatch) { res.status(401).json({ message: 'Invalid email or password.' }); return; }
        const { password_hash, ...userInfo } = user;
        res.json({ message: 'Login successful!', user: userInfo });
    } catch (error) {
        console.error('Login API error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    } finally {
        if (connection) connection.release();
    }
});

app.get('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!userId || isNaN(parseInt(userId))) { return res.status(400).json({ message: 'Valid User ID is required.' }); }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const userSql = `
            SELECT m.member_id, m.name, m.email, m.class, m.newsletter_opt_in, m.join_date,
                   m.created_at, m.profile_picture_url, m.current_xp, m.gold, m.rank_id,
                   r.rank_name AS current_rank_name, r.xp_threshold AS currentRankXPThreshold
            FROM member m
            LEFT JOIN rank r ON m.rank_id = r.rank_id
            WHERE m.member_id = ?`;
        const [users] = await connection.execute(userSql, [userId]);
        if (users.length === 0) {
            await connection.rollback(); res.status(404).json({ message: 'User not found.' }); return;
        }
        const userProfile = users[0];
        const [nextRankRows] = await connection.execute(
            'SELECT xp_threshold FROM rank WHERE xp_threshold > ? ORDER BY xp_threshold ASC LIMIT 1',
            [userProfile.currentRankXPThreshold === null ? -1 : userProfile.currentRankXPThreshold] // Handle null currentRankXPThreshold (e.g. if rank 1 has no explicit threshold in some setups)
        );
        userProfile.nextRankXPThreshold = nextRankRows.length > 0 ? nextRankRows[0].xp_threshold : 'MAX';

        const partiesSql = `SELECT p.party_id, p.party_name, pm.role, p.leader_id AS party_leader_id FROM party_member pm JOIN party p ON pm.party_id = p.party_id WHERE pm.member_id = ? ORDER BY p.party_name ASC`;
        const [parties] = await connection.execute(partiesSql, [userId]);
        userProfile.parties = parties;
        const inventorySql = `SELECT i.item_id, i.name, i.rarity, i.value, i.item_condition, i.magical, i.image_url, mi.quantity FROM member_item mi JOIN item i ON mi.item_id = i.item_id WHERE mi.member_id = ? ORDER BY i.name ASC;`;
        const [inventoryItems] = await connection.execute(inventorySql, [userId]);
        userProfile.inventory = inventoryItems;
        const skillsSql = `SELECT s.skill_id, s.skill_name, s.skill_desc FROM member_skill ms JOIN skill s ON ms.skill_id = s.skill_id WHERE ms.member_id = ? ORDER BY s.skill_name ASC LIMIT 2;`;
        const [selected_skills] = await connection.execute(skillsSql, [userId]);
        userProfile.skills = selected_skills;
        await connection.commit();
        res.json(userProfile);
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Profile API error:', error);
        res.status(500).json({ message: 'Server error fetching profile.' });
    } finally {
        if (connection) connection.release();
    }
});

app.put('/api/profile/:userId/picture', async (req, res) => {
    const { userId } = req.params; const { profilePictureUrl } = req.body;
    if (!userId || isNaN(parseInt(userId))) { return res.status(400).json({ success: false, message: 'Valid User ID required.' }); }
    const newUrlToSave = (profilePictureUrl && String(profilePictureUrl).trim() !== "") ? String(profilePictureUrl).trim() : null;
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute("UPDATE `member` SET `profile_picture_url` = ? WHERE `member_id` = ?", [newUrlToSave, userId]);
        if (result.affectedRows === 0) { res.status(404).json({ success: false, message: 'User not found.' }); return; }
        res.json({ success: true, message: 'Profile picture updated!', profilePictureUrl: newUrlToSave });
    } catch (error) {
        console.error('Update Profile Picture API error:', error);
        res.status(500).json({ success: false, message: 'Server error updating profile picture.' });
    } finally {
        if (connection) connection.release();
    }
});

app.put('/api/member/:userId/skills', async (req, res) => {
    const { userId } = req.params;
    const { skill_ids } = req.body;
    if (isNaN(parseInt(userId))) { return res.status(400).json({ success: false, message: 'Valid User ID required.' }); }
    if (!Array.isArray(skill_ids) || skill_ids.length > 2 || skill_ids.some(id => isNaN(parseInt(id)))) {
        return res.status(400).json({ success: false, message: 'Valid array of up to 2 skill IDs required.' });
    }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        await connection.execute('DELETE FROM `member_skill` WHERE `member_id` = ?', [userId]);
        const insertedSkillsInfo = [];
        if (skill_ids.length > 0) {
            const insertSkillPromises = skill_ids.map(skillId => connection.execute('INSERT INTO `member_skill` (member_id, skill_id, proficiency_level, verification_date) VALUES (?, ?, NULL, CURDATE())', [userId, skillId]));
            await Promise.all(insertSkillPromises);
            const placeholders = skill_ids.map(() => '?').join(',');
            const [newlySelectedSkills] = await connection.execute(`SELECT skill_id, skill_name, skill_desc FROM skill WHERE skill_id IN (${placeholders}) ORDER BY skill_name ASC`, skill_ids);
            insertedSkillsInfo.push(...newlySelectedSkills);
        }
        await connection.commit();
        res.json({ success: true, message: 'Skills updated successfully!', updatedSkills: insertedSkillsInfo });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Update Member Skills API error:', error);
        res.status(500).json({ success: false, message: 'Server error updating skills. ' + (error.sqlMessage || error.message) });
    } finally {
        if (connection) connection.release();
    }
});


// --- Party Management Endpoints (Ensure robust connection handling) ---
// ... (GET /api/users, POST /api/parties, GET /api/parties, GET /api/parties/:partyId)
// ... (POST /api/parties/:partyId/join, POST /api/parties/:partyId/leave)
// ... (POST /api/parties/:partyId/members, DELETE /api/parties/:partyId/members/:memberIdToRemove)
// ... (DELETE /api/parties/:partyId, POST /api/parties/:partyId/transfer-leadership)
// Ensure each of these party endpoints correctly declares `let connection;` at the start of its
// async handler and uses `connection = await pool.getConnection();` inside the `try` block,
// and `if (connection) connection.release();` in a `finally` block.
// The previous full example you provided already had good structure for these.
// I've included them below with this structure ensured.

// GET /api/users
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
        res.json(users);
    } catch (error) {
        console.error('Get Users API error:', error);
        res.status(500).json({ message: 'Server error fetching users.' });
    } finally {
        if (connection) connection.release();
    }
});

// POST /api/parties
app.post('/api/parties', async (req, res) => {
    const { partyName, partyDescription, leader_id, additional_member_id, partyImageUrl } = req.body;
    if (!partyName || !leader_id || isNaN(parseInt(leader_id))) { return res.status(400).json({ message: 'Party name and valid leader ID are required.' }); }
    if (additional_member_id && (isNaN(parseInt(additional_member_id)) || parseInt(additional_member_id) === 0)) { return res.status(400).json({ message: 'Valid Additional Member ID is required if provided.' }); }
    if (additional_member_id && parseInt(additional_member_id) === parseInt(leader_id)) { return res.status(400).json({ message: 'Leader cannot be added as an additional member.' }); }
    
    let connection;
    try {
        connection = await pool.getConnection(); 
        await connection.beginTransaction();
        const [leaderExists] = await connection.execute("SELECT member_id FROM `member` WHERE `member_id` = ?", [leader_id]);
        if (leaderExists.length === 0) { await connection.rollback(); res.status(404).json({ message: 'Leader not found.' }); return; }
        
        if (additional_member_id) {
            const [additionalMemberExists] = await connection.execute("SELECT member_id FROM `member` WHERE `member_id` = ?", [additional_member_id]);
            if (additionalMemberExists.length === 0) { await connection.rollback(); res.status(404).json({ message: `Additional member ID ${additional_member_id} not found.` }); return; }
        }
        
        const formationDate = new Date().toISOString().slice(0, 10);
        const defaultPartyImage = "https://media.istockphoto.com/id/1399318216/vector/round-icon-spartan-helmet.jpg?s=612x612&w=0&k=20&c=PWKk1b8Xm7THDlgYS_9qyi3ShUxL3VGtaEVJK0wgGF0=";
        const sql = `INSERT INTO party (party_name, description, leader_id, formation_date, active_status, success_rate, max_members, image_url) VALUES (?, ?, ?, ?, 1, 0.0, 8, ?)`;
        const [partyResult] = await connection.execute(sql, [partyName, partyDescription || null, leader_id, formationDate, partyImageUrl || defaultPartyImage]);
        const newPartyId = partyResult.insertId;
        
        await connection.execute(`INSERT INTO party_member (party_id, member_id, join_date, role) VALUES (?, ?, ?, 'Leader')`, [newPartyId, leader_id, formationDate]);
        if (additional_member_id && parseInt(additional_member_id) !== parseInt(leader_id)) { // Ensure not adding leader again
             const [additionalMemberExists] = await connection.execute("SELECT member_id FROM `member` WHERE `member_id` = ?", [additional_member_id]); // Re-check existence if needed
             if (additionalMemberExists.length > 0) {
                await connection.execute(`INSERT INTO party_member (party_id, member_id, join_date, role) VALUES (?, ?, ?, 'Member')`, [newPartyId, additional_member_id, formationDate]);
             }
        }
        await connection.commit(); 
        res.status(201).json({ message: 'Party created successfully!', party_id: newPartyId });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Create Party API error:', error);
        res.status(500).json({ message: 'Server error during party creation. ' + error.message });
    } finally {
        if (connection) connection.release();
    }
});

// GET /api/parties
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
        res.json(parties);
    } catch (error) {
        console.error('Get All Parties API error:', error);
        res.status(500).json({ message: 'Server error fetching parties.' });
    } finally {
        if (connection) connection.release();
    }
});

// GET /api/parties/:partyId
app.get('/api/parties/:partyId', async (req, res) => {
    const { partyId } = req.params;
    if (isNaN(parseInt(partyId))) { return res.status(400).json({ message: 'Valid Party ID is required.' }); }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const partySql = "SELECT party_id, party_name, description, leader_id, formation_date, active_status, success_rate, max_members, image_url FROM `party` WHERE `party_id` = ?";
        const [partyRows] = await connection.execute(partySql, [partyId]);
        if (partyRows.length === 0) {
            await connection.rollback(); res.status(404).json({message: "Party not found"}); return;
        }
        const partyDetails = partyRows[0];
        const membersSql = `SELECT m.member_id, m.name, m.class, pm.role FROM party_member pm JOIN member m ON pm.member_id = m.member_id WHERE pm.party_id = ? ORDER BY FIELD(pm.role, 'Leader', 'Officer', 'Member'), m.name ASC`;
        const [members] = await connection.execute(membersSql, [partyId]);
        partyDetails.members = members;
        partyDetails.current_member_count = members.length;
        await connection.commit();
        res.json(partyDetails);
    } catch (error) {
        if (connection) await connection.rollback();
        console.error(`Get Party ${partyId} API error:`, error);
        res.status(500).json({ message: 'Server error fetching party details.' });
    } finally {
        if (connection) connection.release();
    }
});


// POST /api/parties/:partyId/join
app.post('/api/parties/:partyId/join', async (req, res) => {
    const { partyId } = req.params; const { member_id } = req.body;
    if (isNaN(parseInt(partyId)) || !member_id || isNaN(parseInt(member_id))) { return res.status(400).json({ message: 'Valid Party ID and Member ID are required.' }); }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT party_id, max_members FROM `party` WHERE `party_id` = ? AND active_status = 1", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); res.status(404).json({ message: 'Party not found or is not active.'}); return; }
        const party = partyRows[0];
        const [memberCountRows] = await connection.execute("SELECT COUNT(*) AS count FROM `party_member` WHERE `party_id` = ?", [partyId]);
        if (party.max_members && memberCountRows[0].count >= party.max_members) { await connection.rollback(); res.status(409).json({ message: 'Party is full.'}); return; }
        const [existingMembership] = await connection.execute("SELECT member_id FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, member_id]);
        if (existingMembership.length > 0) { await connection.rollback(); res.status(409).json({ message: 'You are already a member of this party.'}); return; }
        const joinDate = new Date().toISOString().slice(0, 10);
        await connection.execute("INSERT INTO `party_member` (party_id, member_id, join_date, role) VALUES (?, ?, ?, 'Member')", [partyId, member_id, joinDate]);
        await connection.commit();
        res.status(200).json({ success: true, message: 'Successfully joined the party!'});
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Join Party API error:', error);
        res.status(500).json({ message: 'Server error joining party.' });
    } finally {
        if (connection) connection.release();
    }
});

// POST /api/parties/:partyId/leave
app.post('/api/parties/:partyId/leave', async (req, res) => {
    const { partyId } = req.params; const { member_id } = req.body;
    if (isNaN(parseInt(partyId)) || !member_id || isNaN(parseInt(member_id))) { return res.status(400).json({ message: 'Valid Party ID and Member ID are required.' }); }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [partyInfo] = await connection.execute("SELECT leader_id FROM party WHERE party_id = ?", [partyId]);
        if (partyInfo.length === 0) { await connection.rollback(); res.status(404).json({ message: "Party not found." }); return; }
        const isLeader = parseInt(partyInfo[0].leader_id) === parseInt(member_id);
        if (isLeader) {
            const [memberCountResult] = await connection.execute("SELECT COUNT(*) AS count FROM party_member WHERE party_id = ?", [partyId]);
            if (memberCountResult[0].count > 1) { await connection.rollback(); res.status(400).json({ message: "Leader cannot leave with members remaining." }); return; }
        }
        const [result] = await connection.execute("DELETE FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, member_id]);
        if (result.affectedRows === 0) { await connection.rollback(); res.status(404).json({ message: "You are not a member of this party." }); return; }
        if (isLeader && result.affectedRows > 0) {
             await connection.execute("DELETE FROM party WHERE party_id = ?", [partyId]);
        }
        await connection.commit();
        res.status(200).json({ success: true, message: 'Successfully left the party.' });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Leave Party API error:', error);
        res.status(500).json({ message: 'Server error while leaving party.' });
    } finally {
        if (connection) connection.release();
    }
});


// POST /api/parties/:partyId/members (Add member)
app.post('/api/parties/:partyId/members', async (req, res) => {
    const { partyId } = req.params; const { leader_id, member_id_to_add } = req.body;
    if (isNaN(parseInt(partyId)) || !leader_id || isNaN(parseInt(leader_id)) || !member_id_to_add || isNaN(parseInt(member_id_to_add))) { return res.status(400).json({ message: 'Valid IDs are required.' }); }
    if (parseInt(leader_id) === parseInt(member_id_to_add)) { return res.status(400).json({ message: "Cannot add yourself again." });}
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id, max_members FROM `party` WHERE `party_id` = ? AND active_status = 1", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); res.status(404).json({ message: 'Party not found or inactive.' }); return; }
        const party = partyRows[0];
        if (parseInt(party.leader_id) !== parseInt(leader_id)) { await connection.rollback(); res.status(403).json({ message: 'Only leader can add members.' }); return; }
        const [memberToAddExists] = await connection.execute("SELECT member_id FROM `member` WHERE `member_id` = ?", [member_id_to_add]);
        if (memberToAddExists.length === 0) { await connection.rollback(); res.status(404).json({ message: `Member ID ${member_id_to_add} not found.` }); return; }
        const [memberCountRows] = await connection.execute("SELECT COUNT(*) AS count FROM `party_member` WHERE `party_id` = ?", [partyId]);
        if (party.max_members && memberCountRows[0].count >= party.max_members) { await connection.rollback(); res.status(409).json({ message: 'Party is full.' }); return; }
        const [existingMembership] = await connection.execute("SELECT member_id FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, member_id_to_add]);
        if (existingMembership.length > 0) { await connection.rollback(); res.status(409).json({ message: 'User is already in this party.' }); return; }
        const joinDate = new Date().toISOString().slice(0, 10);
        await connection.execute("INSERT INTO `party_member` (party_id, member_id, join_date, role) VALUES (?, ?, ?, 'Member')", [partyId, member_id_to_add, joinDate]);
        await connection.commit();
        res.status(200).json({ success: true, message: 'Member added successfully.' });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Add member API error:', error);
        res.status(500).json({ message: 'Server error adding member.' });
    } finally {
        if (connection) connection.release();
    }
});

// DELETE /api/parties/:partyId/members/:memberIdToRemove
app.delete('/api/parties/:partyId/members/:memberIdToRemove', async (req, res) => {
    const { partyId, memberIdToRemove } = req.params; const { leader_id } = req.body;
    if (isNaN(parseInt(partyId)) || isNaN(parseInt(memberIdToRemove)) || !leader_id || isNaN(parseInt(leader_id))) { return res.status(400).json({ message: 'Valid IDs required.' }); }
    if (parseInt(leader_id) === parseInt(memberIdToRemove)) { return res.status(400).json({ message: "Leader cannot remove themselves." }); }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); res.status(404).json({ message: 'Party not found.' }); return; }
        if (parseInt(partyRows[0].leader_id) !== parseInt(leader_id)) { await connection.rollback(); res.status(403).json({ message: 'Only leader can remove members.' }); return; }
        const [result] = await connection.execute("DELETE FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, memberIdToRemove]);
        if (result.affectedRows === 0) { await connection.rollback(); res.status(404).json({ message: 'Member not found in party.' }); return; }
        await connection.commit();
        res.status(200).json({ success: true, message: 'Member removed successfully.' });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Remove member API error:', error);
        res.status(500).json({ message: 'Server error removing member.' });
    } finally {
        if (connection) connection.release();
    }
});

// DELETE /api/parties/:partyId (Delete party)
app.delete('/api/parties/:partyId', async (req, res) => {
    const { partyId } = req.params; const { leader_id } = req.body;
    if (isNaN(parseInt(partyId)) || !leader_id || isNaN(parseInt(leader_id))) { return res.status(400).json({ message: 'Valid Party ID and authenticating Leader ID are required.' }); }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); res.status(404).json({ message: 'Party not found.' }); return; }
        if (parseInt(partyRows[0].leader_id) !== parseInt(leader_id)) { await connection.rollback(); res.status(403).json({ message: 'Only the party leader can delete the party.' }); return; }
        await connection.execute("DELETE FROM `party_member` WHERE `party_id` = ?", [partyId]);
        const [deletePartyResult] = await connection.execute("DELETE FROM `party` WHERE `party_id` = ?", [partyId]);
        if (deletePartyResult.affectedRows === 0) { await connection.rollback(); res.status(404).json({ message: 'Party could not be deleted.' }); return; }
        await connection.commit();
        res.status(200).json({ success: true, message: 'Party successfully deleted.' });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Delete Party API error:', error);
        res.status(500).json({ message: 'Server error deleting party.' });
    } finally {
        if (connection) connection.release();
    }
});

// POST /api/parties/:partyId/transfer-leadership
app.post('/api/parties/:partyId/transfer-leadership', async (req, res) => {
    const { partyId } = req.params; const { current_leader_id, new_leader_member_id } = req.body;
    if (isNaN(parseInt(partyId)) || !current_leader_id || isNaN(parseInt(current_leader_id)) || !new_leader_member_id || isNaN(parseInt(new_leader_member_id))) { return res.status(400).json({ message: 'Valid IDs required.' }); }
    if (parseInt(current_leader_id) === parseInt(new_leader_member_id)) { return res.status(400).json({ message: "Cannot transfer leadership to yourself." }); }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [partyRows] = await connection.execute("SELECT leader_id FROM `party` WHERE `party_id` = ?", [partyId]);
        if (partyRows.length === 0) { await connection.rollback(); res.status(404).json({ message: 'Party not found.' }); return; }
        if (parseInt(partyRows[0].leader_id) !== parseInt(current_leader_id)) { await connection.rollback(); res.status(403).json({ message: 'Only current leader can transfer leadership.' }); return; }
        const [newLeaderMembership] = await connection.execute("SELECT member_id FROM `party_member` WHERE `party_id` = ? AND `member_id` = ?", [partyId, new_leader_member_id]);
        if (newLeaderMembership.length === 0) { await connection.rollback(); res.status(404).json({ message: 'Selected user is not in this party.' }); return; }
        await connection.execute("UPDATE `party` SET `leader_id` = ? WHERE `party_id` = ?", [new_leader_member_id, partyId]);
        await connection.execute("UPDATE `party_member` SET `role` = 'Leader' WHERE `party_id` = ? AND `member_id` = ?", [partyId, new_leader_member_id]);
        await connection.execute("UPDATE `party_member` SET `role` = 'Member' WHERE `party_id` = ? AND `member_id` = ?", [partyId, current_leader_id]);
        await connection.commit();
        res.status(200).json({ success: true, message: 'Leadership transferred successfully.' });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Transfer Leadership API error:', error);
        res.status(500).json({ message: 'Server error transferring leadership.' });
    } finally {
        if (connection) connection.release();
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Adventurer's Guild API server running on http://localhost:${port}`);
});