import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/ExampleCarouselImage';
import '../styles/QuestSectionUN.css';

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

function QuestsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const activeQuest = questData[activeIndex];
  
  return (
    <div className="quests-section">
      <div className="quests-header">
        <h2>Quests</h2>
        <p>Brave souls may take on quests ranging from simple errands to perilous adventures, each offering coin, glory, or rare treasures. Whether slaying beasts, retrieving lost relics, or aiding townsfolk, every quest shapes the legend of those who dare to accept it!</p>
      </div>

      <div className="quests-body">
        <div className="quest-details">
          <h3>{questData[activeIndex].title}</h3>
          <p className="quest-meta">{activeQuest.description}</p>
          <p className="quest-desc">{activeQuest.description1}</p>
          <button className="bare-button">Join Quest Party</button>
          <button className="bare-button">Solo Quest</button>
          <button className="rounded-button">Discover More</button>
        </div>

        <div className="quest-carousel">
        <Carousel fade activeIndex={activeIndex} onSelect={handleSelect} interval={4000}>
            {questData.map((quest, idx) => (
              <Carousel.Item key={idx}>
                <ExampleCarouselImage src={quest.image} text={quest.title} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default QuestsSection;
