import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/ExampleCarouselImage'; // Assuming this is for your quest carousel
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useQuestStore from "../components/QuestCarousel"; // Assuming this is for your quest carousel

// Import the dynamic PartySection component
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

export default function MainPageSI(props) {
  const activeIndex = useQuestStore(state => state.activeIndex);
  const setActiveIndex = useQuestStore(state => state.setActiveIndex);
  
  const [input1, onChangeInput1] = useState(''); // This seems to be for the newsletter in the footer
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

    return (
        <div 
            style={{
                display: "flex",
                flexDirection: "column",
                background: "#FFFFFF", // Main background for the entire page
            }}>
            <div 
                style={{
                    // height: 4324, // Avoid fixed large heights, let content define it
                    minHeight: "100vh",
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center content horizontally
                    background: "#F6F6F6", // Background for the content area below header
                }}>
                {/* Header Navigation Section */}
                <div 
                    style={{
                        width: "100%", // Header takes full width
                        maxWidth: "1800px", // Max width for header content
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // Distribute items
                        padding: "20px 40px", // Padding for header
                        boxSizing: "border-box",
                        background: "#FFFFFF", // White background for header
                        borderBottom: "1px solid #E0E0E0" // Slight border for separation
                    }}>
                    <div style={{display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap"}}>
                        {/* Use Link component for navigation */}
                        <Link to="/joinparty" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>PARTY</Link>
                        <Link to="/quests" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>QUESTS</Link>
                        <Link to="/vault" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>VAULT</Link>
                        <Link to="/inventory" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>INVENTORY</Link>
                        <Link to="/news" style={{textDecoration: 'none', color: '#1A120B', fontSize: 16, fontWeight: 500}}>NEWS</Link>
                    </div>
                    
                    {/* Central Logo - can be adjusted if it overlaps with centered items */}
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
                    alt="Adventurer's Guild Banner" // Added alt text
                    src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/1d4wwee2_expires_30_days.png"} 
                    style={{
                        height: "auto", // Make height auto for responsiveness
                        maxHeight: "600px", // Limit max height
                        width: "100%", // Make image take full width of its container
                        marginBottom: 50, // Adjusted margin
                        objectFit: "cover", // Use cover for better image scaling
                    }}
                />

                {/* Welcome Text Section */}
                <div style={{maxWidth: '1200px', padding: '0 20px', textAlign: 'center', marginBottom: 50}}>
                    <span 
                        style={{
                            color: "#1A120B",
                            fontSize: 32, // Adjusted for readability
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


                {/* Quest Carousel Section */}
                <div style={{display: "flex", alignItems: "center", marginBottom: 50, padding: '0 40px', boxSizing: 'border-box', width: '100%', maxWidth: '1800px'}}>
                    <div style={{ flex: 1, marginRight: 40, maxWidth: '450px' }}> {/* Text content for quests */}
                        <h2 style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", fontSize: 80 }}>Quests</h2>
                        <p style={{ color: "#1A120B", fontSize: 20, lineHeight: 1.6, marginBottom: 20 }}>
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
                    <div style={{ flex: 2, minWidth: 0 }}> {/* Carousel takes remaining space */}
                        <Carousel 
                            fade 
                            activeIndex={activeIndex} 
                            onSelect={handleSelect} 
                            interval={4000}
                            style={{ maxHeight: '600px' }} // Constrain carousel height
                            >
                            {questData.map((quest, idx) => (
                                <Carousel.Item key={idx} style={{ height: "600px" }}>
                                    <ExampleCarouselImage 
                                        src={quest.image} 
                                        alt={quest.title} // Changed text to alt for accessibility
                                        style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: 10 }}
                                    />
                                     <Carousel.Caption style={{backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "0 0 10px 10px"}}>
                                        <h3 style={{fontSize: "1.5rem"}}>{quest.title}</h3>
                                        {/* <p>{quest.description}</p> */}
                                     </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
                
                {/* Button below carousel (Your original positioning was a bit unusual, adjusted slightly) */}
                 <div style={{width: '100%', maxWidth: '1800px', padding: '0 40px', boxSizing: 'border-box', textAlign: 'left', marginTop: 20, marginBottom: 50}}>
                     <button 
                        style={{
                            display: "inline-flex", // Changed to inline-flex
                            alignItems: "center", // Center items in button
                            justifyContent: "center",
                            background: "#3C2A21",
                            borderRadius: 50,
                            border: "none",
                            padding: "15px 100px", // Adjusted padding
                            textAlign: "center",
                        }}
                        onClick={()=>navigate("/quests")}>
                        <span style={{ color: "#F6F6F6", fontSize: 16 }} >
                            {"DISCOVER MORE QUESTS"}
                        </span>
                    </button>
                </div>


                {/* Footer Section (input1 is now newsletterEmailInput for clarity) */}
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
                                    value={input1} // Assuming input1 is for newsletter here
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