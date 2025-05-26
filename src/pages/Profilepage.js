// ProfilePage.js - MODIFIED
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function ProfilePage(props) {
    const [newsletterEmailInput, onChangeNewsletterEmailInput] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchUserProfile = async (userId) => { // Accept userId as parameter
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:3001/api/profile/${userId}`);
            console.log("Profile data from API:", response.data);
            setUserData(response.data);
        } catch (err) {
            console.error('Failed to fetch user profile:', err);
            if (err.response && (err.response.status === 401 || err.response.status === 404)) {
                setError('Session invalid or user not found. Please login again.');
                localStorage.removeItem('loggedInUser'); // Clear invalid session
            } else {
                setError('Failed to load profile. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUserString = localStorage.getItem('loggedInUser');
        let userIdToFetch = null;

        if (storedUserString) {
            try {
                const parsedUser = JSON.parse(storedUserString);
                // Expecting member_id from login response now
                userIdToFetch = parsedUser.member_id || parsedUser.id || parsedUser.userId; 
            } catch (e) {
                console.error("Failed to parse stored user data:", e);
                setError('Invalid user session data. Please login again.');
                localStorage.removeItem('loggedInUser');
                setLoading(false);
                return; 
            }
        }

        if (!userIdToFetch) {
            setError('No user logged in. Please login.');
            setLoading(false);
        } else {
            fetchUserProfile(userIdToFetch); // Pass userId to fetch function
        }
    }, []); 

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate("/login");
    };

    const handleChangeProfilePicture = async () => {
        if (!userData || !userData.member_id) { // Check against member_id
            alert("User data not loaded properly. Cannot change picture.");
            return;
        }

        const newProfilePicUrl = window.prompt("Please enter the new image URL for your profile picture:");

        if (newProfilePicUrl === null) return; // User pressed cancel

        const trimmedUrl = newProfilePicUrl.trim();
        // Basic URL validation (optional, can be more robust)
        if (trimmedUrl === "" || !trimmedUrl.startsWith('http')) { 
            alert("Please enter a valid image URL (starting with http/https) or leave blank to remove.");
        }


        try {
            const response = await axios.put(`http://localhost:3001/api/profile/${userData.member_id}/picture`, {
                profilePictureUrl: trimmedUrl 
            });

            if (response.data && response.data.success) {
                alert("Profile picture updated successfully!");
                setUserData(prevData => ({
                    ...prevData,
                    profile_picture_url: response.data.profilePictureUrl // Use URL from backend response
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

  // Destructure userData
    const { 
        name = "N/A", 
        email = "N/A", 
        class: userClass = "N/A", 
        // MODIFIED line with your new default image URL:
        profile_picture_url = "https://media.istockphoto.com/id/1399318216/vector/round-icon-spartan-helmet.jpg?s=612x612&w=0&k=20&c=PWKk1b8Xm7THDlgYS_9qyi3ShUxL3VGtaEVJK0wgGF0=", 
        main_skills = "Illusion, Lockpicking, Stealth", 
        primary_skills = "Short Blade, Mysticism, Critical Striking", 
        misc_skills = "Restoration, Streetwise, Mercantile, Etiquette, Dodging, Destruction",
    } = userData;

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
                        <div style={{textAlign: 'center'}}>
                            <img
                                alt="Profile" 
                                src={profile_picture_url} 
                                style={{ width: 250, height: 250, objectFit: "cover", borderRadius: "50%", marginBottom: 15, border: "3px solid #3C2A21" }}
                            />
                            <button 
                                style={{ background: "#584539", color: "white", borderRadius: 20, border: "none", padding: "10px 20px", cursor: 'pointer', fontSize: 14 }}
                                onClick={handleChangeProfilePicture}>
                                Change Profile
                            </button>
                        </div>
                    
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: '300px' }}>
                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 25, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >
                                Account Info
                            </h2>
                            {[{label: "Name", value: name}, {label: "Email", value: email}, {label: "Class", value: userClass}].map(info => (
                                <div key={info.label} style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 12, fontSize: 17, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                    <span style={{ color: "#3C2A21", fontWeight: "bold" }} > {info.label} </span>
                                    <span style={{ color: "#1A120B", textAlign: 'right' }} > {info.value} </span>
                                </div>
                            ))}

                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 25, marginTop: 30, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >
                                Skills <span style={{fontSize: 16, fontWeight: 'normal'}}>(Placeholders)</span>
                            </h2>
                            {[{label: "Main Skills", value: main_skills}, {label: "Primary Skills", value: primary_skills}, {label: "Miscellaneous Skills", value: misc_skills}].map(info => (
                                <div key={info.label} style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 12, fontSize: 16, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                    <span style={{ color: "#3C2A21", fontWeight: "bold" }} > {info.label} </span>
                                    <span style={{ color: "#1A120B", textAlign: 'right', whiteSpace: "pre-line" }} > {info.value} </span>
                                </div>
                            ))}

                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 20, marginTop: 30, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >
                                Inventory <span style={{fontSize: 16, fontWeight: 'normal'}}>(Placeholder)</span>
                            </h2>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: 20 }}>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} title={`Inventory Slot ${i+1}`} style={{ width: 100, height: 100, background: "#D9D9D9", borderRadius: "8px", border: '1px solid #BFBFBF', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#777' }}>
                                        Slot {i+1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div> 
                
                {/* Footer Section */}
                <div style={{ width: "100%", padding: "20px 40px", boxSizing: "border-box", marginTop: "auto", background: "#3C2A21", color: "#F6F6F6" }}>
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
                                <input
                                    placeholder={"YOUR EMAIL"} type="email"
                                    value={newsletterEmailInput} 
                                    onChange={(event)=>onChangeNewsletterEmailInput(event.target.value)}
                                    style={{ color: "#1A120B", fontSize: 16, flex: 1, background: "none", border: "none", padding: "15px 0px 15px 25px", boxSizing: "border-box", outline: "none"}}
                                />
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