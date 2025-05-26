// MainPageUN.js - MODIFIED

import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/ExampleCarouselImage'; // Ensure path is correct
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useQuestStore from "../components/QuestCarousel"; // Ensure path is correct

// 1. Import the PartySection component
import PartySection from './PartySectionUN'; // Adjust path if necessary

// Your existing static questData for the Carousel
const questData = [
  {
    title: "A Merchant's Misfortune",
    description: 'Rank: C | Deadline: 27th of Alturiak, “Claw of Winter” ',
    description1: 'A traveling merchant was ambushed by bandits along the King’s Road, losing both his wares and his guards. Recover his stolen goods and, if possible, make sure the scoundrels regret their deeds.',
    image: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2024/11/untitled-design-22.jpg?q=49&fit=crop&w=825&dpr=2',
  },
  {
    title: 'Ale and Antics',
    description: 'Rank: D/Deadline: 3rd of Ches, "The Claw of Sunsets" ',
    description1: 'The local tavern is in dire need of a bard for their festival, but none have answered the call. If ye have a way with song or tale, come forth and earn a handsome reward in coin and cheer! ',
    image: 'https://www.telegraph.co.uk/content/dam/gaming/2018/09/18/The-Bards-Tale-game_trans_NvBQzQNjv4BqNJjoeBT78QIaYdkJdEY4CnGTJFJS74MYhNY6w3GNbO8.jpg?imwidth=1920',
  },
  {
    title: 'Escort the Arcane',
    description: 'Rank: B/Deadline: 15th of Ches, "The Claw of Sunsets" ',
    description1: 'A reclusive wizard seeks safe passage through the Cragspire Cliffs. Guard him well-his mind holds secrets that many would kill to steal.',
    image: 'https://i.redd.it/u93tgdewdpnd1.jpeg',
  },
  {
    title: 'Plague Rats of the Undercity',
    description: 'Rank: D/Deadline: 24th of Alturiak, "Claw of Winter" ',
    description1: 'The city sewers have become infested with giant rats carrying a vile sickness. Clear them out before the plague spreads to the surface. ',
    image: 'https://www.enworld.org/attachments/city-sewer_low-glazed-intensity9-render4-v1-png.375460/',
  },
];

