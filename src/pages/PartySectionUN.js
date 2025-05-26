// PartySection.js - FULL MODIFIED CODE

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate on party card click
import axios from 'axios';
import '../styles/PartySectionUN.css'; // Assuming your CSS path is correct

// Default image if a party doesn't have one specified in the database
const DEFAULT_PARTY_IMAGE = 'https://media.istockphoto.com/id/1399318216/vector/round-icon-spartan-helmet.jpg?s=612x612&w=0&k=20&c=PWKk1b8Xm7THDlgYS_9qyi3ShUxL3VGtaEVJK0wgGF0=';

function PartySection() {
    const [availableParties, setAvailableParties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvailableParties = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:3001/api/parties');
                setAvailableParties(response.data);
            } catch (err) {
                console.error("Failed to fetch available parties:", err);
                setError("Could not load available parties. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvailableParties();
    }, []);

    // Navigate to the main PartyPage where users can see details or join
    // Or, you could navigate to a specific party detail page: /party/:partyId
    const handlePartyCardClick = (partyId) => {
        navigate('/joinparty'); // Or navigate(`/party/${partyId}`);
    };

    if (isLoading) {
        return <div className="party-section-loading">Loading parties...</div>;
    }

    if (error) {
        return <div className="party-section-error">{error}</div>;
    }

    return (
        <div className="party-section">
            <div className="party-header">
                <h2>Parties</h2>
                <p>Gather thy allies and forge a fellowship of strength and skill! Explore active parties below or create your own.</p>
            </div>

            {availableParties.length > 0 ? (
                <div className="party-carousel">
                    {availableParties.map((party) => (
                        <div 
                            className="party-card" 
                            key={party.party_id} 
                            onClick={() => handlePartyCardClick(party.party_id)}
                            title={`Click to learn more or join "${party.party_name}"`}
                        >
                            <img 
                                src={party.image_url || DEFAULT_PARTY_IMAGE} 
                                alt={party.party_name} 
                                onError={(e) => { e.target.onerror = null; e.target.src=DEFAULT_PARTY_IMAGE; }} // Fallback for broken image links
                            />
                            <h3>{party.party_name}</h3>
                            <p className="party-card-description">{party.description || "No description available."}</p>
                            <div className="party-card-info">
                                <span>Leader: {party.leader_name || "N/A"}</span>
                                <span>Members: {party.current_member_count}{party.max_members ? `/${party.max_members}` : ''}</span>
                            </div>
                            {/* You could add a more direct "Join" button here if PartyPage handles direct joining via URL params or state */}
                            {/* For now, clicking the card navigates to the main PartyPage */}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-parties-available">
                    <p>No active parties available to join at the moment. Why not create one?</p>
                    {/* Optionally, add a Link here to your CreatePartyPage */}
                    {/* <Link to="/createparty" className="create-party-link">Create a Party</Link> */}
                </div>
            )}
        </div>
    );
}

export default PartySection;