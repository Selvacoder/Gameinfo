// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';  // Import a separate CSS file for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            <li><Link to="/careers" className="footer-link">Careers</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms" className="footer-link">Terms and Conditions</Link></li>
            <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: <a href="mailto:info@gameproject.com" className="footer-link">info@gameproject.com</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Your Game Project. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