export default function MainPageUN() { // Renamed from MainPageSI to match your provided code
  const activeIndex = useQuestStore(state => state.activeIndex);
  const setActiveIndex = useQuestStore(state => state.setActiveIndex);
  
  const [input1, onChangeInput1] = useState(''); // For newsletter in footer
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
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
                    minHeight: "100vh", // Use minHeight for responsiveness
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center content horizontally
                    // background: "#F6F6F6", // Moved background to specific sections if needed
                }}>
                {/* Header Navigation Section */}
                <div 
                    style={{
                        width: "100%", 
                        maxWidth: "100%", // Allow header to be full width
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px 40px",
                        boxSizing: "border-box",
                        background: "#FFFFFF", 
                        borderBottom: "1px solid #E0E0E0"
                    }}>
                    <div style={{display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap"}}>
                        <Link to="/joinparty" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>JOIN PARTY</Link>
                        <Link to="/quests" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>QUESTS</Link>
                        <Link to="/vault" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>VAULT</Link>
                        <Link to="/inventory" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>INVENTORY</Link>
                        {/* Removed profile from this side, it's on the right */}
                    </div>
                    
                    {/* Central Logo */}
                    {/* To truly center it, it often needs to be outside the flex space-between or use absolute positioning carefully */}
                    <Link to="/" style={{ flexGrow: 1, textAlign: 'center', margin: '0 20px' }}> 
                        <img
                            alt="Guild Home"
                            src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/2lvzpgcl_expires_30_days.png"} 
                            style={{ width: 70, height: 70, objectFit: "fill", display: 'inline-block' }}
                        />
                    </Link>

                    <div style={{display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap"}}>
                        <Link to="/news" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>NEWS</Link>
                        <button 
                            style={{
                                background: "#3C2A21", color: "#F6F6F6", fontSize: 16,
                                borderRadius: 50, border: "none", padding: "12px 28px", 
                                cursor: 'pointer', fontWeight: 500
                            }}
                            onClick={()=>navigate("/profile")}>
                            {"Profile"}
                        </button>
                         {/* Login/Signup buttons if user is not authenticated */}
                         {/* This requires logic to check auth state */}
                        <button style={{background: "#D5CEA3",color: "#1A120B",fontSize: 16, borderRadius: 50,border: "none",padding: "12px 28px",cursor: 'pointer', fontWeight: 500}} onClick={()=>navigate("/login")}>
                            {"Login"}
                        </button>
                        <button style={{background: "#704F4F", color: "#F6F6F6", fontSize: 16, borderRadius: 50, border: "none", padding: "12px 28px", cursor: 'pointer', fontWeight: 500}} onClick={()=>navigate("/signup")}>
                            {"Sign Up"}
                        </button>
                    </div>
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
                
                <div style={{ height: 1, width: 'calc(100% - 80px)', maxWidth: '1200px', background: "#1A120B", marginBottom: 50, alignSelf: 'center' }} />

                {/* Dynamic Party Section Rendered Here */}
                <div style={{ width: '100%', maxWidth: '1600px', padding: '0 20px', boxSizing: 'border-box', marginBottom: 50 }}>
                    <PartySection />
                </div>
                
                <div style={{ height: 1, width: 'calc(100% - 80px)', maxWidth: '1200px', background: "#1A120B", marginBottom: 50, alignSelf: 'center' }} />

                {/* Quest Carousel Section */}
                <div style={{display: "flex", alignItems: "center", justifyContent: 'center', flexWrap: 'wrap', marginBottom: 50, padding: '0 20px', boxSizing: 'border-box', width: '100%', maxWidth: '1800px', gap: '40px'}}>
                    <div style={{ flexBasis: '450px', flexGrow: 1, minWidth: '300px', marginRight: '20px' }}> {/* Text content for quests */}
                        <h2 style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", fontSize: 72, textAlign: 'left' }}>Quests</h2>
                        <p style={{ color: "#1A120B", fontSize: 18, lineHeight: 1.6, marginBottom: 20, textAlign: 'left' }}>
                            {"Brave souls may take on quests ranging from simple errands to perilous adventures, each offering coin, glory, or rare treasures. Whether slaying beasts, retrieving lost relics, or aiding townsfolk, every quest shapes the legend of those who dare to accept it!"}
                        </p>
                        <div style={{borderTop: '1px solid #1A120B', paddingTop: 20, marginBottom: 20}}>
                             <h3 style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", fontSize: 28, marginBottom: 5 }}>
                                {questData[activeIndex].title}
                             </h3>
                             <p style={{ color: "#1A120B", fontSize: 12, marginBottom: 15 }}>
                                {questData[activeIndex].description}
                             </p>
                             <p style={{ color: "#1A120B", fontSize: 16, marginBottom: 25, lineHeight: 1.5 }}>
                                {questData[activeIndex].description1}
                             </p>
                        </div>
                        <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
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
                    <div style={{ flexBasis: '60%', flexGrow: 2, maxWidth: '1270px', minWidth: '300px' }}> {/* Carousel takes remaining space */}
                        <Carousel 
                            fade 
                            activeIndex={activeIndex} 
                            onSelect={handleSelect} 
                            interval={4000}
                            style={{ maxHeight: '600px' }}
                            >
                            {questData.map((quest, idx) => (
                                <Carousel.Item key={idx} style={{ height: "600px" }}>
                                    <ExampleCarouselImage 
                                        src={quest.image} 
                                        alt={quest.title} 
                                        style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: 10 }}
                                    />
                                     <Carousel.Caption style={{backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "0 0 10px 10px", padding: "15px"}}>
                                        <h3 style={{fontSize: "1.75rem"}}>{quest.title}</h3>
                                     </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
                
                 <div style={{width: '100%', maxWidth: '1200px', textAlign: 'center', marginTop: 20, marginBottom: 70}}>
                     <button 
                        style={{
                            background: "#3C2A21", color: "#F6F6F6", fontSize: 18, fontWeight: 'bold',
                            borderRadius: 50, border: "none", padding: "18px 100px", 
                            cursor: "pointer",
                        }}
                        onClick={()=>navigate("/quests")}>
                        {"DISCOVER MORE QUESTS"}
                    </button>
                </div>

                {/* Footer Section */}
                <div style={{ width: "100%", padding: "20px 40px", boxSizing: "border-box", marginTop: "auto", background:"#FFFFFF", borderTop: "1px solid #E0E0E0" }}>
                    {/* ... (Your full footer JSX, input1 is for newsletter) ... */}
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