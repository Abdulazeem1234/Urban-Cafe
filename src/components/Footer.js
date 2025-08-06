import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2><i className="fas fa-utensils"></i> Urban-Cafe</h2>
            <p>Serving delicious chicken specialties since 2025</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Info</h4>
            <p><i className="fas fa-phone"></i> 8073187193</p>
            <p><i className="fas fa-envelope"></i> zubbi216@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Urban-Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
