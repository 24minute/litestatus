import React, { useState } from "react";
import axios from "axios";
import "./styles/link.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/contact`,
        formData
      );

      if (response.data.message) {
        setStatusMessage("Your message has been sent!");
      } else {
        setStatusMessage(response.data.error || "An error occurred.");
      }
    } catch (err) {
      setStatusMessage("An error occurred.");
    }
  };

  return (
    <div className="contact-us">
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Please fill out the form below to get in
          touch with us.
        </p>
      </section>

      <section className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </section>

      <section className="contact-details">
        <h2>Our Contact Information</h2>
        <p>If you prefer, you can also reach us via the following methods:</p>
        <ul>
          <li>
            Email: <strong>litestatuses@gmail.com</strong>
          </li>
          <li>
            Phone: <strong>(91) 8799125864</strong>
          </li>
          <li>
            Address: 
            <strong>
              C-312 Sajavat palace, Shilpa park society, SURAT, INDIA
            </strong>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ContactUs;
