import React, { useState, useEffect } from "react"; // Added useEffect
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/ExampleCarouselImage'; // Assuming this component exists
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useQuestStore from "../components/QuestCarousel"; // Assuming this handles carousel state
import axios from 'axios'; // Import axios for API calls

// Import the dynamic PartySection component
import PartySection from './PartySectionUN'; // Adjust path if necessary

// NEW: Import the new Vault section component for the main page
import VaultSectionUN from './VaultSectionUN'; // Adjust path as needed

export default function MainPageSI(props) {
    const activeIndex = useQuestStore(state => state.activeIndex);
    const setActiveIndex = useQuestStore(state => state.setActiveIndex);

    const [input1, onChangeInput1] = useState('');
    const navigate = useNavigate();

    // NEW: State to hold quests fetched from the backend
    const [availableQuests, setAvailableQuests] = useState([]);
    const [loadingQuests, setLoadingQuests] = useState(true);
    const [questsError, setQuestsError] = useState('');

    // Fetch quests from the backend when the component mounts
    useEffect(() => {
        const fetchQuests = async () => {
            setLoadingQuests(true);
            setQuestsError('');
            try {
                const response = await axios.get('http://localhost:3001/api/all-quests');
                // Filter for uncompleted quests to display in the carousel
                const uncompleted = response.data.filter(q => q.completed === 0);
                setAvailableQuests(uncompleted);
            } catch (err) {
                console.error("Failed to fetch quests for carousel:", err);
                setQuestsError("Failed to load quests for display. " + (err.response?.data?.message || err.message));
            } finally {
                setLoadingQuests(false);
            }
        };

        fetchQuests();
    }, []); // Empty dependency array means this runs once on mount

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    // Determine the current quest for display in the text area
    // Ensure activeIndex doesn't go out of bounds if quests are still loading or none available
    const currentQuest = availableQuests[activeIndex] || {
        title: "No Quests Available",
        description: "Check back later!",
        description1: "There are no active quests currently posted on the board. Perhaps all adventurers are busy, or new challenges have yet to emerge from the wilds.",
        image: "https://via.placeholder.com/1200x600?text=No+Quests+Available" // Fallback image
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

                {/* Quest Carousel Section */}
                <div style={{display: "flex", alignItems: "center", marginBottom: 50, padding: '0 40px', boxSizing: 'border-box', width: '100%', maxWidth: '1800px'}}>
                    <div style={{ flex: 1, marginRight: 40, maxWidth: '450px' }}>
                        <h2 style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", fontSize: 80 }}>Quests</h2>
                        <p style={{ color: "#1A120B", fontSize: 20, lineHeight: 1.6, marginBottom: 20 }}>
                            {"Brave souls may take on quests ranging from simple errands to perilous adventures, each offering coin, glory, or rare treasures. Whether slaying beasts, retrieving lost relics, or aiding townsfolk, every quest shapes the legend of those who dare to accept it!"}
                        </p>
                        {loadingQuests && <p style={{ color: '#555', fontSize: 18 }}>Loading quests...</p>}
                        {questsError && <p style={{ color: 'red', fontSize: 18 }}>Error: {questsError}</p>}

                        {!loadingQuests && availableQuests.length > 0 && (
                            <div style={{borderTop: '1px solid #1A120B', paddingTop: 20, marginBottom: 20}}>
                                <h3 style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", fontSize: 28, marginBottom: 5 }}>
                                    {currentQuest.title}
                                </h3>
                                <p style={{ color: "#1A120B", fontSize: 12, marginBottom: 15 }}>
                                    Rank: {currentQuest.difficulty_rating} | Deadline: {currentQuest.deadline ? new Date(currentQuest.deadline).toLocaleDateString() : 'N/A'}
                                </p>
                                <p style={{ color: "#1A120B", fontSize: 16, marginBottom: 25, lineHeight: 1.5 }}>
                                    {currentQuest.description}
                                </p>
                            </div>
                        )}
                        {!loadingQuests && availableQuests.length === 0 && (
                             <div style={{borderTop: '1px solid #1A120B', paddingTop: 20, marginBottom: 20}}>
                                <h3 style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", fontSize: 28, marginBottom: 5 }}>
                                    No Active Quests
                                </h3>
                                <p style={{ color: "#1A120B", fontSize: 16, marginBottom: 25, lineHeight: 1.5 }}>
                                    There are no active quests currently posted on the board. Check back later for new challenges!
                                </p>
                            </div>
                        )}
                        <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                            <button onClick={() => navigate("/quests")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                                <span style={{ fontFamily: "'Neue Montreal', sans-serif", color: "#1A120B", fontSize: 20, fontWeight: "bold", textDecoration: "underline" }}>
                                    {"Join Quest Party"}
                                </span>
                            </button>
                            <button onClick={() => navigate("/quests")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                                <span style={{ fontFamily: "'Neue Montreal', sans-serif", color: "#1A120B", fontSize: 20, fontWeight: "bold", textDecoration: "underline" }}>
                                    {"Solo Quest"}
                                </span>
                            </button>
                        </div>
                    </div>
                    <div style={{ flex: 2, minWidth: 0 }}>
                        {loadingQuests ? (
                            <div style={{ height: "600px", display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#e0e0e0', borderRadius: 10 }}>
                                <p>Loading carousel...</p>
                            </div>
                        ) : availableQuests.length > 0 ? (
                            <Carousel
                                fade
                                activeIndex={activeIndex}
                                onSelect={handleSelect}
                                interval={4000}
                                style={{ maxHeight: '600px' }}
                                >
                                {availableQuests.map((quest, idx) => (
                                    <Carousel.Item key={quest.quest_id} style={{ height: "600px" }}>
                                        <ExampleCarouselImage
                                            src={quest.reward_item_image_url || 'https://via.placeholder.com/1200x600?text=Quest+Image'} // Use reward item image or placeholder
                                            alt={quest.title}
                                            style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: 10 }}
                                        />
                                       <Carousel.Caption style={{backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "0 0 10px 10px"}}>
                                            <h3 style={{fontSize: "1.5rem"}}>{quest.title}</h3>
                                       </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ) : (
                            <div style={{ height: "600px", display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#e0e0e0', borderRadius: 10 }}>
                                <p>No quests to display in the carousel.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{width: '100%', maxWidth: '1800px', padding: '0 40px', boxSizing: 'border-box', textAlign: 'left', marginTop: 20, marginBottom: 50}}>
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