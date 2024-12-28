import React from "react";
import "./styles/footer.css"; // You can add your custom CSS styles in this file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and About Us Section */}
        <div className="footer-logo">
          <h1>NewsWebsite</h1>
          <p>
            Your trusted source for the latest news and updates from around the
            world.
          </p>
        </div>

        {/* Navigation Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/news">News</a>
            </li>
            <li>
              <a href="/features">Features</a>
            </li>
            <li>
              <a href="/sports">Sports</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Stay Updated Section */}
        <div className="footer-newsletter">
          <h3>Stay Updated</h3>
          <p>Get the latest headlines delivered straight to your inbox.</p>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Social Media Links Section */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section with Copyright */}
      <div className="footer-bottom">
        <p>© 2024 NewsWebsite. All rights reserved.</p>
        <p>Website by YourCompany</p>
      </div>
    </footer>
  );
};

export default Footer;
