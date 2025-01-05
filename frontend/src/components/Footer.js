import React from "react";
import "./styles/footer.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Card 1: Logo/About Section */}
        <div className="footer-card footer-logo">
          <h2>Lite Status</h2>
          <p>
            Building connections and creating a better online community. Stay
            updated with our latest news and features.
          </p>
        </div>

        <div className="footer-card">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Condition</Link>
            </li>
            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Card 3: Social Media */}
        <div className="footer-card">
          <h3>Follow Us</h3>
          <div className="footer-media">
            <a
              href="https://facebook.com/24minute"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              twitter
            </a>
            <a
              href="https://www.instagram.com/24minutenews/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              instagram
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Your Website Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
