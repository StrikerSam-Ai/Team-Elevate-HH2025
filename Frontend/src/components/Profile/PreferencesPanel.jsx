import React, { useState } from 'react';
import styles from './Profile.module.css';

const PreferencesPanel = ({ preferences, onSave }) => {
  const [formData, setFormData] = useState({
    emailNotifications: preferences?.emailNotifications || false,
    eventReminders: preferences?.eventReminders || false,
    messageNotifications: preferences?.messageNotifications || false,
    journalReminders: preferences?.journalReminders || false,
    privacy: preferences?.privacy || 'public',
    language: preferences?.language || 'en',
    fontSize: preferences?.fontSize || 'medium',
    theme: preferences?.theme || 'light'
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.preferencesPanel}>
      <h3 className={styles.panelTitle}>Preferences</h3>

      <form onSubmit={handleSubmit} className={styles.preferencesForm}>
        <div className={styles.preferencesSection}>
          <h4>Notifications</h4>
          
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleChange}
              />
              Email Notifications
            </label>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="eventReminders"
                checked={formData.eventReminders}
                onChange={handleChange}
              />
              Event Reminders
            </label>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="messageNotifications"
                checked={formData.messageNotifications}
                onChange={handleChange}
              />
              Message Notifications
            </label>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="journalReminders"
                checked={formData.journalReminders}
                onChange={handleChange}
              />
              Journal Reminders
            </label>
          </div>
        </div>

        <div className={styles.preferencesSection}>
          <h4>Privacy</h4>
          
          <div className={styles.selectGroup}>
            <label htmlFor="privacy" className={styles.selectLabel}>
              Profile Visibility
            </label>
            <select
              id="privacy"
              name="privacy"
              value={formData.privacy}
              onChange={handleChange}
              className={styles.selectInput}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div className={styles.preferencesSection}>
          <h4>Accessibility</h4>
          
          <div className={styles.selectGroup}>
            <label htmlFor="language" className={styles.selectLabel}>
              Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className={styles.selectInput}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div className={styles.selectGroup}>
            <label htmlFor="fontSize" className={styles.selectLabel}>
              Font Size
            </label>
            <select
              id="fontSize"
              name="fontSize"
              value={formData.fontSize}
              onChange={handleChange}
              className={styles.selectInput}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className={styles.selectGroup}>
            <label htmlFor="theme" className={styles.selectLabel}>
              Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className={styles.selectInput}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <button type="submit" className={styles.saveButton}>
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default PreferencesPanel;