// SignupPage.js - MODIFIED
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignupPage(props) {
    const [input1, onChangeInput1] = useState(''); // Email
    const [input2, onChangeInput2] = useState(''); // Name
    const [passwordInput, setPasswordInput] = useState(''); // Password
    const [input3, onChangeInput3] = useState(''); // This will be for Class
    const [input5, onChangeInput5] = useState(''); // Newsletter Email

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const signupPayload = {
            email: input1,
            name: input2,
            password: passwordInput,
            adventurerClass: input3, // Send class value as adventurerClass
            newsletterEmail: input5 
        };

        console.log("Signup payload:", signupPayload); 

        try {
            const response = await axios.post('http://localhost:3001/api/signup', signupPayload);
            console.log('Signup successful:', response.data);
            alert('Signup successful! Redirecting to login...');
            navigate('/login'); 
        } catch (error) {
            console.error("Signup error:", error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Signup failed: ${error.response.data.message}`);
            } else if (error.request) {
                alert('Signup failed: No response from server. Is it running?');
            }
            else {
                alert('Signup failed. Please try again.');
            }
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                background: "#FFFFFF",
            }}>
            <div
                style={{
                    minHeight: "100vh", 
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start", 
                }}>
                <div
                    style={{
                        width: "100%", 
                        display: "flex",
                        justifyContent: "center", 
                        alignItems: "flex-start",
                        padding: "69px 20px", 
                        boxSizing: "border-box",
                        flexWrap: "wrap", 
                        gap: "40px", 
                    }}>
                    {/* Form Section */}
                    <div
                        style={{
                            flexShrink: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center", 
                            maxWidth: 650, 
                            width: "100%", 
                        }}>
                        <img
                            alt="Guild Logo" 
                            src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/aiy2q2go_expires_30_days.png"}
                            style={{
                                width: 87,
                                height: 87,
                                marginBottom: 60,
                                objectFit: "fill",
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginBottom: 40,
                                width: "100%",
                            }}>
                            <img
                                alt="Sign Up Title" 
                                src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ejj4rh8o_expires_30_days.png"}
                                style={{
                                    width: 365,
                                    maxWidth: "100%",
                                    height: "auto",
                                    marginBottom: 20,
                                    objectFit: "contain",
                                }}
                            />
                            <span
                                style={{
                                    color: "#1A120B",
                                    fontSize: 16,
                                }} >
                                {"Sign up for free!"}
                            </span>
                        </div>
                        <span
                            style={{
                                color: "#1A120B",
                                fontSize: 20,
                                fontWeight: "bold",
                                marginBottom: 15,
                                alignSelf: "flex-start", 
                                marginLeft: 5,
                            }} >
                            {"Adventurer Info"}
                        </span>
                        {/* Adventurer Info Inputs */}
                        <form onSubmit={handleSignup} style={{ width: "100%", padding: "0 5px", boxSizing: "border-box" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    marginBottom: 10, 
                                    width: "100%",
                                }}>
                                <input
                                    placeholder={"Email"}
                                    type="email"
                                    value={input1}
                                    onChange={(event) => onChangeInput1(event.target.value)}
                                    required
                                    style={{
                                        color: "#1A120B", fontSize: 20, marginBottom: 20,
                                        background: "none", borderRadius: 4, border: `1px solid #1A120B`,
                                        padding: 13, width: "100%", boxSizing: "border-box"
                                    }}
                                />
                                <input
                                    placeholder={"Password"}
                                    type="password"
                                    value={passwordInput}
                                    onChange={(event) => setPasswordInput(event.target.value)}
                                    required
                                    style={{
                                        color: "#1A120B", fontSize: 20, marginBottom: 20,
                                        background: "none", borderRadius: 4, border: `1px solid #1A120B`,
                                        padding: 13, width: "100%", boxSizing: "border-box"
                                    }}
                                />
                                <div
                                    style={{
                                        display: "flex", alignItems: "flex-start", marginBottom: 20,
                                        width: "100%", gap: 25, flexWrap: "wrap"
                                    }}>
                                    <input
                                        placeholder={"Name"}
                                        type="text"
                                        value={input2}
                                        onChange={(event) => onChangeInput2(event.target.value)}
                                        required
                                        style={{
                                            color: "#1A120B", fontSize: 20, flex: 1, 
                                            minWidth: 200, background: "none", borderRadius: 4,
                                            border: `1px solid #1A120B`, padding: 13, boxSizing: "border-box"
                                        }}
                                    />
                                    <input
                                        placeholder={"Class (Default: Warrior if blank)"} // Updated placeholder
                                        type="text"
                                        value={input3} // This is now for Class
                                        onChange={(event) => onChangeInput3(event.target.value)}
                                        style={{
                                            color: "#1A120B", fontSize: 20, flex: 1, 
                                            minWidth: 200, background: "none", borderRadius: 4,
                                            border: `1px solid #1A120B`, padding: 13, boxSizing: "border-box"
                                        }}
                                    />
                                </div>
                                <input
                                    placeholder={"Newsletter Email (Optional)"}
                                    type="email"
                                    value={input5}
                                    onChange={(event) => onChangeInput5(event.target.value)}
                                    style={{
                                        color: "#1A120B", fontSize: 20, marginBottom: 20,
                                        background: "none", borderRadius: 4, border: `1px solid #1A120B`,
                                        padding: 13, width: "100%", boxSizing: "border-box"
                                    }}
                                />
                            </div>

                            <span
                                style={{
                                    color: "#1A120B", fontSize: 20, fontWeight: "bold",
                                    marginBottom: 10, display: 'block', 
                                }} >
                                {"Adventurer Skills (Optional at Signup)"}
                            </span>
                            <div style={{ marginBottom: 40, width: "100%", boxSizing: "border-box" }}>
                                <p style={{color: "#777", fontSize: 14, margin: '0 0 10px 0'}}>
                                    Skill selection can be done after registration from your profile.
                                </p>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    display: "flex", flexDirection: "column", alignItems: "center",
                                    background: "#3C2A21", borderRadius: 50, border: "none",
                                    paddingTop: 18, paddingBottom: 18,
                                    width: "100%", maxWidth: 600,
                                    marginBottom: 30, cursor: "pointer", alignSelf: 'center'
                                }}>
                                <span style={{ color: "#F6F6F6", fontSize: 16 }} >
                                    {"Create Account"}
                                </span>
                            </button>
                        </form> 
                        
                        <span
                            style={{
                                color: "#1A120B", fontSize: 16, textAlign: "center",
                                width: "100%", maxWidth: 595, padding: "0 5px", boxSizing: "border-box"
                            }} >
                            {"By clicking Create account, you agree to the Guild’s privacy notice, T&Cs and to receive offers, news, and updates"}
                        </span>
                    </div>

                    <div style={{ flexShrink: 1, maxWidth: 1000, width: "100%" }}>
                        <img
                            alt="Fantasy city scene" 
                            src={"dnd__morning_at_human_city__by_bergionstyle_dg4v4aa-fullview.jpg"}
                            style={{
                                width: "100%", height: "auto", maxHeight: 1000, 
                                objectFit: "cover", borderRadius: 8, 
                            }}
                        />
                    </div>
                </div>

                <div style={{ width: "100%", padding: "0 40px", boxSizing: "border-box", marginTop: "auto", textAlign: "center" }}>
                    <p>© ADVENTURER’S GUILD/ALL RIGHTS RESERVED</p>
                </div>
            </div>
        </div>
    );
}