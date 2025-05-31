import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

// Simple Modal Component (can be in a separate file)
const Modal = ({ children, onClose, title }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '500px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>{title}</h3>
                <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#555' }}>&times;</button>
            </div>
            {children}
        </div>
    </div>
);

export default function ProfilePage(props) {
    const [newsletterEmailInput, onChangeNewsletterEmailInput] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [depositQuantities, setDepositQuantities] = useState({});
    const navigate = useNavigate();

    const [allSkills, setAllSkills] = useState([]);
    const [selectedSkillIds, setSelectedSkillIds] = useState([]);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [tempSelectedSkillIds, setTempSelectedSkillIds] = useState([]);

    const defaultProfilePic = "https://media.istockphoto.com/id/1399318216/vector/round-icon-spartan-helmet.jpg?s=612x612&w=0&k=20&c=PWKk1b8Xm7THDlgYS_9qyi3ShUxL3VGtaEVJK0wgGF0=";
    const DEFAULT_ITEM_IMAGE = "https://placehold.co/100x100/cccccc/333333?text=Item";

    const getMemberId = (user) => user?.member_id || user?.id || user?.userId;

    const fetchUserProfile = useCallback(async () => {
        // setLoading(true); // setLoading is already managed before calling this in useEffect or explicitly
        setError('');
        try {
            const storedUserString = localStorage.getItem('loggedInUser');
            let userIdToFetch = null;
            if (storedUserString) {
                try {
                    const parsedUser = JSON.parse(storedUserString);
                    userIdToFetch = getMemberId(parsedUser);
                } catch (e) {
                    console.error("Failed to parse stored user data:", e);
                    setError('Invalid user session data. Please login again.');
                    localStorage.removeItem('loggedInUser');
                    setLoading(false);
                    navigate("/login");
                    return;
                }
            }
            if (!userIdToFetch) {
                setError('No user logged in. Please login.');
                setLoading(false);
                navigate("/login");
                return;
            }

            const response = await axios.get(`http://localhost:3001/api/profile/${userIdToFetch}`);
            console.log("Profile data from API:", response.data); // Keep this for debugging
            setUserData(response.data);

            if (response.data.skills && Array.isArray(response.data.skills)) {
                setSelectedSkillIds(response.data.skills.map(skill => skill.skill_id));
            } else {
                setSelectedSkillIds([]);
            }

            const initialQuantities = {};
            (response.data.inventory || []).forEach(item => {
                initialQuantities[item.item_id] = item.quantity > 0 ? 1 : 0;
            });
            setDepositQuantities(initialQuantities);

        } catch (err) {
            console.error('Failed to fetch user profile:', err);
            if (err.response && (err.response.status === 401 || err.response.status === 404)) {
                setError('Session invalid or user not found. Please login again.');
                localStorage.removeItem('loggedInUser');
            } else {
                setError('Failed to load profile. Please try again later.');
            }
        } finally {
            setLoading(false); // Ensure loading is set to false in all cases
        }
    }, [navigate]);

    const fetchAllSkills = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/skills');
            setAllSkills(response.data || []);
        } catch (err) {
            console.error('Failed to fetch all skills:', err);
        }
    }, []);

    useEffect(() => {
        setLoading(true); // Set loading true at the beginning of data fetching sequence
        Promise.all([fetchUserProfile(), fetchAllSkills()])
            .catch(e => console.error("Error during initial data fetch:", e)) // Catch errors from Promise.all if any
            .finally(() => {
                 // setLoading(false); // setLoading is handled within fetchUserProfile now
            });
    }, [fetchUserProfile, fetchAllSkills]);


    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setUserData(null); // Clear user data on logout
        navigate("/login");
    };

    const handleChangeProfilePicture = async () => {
        const currentUserId = getMemberId(userData);
        if (!currentUserId) { alert("User data not loaded."); return; }
        const newProfilePicUrlPrompt = window.prompt("Enter new image URL (leave blank to remove):");
        if (newProfilePicUrlPrompt === null) return;
        const urlToSend = newProfilePicUrlPrompt.trim() === "" ? null : newProfilePicUrlPrompt.trim();
        try {
            const response = await axios.put(`http://localhost:3001/api/profile/${currentUserId}/picture`, { profilePictureUrl: urlToSend });
            if (response.data?.success) {
                alert("Profile picture updated!");
                setUserData(prev => ({ ...prev, profile_picture_url: response.data.profilePictureUrl }));
            } else {
                alert(response.data.message || "Failed to update.");
            }
        } catch (err) {
            alert(`Error: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleDepositQuantityChange = (itemId, value) => {
        const newQuantity = Math.max(1, parseInt(value, 10) || 1);
        const itemInInventory = userData.inventory.find(invItem => invItem.item_id === itemId);
        if (itemInInventory && newQuantity > itemInInventory.quantity) {
            alert(`Cannot set deposit quantity higher than available: ${itemInInventory.quantity}`);
            setDepositQuantities(prev => ({ ...prev, [itemId]: itemInInventory.quantity }));
        } else {
            setDepositQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
        }
    };

    const handleDepositItem = async (item) => {
        const memberId = getMemberId(userData);
        if (!memberId) { alert("Not logged in."); navigate("/login"); return; }
        const quantityToDeposit = depositQuantities[item.item_id];
        if (!quantityToDeposit || quantityToDeposit <= 0 || quantityToDeposit > item.quantity) {
            alert("Invalid quantity or exceeds available amount.");
            return;
        }
        if (!window.confirm(`Deposit ${quantityToDeposit} of ${item.name}?`)) return;
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:3001/api/vault/deposit`, { item_id: item.item_id, member_id: memberId, quantity: quantityToDeposit });
            alert(response.data.message);
            fetchUserProfile(); // Re-fetch to update inventory and potentially gold/XP if vault actions give them
        } catch (err) {
            alert(`Failed: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditSkills = () => {
        setTempSelectedSkillIds([...selectedSkillIds]);
        setIsEditingSkills(true);
    };

    const handleSkillSelectionChange = (skillId) => {
        setTempSelectedSkillIds(prev => {
            const newSelected = prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId];
            if (newSelected.length > 2) {
                alert("Max 2 skills.");
                return prev; // Revert to previous selection
            }
            return newSelected;
        });
    };

    const handleSaveSkills = async () => {
        const currentUserId = getMemberId(userData);
        if (!currentUserId) { alert("User not identified."); return; }
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:3001/api/member/${currentUserId}/skills`, { skill_ids: tempSelectedSkillIds });
            if (response.data.success) {
                alert("Skills updated!");
                setSelectedSkillIds([...tempSelectedSkillIds]);
                setUserData(prev => ({ ...prev, skills: response.data.updatedSkills || allSkills.filter(s => tempSelectedSkillIds.includes(s.skill_id)) }));
                setIsEditingSkills(false);
            } else {
                alert(response.data.message || "Failed to update.");
            }
        } catch (err) {
            alert(`Error: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !isEditingSkills) {
        return <div style={{ padding: '50px', textAlign: 'center', fontSize: '20px' }}>Loading profile...</div>;
    }
    if (error) {
        return <div style={{ padding: '50px', textAlign: 'center', fontSize: '20px', color: 'red' }}>{error}<button onClick={() => navigate("/login")} style={{ display: 'block', margin: '20px auto', padding: '10px 20px' }}>Go to Login</button></div>;
    }
    if (!userData) {
        return <div style={{ padding: '50px', textAlign: 'center', fontSize: '20px' }}>No user data available. Please try logging in again.</div>;
    }

    const {
        name = "N/A",
        email = "N/A",
        class: userClass = "N/A",
        profile_picture_url,
        parties = [],
        inventory = [],
        // NEW: Destructure rank, gold, and XP data from userData
        gold,
        current_xp,
        current_rank_name,
        currentRankXPThreshold, // XP needed to achieve the current rank
        nextRankXPThreshold     // XP needed to achieve the next rank (could be null/MAX if highest)
    } = userData;

    const displaySkills = allSkills.filter(skill => selectedSkillIds.includes(skill.skill_id));
    const displayProfilePic = (profile_picture_url && profile_picture_url.trim() !== "") ? profile_picture_url : defaultProfilePic;

    // --- NEW: XP Progress Calculation ---
    let progressPercent = 0;
    let xpProgressText = `${current_xp || 0} XP`;
    let currentRankMinXP = currentRankXPThreshold !== undefined ? currentRankXPThreshold : 0;
    let nextRankMinXP = nextRankXPThreshold;

    if (nextRankMinXP !== undefined && nextRankMinXP !== null && nextRankMinXP !== 'MAX') {
        const rangeTotal = nextRankMinXP - currentRankMinXP;
        const earnedInRank = (current_xp || 0) - currentRankMinXP;
        if (rangeTotal > 0) {
            progressPercent = Math.max(0, Math.min(100, (earnedInRank / rangeTotal) * 100));
            xpProgressText = `${earnedInRank} / ${rangeTotal} XP`;
        } else if (current_xp >= currentRankMinXP) { // At a rank, but next rank might be same threshold (e.g. max rank)
            progressPercent = 100; // Show as full if effectively at or beyond current tier for display
            xpProgressText = `${current_xp || 0} XP (Max for current tier or error in range)`;
        }
    } else if (nextRankXPThreshold === 'MAX' || (nextRankXPThreshold === null && current_rank_name)) { // Max rank indication
        progressPercent = 100;
        xpProgressText = `${current_xp || 0} XP (Max Rank Reached!)`;
    }


    return (
        <div style={{ display: "flex", flexDirection: "column", background: "#FFFFFF" }}>
            <div style={{ minHeight: "100vh", alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", background: "#F6F6F6" }}>
                {/* Header Navigation */}
                <div style={{ alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", boxSizing: "border-box", flexWrap: "wrap", background: "#FFFFFF", borderBottom: "1px solid #E0E0E0" }}>
                    <div style={{display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap"}}>
                        {["Join Party", "Quests", "Vault", "Inventory", "NEWS"].map(item => (
                             <Link key={item} to={`/${item.toLowerCase().replace(' ', '')}`} style={{ textDecoration: 'none' }}>
                                 <span style={{ color: "#1A120B", fontSize: 16, cursor: 'pointer', fontWeight: 500 }}>{item.toUpperCase()}</span>
                             </Link>
                        ))}
                    </div>
                    <Link to="/MainSI" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                        <img alt="Guild Home" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/2lvzpgcl_expires_30_days.png"} style={{ width: 70, height: 70, objectFit: "fill" }} />
                    </Link>
                    <button style={{ background: "#3C2A21", color: "#F6F6F6", fontSize: 16, borderRadius: 50, border: "none", padding: "12px 28px", cursor: 'pointer', fontWeight: 500 }} onClick={handleLogout}>
                        {"Logout"}
                    </button>
                </div>

                {/* Profile Content */}
                <div style={{width: '100%', padding: '40px', boxSizing: 'border-box'}}>
                    <span style={{ fontFamily: "'Times New Roman', Times, serif", color: "#1A120B", fontSize: 80, marginBottom: 40, display: 'block' }} >
                        My Account
                    </span>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", marginBottom: 50, gap: "40px" }}>
                        <div style={{textAlign: 'center', cursor: 'pointer'}} onClick={handleChangeProfilePicture} title="Click to change profile picture">
                            <img alt="Profile" src={displayProfilePic} style={{ width: 250, height: 250, objectFit: "cover", borderRadius: "50%", marginBottom: 15, border: "3px solid #3C2A21", transition: 'opacity 0.3s ease-in-out' }} onMouseOver={(e) => e.currentTarget.style.opacity = 0.7} onMouseOut={(e) => e.currentTarget.style.opacity = 1} />
                            <p style={{fontSize: 12, color: '#555'}}>(Click image to change)</p>
                        </div>

                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: '300px' }}>
                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 10, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >Account Info</h2>
                            {[{label: "Name", value: name}, {label: "Email", value: email}, {label: "Class", value: userClass}].map(info => (
                                <div key={info.label} style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 12, fontSize: 17, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                    <span style={{ color: "#3C2A21", fontWeight: "bold" }} > {info.label}: </span>
                                    <span style={{ color: "#1A120B", textAlign: 'right' }} > {info.value} </span>
                                </div>
                            ))}

                            {/* --- NEW: Rank and Gold Display --- */}
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 12, fontSize: 17, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                <span style={{ color: "#3C2A21", fontWeight: "bold" }} > Rank: </span>
                                <span style={{ color: "#1A120B", textAlign: 'right' }} > {current_rank_name || 'N/A'} </span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 12, fontSize: 17, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                <span style={{ color: "#3C2A21", fontWeight: "bold" }} > Gold: </span>
                                <span style={{ color: "#D4AF37", textAlign: 'right', fontWeight: 'bold' }} > {gold !== undefined ? gold : 'N/A'} G</span>
                            </div>

                            {/* --- NEW: XP Progress Bar/Gauge --- */}
                            <div style={{ width: "100%", marginBottom: 25, marginTop:10 }}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                                    <span style={{ color: "#3C2A21", fontWeight: "bold", fontSize: 17 }}>XP Progress:</span>
                                    <span style={{ color: "#1A120B", fontSize: 15 }}>{xpProgressText}</span>
                                </div>
                                <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '24px', padding: '2px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}>
                                    <div style={{
                                        width: `${progressPercent}%`,
                                        backgroundColor: '#4CAF50', // Green color for progress
                                        height: '20px',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        color: 'white',
                                        lineHeight: '20px',
                                        fontWeight: 'bold',
                                        transition: 'width 0.5s ease-in-out'
                                    }}>
                                        {Math.round(progressPercent)}%
                                    </div>
                                </div>
                            </div>


                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 15, marginTop: 30, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >Your Parties</h2>
                            {/* ... (Parties display remains the same) ... */}
                             {parties.length > 0 ? (
                                <ul style={{ listStyleType: 'none', paddingLeft: 0, width: '100%' }}>
                                    {parties.map(party => (
                                        <li key={party.party_id} style={{ marginBottom: 10, padding: '8px 0', borderBottom: '1px solid #E0E0E0', fontSize: 16 }}>
                                            <Link to={`/joinparty/${party.party_id}`} style={{textDecoration: 'none', color: '#3C2A21', fontWeight: 'bold'}}>{party.party_name}</Link> - Role: {party.role}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{fontSize: 16, color: '#555'}}>You are not currently a member of any party. <Link to="/joinparty" style={{color: "#3C2A21"}}>View available parties</Link>.</p>
                            )}


                            {/* --- Skills Section (remains the same from previous update) --- */}
                            <div style={{ width: "100%", marginTop: 30 }}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #3C2A21', paddingBottom: 10, marginBottom: 15 }}>
                                    <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", margin: 0 }} >Selected Skills</h2>
                                    <button onClick={handleEditSkills} style={{padding: '6px 12px', fontSize: '14px', background: '#5cb85c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Edit Skills</button>
                                </div>
                                {displaySkills.length > 0 ? (
                                    displaySkills.map(skill => (
                                        <div key={skill.skill_id} style={{ marginBottom: 8, fontSize: 17, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                            <span style={{ color: "#3C2A21", fontWeight: "bold" }}>{skill.skill_name}</span>
                                            {skill.skill_desc && <span style={{ color: "#555", display: 'block', fontSize: '14px', marginTop: '4px' }}>{skill.skill_desc}</span>}
                                        </div>
                                    ))
                                ) : (
                                    <p style={{fontSize: 16, color: '#555'}}>No skills selected. Click "Edit Skills" to choose up to 2 skills.</p>
                                )}
                            </div>


                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 20, marginTop: 30, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >Inventory</h2>
                            {/* ... (Inventory display remains the same) ... */}
                             {inventory.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px', width: '100%' }}>
                                    {inventory.map(item => (
                                        <div key={item.item_id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 10, background: '#f9f9f9', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                            <img src={item.image_url || DEFAULT_ITEM_IMAGE} alt={item.name} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 4, marginBottom: 5 }} onError={(e) => { e.target.onerror = null; e.target.src=DEFAULT_ITEM_IMAGE; }}/>
                                            <h4 style={{ fontSize: 14, color: '#1A120B', margin: '0 0 3px 0' }}>{item.name}</h4>
                                            <p style={{ fontSize: 12, color: '#555', margin: '0 0 3px 0' }}>Rarity: {item.rarity || 'N/A'}</p>
                                            <p style={{ fontSize: 12, color: '#555', margin: '0 0 5px 0' }}>Value: {item.value || 0} Gold</p>
                                            <p style={{ fontSize: 13, color: '#1A120B', margin: '0', fontWeight: 'bold' }}>Your Qty: {item.quantity || 0}</p>
                                            <div style={{ marginBottom: 10, marginTop: 5}}>
                                                <label htmlFor={`deposit-qty-${item.item_id}`} style={{fontSize: 12, color: '#555', display: 'block', marginBottom: 3}}>Deposit Qty:</label>
                                                <input id={`deposit-qty-${item.item_id}`} type="number" min="1" max={item.quantity} value={depositQuantities[item.item_id] || 1} onChange={(e) => handleDepositQuantityChange(item.item_id, e.target.value)} style={{ width: '60px', padding: '3px', borderRadius: '3px', border: '1px solid #ccc', textAlign: 'center', fontSize: '12px' }} />
                                            </div>
                                            <button onClick={() => handleDepositItem(item)} style={{ background: "#f0ad4e", color: "white", border: 'none', padding: '6px 12px', borderRadius: 15, cursor: 'pointer', fontSize: 12, opacity: (item.quantity <= 0 || !depositQuantities[item.item_id] || depositQuantities[item.item_id] > item.quantity) ? 0.6 : 1 }} disabled={item.quantity <= 0 || !depositQuantities[item.item_id] || depositQuantities[item.item_id] > item.quantity}>
                                                Deposit
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{fontSize: 16, color: '#555'}}>Your inventory is currently empty. Visit the <Link to="/vault" style={{color: "#3C2A21"}}>Guild Vault</Link> to withdraw items.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div style={{ width: "100%", padding: "20px 40px", boxSizing: "border-box", marginTop: "auto", background: "#3C2A21", color: "#F6F6F6" }}>
                    {/* Footer content remains the same... */}
                     <div style={{display: "flex", alignItems: "center", flexWrap: "wrap", gap: "40px", marginBottom: 20, justifyContent: "space-around"}}>
                         <span style={{ fontSize: 24, fontWeight: "bold" }}>ADVENTURER’S GUILD</span>
                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                             {["HOME", "PARTY", "QUESTS", "VAULT", "CONTACT"].map(item => (
                                 <Link key={item} to={`/${item.toLowerCase()}`} style={{textDecoration: 'none', color: '#F0EAD6', fontSize: 16, marginBottom: 5, fontWeight: 500}}>{item}</Link>
                             ))}
                         </div>
                         <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: "280px", maxWidth: '400px' }}>
                             <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: 15 }}>
                                 <span style={{ fontSize: 20, fontWeight: "bold", marginRight: 10 }} > SIGN UP </span>
                                 <span style={{ fontSize: 20, fontWeight: "bold", marginRight: 10 }} > TO OUR </span>
                                 <span style={{ fontSize: 20, fontWeight: "bold" }} > NEWSLETTER </span>
                             </div>
                             <div style={{ display: "flex", alignItems: "center", background: "#E5E5CB", borderRadius: 50, paddingRight: 10 }}>
                                 <input placeholder={"YOUR EMAIL"} type="email" value={newsletterEmailInput} onChange={(event)=>onChangeNewsletterEmailInput(event.target.value)} style={{ color: "#1A120B", fontSize: 16, flex: 1, background: "none", border: "none", padding: "15px 0px 15px 25px", boxSizing: "border-box", outline: "none"}} />
                                 <img alt="Submit Newsletter" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/a6kx2wzj_expires_30_days.png"} style={{ width: 40, height: 40, objectFit: "fill", cursor: "pointer" }} onClick={() => alert("Newsletter signup for: " + newsletterEmailInput)} />
                             </div>
                         </div>
                     </div>
                     <img alt="Footer banner" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/8ff6gph5_expires_30_days.png"} style={{ height: "auto", maxHeight: 200, marginBottom: 30, width: "100%", objectFit: "cover" }}/>
                     <div style={{display: "flex", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: 20, justifyContent: "space-between", fontSize: 12}}>
                         <span>© ADVENTURER’S GUILD/ALL RIGHTS RESERVED</span>
                         <span>TERMS AND CONDITIONS</span>
                         <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                             <span>FACEBOOK</span>
                             <span>INSTAGRAM</span>
                         </div>
                     </div>
                </div>
            </div>

            {/* Skill Editing Modal (remains the same) */}
            {isEditingSkills && (
                <Modal title="Select Your Skills (Max 2)" onClose={() => setIsEditingSkills(false)}>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                        {allSkills.length > 0 ? allSkills.map(skill => (
                            <div key={skill.skill_id} style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '16px' }}>
                                    <input
                                        type="checkbox"
                                        checked={tempSelectedSkillIds.includes(skill.skill_id)}
                                        onChange={() => handleSkillSelectionChange(skill.skill_id)}
                                        disabled={tempSelectedSkillIds.length >= 2 && !tempSelectedSkillIds.includes(skill.skill_id)}
                                        style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                                    />
                                    {skill.skill_name}
                                    {skill.skill_desc && <span style={{fontSize: '13px', color: '#666', marginLeft: '8px'}}> - {skill.skill_desc}</span>}
                                </label>
                            </div>
                        )) : <p>No skills available to select.</p>}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '15px', borderTop: '1px solid #eee'}}>
                        <button onClick={() => setIsEditingSkills(false)} style={{padding: '8px 15px', background: '#aaa', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Cancel</button>
                        <button onClick={handleSaveSkills} style={{padding: '8px 15px', background: '#5cb85c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Skills'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}