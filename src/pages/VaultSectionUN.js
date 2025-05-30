import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you'll want a button to link to the full vault page

const VAULT_HERO_IMAGE = "https://cdnb.artstation.com/p/assets/images/images/005/722/639/large/jaynorn-lin-background07.jpg?1493283375";

function VaultSectionUN() {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 50, padding: '0 40px', boxSizing: 'border-box', width: '100%', maxWidth: '1800px', flexDirection: 'row-reverse' }}>
      {/* Image Section */}
      <div style={{ flex: 2, minWidth: 0, marginLeft: 40 }}> {/* Image takes more space, pushed right */}
        <img
          src={VAULT_HERO_IMAGE}
          alt="Vault treasure room"
          style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
        />
      </div>

      {/* Text Content for Vault */}
      <div style={{ flex: 1, marginRight: 40, maxWidth: '450px', textAlign: 'right' }}> {/* Text content aligned right */}
        <h2 style={{ fontFamily: "'Cloister Black', serif", color: "#1A120B", fontSize: 80, marginBottom: 20 }}>Vault</h2>
        <p style={{ color: "#1A120B", fontSize: 20, lineHeight: 1.6, marginBottom: 20 }}>
          {"The guild’s Vault System offers a secure haven for adventurers to store their hard-earned treasures, rare artifacts, and excess coin. Only the rightful owner—or those bearing a guild-sanctioned sigil—may access its well-guarded depths."}
        </p>
        <div style={{ textAlign: 'right', marginTop: 20 }}>
          <Link to="/vault" style={{ textDecoration: 'none' }}>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#3C2A21",
                borderRadius: 50,
                border: "none",
                padding: "15px 50px",
                cursor: 'pointer',
                fontWeight: 500,
              }}>
              <span style={{ color: "#F6F6F6", fontSize: 16 }}>
                {"ACCESS YOUR VAULT"}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VaultSectionUN;