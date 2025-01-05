import React from "react";
import "./styles/link.css";

const Terms = () => {
  return (
    <div className="terms-and-conditions">
      <section className="terms-header">
        <h1>Terms and Conditions</h1>
        <p>Read our terms and conditions carefully before using our services.</p>
      </section>

      <section className="terms-content">
        <div className="terms-section">
          <h2>Introduction</h2>
          <p>
            By accessing or using [Your News Website], you agree to comply with and be bound by these Terms and Conditions.
            If you do not agree to these terms, please refrain from using our website.
          </p>
        </div>

        <div className="terms-section">
          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, images, videos, and graphics, is the intellectual property of
            [Your News Website]. Unauthorized use of any content is prohibited without prior written consent.
          </p>
        </div>

        <div className="terms-section">
          <h2>User Responsibilities</h2>
          <ul>
            <li>Ensure that any information you provide is accurate and up to date.</li>
            <li>You are responsible for maintaining the confidentiality of your account details.</li>
            <li>Refrain from using our website for illegal or harmful activities.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>Privacy</h2>
          <p>
            Your privacy is important to us. Please refer to our <strong>Privacy Policy</strong> for information on how we collect and use
            your personal data.
          </p>
        </div>

        <div className="terms-section">
          <h2>Limitation of Liability</h2>
          <p>
            [Your News Website] is not liable for any damages or losses arising from the use or inability to use the website or its content.
            We do not guarantee the accuracy, completeness, or timeliness of the information provided.
          </p>
        </div>

        <div className="terms-section">
          <h2>Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from the use
            of this website will be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
          </p>
        </div>

        <div className="terms-section">
          <h2>Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. When we do, we will post the updated terms on this page and revise the
            "Last Updated" date at the top.
          </p>
        </div>

        
      </section>

    
    </div>
  );
};

export default Terms;
