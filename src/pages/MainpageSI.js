import React, { useState, useEffect } from "react"; // useEffect might still be used for other purposes
import { Link, useNavigate } from "react-router-dom";
// import useQuestStore from "../components/QuestCarousel"; // Removed as QuestsSection manages its own state

// Import axios if needed for other parts of MainPageSI, otherwise can be removed if only for quests
// import axios from 'axios';

// Import the dynamic PartySection component
import PartySection from './PartySectionUN'; // Adjust path if necessary

// Import the new Vault section component for the main page
import VaultSectionUN from './VaultSectionUN'; // Adjust path as needed

// NEW: Import the QuestsSection component
import QuestsSection from './QuestSectionUN'; // Adjust path if necessary (e.g., '../components/QuestsSection')

export default function MainPageSI(props) {
    // activeIndex and setActiveIndex from useQuestStore are removed as QuestsSection handles its own.
    // If useQuestStore is used for other carousels, you can keep it.

    const [input1, onChangeInput1] = useState('');
    const navigate = useNavigate();

    // Quest fetching logic (availableQuests, loadingQuests, questsError, and related useEffect)
    // is REMOVED from MainPageSI, as QuestsSection now handles this internally.

    // The 'currentQuest' logic is also removed as QuestsSection will display active quest details.

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
                    background: "#F6F6F6",
                    padding: "0 20px 20px 20px",
                }}>
                {/* Header Navigation Section */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: "1800px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px 40px",
                        boxSizing: "border-box",
                        background: "#FFFFFF",
                        borderBottom: "1px solid #E0E0E0"
                    }}>
                    <div style={{display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap"}}>
                        <Link to="/joinparty" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>PARTY</Link>
                        <Link to="/quests" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>QUESTS</Link>
                        <Link to="/vault" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>VAULT</Link>
                        <Link to="/inventory" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>INVENTORY</Link>
                        <Link to="/news" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>NEWS</Link>
                    </div>

                    <Link to="/MainSI" style={{ flexGrow: 1, textAlign: 'center' }}>
                        <img
                            alt="Guild Home"
                            src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/2lvzpgcl_expires_30_days.png"}
                            style={{ width: 70, height: 70, objectFit: "fill", display: 'inline-block' }}
                        />
                    </Link>

                    <button
                        style={{
                            background: "#3C2A21", color: "#F6F6F6", fontSize: 16,
                            borderRadius: 50, border: "none", padding: "12px 28px",
                            cursor: 'pointer', fontWeight: 500
                        }}
                        onClick={()=>navigate("/profile")}>
                        {"Profile"}
                    </button>
                </div>

                {/* Hero Image Section */}
                <img
                    alt="Adventurer's Guild Banner"
                    src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/1d4wwee2_expires_30_days.png"}
                    style={{
                        height: "auto",
                        maxHeight: "600px",
                        width: "100%",
                        marginBottom: 50,
                        objectFit: "cover",
                    }}
                />

                {/* Welcome Text Section */}
                <div style={{maxWidth: '1200px', padding: '0 20px', textAlign: 'center', marginBottom: 50}}>
                    <span
                        style={{
                            color: "#1A120B",
                            fontSize: 32,
                            lineHeight: 1.6,
                        }} >
                        {"Welcome to the Adventurer's Guild, home to bold explorers and treasure hunters! Here you can form parties, take on exciting quests, and store your hard-earned rewards in our secure vaults. We welcome all adventurers, from solo travelers to experienced groups, to embark on epic journeys and build their legacies!"}
                    </span>
                </div>

                <div style={{ height: 1, width: 'calc(100% - 80px)', maxWidth: '1200px', background: "#1A120B", marginBottom: 50 }} />

                {/* Dynamic Party Section Added Here */}
                <div style={{ width: '100%', maxWidth: '1600px', padding: '0 20px', boxSizing: 'border-box', marginBottom: 50 }}>
                    <PartySection />
                </div>

                <div style={{ height: 1, width: 'calc(100% - 80px)', maxWidth: '1200px', background: "#1A120B", marginBottom: 50 }} />

                {/* NEW: Vault Section for Main Page */}
                <VaultSectionUN />
                {/* END NEW SECTION */}

                <div style={{ height: 1, width: 'calc(100% - 80px)', maxWidth: '1200px', background: "#1A120B", marginBottom: 50 }} />

                {/* MODIFIED: Quest Section - Now using the QuestsSection component */}
                <div style={{ width: '100%', maxWidth: '1800px', padding: '0 20px', boxSizing: 'border-box', marginBottom: 50 }}>
                    {/* The previous detailed layout for quest text on the left and carousel on the right
                      is now encapsulated within the QuestsSection component.
                      QuestsSection will handle its own layout, data fetching, and display.
                    */}
                    <QuestsSection />
                </div>
                {/* END MODIFIED Quest Section */}


                {/* "DISCOVER MORE QUESTS" button can remain if you want a prominent CTA below the QuestsSection */}
                {/* Alternatively, if QuestsSection has its own "Discover More" that's sufficient, you might remove this one */}
                <div style={{width: '100%', maxWidth: '1800px', padding: '0 40px', boxSizing: 'border-box', textAlign: 'center', marginTop: 0, marginBottom: 50}}>
                     {/* Centered the button for better consistency if QuestsSection is centered */}
                    <button
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#3C2A21",
                            borderRadius: 50,
                            border: "none",
                            padding: "15px 100px",
                            textAlign: "center",
                            cursor: "pointer" // Added cursor pointer
                        }}
                        onClick={()=>navigate("/quests")}>
                        <span style={{ color: "#F6F6F6", fontSize: 16 }} >
                            {"DISCOVER MORE QUESTS"}
                        </span>
                    </button>
                </div>

                {/* Footer Section */}
                <div style={{ width: "100%", padding: "20px 40px", boxSizing: "border-box", marginTop: "auto", background:"#FFFFFF", borderTop: "1px solid #E0E0E0" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "40px", justifyContent: "space-around", padding: "30px 0" }}>
                        <span style={{ color: "#1A120B", fontSize: 32, fontWeight: "bold", flexBasis: '100%', textAlign: 'center', marginBottom: 20 }} >
                            ADVENTURER’S GUILD
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            {/* Corrected HOME link to /mainSI or / based on your routing for home */}
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
                                <input
                                    placeholder={"YOUR EMAIL"}
                                    type="email"
                                    value={input1}
                                    onChange={(event)=>onChangeInput1(event.target.value)}
                                    style={{ color: "#1A120B", fontSize: 16, flex: 1, background: "none", border: "none", padding: "15px 0px 15px 25px", boxSizing: "border-box", outline: "none"}}
                                />
                                <img alt="Submit Newsletter" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/axua6xtv_expires_30_days.png"} style={{ width: 40, height: 40, objectFit: "fill", cursor: "pointer" }} onClick={() => alert("Newsletter signup for: " + input1)} />
                            </div>
                        </div>
                    </div>
                    <img alt="Footer banner" src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/xhxsa3jd_expires_30_days.png"} style={{ height: "auto", maxHeight: 200, margin: "30px auto", display:'block', width: "100%", maxWidth:"1200px", objectFit: "cover" }}/>
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
    );
}