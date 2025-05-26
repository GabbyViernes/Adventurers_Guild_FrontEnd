// PartyPage.js - MODIFIED to add Transfer Leadership

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function PartyPage(props) {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userPartiesDetails, setUserPartiesDetails] = useState([]);
    const [availableParties, setAvailableParties] = useState([]);
    const [allUsersForAdding, setAllUsersForAdding] = useState([]);
    const [selectedUserToAdd, setSelectedUserToAdd] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const fetchAllUsers = useCallback(async (currentUserId) => {
        if (!currentUserId) return;
        try {
            const response = await axios.get(`http://localhost:3001/api/users?excludeUserId=${currentUserId}`);
            setAllUsersForAdding(response.data);
        } catch (err) {
            console.error("Failed to fetch users for adding to party:", err);
        }
    }, []);

    const fetchInitialData = useCallback(async () => {
        // ... (existing fetchInitialData logic remains the same, ensure loggedInUser has member_id)
        setIsLoading(true);
        setError('');
        setUserPartiesDetails([]);
        setAvailableParties([]);

        const userString = localStorage.getItem('loggedInUser');
        if (!userString) { setIsLoading(false); navigate("/login"); setError("You must be logged in."); return; }

        let currentUser;
        try { currentUser = JSON.parse(userString); setLoggedInUser(currentUser); } 
        catch (e) { setIsLoading(false); navigate("/login"); setError("Invalid session."); localStorage.removeItem('loggedInUser'); return;}
        
        const currentUserId = currentUser?.member_id || currentUser?.id;
        if (!currentUserId) { setIsLoading(false); navigate("/login"); setError("User ID not found."); localStorage.removeItem('loggedInUser'); return;}

        fetchAllUsers(currentUserId);

        try {
            const profileResponse = await axios.get(`http://localhost:3001/api/profile/${currentUserId}`);
            const profileData = profileResponse.data;

            if (profileData.parties && profileData.parties.length > 0) {
                const partyDetailPromises = profileData.parties.map(partyStub =>
                    axios.get(`http://localhost:3001/api/parties/${partyStub.party_id}`)
                );
                const partyDetailResponses = await Promise.all(partyDetailPromises);
                setUserPartiesDetails(partyDetailResponses.map(res => res.data));
            }
            const availablePartiesResponse = await axios.get('http://localhost:3001/api/parties');
            const userPartyIds = profileData.parties ? profileData.parties.map(p => p.party_id) : [];
            setAvailableParties(availablePartiesResponse.data.filter(p => !userPartyIds.includes(p.party_id)));
        } catch (err) {
            console.error("Error fetching party data:", err);
            setError("Failed to load party information. " + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    }, [navigate, fetchAllUsers]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const handlePartyAction = async (actionType, partyId, optionalData = {}) => {
        const currentLeaderId = loggedInUser?.member_id || loggedInUser?.id;
        if (!currentLeaderId) {
            alert("Authentication error. Please log in again.");
            navigate("/login");
            return;
        }
        setIsLoading(true);
        let url = '';
        let method = 'post'; 
        let payload = { ...optionalData }; // Start with optionalData

        switch (actionType) {
            case 'join':
                url = `http://localhost:3001/api/parties/${partyId}/join`;
                payload.member_id = currentLeaderId; // User joining is the loggedInUser
                break;
            case 'leave':
                if (!window.confirm("Are you sure you want to leave this party?")) { setIsLoading(false); return; }
                url = `http://localhost:3001/api/parties/${partyId}/leave`;
                payload.member_id = currentLeaderId; // User leaving is the loggedInUser
                break;
            case 'deleteParty':
                if (!window.confirm("Are you sure you want to DELETE this party? This action cannot be undone.")) { setIsLoading(false); return; }
                url = `http://localhost:3001/api/parties/${partyId}`;
                method = 'delete';
                payload.leader_id = currentLeaderId; // Authenticating current leader
                break;
            case 'addMember':
                if (!optionalData.member_id_to_add) { alert("Please select a user to add."); setIsLoading(false); return; }
                url = `http://localhost:3001/api/parties/${partyId}/members`;
                payload.leader_id = currentLeaderId; // Authenticating current leader
                // member_id_to_add is already in optionalData
                break;
            case 'removeMember':
                if (!window.confirm(`Remove member ID ${optionalData.member_id_to_remove}?`)) { setIsLoading(false); return; }
                url = `http://localhost:3001/api/parties/${partyId}/members/${optionalData.member_id_to_remove}`;
                method = 'delete';
                payload.leader_id = currentLeaderId; // Authenticating current leader
                break;
            case 'transferLeadership':
                if (!optionalData.new_leader_member_id) { alert("Error: New leader ID missing."); setIsLoading(false); return; }
                if (!window.confirm(`Transfer leadership to member ID ${optionalData.new_leader_member_id}? You will no longer be the leader.`)) { setIsLoading(false); return; }
                url = `http://localhost:3001/api/parties/${partyId}/transfer-leadership`;
                payload.current_leader_id = currentLeaderId; // Authenticating current leader
                // new_leader_member_id is already in optionalData
                break;
            default:
                setIsLoading(false);
                console.error("Unknown party action:", actionType);
                return;
        }

        try {
            await axios({ method, url, data: payload }); // For DELETE, axios puts 'data' in config for body
            alert(`Action '${actionType}' successful!`);
            fetchInitialData(); 
        } catch (err) {
            console.error(`Failed to ${actionType} party/member:`, err);
            alert(`Failed to ${actionType}: ${err.response?.data?.message || err.message}`);
            setIsLoading(false); 
        }
    };
    
    const handleSelectedUserChange = (partyId, memberId) => {
        setSelectedUserToAdd(prev => ({...prev, [partyId]: memberId }));
    };

    if (isLoading && userPartiesDetails.length === 0 && availableParties.length === 0 && !error) {
        return <div style={{ padding: 20, textAlign: 'center', fontSize: '18px' }}>Loading party information...</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", background: "#FFFFFF" }}>
            <div style={{ minHeight: "100vh", alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", background: "#F6F6F6", padding: "0 20px 20px 20px" }}>
                {/* Header ... (same as before) ... */}
                <div style={{ width: '100%', maxWidth: '1200px', display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", marginBottom: 30, borderBottom: "1px solid #ddd", background: "#FFFFFF", paddingLeft: "20px", paddingRight: "20px", boxSizing: 'border-box' }}>
                    <div style={{display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap"}}>
                        <Link to="/createparty" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>CREATE PARTY</Link>
                        <Link to="/quests" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>QUESTS</Link>
                         <Link to="/vault" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>VAULT</Link>
                         <Link to="/inventory" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>INVENTORY</Link>
                         <Link to="/news" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>NEWS</Link>
                    </div>
                    <img alt="Guild Logo" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/teullewi_expires_30_days.png"} style={{ width: 70, height: 70, objectFit: "fill", cursor: 'pointer', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} onClick={() => navigate("/MainSI")} />
                    <button onClick={() => navigate("/profile")} style={{background: "#3C2A21", color: "white", border: 'none', padding: '12px 25px', borderRadius: 50, cursor: 'pointer', fontSize: 16, fontWeight: 500}}>Profile</button>
                </div>

                <div style={{width: '100%', maxWidth: '1000px', background: 'white', padding: '30px 40px', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                    <span style={{ color: "#1A120B", fontSize: 48, marginBottom: 10, display: 'block', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }} >
                        Party Dashboard
                    </span>

                    {error && <p style={{color: 'red', textAlign: 'center', marginBottom: 20}}>{error}</p>}

                    {/* Section for User's Parties */}
                    {userPartiesDetails.length > 0 && (
                        <div style={{marginBottom: 40}}>
                            <h2 style={{fontSize: 30, color: "#3C2A21", marginBottom: 20, borderBottom: '2px solid #3C2A21', paddingBottom:10}}>Your Parties</h2>
                            {userPartiesDetails.map(party => (
                                <div key={party.party_id} style={{marginBottom: 30, padding: 20, border: '1px solid #eee', borderRadius: 8, background: '#fdfdfd', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                                        <h3 style={{fontFamily: "'Georgia', serif", fontSize: 24, color: "#1A120B", marginTop:0, marginBottom: 0}}>{party.party_name}</h3>
                                        <div>
                                            <button onClick={() => handlePartyAction('leave', party.party_id)} style={{padding: '6px 12px', fontSize: 12, background: '#f0ad4e', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer', marginRight: 10}}>
                                                Leave Party
                                            </button>
                                            {loggedInUser && loggedInUser.member_id === party.leader_id && (
                                                <button onClick={() => handlePartyAction('deleteParty', party.party_id)} style={{padding: '6px 12px', fontSize: 12, background: '#d9534f', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer'}}>
                                                    Delete Party
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {party.description && <p style={{fontSize: 15, color: '#555', marginBottom: 15, lineHeight: 1.6}}>{party.description}</p>}
                                    <p style={{fontSize: 14, color: '#777'}}>Leader ID: {party.leader_id} {loggedInUser && loggedInUser.member_id === party.leader_id && <strong style={{color: '#28a745'}}>(You are the Leader)</strong>}</p>
                                    <p style={{fontSize: 14, color: '#777'}}>
                                        Members: {party.current_member_count}{party.max_members ? ` / ${party.max_members}` : ''}
                                    </p>
                                    <h4 style={{fontSize: 16, color: '#1A120B', marginTop: 15, marginBottom: 5}}>Members:</h4>
                                    <ul style={{listStyle: 'none', paddingLeft: 0, marginBottom: 15}}>
                                        {party.members && party.members.map(member => (
                                            <li key={member.member_id} style={{padding: '6px 0', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dotted #f0f0f0'}}>
                                                <span>
                                                    <span style={{fontWeight: 'bold'}}>{member.name}</span> ({member.class || 'N/A'}) - Role: {member.role}
                                                </span>
                                                {loggedInUser && loggedInUser.member_id === party.leader_id && loggedInUser.member_id !== member.member_id && (
                                                    <div>
                                                        <button onClick={() => handlePartyAction('removeMember', party.party_id, { member_id_to_remove: member.member_id })} 
                                                                style={{padding: '3px 8px', fontSize: 10, background: '#d9534f', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer', marginRight: 5}}>
                                                            Remove
                                                        </button>
                                                        <button onClick={() => handlePartyAction('transferLeadership', party.party_id, { new_leader_member_id: member.member_id })}
                                                                style={{padding: '3px 8px', fontSize: 10, background: '#0275d8', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer'}}>
                                                            Make Leader
                                                        </button>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    {loggedInUser && loggedInUser.member_id === party.leader_id && (
                                        <div style={{marginTop: 20, paddingTop:15, borderTop: '1px solid #eee'}}>
                                            <h4 style={{marginTop:0, marginBottom: 5, fontSize: 15}}>Add New Member to "{party.party_name}":</h4>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                                <select value={selectedUserToAdd[party.party_id] || ''} onChange={(e) => handleSelectedUserChange(party.party_id, e.target.value)} style={{padding: 8, borderRadius:4, border: '1px solid #ccc', flexGrow: 1}}>
                                                    <option value="">-- Select User --</option>
                                                    {allUsersForAdding
                                                        .filter(user => !party.members.find(pm => pm.member_id === user.member_id)) 
                                                        .map(user => (
                                                        <option key={user.member_id} value={user.member_id}>{user.name} (ID: {user.member_id})</option>
                                                    ))}
                                                </select>
                                                <button onClick={() => handlePartyAction('addMember', party.party_id, { member_id_to_add: selectedUserToAdd[party.party_id] })} style={{padding: '8px 15px', background: '#5cb85c', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14}}>Add</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Section for Available Parties (Always shown below user's parties) */}
                    <div style={{marginTop: 40 }}>
                        <h2 style={{fontSize: 30, color: "#3C2A21", marginBottom: 20, borderBottom: '2px solid #3C2A21', paddingBottom:10, textAlign: 'center'}}>
                            Available Parties to Join
                        </h2>
                        {availableParties.length > 0 ? availableParties.map(party => (
                            <div key={party.party_id} style={{border: '1px solid #ddd', borderRadius: 5, padding: 15, marginBottom: 15, background: '#f9f9f9'}}>
                                <h3 style={{fontFamily: "'Georgia', serif", fontSize: 22, color: "#3C2A21", marginTop:0, marginBottom: 10}}>{party.party_name}</h3>
                                <p style={{fontSize: 15, color: '#555', minHeight: '40px', lineHeight: 1.5}}> {party.description || "No description available."} </p>
                                <p style={{fontSize: 14, color: '#777'}}>Leader: {party.leader_name || "N/A"}</p>
                                <p style={{fontSize: 14, color: '#777', marginBottom: 15}}>
                                    Members: {party.current_member_count}{party.max_members ? ` / ${party.max_members}` : ''}
                                </p>
                                <button onClick={() => handlePartyAction('join', party.party_id)} style={{background: "#584539", color: "white", border: 'none', padding: '10px 20px', borderRadius: 20, cursor: 'pointer', fontSize: 14, fontWeight: 'bold'}}>
                                    Join Party
                                </button>
                            </div>
                        )) : (
                            <p style={{textAlign: 'center', fontSize: 16, color: '#555'}}>No other active parties available to join right now.</p>
                        )}
                         {userPartiesDetails.length === 0 && ( // Show create party link prominently if user is in no party
                            <div style={{textAlign: 'center', marginTop: 30}}>
                                <Link to="/createparty" style={{ background: "#3C2A21", color: "#F6F6F6", fontSize: 18, fontWeight: 'bold', borderRadius: 50, border: "none", padding: "15px 40px", cursor: 'pointer', textDecoration: 'none' }}>
                                    Or Create Your Own Party
                                </Link>
                            </div>
                         )}
                    </div>
                </div>
                
                {/* Footer ... */}
            </div>
        </div>
    );
}