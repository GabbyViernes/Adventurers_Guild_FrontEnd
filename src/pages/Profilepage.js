import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function ProfilePage(props) {
    const [newsletterEmailInput, onChangeNewsletterEmailInput] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // New state to manage the deposit quantity input for each inventory item
    const [depositQuantities, setDepositQuantities] = useState({});
    const navigate = useNavigate();

    const defaultProfilePic = "https://media.istockphoto.com/id/1399318216/vector/round-icon-spartan-helmet.jpg?s=612x612&w=0&k=20&c=PWKk1b8Xm7THDlgYS_9qyi3ShUxL3VGtaEVJK0wgGF0=";
    const DEFAULT_ITEM_IMAGE = "https://placehold.co/100x100/cccccc/333333?text=Item";

    // Helper to get the correct member ID from the user object
    const getMemberId = (user) => {
        return user?.member_id || user?.id || user?.userId;
    };

    const fetchUserProfile = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const storedUserString = localStorage.getItem('loggedInUser');
            let userIdToFetch = null;

            if (storedUserString) {
                try {
                    const parsedUser = JSON.parse(storedUserString);
                    userIdToFetch = getMemberId(parsedUser); // Use helper function
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
            console.log("Profile data from API:", response.data);
            setUserData(response.data);

            // Initialize depositQuantities for each item in the inventory
            const initialQuantities = {};
            response.data.inventory.forEach(item => {
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
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate("/login");
    };

    const handleChangeProfilePicture = async () => {
        const currentUserId = getMemberId(userData); // Use helper function
        if (!currentUserId) {
            alert("User data not loaded properly. Cannot change picture.");
            return;
        }

        const newProfilePicUrlPrompt = window.prompt("Please enter the new image URL for your profile picture (leave blank to use default/remove):");

        if (newProfilePicUrlPrompt === null) return;

        const trimmedUrl = newProfilePicUrlPrompt.trim();
        const urlToSend = trimmedUrl === "" ? null : trimmedUrl;

        try {
            const response = await axios.put(`http://localhost:3001/api/profile/${currentUserId}/picture`, {
                profilePictureUrl: urlToSend
            });

            if (response.data && response.data.success) {
                alert("Profile picture updated successfully!");
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

    // Handler for deposit quantity input changes
    const handleDepositQuantityChange = (itemId, value) => {
        setDepositQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: Math.max(1, parseInt(value, 10) || 1) // Ensure quantity is at least 1
        }));
    };

    // New function to handle depositing an item to the vault
    const handleDepositItem = async (item) => {
        const memberId = getMemberId(userData); // Use helper function
        if (!memberId) {
            alert("You must be logged in to deposit items.");
            navigate("/login");
            return;
        }

        const quantityToDeposit = depositQuantities[item.item_id];

        if (!quantityToDeposit || quantityToDeposit <= 0) {
            alert("Please enter a valid quantity to deposit.");
            return;
        }

        if (quantityToDeposit > item.quantity) {
            alert(`You can only deposit up to ${item.quantity} of this item from your inventory.`);
            return;
        }

        if (!window.confirm(`Are you sure you want to deposit ${quantityToDeposit} of ${item.name} into the Guild Vault?`)) {
            return; // User cancelled
        }

        setLoading(true); // Indicate loading during the deposit action

        try {
            const response = await axios.post(`http://localhost:3001/api/vault/deposit`, {
                item_id: item.item_id,
                member_id: memberId,
                quantity: quantityToDeposit,
            });

            alert(response.data.message); // Display success message
            fetchUserProfile(); // Re-fetch user profile (which includes inventory) to update the list and quantities
        } catch (err) {
            console.error("Error depositing item:", err);
            alert(`Failed to deposit item: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false); // Reset loading state
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
        inventory = [], // Destructure inventory from userData
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
                        <div style={{textAlign: 'center', cursor: 'pointer'}} onClick={handleChangeProfilePicture} title="Click to change profile picture">
                            <img
                                alt="Profile"
                                src={displayProfilePic}
                                style={{
                                    width: 250, height: 250,
                                    objectFit: "cover", borderRadius: "50%",
                                    marginBottom: 15, border: "3px solid #3C2A21",
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.opacity = 0.7}
                                onMouseOut={(e) => e.currentTarget.style.opacity = 1}
                            />
                            <p style={{fontSize: 12, color: '#555'}}>(Click image to change)</p>
                        </div>

                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: '300px' }}>

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
                                            <Link to={`/joinparty/${party.party_id}`} style={{textDecoration: 'none', color: '#3C2A21', fontWeight: 'bold'}}>{party.party_name}</Link> - Role: {party.role}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{fontSize: 16, color: '#555'}}>You are not currently a member of any party. <Link to="/joinparty" style={{color: "#3C2A21"}}>View available parties</Link>.</p>
                            )}

                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 25, marginTop: 30, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >
                                Skills <span style={{fontSize: 16, fontWeight: 'normal'}}>(Placeholders)</span>
                            </h2>
                            <div style={{ width: "100%", marginBottom: 12, fontSize: 17, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                <span style={{ color: "#3C2A21", fontWeight: "bold" }}>Main Skills: </span>
                                <span style={{ color: "#1A120B" }}>{main_skills}</span>
                            </div>
                            <div style={{ width: "100%", marginBottom: 12, fontSize: 17, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                <span style={{ color: "#3C2A21", fontWeight: "bold" }}>Primary Skills: </span>
                                <span style={{ color: "#1A120B" }}>{primary_skills}</span>
                            </div>
                            <div style={{ width: "100%", marginBottom: 12, fontSize: 17, padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                                <span style={{ color: "#3C2A21", fontWeight: "bold" }}>Misc. Skills: </span>
                                <span style={{ color: "#1A120B" }}>{misc_skills}</span>
                            </div>


                            <h2 style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginBottom: 20, marginTop: 30, borderBottom: '2px solid #3C2A21', paddingBottom: 10 }} >
                                Inventory
                            </h2>
                            {inventory.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px', width: '100%' }}>
                                    {inventory.map(item => (
                                        <div key={item.item_id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 10, background: '#f9f9f9', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                            <img src={item.image_url || DEFAULT_ITEM_IMAGE} alt={item.name} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 4, marginBottom: 5 }} onError={(e) => { e.target.onerror = null; e.target.src=DEFAULT_ITEM_IMAGE; }}/>
                                            <h4 style={{ fontSize: 14, color: '#1A120B', margin: '0 0 3px 0' }}>{item.name}</h4>
                                            <p style={{ fontSize: 12, color: '#555', margin: '0 0 3px 0' }}>Rarity: {item.rarity || 'N/A'}</p>
                                            <p style={{ fontSize: 12, color: '#555', margin: '0 0 5px 0' }}>Value: {item.value || 0} Gold</p>
                                            <p style={{ fontSize: 13, color: '#1A120B', margin: '0', fontWeight: 'bold' }}>Your Qty: {item.quantity || 0}</p>
                                            <div style={{ marginBottom: 10 }}>
                                                <label htmlFor={`deposit-qty-${item.item_id}`} style={{fontSize: 12, color: '#555', display: 'block', marginBottom: 3}}>Deposit Qty:</label>
                                                <input
                                                    id={`deposit-qty-${item.item_id}`}
                                                    type="number"
                                                    min="1"
                                                    value={depositQuantities[item.item_id] || 1}
                                                    onChange={(e) => handleDepositQuantityChange(item.item_id, e.target.value)}
                                                    style={{
                                                        width: '60px',
                                                        padding: '3px',
                                                        borderRadius: '3px',
                                                        border: '1px solid #ccc',
                                                        textAlign: 'center',
                                                        fontSize: '12px'
                                                    }}
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleDepositItem(item)}
                                                style={{
                                                    background: "#f0ad4e", // A yellowish/orange color for deposit
                                                    color: "white",
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: 15,
                                                    cursor: 'pointer',
                                                    fontSize: 12,
                                                    // Disable button if quantity is 0 or less, or if input is invalid
                                                    opacity: (item.quantity <= 0 || !depositQuantities[item.item_id] || depositQuantities[item.item_id] > item.quantity) ? 0.6 : 1,
                                                    cursor: (item.quantity <= 0 || !depositQuantities[item.item_id] || depositQuantities[item.item_id] > item.quantity) ? 'not-allowed' : 'pointer'
                                                }}
                                                disabled={item.quantity <= 0 || !depositQuantities[item.item_id] || depositQuantities[item.item_id] > item.quantity}
                                            >
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