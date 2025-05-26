import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link was already imported
import axios from 'axios'; // Ensure axios is imported

export default function LoginPage(props) {
    const [input1, onChangeInput1] = useState(''); // Email
    const [input2, onChangeInput2] = useState(''); // Password
    const [input3, onChangeInput3] = useState(''); // For newsletter input in footer
    
    const navigate = useNavigate();
    
    // The 'credentials' state object is not strictly necessary if input1 and input2 are used directly
    // const [credentials, setCredentials] = useState({
    //  email: '',
    //  password: ''
    // });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginCredentials = {
            email: input1,
            password: input2
        };

        console.log('Attempting to login with:', loginCredentials); // Log what's being sent

        try {
            const response = await axios.post('http://localhost:3001/api/login', loginCredentials);
            
            console.log('Login API Response:', response.data); // Crucial for debugging!

            // Check if the response has the expected structure
            if (response.data && response.data.user && (response.data.user.id || response.data.user.userId || response.data.user.member_id)) {
                // Store user information in localStorage
                // The ProfilePage will look for 'loggedInUser' and expect an object with an id/userId/member_id
                localStorage.setItem('loggedInUser', JSON.stringify(response.data.user)); 
                console.log('User info saved to localStorage:', response.data.user);

                alert('Login successful! Navigating to main page...');
                navigate('/MainSI'); // Navigate after successful login and saving user info

            } else {
                // Backend responded successfully (HTTP 2xx) but the data isn't what we expect
                console.error('Login API response was successful but did not contain expected user data or user ID.');
                alert('Login failed: Unexpected response format from server. Please check console.');
            }

        } catch (error) {
            console.error('Login request failed:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                alert(`Login failed: ${error.response.data.message || 'Invalid credentials or server error.'}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request data:', error.request);
                alert('Login failed: No response from server. Please check if the server is running.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                alert('Login failed: An error occurred. Please try again.');
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
                    alignItems: "center", 
                }}>
                <div 
                    style={{
                        display: "flex",
                        alignItems: "flex-start", 
                        justifyContent: "center", 
                        flexWrap: "wrap", 
                        gap: "40px", 
                        padding: "50px 20px", 
                        width: "100%",
                        maxWidth: "1600px", 
                        boxSizing: "border-box",
                    }}>
                    {/* Login Form Section */}
                    <div 
                        style={{
                            flexShrink: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center", 
                            marginTop: 20,
                            width: "100%",
                            maxWidth: "750px", 
                        }}>
                        <img
                            alt="Guild Logo"
                            src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/56tzgjza_expires_30_days.png"} 
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
                                marginBottom: 70,
                            }}>
                            <img
                                alt="Login Title"
                                src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/42h41jdl_expires_30_days.png"} 
                                style={{
                                    width: 365,
                                    maxWidth: "100%",
                                    height: "auto",
                                    marginBottom: 20,
                                    objectFit: "contain",
                                }}
                            />
                            {/* The "Sign up for free!" text was likely from the signup page, removed here */}
                        </div>
                        <input
                            placeholder={"Email"}
                            type="email" 
                            value={input1}
                            onChange={(event)=>onChangeInput1(event.target.value)}
                            style={{
                                color: "#1A120B",
                                fontSize: 20,
                                marginBottom: 15,
                                background: "none",
                                borderRadius: 10,
                                border: `1px solid #1A120B`,
                                padding: 13,
                                width: "100%", 
                                maxWidth: 700,
                                boxSizing: "border-box",
                            }}
                        />
                        <input
                            placeholder={"Password"}
                            type="password" 
                            value={input2}
                            onChange={(event)=>onChangeInput2(event.target.value)}
                            style={{
                                color: "#1A120B",
                                fontSize: 20,
                                marginBottom: 30,
                                background: "none",
                                borderRadius: 10,
                                border: `1px solid #1A120B`,
                                padding: 13,
                                width: "100%", 
                                maxWidth: 700,
                                boxSizing: "border-box",
                            }}
                        />
                        <button 
                            style={{
                                display: "flex",
                                justifyContent: "center", 
                                alignItems: "center",
                                background: "#3C2A21", // Changed background for better contrast/action color
                                color: "#FFFFFF", // Text color for button
                                borderRadius: 50,
                                border: "none",
                                paddingTop: 18,
                                paddingBottom: 18,
                                marginBottom: 40,
                                width: "100%",
                                maxWidth: 700,
                                cursor: "pointer",
                                fontSize: 16,
                            }}
                            onClick={handleSubmit}> 
                            <span >
                                {"Continue"}
                            </span>
                        </button>
                        <div 
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginBottom: 40,
                            }}>
                            <span 
                                style={{
                                    color: "#1A120B",
                                    fontSize: 16,
                                }} >
                                {"OR"}
                            </span>
                        </div>
                        <button 
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#3C2A21E3",
                                borderRadius: 50,
                                border: "none",
                                paddingTop: 18,
                                paddingBottom: 18,
                                marginBottom: 15,
                                width: "100%",
                                maxWidth: 700,
                                textAlign: "center", 
                                cursor: "pointer",
                            }}
                            onClick={()=>navigate("/signup")}>
                            <span 
                                style={{
                                    color: "#F6F6F6",
                                    fontSize: 16,
                                }} >
                                {"Create New Account"}
                            </span>
                        </button>
                        <button 
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "none",
                                borderRadius: 50,
                                border: `1px solid #1A120B`,
                                paddingTop: 16,
                                paddingBottom: 16,
                                marginBottom: 15,
                                width: "100%",
                                maxWidth: 700,
                                cursor: "pointer",
                            }}
                            onClick={()=>alert("Google Sign-In - Not Implemented")}>
                            <span 
                                style={{
                                    color: "#1A120B",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginRight: 10,
                                }} >
                                {"Sign in with"} 
                            </span>
                            <img
                                alt="Google logo"
                                src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/00fmhnbs_expires_30_days.png"} 
                                style={{
                                    width: 46,
                                    height: 23,
                                    objectFit: "fill",
                                }}
                            />
                        </button>
                        <button 
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "none",
                                borderRadius: 50,
                                border: `1px solid #1A120B`,
                                paddingTop: 16,
                                paddingBottom: 16,
                                marginBottom: 30,
                                width: "100%",
                                maxWidth: 700,
                                cursor: "pointer",
                            }}
                            onClick={()=>alert("Facebook Sign-In - Not Implemented")}>
                            <span 
                                style={{
                                    color: "#1A120B",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginRight: 10,
                                }} >
                                {"Sign in with"}
                            </span>
                            <img
                                alt="Facebook logo"
                                src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ss20qpdg_expires_30_days.png"} 
                                style={{
                                    width: 45,
                                    height: 23,
                                    objectFit: "fill",
                                }}
                            />
                        </button>
                    </div>
                    
                    {/* Decorative Image Section */}
                    <div style={{ flexShrink: 1, maxWidth: 865, width: "100%" }}>
                        <img
                            alt="Fantasy city decorative"
                            src={"dnd__morning_at_human_city__by_bergionstyle_dg4v4aa-fullview.jpg"} 
                            style={{
                                width: "100%",
                                height: "auto", 
                                maxHeight: "800px", 
                                objectFit: "cover",
                                borderRadius: 8,
                            }}
                        />
                    </div>
                </div>

                {/* Footer Section */}
                <div style={{ width: "100%", padding: "0 40px", boxSizing: "border-box", marginTop: "auto" }}>
                    <div 
                        style={{
                            height: 1,
                            alignSelf: "stretch",
                            background: "#1A120B",
                            marginBottom: 60,
                        }}>
                    </div>
                    <div 
                        style={{
                            alignSelf: "stretch",
                            display: "flex",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: "40px",
                            marginBottom: 86,
                            justifyContent: "space-around",
                        }}>
                        <span 
                            style={{
                                color: "#1A120B",
                                fontSize: 32,
                                fontWeight: "bold",
                            }} >
                            {"ADVENTURER’S GUILD"}
                        </span>
                        <div 
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                            }}>
                            <span style={{ color: "#1A120B", fontSize: 20, fontWeight: "bold", marginBottom: 4, }} > {"HOME"} </span>
                            <span style={{ color: "#1A120B", fontSize: 20, fontWeight: "bold", marginBottom: 4, }} > {"PARTY"} </span>
                            <span style={{ color: "#1A120B", fontSize: 20, fontWeight: "bold", marginBottom: 4, }} > {"QUESTS"} </span>
                            <span style={{ color: "#1A120B", fontSize: 20, fontWeight: "bold", marginBottom: 4, }} > {"VAULT"} </span>
                            <span style={{ color: "#1A120B", fontSize: 20, fontWeight: "bold", }} > {"CONTACT"} </span>
                        </div>
                        <div 
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                minWidth: "300px",
                            }}>
                            <div 
                                style={{
                                    alignSelf: "stretch",
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    marginBottom: 22,
                                }}>
                                <span style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginRight: 10 }} > {"SIGN UP"} </span>
                                <span style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold", marginRight: 10 }} > {"TO OUR"} </span>
                                <span style={{ color: "#1A120B", fontSize: 28, fontWeight: "bold" }} > {"NEWSLETTER"} </span>
                            </div>
                            <div 
                                style={{
                                    alignSelf: "stretch",
                                    display: "flex", // For aligning input and potential button
                                    alignItems: "center",
                                    background: "#E5E5CB",
                                    borderRadius: 50,
                                    paddingRight: 10, // Space for a button if added
                                }}>
                                <input 
                                    placeholder={"YOUR EMAIL"}
                                    type="email"
                                    value={input3} // For newsletter in footer
                                    onChange={(event)=>onChangeInput3(event.target.value)}
                                    style={{
                                        color: "#1A120B",
                                        fontSize: 20,
                                        flex: 1,
                                        background: "none",
                                        border: "none",
                                        padding: "20px 0px 20px 40px", // Adjusted padding
                                        boxSizing: "border-box",
                                        outline: "none",
                                    }}
                                />
                                {/* The image for submitting newsletter was here, you can re-add if needed */}
                                {/* <img alt="Submit newsletter" src={"..."} /> */}
                            </div>
                        </div>
                    </div>
                    <img
                        alt="Footer banner"
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/tzmlqmew_expires_30_days.png"} 
                        style={{
                            height: "auto",
                            maxHeight: 308,
                            marginBottom: 60,
                            width: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <div 
                        style={{
                            alignSelf: "stretch",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "20px",
                            marginBottom: 44,
                            justifyContent: "space-between",
                        }}>
                        <span style={{ color: "#1A120B", fontSize: 12, fontWeight: "bold" }} > {"© ADVENTURER’S GUILD/\nALL RIGHTS RESERVED"} </span>
                        <span style={{ color: "#1A120B", fontSize: 12, fontWeight: "bold" }} > {"TERMS AND CONDITIONS"} </span>
                        <div style={{ display: "flex", alignItems: "center", gap: "20px", }}>
                            <span style={{ color: "#1A120B", fontSize: 12, fontWeight: "bold" }} > {"FACEBOOK"} </span>
                            <span style={{ color: "#1A120B", fontSize: 12, fontWeight: "bold" }} > {"INSTAGRAM"} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}