import React, { useState } from 'react';
import styles from './About.module.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.contactSection}>
      <div className={styles.contactInfo}>
        <h2>Get in Touch</h2>
        <p className={styles.contactText}>
          Have questions about our community? We'd love to hear from you. 
          Send us a message and we'll respond as soon as possible.
        </p>

        <div className={styles.contactMethods}>
          <div className={styles.contactMethod}>
            <span className={styles.methodIcon}>📍</span>
            <div>
              <h3>Visit Us</h3>
              <p>123 Community Ave<br />Seattle, WA 98101</p>
            </div>
          </div>

          <div className={styles.contactMethod}>
            <span className={styles.methodIcon}>📞</span>
            <div>
              <h3>Call Us</h3>
              <p>1-800-SENIORS<br />Monday - Friday, 9am - 5pm PST</p>
            </div>
          </div>

          <div className={styles.contactMethod}>
            <span className={styles.methodIcon}>📧</span>
            <div>
              <h3>Email Us</h3>
              <p>contact@seniorsconnect.com<br />support@seniorsconnect.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contactForm}>
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.formInput}
              placeholder="Your name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.formInput}
              placeholder="Your email address"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={styles.formInput}
              placeholder="What is this about?"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.formTextarea}
              placeholder="Your message"
              rows={6}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;