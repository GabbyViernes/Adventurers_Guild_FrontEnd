// CreatePartyPage.js - FULL MODIFIED CODE

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function CreatePartyPage(props) {
    const [partyName, setPartyName] = useState('');
    const [partyDescription, setPartyDescription] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null); // Will store the full user object
    const [allOtherUsers, setAllOtherUsers] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState('');
    
    const [isLoading, setIsLoading] = useState(true); // Single loading state for initial setup
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const initializePage = useCallback(async () => {
        setIsLoading(true);
        setError('');
        const userString = localStorage.getItem('loggedInUser');
        
        if (!userString) {
            setError("No user logged in. Please login to create a party.");
            setIsLoading(false);
            navigate("/login"); // Redirect if no user session
            return;
        }

        let currentUserData;
        try {
            currentUserData = JSON.parse(userString);
        } catch (e) {
            console.error("Error parsing loggedInUser from localStorage", e);
            setError("Could not load user session. Please login again.");
            localStorage.removeItem('loggedInUser');
            setIsLoading(false);
            navigate("/login"); // Redirect on parsing error
            return;
        }
        
        const currentUserId = currentUserData?.member_id || currentUserData?.id || currentUserData?.userId;

        if (!currentUserId) {
            setError("User session is invalid (missing ID). Please login again.");
            localStorage.removeItem('loggedInUser');
            setIsLoading(false);
            navigate("/login"); // Redirect if ID is missing
            return;
        }
        
        setLoggedInUser(currentUserData);

        // Fetch all other users for the dropdown
        try {
            const response = await axios.get(`http://localhost:3001/api/users?excludeUserId=${currentUserId}`);
            setAllOtherUsers(response.data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            // Append to existing error or set new one
            setError(prevError => (prevError ? prevError + " " : "") + "Failed to load list of potential party members.");
        } finally {
            setIsLoading(false); // Set loading to false after all initial fetches are attempted
        }
    // ESLint might warn about missing dependencies like setLoggedInUser, setAllOtherUsers, setError, setIsLoading.
    // However, state setter functions from useState are guaranteed to be stable and don't need to be dependencies.
    // 'navigate' is stable from react-router-dom.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]); // 'navigate' is included as it's used for redirection.

    useEffect(() => {
        initializePage();
    }, [initializePage]);

    const handleCreateParty = async (e) => {
        e.preventDefault();
        setError(''); 

        if (!partyName.trim()) {
            setError("Party name cannot be empty.");
            return;
        }

        const leaderId = loggedInUser?.member_id || loggedInUser?.id || loggedInUser?.userId;
        if (!leaderId) {
            setError("User not properly identified or session expired. Please login again.");
            return;
        }

        const partyPayload = {
            partyName: partyName.trim(),
            partyDescription: partyDescription.trim(),
            leader_id: leaderId,
            additional_member_id: selectedMemberId ? parseInt(selectedMemberId) : null 
        };

        console.log("Creating party with payload:", partyPayload);
        setIsLoading(true); // Indicate loading for the create action

        try {
            const response = await axios.post('http://localhost:3001/api/parties', partyPayload);
            console.log('Party creation successful:', response.data);
            alert(`Party "${response.data.party_name}" created successfully!`);
            navigate('/joinparty'); // Or navigate(`/party/${response.data.party_id}`)
        } catch (err) {
            console.error("Party creation error:", err.response ? err.response.data : err.message);
            const errorMessage = err.response?.data?.message || "Failed to create party. Please try again.";
            setError(errorMessage);
            alert(`Party creation failed: ${errorMessage}`);
        } finally {
            setIsLoading(false); // Reset loading after create action attempt
        }
    };

    if (isLoading && !error) { // Show loading only if there isn't an initial error preventing form display
        return <div style={{ padding: 20, textAlign: 'center', fontSize: '18px' }}>Loading...</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", background: "#FFFFFF" }}>
            <div style={{ minHeight: "100vh", alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", background: "#F6F6F6", padding: "0 20px 20px 20px" }}>
                {/* Header */}
                <div style={{ width: '100%', maxWidth: '1200px', display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", marginBottom: 30, borderBottom: "1px solid #ddd", background: "#FFFFFF", paddingLeft: "20px", paddingRight: "20px", boxSizing: 'border-box' }}>
                    <div style={{display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap"}}>
                        <Link to="/joinparty" style={{marginRight: 20, textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>JOIN PARTY</Link>
                        <Link to="/quests" style={{marginRight: 20, textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>QUESTS</Link>
                         <Link to="/vault" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>VAULT</Link>
                         <Link to="/inventory" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>INVENTORY</Link>
                         <Link to="/news" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>NEWS</Link>
                    </div>
                    <img alt="Guild Logo" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/teullewi_expires_30_days.png"} style={{ width: 70, height: 70, objectFit: "fill", cursor: 'pointer', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} onClick={() => navigate("/MainSI")} />
                    <button onClick={() => navigate("/profile")} style={{background: "#3C2A21", color: "white", border: 'none', padding: '12px 25px', borderRadius: 50, cursor: 'pointer', fontSize: 16, fontWeight: 500}}>Profile</button>
                </div>

                <div style={{width: '100%', maxWidth: '700px', background: 'white', padding: '30px 40px', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                    <span style={{ color: "#1A120B", fontSize: 48, marginBottom: 30, display: 'block', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }} >
                        {"Create Your Party"}
                    </span>

                    {/* Display error if it exists and not loading */}
                    {error && !isLoading && <p style={{color: 'red', textAlign: 'center', marginBottom: '20px'}}>{error} {!loggedInUser && <Link to="/login" style={{color: '#3C2A21'}}>Login here</Link>}</p>}
                    
                    {!loggedInUser && !isLoading && !error && ( // Case where user is not logged in and no other error occurred yet
                        <p style={{color: 'red', textAlign: 'center'}}>
                            You must be logged in to create a party. <Link to="/login" style={{color: '#3C2A21'}}>Login here</Link>
                        </p>
                    )}

                    {loggedInUser && (
                        <form onSubmit={handleCreateParty}>
                            <div style={{marginBottom: 20}}>
                                <label htmlFor="partyName" style={{display: 'block', color: "#1A120B", fontSize: 18, fontWeight: "bold", marginBottom: 8}}>Party Name:</label>
                                <input id="partyName" placeholder={"Enter your desired Party Name"} value={partyName} onChange={(event) => setPartyName(event.target.value)} required style={{ color: "#1A120B", fontSize: 18, background: "#F9F9F9", borderRadius: 4, border: `1px solid #ccc`, padding: 15, width: "100%", boxSizing: 'border-box' }} />
                            </div>
                            <div style={{marginBottom: 20}}>
                                <label htmlFor="partyDescription" style={{display: 'block', color: "#1A120B", fontSize: 18, fontWeight: "bold", marginBottom: 8}}>Party Description (Optional):</label>
                                <textarea id="partyDescription" placeholder={"Describe your party's goals, theme, or requirements..."} value={partyDescription} onChange={(event) => setPartyDescription(event.target.value)} rows={4} style={{ color: "#1A120B", fontSize: 16, background: "#F9F9F9", borderRadius: 4, border: `1px solid #ccc`, padding: 15, width: "100%", boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
                            </div>

                            <div style={{marginBottom: 20, padding: '15px', background: '#f0f0f0', borderRadius: 4}}>
                                <h3 style={{color: "#1A120B", fontSize: 16, fontWeight: "bold", marginTop:0, marginBottom: 5}}>Party Leader (You):</h3>
                                <p style={{margin: '0px 0', fontSize: 15}}>{loggedInUser.name || 'N/A'}</p> 
                            </div>

                            <div style={{marginBottom: 25}}>
                                <label htmlFor="addMember" style={{display: 'block', color: "#1A120B", fontSize: 18, fontWeight: "bold", marginBottom: 8}}>
                                    Add One Member (Optional):
                                </label>
                                <select 
                                    id="addMember" 
                                    value={selectedMemberId} 
                                    onChange={(e) => setSelectedMemberId(e.target.value)}
                                    style={{ color: "#1A120B", fontSize: 16, background: "#F9F9F9", borderRadius: 4, border: `1px solid #ccc`, padding: 15, width: "100%", boxSizing: 'border-box' }}
                                >
                                    <option value="">-- Select a member --</option>
                                    {allOtherUsers.map(user => (
                                        <option key={user.member_id} value={user.member_id}>
                                            {user.name} (ID: {user.member_id})
                                        </option>
                                    ))}
                                </select>
                                {allOtherUsers.length === 0 && !isLoading && <p style={{fontSize: 12, color: '#777', marginTop: 5}}>No other users available to add.</p>}
                            </div>
                            
                            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 30}}>
                                <button type="submit" style={{ background: "#3C2A21", color: "#F6F6F6", fontSize: 16, fontWeight: 'bold', borderRadius: 50, border: "none", padding: "15px 50px", cursor: 'pointer' }} disabled={!loggedInUser || isLoading}>
                                    {"Create Party"}
                                </button>
                                <button type="button" style={{ background: "#B6B6B6", color: "#1A120B", fontSize: 16, borderRadius: 50, border: "none", padding: "15px 50px", cursor: 'pointer' }} onClick={()=>navigate(-1)}>
                                    {"Cancel"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                
                {/* Footer */}
                <div style={{ width: "100%", padding: "20px", boxSizing: "border-box", marginTop: "auto", textAlign: "center", background: "#e0e0e0", borderTop: "1px solid #ccc" }}>
                    <p style={{margin:0, fontSize: 12, color: "#555"}}>© ADVENTURER’S GUILD/ALL RIGHTS RESERVED</p>
                </div>
            </div>
        </div>
    );
}