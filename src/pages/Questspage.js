import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function QuestsPage(props) {
    const [input1, onChangeInput1] = useState(''); // For the newsletter input
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [message, setMessage] = useState(''); // For displaying success/error messages
    const [quests, setQuests] = useState([]); // State to hold ALL quests fetched from backend
    const [loadingQuests, setLoadingQuests] = useState(true);
    const [questsError, setQuestsError] = useState('');

    // NEW: State for filtering quests
    const [filterType, setFilterType] = useState('all'); // 'all', 'solo', 'party'

    // STATES for Party Quest Selection
    const [showPartySelectModal, setShowPartySelectModal] = useState(false);
    const [partiesLedByUser, setPartiesLedByUser] = useState([]);
    const [selectedPartyForQuest, setSelectedPartyForQuest] = useState(null);
    const [currentQuestToComplete, setCurrentQuestToComplete] = useState(null);

    const getMemberId = (user) => {
        return user?.member_id || user?.id || user?.userId;
    };

    useEffect(() => {
        const fetchQuests = async () => {
            setLoadingQuests(true);
            setQuestsError('');
            try {
                const response = await axios.get('http://localhost:3001/api/all-quests');
                setQuests(response.data);
            } catch (err) {
                console.error("Failed to fetch quests:", err);
                setQuestsError("Failed to load quests. " + (err.response?.data?.message || err.message));
            } finally {
                setLoadingQuests(false);
            }
        };

        const userString = localStorage.getItem('loggedInUser');
        if (userString) {
            try {
                const user = JSON.parse(userString);
                setLoggedInUser(user);
            } catch (e) {
                console.error("Error parsing loggedInUser from localStorage:", e);
                localStorage.removeItem('loggedInUser');
            }
        }
        fetchQuests();
    }, []);

    useEffect(() => {
        const fetchLeaderParties = async () => {
            if (loggedInUser) {
                const memberId = getMemberId(loggedInUser);
                if (memberId) {
                    try {
                        const response = await axios.get(`http://localhost:3001/api/member/${memberId}/parties/leader`);
                        setPartiesLedByUser(response.data);
                    } catch (err) {
                        console.error("Failed to fetch parties led by user:", err);
                        setMessage("Failed to load your parties. " + (err.response?.data?.message || err.message));
                    }
                }
            } else {
                setPartiesLedByUser([]);
            }
        };
        fetchLeaderParties();
    }, [loggedInUser]);

    const handleQuestCompletion = async (quest, type) => {
        if (!loggedInUser) {
            setMessage("You must be logged in to complete quests.");
            navigate("/login");
            return;
        }
        const memberId = getMemberId(loggedInUser);
        if (!memberId) {
            setMessage("Could not identify your member ID. Please log in again.");
            navigate("/login");
            return;
        }
        if (quest.quest_type !== type) {
            setMessage(`Error: This is a ${quest.quest_type} quest, not a ${type} quest.`);
            return;
        }

        if (type === 'solo') {
            const confirmUser = window.confirm(`Complete "${quest.title}" as a Solo Quest? Rewards will be added to your personal inventory.`);
            if (!confirmUser) return;
            setMessage("Completing solo quest...");
            try {
                const response = await axios.post('http://localhost:3001/api/quests/complete-solo', {
                    quest_id: quest.quest_id,
                    member_id: memberId,
                });
                setMessage(response.data.message);
                // Optimistically update UI or re-fetch quests
                setQuests(prevQuests => prevQuests.map(q => q.quest_id === quest.quest_id ? {...q, completed: 1} : q));
            } catch (err) {
                console.error(`Failed to complete solo quest:`, err);
                setMessage(`Failed to complete quest: ${err.response?.data?.message || err.message}`);
            }
        } else { // type === 'party'
            setCurrentQuestToComplete(quest);
            setShowPartySelectModal(true);
        }
    };

    const confirmPartyQuestCompletion = async () => {
        if (!loggedInUser || !currentQuestToComplete || !selectedPartyForQuest) {
            setMessage("Error: Missing data for party quest completion.");
            setShowPartySelectModal(false);
            return;
        }
        const memberId = getMemberId(loggedInUser);
        const quest = currentQuestToComplete;
        const partyId = selectedPartyForQuest.party_id;

        const confirmUser = window.confirm(`Confirm completing "${quest.title}" with party "${selectedPartyForQuest.party_name}"? Rewards will be distributed among party members.`);
        if (!confirmUser) {
            setShowPartySelectModal(false);
            return;
        }

        setMessage(`Completing party quest "${quest.title}" with "${selectedPartyForQuest.party_name}"...`);
        try {
            const response = await axios.post('http://localhost:3001/api/quests/complete-party', {
                quest_id: quest.quest_id,
                member_id: memberId,
                party_id: partyId,
            });
            setMessage(response.data.message);
            // Optimistically update UI or re-fetch quests
            setQuests(prevQuests => prevQuests.map(q => q.quest_id === quest.quest_id ? {...q, completed: 1} : q));
        } catch (err) {
            console.error(`Failed to complete party quest:`, err);
            setMessage(`Failed to complete quest: ${err.response?.data?.message || err.message}`);
        } finally {
            setShowPartySelectModal(false);
            setCurrentQuestToComplete(null);
            setSelectedPartyForQuest(null);
        }
    };

    if (loadingQuests) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#F6F6F6' }}>
                <p style={{ fontSize: '20px', color: '#3C2A21' }}>Loading quests...</p>
            </div>
        );
    }

    // NEW: Filter logic for quests to display
    const uncompletedQuests = quests.filter(quest => quest.completed === 0 || quest.completed === false); // Handle boolean false too
    
    const questsToDisplay = uncompletedQuests.filter(quest => {
        if (filterType === 'all') {
            return true; // Already filtered for uncompleted
        }
        return quest.quest_type === filterType;
    });

    const filterButtonStyles = (type) => ({
        padding: '10px 20px',
        margin: '0 10px',
        cursor: 'pointer',
        border: '1px solid #3C2A21',
        borderRadius: '20px',
        background: filterType === type ? '#3C2A21' : '#FFF',
        color: filterType === type ? '#FFF' : '#3C2A21',
        fontWeight: filterType === type ? 'bold' : 'normal',
        fontSize: '16px'
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", background: "#FFFFFF" }}>
            <div style={{ minHeight: "100vh", alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", background: "#F6F6F6", padding: "0 20px 20px 20px" }}>
                {/* Header Navigation Section */}
                <div style={{ width: '100%', maxWidth: '1200px', display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", marginBottom: 30, borderBottom: "1px solid #ddd", background: "#FFFFFF", paddingLeft: "20px", paddingRight: "20px", boxSizing: 'border-box' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap" }}>
                        <Link to="/joinparty" style={{ textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500 }}>PARTY</Link>
                        <Link to="/quests" style={{ textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500 }}>QUESTS</Link>
                        <Link to="/vault" style={{ textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500 }}>VAULT</Link>
                        <Link to="/inventory" style={{ textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500 }}>INVENTORY</Link>
                        <Link to="/news" style={{ textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500 }}>NEWS</Link>
                    </div>
                    <Link to="/MainSI" style={{ flexGrow: 1, textAlign: 'center', margin: '0 20px' }}>
                        <img alt="Guild Home" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/2lvzpgcl_expires_30_days.png"} style={{ width: 70, height: 70, objectFit: "fill", display: 'inline-block' }} />
                    </Link>
                    <button onClick={() => navigate("/profile")} style={{ background: "#3C2A21", color: "white", border: 'none', padding: '12px 25px', borderRadius: 50, cursor: 'pointer', fontSize: 16, fontWeight: 500 }}>Profile</button>
                </div>

                <span style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", fontSize: 100, marginBottom: 20, textAlign: 'center', width: '100%', maxWidth: '1200px' }}>
                    {"Quest Board"}
                </span>

                {/* NEW: Filter Buttons */}
                <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button style={filterButtonStyles('all')} onClick={() => setFilterType('all')}>All Quests</button>
                    <button style={filterButtonStyles('solo')} onClick={() => setFilterType('solo')}>Solo Quests</button>
                    <button style={filterButtonStyles('party')} onClick={() => setFilterType('party')}>Party Quests</button>
                </div>

                {message && <p style={{ color: message.startsWith('Failed') || message.startsWith('Error:') ? 'red' : 'green', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>{message}</p>}
                {questsError && <p style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{questsError}</p>}

                {/* Dynamic Quest List - uses questsToDisplay */}
                <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '60px', padding: '0 20px', boxSizing: 'border-box' }}>
                    {questsToDisplay.length > 0 ? (
                        questsToDisplay.map((quest) => (
                            // quest.completed is already filtered by questsToDisplay
                            <div key={quest.quest_id} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 0, gap: '20px', flexWrap: 'wrap', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                                <div style={{ flex: 1, minWidth: '300px', maxWidth: '400px' }}> {/* Image column */}
                                    <img
                                        src={quest.quest_image_url || 'https://via.placeholder.com/400x300?text=Quest+Image'} // Fallback image
                                        alt={quest.title}
                                        style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: "cover", borderRadius: 8 }}
                                    />
                                </div>
                                {quest.required_skills && quest.required_skills.length > 0 && (
    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #ccc' }}>
        <p style={{ color: "#c0392b", fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>
            Required Skill(s):
        </p>
        <ul style={{ listStyleType: 'disc', marginLeft: '20px', paddingLeft: 0, fontSize: 14 }}>
            {quest.required_skills.map(skill => (
                <li key={skill.skill_id} style={{ color: '#7f8c8d' }}>
                    {skill.skill_name}
                    {skill.skill_desc && <span style={{fontStyle: 'italic'}}> ({skill.skill_desc})</span>}
                </li>
            ))}
        </ul>
    </div>
)}
                                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '300px' }}> {/* Text content column */}
                                    <h3 style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", fontSize: 36, marginBottom: 10, marginTop: 0 }}>
                                        {quest.title}
                                    </h3>
                                    <p style={{ color: "#555", fontSize: 14, marginBottom: 5, fontStyle: 'italic' }}>
                                        Type: {quest.quest_type ? quest.quest_type.charAt(0).toUpperCase() + quest.quest_type.slice(1) : 'N/A'}
                                    </p>
                                    <p style={{ color: "#1A120B", fontSize: 16, marginBottom: 10 }}>
                                        Rank: {quest.difficulty_rating} | Deadline: {quest.deadline ? new Date(quest.deadline).toLocaleDateString() : 'N/A'}
                                    </p>
                                    <p style={{ color: "#1A120B", fontSize: 16, lineHeight: 1.5, marginBottom: 20, whiteSpace: 'pre-wrap' }}>
                                        {quest.description}
                                    </p>
                                    <span style={{ color: "#1A120B", fontSize: 16, marginBottom: 20, fontWeight: 'bold' }}>
                                        Reward: {quest.reward_quantity}x {quest.reward_item_name || `Item ID ${quest.reward_item_id}`}<p>XP Reward: {quest.xp_reward || 0}<br></br>Gold Reward: {quest.gold_reward || 0}</p>
                                    </span>
                                    <div style={{ display: "flex", gap: "15px", flexWrap: 'wrap', marginTop: 'auto' }}>
                                        {quest.quest_type === 'solo' && (
                                            <button
                                                style={{ background: "#B6B6B6", color: "#1A120B", borderRadius: 50, border: "none", padding: "12px 30px", cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
                                                onClick={() => handleQuestCompletion(quest, 'solo')}>
                                                Complete Solo Quest
                                            </button>
                                        )}
                                        {quest.quest_type === 'party' && (
                                            <button
                                                style={{ background: "#D5CEA3", color: "#1A120B", borderRadius: 50, border: "none", padding: "12px 30px", cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
                                                onClick={() => handleQuestCompletion(quest, 'party')}>
                                                Complete Party Quest
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', fontSize: 18, color: '#555', marginTop: '30px' }}>
                            {filterType === 'all' && !questsError ? 'No active quests available at the moment. Check back later!' :
                             !questsError ? `No active ${filterType} quests found.` : ''}
                        </p>
                    )}
                </div>

                <div style={{ height: 1, width: 'calc(100% - 80px)', maxWidth: '1200px', background: "#1A120B", marginTop: 60, marginBottom: 60 }} />

                {/* Footer Section */}
                <div style={{ width: "100%", maxWidth: '1800px', padding: "20px 40px", boxSizing: "border-box", marginTop: "auto", background: "#FFFFFF", borderTop: "1px solid #E0E0E0" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "40px", justifyContent: "space-around", padding: "30px 0" }}>
                        <span style={{ color: "#1A120B", fontSize: 32, fontWeight: "bold", flexBasis: '100%', textAlign: 'center', marginBottom: 20 }} >ADVENTURER’S GUILD</span>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                             {["HOME", "PARTY", "QUESTS", "VAULT", "CONTACT"].map(item => (
                                <Link key={item} to={item === "HOME" ? "/mainSI" : `/${item.toLowerCase()}`} style={{textDecoration: 'none', color: '#1A120B', fontSize: 18, marginBottom: 8, fontWeight: 500}}>{item}</Link>
                            ))}
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: "280px", maxWidth: '400px' }}>
                            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: 15 }}>
                                <span style={{ color: "#1A120B", fontSize: 24, fontWeight: "bold", marginRight: 10 }} > SIGN UP </span>
                                <span style={{ color: "#1A120B", fontSize: 24, fontWeight: "bold", marginRight: 10 }} > TO OUR </span>
                                <span style={{ color: "#1A120B", fontSize: 24, fontWeight: "bold" }} > NEWSLETTER </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", background: "#E5E5CB", borderRadius: 50, paddingRight: 10 }}>
                                <input placeholder={"YOUR EMAIL"} type="email" value={input1} onChange={(event) => onChangeInput1(event.target.value)} style={{ color: "#1A120B", fontSize: 16, flex: 1, background: "none", border: "none", padding: "15px 0px 15px 25px", boxSizing: "border-box", outline: "none" }} />
                                <img alt="Submit Newsletter" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/axua6xtv_expires_30_days.png"} style={{ width: 40, height: 40, objectFit: "fill", cursor: "pointer" }} onClick={() => alert("Newsletter signup for: " + input1)} />
                            </div>
                        </div>
                    </div>
                    <img alt="Footer banner" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/xhxsa3jd_expires_30_days.png"} style={{ height: "auto", maxHeight: 200, margin: "30px auto", display: 'block', width: "100%", maxWidth: "1200px", objectFit: "cover" }} />
                    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "20px", paddingBottom: "20px", justifyContent: "space-between", fontSize: 12, color: "#1A120B" }}>
                        <span>© ADVENTURER’S GUILD/ALL RIGHTS RESERVED</span>
                        <span>TERMS AND CONDITIONS</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <span>FACEBOOK</span>
                            <span>INSTAGRAM</span>
                        </div>
                    </div>
                </div>

                {/* Party Selection Modal */}
                {showPartySelectModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                        <div style={{ background: '#FFF', padding: '30px', borderRadius: '10px', width: '90%', maxWidth: '500px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
                            <h2 style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", marginBottom: '20px' }}>
                                Select Party for "{currentQuestToComplete?.title}"
                            </h2>
                            {partiesLedByUser.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '300px', overflowY: 'auto' }}>
                                    {partiesLedByUser.map(party => (
                                        <button
                                            key={party.party_id}
                                            onClick={() => setSelectedPartyForQuest(party)}
                                            style={{ padding: '12px 20px', border: '1px solid #3C2A21', borderRadius: '5px', background: selectedPartyForQuest?.party_id === party.party_id ? '#D5CEA3' : '#F6F6F6', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', color: '#1A120B' }}
                                        >
                                            {party.party_name}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#555', marginBottom: '20px' }}>You are not the leader of any active parties. You must be a party leader to clear party quests.</p>
                            )}
                            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-around', gap: '10px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={confirmPartyQuestCompletion}
                                    disabled={!selectedPartyForQuest || partiesLedByUser.length === 0}
                                    style={{ padding: '12px 25px', background: (selectedPartyForQuest && partiesLedByUser.length > 0) ? '#3C2A21' : '#B6B6B6', color: '#FFF', border: 'none', borderRadius: '50px', cursor: (selectedPartyForQuest && partiesLedByUser.length > 0) ? 'pointer' : 'not-allowed', fontSize: '16px', fontWeight: 'bold' }}
                                >
                                    Clear Quest with Selected Party
                                </button>
                                <button
                                    onClick={() => { setShowPartySelectModal(false); setCurrentQuestToComplete(null); setSelectedPartyForQuest(null); }}
                                    style={{ padding: '12px 25px', background: '#B6B6B6', color: '#1A120B', border: 'none', borderRadius: '50px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}