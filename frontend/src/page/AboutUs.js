import React from "react";
import "./styles/link.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="about-us-header">
        <h1>About Us</h1>
        <p>Learn more about our mission, vision, and what drives us</p>
      </section>

      <section className="about-us-content">
        <div className="about-us-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver accurate, timely, and unbiased news to our
            audience. We strive to keep you informed with the latest updates on
            politics, technology, entertainment, sports, and more, all from
            trusted sources.
          </p>
        </div>
        
        <div className="about-us-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where individuals have easy access to truthful,
            informative, and thought-provoking news, empowering them to make
            educated decisions and engage actively in society.
          </p>
        </div>
        
        <div className="about-us-section">
          <h2>Why Choose Us?</h2>
          <p>
            Our platform provides reliable news that you can trust. We prioritize
            transparency and work with a diverse team of reporters to offer a wide
            range of perspectives. Our readers come first, and we are committed to
            serving you with integrity and professionalism.
          </p>
        </div>

        <div className="about-us-section">
          <h2>Our Team</h2>
          <p>
            Our team is made up of passionate journalists, editors, and content
            creators dedicated to delivering quality news. With years of experience
            in the industry, our professionals work relentlessly to ensure that every
            story we share is accurate, insightful, and relevant.
          </p>
        </div>

        <div className="about-us-section">
          <h2>Our Values</h2>
          <p>
            We are committed to honesty, accuracy, and fairness in every aspect of
            our work. Our values guide us in producing content that is not only
            informative but also engaging and responsible. We believe in the power
            of free and independent journalism to shape a better society.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
