import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

// Default image for items that don't have one specified in the database
const DEFAULT_ITEM_IMAGE = "https://placehold.co/150x150/cccccc/333333?text=Item";

export default function Vaultpage(props) {
    const [loggedInUser, setLoggedInUser] = useState(null); // To store the logged-in user's full object
    const [vaultItems, setVaultItems] = useState([]); // To store items fetched from the vault
    const [isLoading, setIsLoading] = useState(true); // Loading state for data fetching
    const [error, setError] = useState(''); // Error state for displaying messages
    // State to manage the quantity input for each item
    const [withdrawQuantities, setWithdrawQuantities] = useState({});
    const navigate = useNavigate();

    // Helper to get the correct member ID from the user object
    const getMemberId = (user) => {
        return user?.member_id || user?.id || user?.userId;
    };

    // Callback to fetch items currently in the vault
    const fetchVaultItems = useCallback(async () => {
        setIsLoading(true); // Start loading
        setError(''); // Clear any previous errors
        setVaultItems([]); // Clear previous items
        setWithdrawQuantities({}); // Clear quantities on re-fetch

        const userString = localStorage.getItem('loggedInUser');
        let currentUserId = null;

        if (userString) {
            try {
                const user = JSON.parse(userString);
                currentUserId = getMemberId(user);
                setLoggedInUser(user); // Store the full user object
            } catch (e) {
                console.error("Error parsing loggedInUser from localStorage:", e);
                setError("Invalid session. Please log in again.");
                localStorage.removeItem('loggedInUser'); // Clear potentially corrupted data
                setIsLoading(false);
                navigate("/login"); // Redirect to login
                return;
            }
        } else {
            // User not logged in, set error and redirect
            setError("You must be logged in to access the vault.");
            setIsLoading(false);
            navigate("/login");
            return;
        }

        // Only proceed to fetch vault items if a valid user ID is obtained
        if (currentUserId) {
            try {
                const response = await axios.get('http://localhost:3001/api/vault/items');
                setVaultItems(response.data); // Update state with fetched items
                // Initialize withdrawQuantities for each item to 1 or the item's quantity if it's less than 1
                const initialQuantities = {};
                response.data.forEach(item => {
                    initialQuantities[item.item_id] = item.quantity > 0 ? 1 : 0;
                });
                setWithdrawQuantities(initialQuantities);
            } catch (err) {
                console.error("Failed to fetch vault items:", err);
                setError("Failed to load vault items. " + (err.response?.data?.message || err.message));
            } finally {
                setIsLoading(false); // End loading regardless of success or failure
            }
        } else {
            setIsLoading(false); // If no user ID, ensure loading is off
        }
    }, [navigate]); // navigate is a dependency of useCallback

    // useEffect hook to call fetchVaultItems when the component mounts
    useEffect(() => {
        fetchVaultItems();
    }, [fetchVaultItems]); // Depend on the memoized fetchVaultItems

    // Handler for quantity input changes
    const handleQuantityChange = (itemId, value) => {
        setWithdrawQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: Math.max(1, parseInt(value, 10) || 1) // Ensure quantity is at least 1
        }));
    };

    // Function to handle withdrawing an item
    const handleWithdrawItem = async (item) => {
        const memberId = getMemberId(loggedInUser);
        if (!memberId) {
            alert("You must be logged in to withdraw items.");
            navigate("/login");
            return;
        }

        const quantityToWithdraw = withdrawQuantities[item.item_id];

        if (!quantityToWithdraw || quantityToWithdraw <= 0) {
            alert("Please enter a valid quantity to withdraw.");
            return;
        }

        if (quantityToWithdraw > item.quantity) {
            alert(`You can only withdraw up to ${item.quantity} of this item.`);
            return;
        }

        if (!window.confirm(`Are you sure you want to withdraw ${quantityToWithdraw} of ${item.name}? It will be added to your personal inventory.`)) {
            return; // User cancelled
        }

        setIsLoading(true); // Indicate loading during the withdrawal action

        try {
            // Corrected API call to match backend expectation (POST to /api/vault/withdraw with body)
            const response = await axios.post(`http://localhost:3001/api/vault/withdraw`, {
                item_id: item.item_id,
                member_id: memberId,
                quantity: quantityToWithdraw,
            });

            alert(response.data.message); // Display success message
            fetchVaultItems(); // Re-fetch vault items to update the list and reset quantities
        } catch (err) {
            console.error("Error withdrawing item:", err);
            alert(`Failed to withdraw item: ${err.response?.data?.message || err.message}`); // Display specific error from backend
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // input1 state is present in your original code, assuming it's for the footer newsletter input
    const [input1, onChangeInput1] = useState('');

    // Conditional rendering for loading or error states
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#F6F6F6' }}>
                <p style={{ fontSize: '20px', color: '#3C2A21' }}>Loading vault...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#F6F6F6', padding: '20px' }}>
                <p style={{ fontSize: '20px', color: 'red', marginBottom: '20px' }}>{error}</p>
                <button onClick={() => navigate("/login")} style={{ display: 'block', margin: '0 auto', padding: '10px 20px', background: '#3C2A21', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Go to Login</button>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", background: "#FFFFFF" }}>
            <div style={{ minHeight: "100vh", alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", background: "#F6F6F6", padding: "0 20px 20px 20px" }}>
                {/* Header Navigation - adapted for consistency */}
                <div style={{ width: '100%', maxWidth: '1200px', display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", marginBottom: 30, borderBottom: "1px solid #ddd", background: "#FFFFFF", paddingLeft: "20px", paddingRight: "20px", boxSizing: 'border-box' }}>
                    <div style={{display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap"}}>
                        <Link to="/joinparty" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>PARTY</Link>
                        <Link to="/quests" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>QUESTS</Link>
                        <Link to="/vault" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>VAULT</Link>
                        <Link to="/inventory" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>INVENTORY</Link>
                        <Link to="/news" style={{textDecoration:'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>NEWS</Link>
                    </div>
                    <Link to="/MainSI" style={{ flexGrow: 1, textAlign: 'center', margin: '0 20px' }}>
                        <img alt="Guild Home" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/2lvzpgcl_expires_30_days.png"} style={{ width: 70, height: 70, objectFit: "fill", display: 'inline-block' }} />
                    </Link>
                    <button onClick={() => navigate("/profile")} style={{background: "#3C2A21", color: "white", border: 'none', padding: '12px 25px', borderRadius: 50, cursor: 'pointer', fontSize: 16, fontWeight: 500}}>Profile</button>
                </div>

                {/* Vault Content */}
                <div style={{width: '100%', maxWidth: '1200px', background: 'white', padding: '30px 40px', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                    <span style={{ color: "#1A120B", fontSize: 48, marginBottom: 30, display: 'block', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }} >
                        Guild Vault
                    </span>
                    <p style={{ color: "#1A120B", fontSize: 20, lineHeight: 1.6, marginBottom: 40, textAlign: 'center' }}>
                        The guild’s Vault System offers a secure haven for adventurers to store their hard-earned treasures, rare artifacts, and excess coin. Only the rightful owner—or those bearing a guild-sanctioned sigil—may access its well-guarded depths.
                    </p>

                    {error && <p style={{color: 'red', textAlign: 'center', marginBottom: 20}}>{error}</p>}

                    <h2 style={{fontSize: 28, color: "#3C2A21", marginBottom: 20, borderBottom: '2px solid #3C2A21', paddingBottom:10}}>Items in Vault ({vaultItems.length})</h2>

                    {vaultItems.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', padding: '20px 0' }}>
                            {vaultItems.map(item => (
                                <div key={item.item_id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 15, background: '#f9f9f9', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <img src={item.image_url || DEFAULT_ITEM_IMAGE} alt={item.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 4, marginBottom: 10 }} onError={(e) => { e.target.onerror = null; e.target.src=DEFAULT_ITEM_IMAGE; }}/>
                                    <h3 style={{ fontSize: 18, color: '#1A120B', margin: '0 0 5px 0' }}>{item.name}</h3>
                                    <p style={{ fontSize: 13, color: '#555', margin: '0 0 5px 0' }}>Rarity: {item.rarity || 'N/A'}</p>
                                    <p style={{ fontSize: 13, color: '#555', margin: '0 0 10px 0' }}>Value: {item.value || 0} Gold</p>
                                    <p style={{ fontSize: 14, color: '#1A120B', margin: '0 0 10px 0', fontWeight: 'bold' }}>Available: {item.quantity || 0}</p> {/* Display available Quantity */}
                                    <div style={{ marginBottom: 10 }}>
                                        <label htmlFor={`qty-${item.item_id}`} style={{fontSize: 14, color: '#555', display: 'block', marginBottom: 5}}>Withdraw Quantity:</label>
                                        <input
                                            id={`qty-${item.item_id}`}
                                            type="number"
                                            min="1"
                                            value={withdrawQuantities[item.item_id] || 1}
                                            onChange={(e) => handleQuantityChange(item.item_id, e.target.value)}
                                            style={{
                                                width: '80px',
                                                padding: '5px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                textAlign: 'center'
                                            }}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleWithdrawItem(item)}
                                        style={{
                                            background: "#5cb85c",
                                            color: "white",
                                            border: 'none',
                                            padding: '8px 15px',
                                            borderRadius: 20,
                                            cursor: 'pointer',
                                            fontSize: 14,
                                            // Disable button if quantity is 0 or less, or if input is invalid
                                            opacity: (item.quantity <= 0 || !withdrawQuantities[item.item_id] || withdrawQuantities[item.item_id] > item.quantity) ? 0.6 : 1,
                                            cursor: (item.quantity <= 0 || !withdrawQuantities[item.item_id] || withdrawQuantities[item.item_id] > item.quantity) ? 'not-allowed' : 'pointer'
                                        }}
                                        disabled={item.quantity <= 0 || !withdrawQuantities[item.item_id] || withdrawQuantities[item.item_id] > item.quantity}
                                    >
                                        Withdraw
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{textAlign: 'center', fontSize: 16, color: '#555'}}>The guild vault is currently empty.</p>
                    )}
                </div>

                {/* Footer Section */}
                <div style={{ width: "100%", padding: "20px 40px", boxSizing: "border-box", marginTop: "auto", background: "#FFFFFF", borderTop: "1px solid #E0E0E0" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "40px", justifyContent: "space-around", padding: "30px 0" }}>
                        <span style={{ color: "#1A120B", fontSize: 32, fontWeight: "bold", flexBasis: '100%', textAlign: 'center', marginBottom: 20 }} >ADVENTURER’S GUILD</span>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            {["HOME", "PARTY", "QUESTS", "VAULT", "CONTACT"].map(item => (
                                <Link key={item} to={`/${item.toLowerCase()}`} style={{textDecoration: 'none', color: '#1A120B', fontSize: 18, marginBottom: 8, fontWeight: 500}}>{item}</Link>
                            ))}
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: "280px", maxWidth: '400px' }}>
                            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: 15 }}>
                                <span style={{ color: "#1A120B", fontSize: 24, fontWeight: "bold", marginRight: 10 }} > SIGN UP </span>
                                <span style={{ color: "#1A120B", fontSize: 24, fontWeight: "bold", marginRight: 10 }} > TO OUR </span>
                                <span style={{ color: "#1A120B", fontSize: 24, fontWeight: "bold" }} > NEWSLETTER </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", background: "#E5E5CB", borderRadius: 50, paddingRight: 10 }}>
                                <input placeholder={"YOUR EMAIL"} type="email" value={input1} onChange={(event)=>onChangeInput1(event.target.value)} style={{ color: "#1A120B", fontSize: 16, flex: 1, background: "none", border: "none", padding: "15px 0px 15px 25px", boxSizing: "border-box", outline: "none"}} />
                                <img alt="Submit Newsletter" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/c9thllh0_expires_30_days.png"} style={{ width: 40, height: 40, objectFit: "fill", cursor: "pointer" }} onClick={() => alert("Newsletter signup for: " + input1)} />
                            </div>
                        </div>
                    </div>
                    <img alt="Footer banner" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/d2kf3ad7_expires_30_days.png"} style={{ height: "auto", maxHeight: 200, margin: "30px auto", display:'block', width: "100%", maxWidth:"1200px", objectFit: "cover" }}/>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "20px", paddingBottom: "20px", justifyContent: "space-between", fontSize: 12, color: "#1A120B" }}>
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
    )
}