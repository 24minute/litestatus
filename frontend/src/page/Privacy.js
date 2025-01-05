import React from "react";
import "./styles/link.css";

const Privacy = () => {
  return (
    <div className="privacy-policy">
      <section className="privacy-policy-header">
        <h1>Privacy Policy</h1>
        <p>We value your privacy and are committed to protecting your personal information.</p>
      </section>
      <section className="privacy-policy-content">
        <div className="privacy-policy-section">
          <h2>Introduction</h2>
          <p>
            At <strong>24minute</strong>, we prioritize the privacy of our visitors.
            This Privacy Policy document outlines the types of personal information
            that we collect and how we use it. By using our website, you consent to
            the practices described in this policy.
          </p>
        </div>
        <div className="privacy-policy-section">
          <h2>Information We Collect</h2>
          <p>
            We collect information in the following ways:
            <ul>
              <li><strong>Personal Information:</strong> When you subscribe to our newsletter, comment on articles, or create an account, we may collect personal information such as your name, email address, and location.</li>
              <li><strong>Usage Data:</strong> We collect data regarding your interactions with our website, such as IP address, browser type, pages visited, and other technical information.</li>
              <li><strong>Cookies:</strong> We use cookies to enhance your experience on our site. Cookies help us remember your preferences and optimize site performance.</li>
            </ul>
          </p>
        </div>
        <div className="privacy-policy-section">
          <h2>How We Use Your Information</h2>
          <p>
            The information we collect may be used for the following purposes:
            <ul>
              <li>Improving our website’s content and user experience.</li>
              <li>Sending newsletters, updates, and promotions (if you’ve opted in).</li>
              <li>Responding to inquiries or feedback.</li>
              <li>Personalizing content and advertising based on your interests.</li>
            </ul>
          </p>
        </div>
        <div className="privacy-policy-section">
          <h2>Your Privacy Choices</h2>
          <p>
            You have the following options to control your privacy preferences:
            <ul>
              <li><strong>Cookies:</strong> You can manage cookie settings in your browser.</li>
              <li><strong>Opt-Out:</strong> You can opt-out of receiving marketing emails by clicking the unsubscribe link in the email.</li>
              <li><strong>Access and Update:</strong> You can access and update your personal information by logging into your account.</li>
            </ul>
          </p>
        </div>
        <div className="privacy-policy-section">
          <h2>Data Security</h2>
          <p>
            We implement a variety of security measures to protect your personal data.
            However, please note that no method of transmission over the Internet or
            electronic storage is 100% secure.
          </p>
        </div>
        <div className="privacy-policy-section">
          <h2>Third-Party Services</h2>
          <p>
            Our website may contain links to third-party sites that are not governed by
            this Privacy Policy. We recommend reviewing the privacy policies of any third-party
            websites before sharing any personal information.
          </p>
        </div>
        <div className="privacy-policy-section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will post the updated
            policy on this page and revise the "Last Updated" date at the top. Please review this page
            periodically to stay informed of any changes.
          </p>
        </div>
       
      </section>
     
    </div>
  );
};

export default Privacy;
