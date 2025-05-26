// ProfilePage.js - MODIFIED to click image for changing profile picture

import React, { useState, useEffect, useCallback } from "react"; // useCallback was not used in your last version but good for fetchUserProfile
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function ProfilePage(props) {
    const [newsletterEmailInput, onChangeNewsletterEmailInput] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const defaultProfilePic = "https://media.istockphoto.com/id/1399318216/vector/round-icon-spartan-helmet.jpg?s=612x612&w=0&k=20&c=PWKk1b8Xm7THDlgYS_9qyi3ShUxL3VGtaEVJK0wgGF0=";

    // Wrapped fetchUserProfile in useCallback as it's a dependency of useEffect
    const fetchUserProfile = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const storedUserString = localStorage.getItem('loggedInUser');
            let userIdToFetch = null;

            if (storedUserString) {
                try {
                    const parsedUser = JSON.parse(storedUserString);
                    userIdToFetch = parsedUser.member_id || parsedUser.id || parsedUser.userId;
                } catch (e) {
                    console.error("Failed to parse stored user data:", e);
                    setError('Invalid user session data. Please login again.');
                    localStorage.removeItem('loggedInUser');
                    setLoading(false);
                    navigate("/login"); // Redirect on parse error
                    return;
                }
            }

            if (!userIdToFetch) {
                setError('No user logged in. Please login.');
                setLoading(false);
                navigate("/login"); // Redirect if no user ID
                return;
            }

            const response = await axios.get(`http://localhost:3001/api/profile/${userIdToFetch}`);
            console.log("Profile data from API:", response.data);
            setUserData(response.data);
        } catch (err) {
            console.error('Failed to fetch user profile:', err);
            if (err.response && (err.response.status === 401 || err.response.status === 404)) {
                setError('Session invalid or user not found. Please login again.');
                localStorage.removeItem('loggedInUser');
            } else {
                setError('Failed to load profile. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]); // navigate is a dependency because it's used for redirection

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]); // useEffect depends on the memoized fetchUserProfile

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate("/login");
    };

    const handleChangeProfilePicture = async () => {
        // Ensure userData and its ID property are available
        const currentUserId = userData?.member_id || userData?.id || userData?.userId;
        if (!currentUserId) {
            alert("User data not loaded properly. Cannot change picture.");
            return;
        }

        const newProfilePicUrlPrompt = window.prompt("Please enter the new image URL for your profile picture (leave blank to use default/remove):");

        if (newProfilePicUrlPrompt === null) return; // User pressed cancel

        const trimmedUrl = newProfilePicUrlPrompt.trim();
        // If user enters an empty string, send null to backend to signify removal or revert to default handled by backend/frontend logic
        const urlToSend = trimmedUrl === "" ? null : trimmedUrl;

        try {
            const response = await axios.put(`http://localhost:3001/api/profile/${currentUserId}/picture`, {
                profilePictureUrl: urlToSend
            });

            if (response.data && response.data.success) {
                alert("Profile picture updated successfully!");
                // Update userData state to reflect the change immediately
                // The backend should return the new URL (or null if cleared) in response.data.profilePictureUrl
                setUserData(prevData => ({
                    ...prevData,
                    profile_picture_url: response.data.profilePictureUrl 
                }));
            } else {
                alert(response.data.message || "Failed to update profile picture.");
            }
        } catch (err) {
            console.error("Error updating profile picture:", err);
            alert(`Error updating profile picture: ${err.response?.data?.message || err.message}`);
        }
    };

    if (loading) {
        return <div style={{ padding: '50px', textAlign: 'center', fontSize: '20px' }}>Loading profile...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', fontSize: '20px', color: 'red' }}>
                {error}
                <button onClick={() => navigate("/login")} style={{ display: 'block', margin: '20px auto', padding: '10px 20px' }}>Go to Login</button>
            </div>
        );
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
        main_skills = "Illusion, Lockpicking, Stealth", 
        primary_skills = "Short Blade, Mysticism, Critical Striking", 
        misc_skills = "Restoration, Streetwise, Mercantile, Etiquette, Dodging, Destruction",
    } = userData;

    const displayProfilePic = (profile_picture_url && profile_picture_url.trim() !== "") ? profile_picture_url : defaultProfilePic;

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
                        <div style={{textAlign: 'center', cursor: 'pointer'}} onClick={handleChangeProfilePicture} title="Click to change profile picture"> {/* MOVED onClick HERE, ADDED CURSOR & TITLE */}
                            <img 
                                alt="Profile" 
                                src={displayProfilePic} 
                                style={{ 
                                    width: 250, height: 250, 
                                    objectFit: "cover", borderRadius: "50%", 
                                    marginBottom: 15, border: "3px solid #3C2A21",
                                    transition: 'opacity 0.3s ease-in-out', // Optional: hover effect
                                }}
                                onMouseOver={(e) => e.currentTarget.style.opacity = 0.7} // Optional: hover effect
                                onMouseOut={(e) => e.currentTarget.style.opacity = 1}   // Optional: hover effect
                            />
                            {/* REMOVED the separate "Change Profile" button */}
                            {/* You can add a small "Edit" icon overlay on the image if you prefer */}
                             <p style={{fontSize: 12, color: '#555'}}>(Click image to change)</p>
                        </div>
                    
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: '300px' }}>
                            {/* This button was for "Profile picture" text and "Change Profile" button, now removed */}
                            {/* <span style={{ color: "#000000", fontSize: 24, fontWeight: "bold", marginBottom: 10, }} >
                                {"Profile picture"}
                            </span>
                            <button 
                                style={{ background: "#584539", color: "white", borderRadius: 20, border: "none", padding: "10px 20px", cursor: 'pointer', fontSize: 14, marginBottom: 40 }}
                                // onClick={handleChangeProfilePicture} // This was the old button's onClick
                                >
                                Change Profile
                            </button> */}
                            
                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 25, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >
                                Account Info
                            </h2>
                            {[{label: "Name", value: name}, {label: "Email", value: email}, {label: "Class", value: userClass}].map(info => (
                                <div key={info.label} style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 12, fontSize: 17, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                    <span style={{ color: "#3C2A21", fontWeight: "bold" }} > {info.label}: </span>
                                    <span style={{ color: "#1A120B", textAlign: 'right' }} > {info.value} </span>
                                </div>
                            ))}

                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 15, marginTop: 30, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >
                                Your Parties
                            </h2>
                            {parties.length > 0 ? (
                                <ul style={{ listStyleType: 'none', paddingLeft: 0, width: '100%' }}>
                                    {parties.map(party => (
                                        <li key={party.party_id} style={{ marginBottom: 10, padding: '8px 0', borderBottom: '1px solid #E0E0E0', fontSize: 16 }}>
                                            <Link to={`/party/${party.party_id}`} style={{textDecoration: 'none', color: '#3C2A21', fontWeight: 'bold'}}>{party.party_name}</Link> - Role: {party.role}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{fontSize: 16, color: '#555'}}>You are not currently a member of any party. <Link to="/party" style={{color: "#3C2A21"}}>View available parties</Link>.</p>
                            )}

                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 25, marginTop: 30, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >
                                Skills <span style={{fontSize: 16, fontWeight: 'normal'}}>(Placeholders)</span>
                            </h2>
                            {/* ... Skills display ... */}

                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 20, marginTop: 30, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >
                                Inventory <span style={{fontSize: 16, fontWeight: 'normal'}}>(Placeholder)</span>
                            </h2>
                            {/* ... Inventory display ... */}
                        </div>
                    </div>
                </div> 
                
                {/* Footer Section ... */}
                <div style={{ width: "100%", padding: "20px 40px", boxSizing: "border-box", marginTop: "auto", background: "#3C2A21", color: "#F6F6F6" }}>
                   {/* ... (Full footer JSX - ensure newsletterEmailInput is used correctly if this footer has a form) ... */}
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
        </div>
    );
}