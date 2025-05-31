import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/ExampleCarouselImage'; // Make sure this path is correct
import '../styles/QuestSectionUN.css'; // Make sure this path is correct
import axios from 'axios';

// Removed the hardcoded questData

function QuestSectionUN() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quests, setQuests] = useState([]); // State to hold quests fetched from backend
  const [loadingQuests, setLoadingQuests] = useState(true);
  const [questsError, setQuestsError] = useState('');

  useEffect(() => {
    const fetchQuests = async () => {
      setLoadingQuests(true);
      setQuestsError('');
      try {
        const response = await axios.get('http://localhost:3001/api/all-quests');
        // Filter out completed quests if your backend doesn't do it
        // Assuming 'completed' is a boolean or 0/1
        const uncompletedQuests = response.data.filter(quest => !quest.completed || quest.completed === 0);
        setQuests(uncompletedQuests);
      } catch (err) {
        console.error("Failed to fetch quests:", err);
        setQuestsError("Failed to load quests. " + (err.response?.data?.message || err.message));
      } finally {
        setLoadingQuests(false);
      }
    };

    fetchQuests();
  }, []); // Empty dependency array means this runs once on mount

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  if (loadingQuests) {
    return (
      <div className="quests-section" style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading quests...</p>
      </div>
    );
  }

  if (questsError) {
    return (
      <div className="quests-section" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <p>{questsError}</p>
      </div>
    );
  }

  if (quests.length === 0) {
    return (
      <div className="quests-section" style={{ textAlign: 'center', padding: '50px' }}>
        <p>No active quests available at the moment. Check back later!</p>
      </div>
    );
  }

  // Ensure activeIndex is within bounds
  const currentActiveIndex = activeIndex < quests.length ? activeIndex : 0;
  const activeQuest = quests[currentActiveIndex];

  // If after all checks, activeQuest is somehow undefined (e.g., quests array became empty after initial load)
  if (!activeQuest) {
      return (
          <div className="quests-section" style={{ textAlign: 'center', padding: '50px' }}>
              <p>No quest data to display.</p>
          </div>
      );
  }

  return (
    <div className="quests-section">
      <div className="quests-header">
        <h2>Quests</h2>
        <p>Brave souls may take on quests ranging from simple errands to perilous adventures, each offering coin, glory, or rare treasures. Whether slaying beasts, retrieving lost relics, or aiding townsfolk, every quest shapes the legend of those who dare to accept it!</p>
      </div>

      <div className="quests-body">
        <div className="quest-details">
          {/* Use data from the fetched 'activeQuest' */}
          <h3>{activeQuest.title}</h3>
          {/* Adapt these fields based on your backend's quest object structure */}
          <p className="quest-meta">
            Rank: {activeQuest.difficulty_rating} | Deadline: {activeQuest.deadline ? new Date(activeQuest.deadline).toLocaleDateString() : 'N/A'}
          </p>
          <p className="quest-desc">{activeQuest.description}</p>
          {/* You might want to connect these buttons to the logic from QuestsPage (handleQuestCompletion) */}
          <button className="bare-button">Join Quest Party</button>
          <button className="bare-button">Solo Quest</button>
          <button className="rounded-button">Discover More</button>
        </div>

        <div className="quest-carousel">
          <Carousel fade activeIndex={currentActiveIndex} onSelect={handleSelect} interval={4000}>
            {quests.map((quest, idx) => (
              <Carousel.Item key={quest.quest_id || idx} style={{ display: 'flex', flexDirection: 'column' }}> {/* Added flex container */}
                <div style={{ flex: '0 0 auto' }}> {/* Ensures the image takes up only necessary height and stays at the top */}
                  <ExampleCarouselImage
                    src={quest.quest_image_url || quest.image}
                    text={quest.title}
                    style={{ objectFit: 'contain', maxHeight: '400px', width: '100%' }} // Adjust maxHeight as needed
                  />
                </div>
                <Carousel.Caption style={{ backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "0 0 10px 10px", marginTop: 'auto' }}> {/* Pushes caption to the bottom */}
                  <h3 style={{ fontSize: "1.5rem" }}>{quest.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default QuestSectionUN;