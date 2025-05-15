// MainPage.js
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/PartySectionUN.css';
import './styles/QuestSectionUN.css';

// ----- APP CONTENT -----
function AppHeader() {
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
      </div>
  );
}

// ----- PARTY SECTION -----
const partyData = [
  {
    title: 'The Ironfang Company',
    description: 'A band of seasoned warriors and cunning rogues, known for their fearless approach to battle.',
    image: 'https://preview.redd.it/8qt8f6ckwgm41.jpg?width=1080&crop=smart&auto=webp&s=6350ad428ea7aedb479bd391907c815e169cd0e4',
  },
  {
    title: 'The Emberborn Vanguard',
    description: 'A fire-forged company of knights and battle mages who charge headfirst into danger.',
    image: 'https://cdn.mos.cms.futurecdn.net/YhGFb7pVEdtLBx9jBRtnng-970-80.jpg.webp',
  },
  {
    title: 'The Arcane Seekers',
    description: 'A fellowship of scholars, mages, and relic hunters devoted to uncovering lost knowledge.',
    image: 'https://taverndice.com/cdn/shop/files/BannerTD-01-Update.png?v=1687867488&width=3840.webp',
  },
  {
    title: 'The Silver Serpents',
    description: 'A swift and elusive guild of assassins, spellcasters, and scouts who favor precision over brute force.',
    image: 'https://preview.redd.it/ngudqlxrsbs81.png?width=1080&crop=smart&auto=webp&s=063bdc74bab5e1e2bb396af67141810bafbcd40c',
  },
  {
    title: 'The Emberhearts',
    description: 'A band of daring explorers and monster slayers who brave the wilds for coin and glory.',
    image: 'https://i.pinimg.com/736x/0e/a3/30/0ea33026321288d54da46f22496e3d88.jpg',
  },
];

function PartySection() {
  return (
    <section className="party-section">
      <div className="party-header">
        <h2>Party</h2>
        <p>Gather thy allies and forge a fellowship of strength and skill! The guild’s party system allows adventurers to band together, ensuring greater fortune and glory on their perilous quests.</p>
      </div>

      <div className="party-carousel">
        {partyData.map((party, index) => (
          <div className="party-card" key={index}>
            <img src={party.image} alt={party.title} />
            <h3>{party.title}</h3>
            <p>{party.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----- QUEST SECTION -----
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
    description1: 'A reclusive wizard seeks safe passage through the Cragspire Cliffs. Guard him well—his mind holds secrets that many would kill to steal.',
    image: 'https://i.redd.it/u93tgdewdpnd1.jpeg',
  },
  {
    title: 'Plague Rats of the Undercity',
    description: 'Rank: D/Deadline: 24th of Alturiak, "Claw of Winter" ',
    description1: 'The city sewers have become infested with giant rats carrying a vile sickness. Clear them out before the plague spreads to the surface. ',
    image: 'https://www.enworld.org/attachments/city-sewer_low-glazed-intensity9-render4-v1-png.375460/',
  },
];

function QuestsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeQuest = questData[activeIndex];

  return (
    <section className="quests-section">
      <div className="quests-header">
        <h2>Quests</h2>
        <p>Embark on daring missions across the realm. Choose your path wisely.</p>
      </div>

      <div className="quests-body">
        <div className="quest-details">
          <h3>{activeQuest.title}</h3>
          <p className="quest-meta">{activeQuest.description}</p>
          <p className="quest-desc">{activeQuest.description1}</p>
          <button className="bare-button">Join Quest Party</button>
          <button className="bare-button">Solo Quest</button>
          <button className="rounded-button">Discover More</button>
        </div>

        <div className="quest-carousel">
          <Carousel fade activeIndex={activeIndex} onSelect={setActiveIndex} interval={4000}>
            {questData.map((quest, idx) => (
              <Carousel.Item key={idx}>
                <img className="d-block w-100" src={quest.image} alt={quest.title} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

// ----- MAIN PAGE -----
function MainPage() {
  return (
    <div>
      <AppHeader />
      <PartySection />
      <QuestsSection />
    </div>
  );
}

export default MainPage;
