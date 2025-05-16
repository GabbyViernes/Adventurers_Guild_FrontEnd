import React,{ useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './pages/PartySectionUN';
import PartySection from './pages/PartySectionUN';
import './pages/QuestSectionUN';
import QuestSection from './pages/QuestSectionUN';
import './pages/VaultSectionUN';
import VaultSection from './pages/VaultSectionUN';
import AdventurersFooter from './pages/AdGuFootUN';


function App() {

    const partyRef = useRef(null);
  
    const scrollToParty = () => {
      if (partyRef.current) {
        partyRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
  return (
    <div className="app">
      {/* Megamenu */}
      <div className="megamenu">
        <div className="megamenu-left">
          <a href="#">Join Party</a>
          <a href="#">Quest</a>
          <a href="#">Vault</a>
          <a href="#">Inventory</a>
        </div>
        <div className="megamenu-center">
        <img src="/image 3.png" alt="Logo" className='Logo' />
        </div>
        <div className="megamenu-right">
          <button className="auth-button">Login</button>
          <button className="auth-button">Signup</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-banner">
        <img
          src="https://cdnb.artstation.com/p/assets/images/images/023/555/595/large/guillermo-martinez-port-city.jpg?1579597659"
          alt=" "
        />
      </div>

      {/* Description */}
      <div className="description">
        <h2></h2>
        <p>Welcome to the Adventurer's Guild, home to bold explorers and treasure hunters! Here you can form parties, take on exciting quests, and store your hard-earned rewards in our secure vaults. We welcome all adventurers, from solo travelers to experienced groups, to embark on epic journeys and build their legacies!</p>
      </div>
      
      <div ref={partyRef}>
  <PartySection />
</div>
      <div ref={partyRef}>
  <QuestSection />
</div>
      <div ref={partyRef}>
  <VaultSection />
</div>
      <div ref={partyRef}>
  <AdventurersFooter />
  </div>

    

</div>
  );
}

export default App;
