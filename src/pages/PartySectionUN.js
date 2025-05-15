import React from 'react';
import '../styles/PartySectionUN.css';

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
    
    <div className="party-section">
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
    </div>
  );
}

export default PartySection;
