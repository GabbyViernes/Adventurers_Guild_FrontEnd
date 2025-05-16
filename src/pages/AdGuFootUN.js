import React from 'react';
import '../styles/AdGuFootUN.css';
import { FaArrowRight, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function AdventurersFooter() {
  return (
    <footer className="guild-footer">
      <div className="footer-top">
        <div className="footer-col left">
          <h2>Adventurers Guild</h2>
        </div>

        <div className="footer-col center">
          <ul className="footer-menu">
            <li>Home</li>
            <li>Party</li>
            <li>Quests</li>
            <li>Vault</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-col right">
          <p>Sign up to our newsletter</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button><FaArrowRight /></button>
          </div>
        </div>
      </div>

      <div className="footer-image">
        <img
          src="https://images.unsplash.com/photo-1570733068067-afeaeb7b4b23"
          alt="Fantasy landscape"
        />
      </div>

      <div className="footer-bottom">
        <div className="bottom-left">© Adventurers Guild — All rights reserved</div>
        <div className="bottom-center">Terms and Conditions</div>
        <div className="bottom-right">
          <FaFacebook className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaInstagram className="social-icon" />
        </div>
      </div>
    </footer>
  );
}

export default AdventurersFooter;
