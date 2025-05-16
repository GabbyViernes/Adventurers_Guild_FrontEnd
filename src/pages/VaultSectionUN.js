import React from 'react';
import '../styles/VaultSectionUN.css';

function VaultSection() {
  return (
    <div className="vault-section">
      <div className="vault-left">
        <h2>Vault</h2>
        <div className="vault-description">
          <p>
            The guild’s Vault System offers a secure haven for adventurers to store their hard-earned treasures,
            rare artifacts, and excess coin. Only the rightful owner—or those bearing a guild-sanctioned sigil—
            may access its well-guarded depths.
          </p>
          <button className="rounded-button">Discover More</button>
        </div>
      </div>

      <div className="vault-right">
        <img
          src="https://cdnb.artstation.com/p/assets/images/images/005/722/639/large/jaynorn-lin-background07.jpg?1493283375" // Replace with your actual vault image
          alt="Vault treasure room"
          className="vault-image"
        />
        
      </div>
    </div>
  );
}

export default VaultSection;
