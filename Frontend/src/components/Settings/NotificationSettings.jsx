import React, { useState } from 'react';
import styles from './Settings.module.css';

const NotificationSettings = ({ onSave }) => {
  const [settings, setSettings] = useState({
    email: {
      general: true,
      events: true,
      journal: true,
      messages: true,
      mentions: true
    },
    push: {
      general: true,
      events: false,
      journal: true,
      messages: true,
      mentions: true
    },
    frequency: 'immediate'
  });

  const handleToggle = (type, setting) => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: !prev[type][setting]
      }
    }));
  };

  const handleFrequencyChange = (e) => {
    setSettings(prev => ({
      ...prev,
      frequency: e.target.value
    }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className={styles.notificationSettings}>
      <section className={styles.notificationSection}>
        <h3>Email Notifications</h3>
        <div className={styles.notificationOptions}>
          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.email.general}
              onChange={() => handleToggle('email', 'general')}
            />
            <span>General Updates</span>
          </label>
          
          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.email.events}
              onChange={() => handleToggle('email', 'events')}
            />
            <span>Event Reminders</span>
          </label>

          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.email.journal}
              onChange={() => handleToggle('email', 'journal')}
            />
            <span>Journal Entry Reminders</span>
          </label>

          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.email.messages}
              onChange={() => handleToggle('email', 'messages')}
            />
            <span>New Messages</span>
          </label>

          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.email.mentions}
              onChange={() => handleToggle('email', 'mentions')}
            />
            <span>Mentions</span>
          </label>
        </div>
      </section>

      <section className={styles.notificationSection}>
        <h3>Push Notifications</h3>
        <div className={styles.notificationOptions}>
          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.push.general}
              onChange={() => handleToggle('push', 'general')}
            />
            <span>General Updates</span>
          </label>
          
          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.push.events}
              onChange={() => handleToggle('push', 'events')}
            />
            <span>Event Reminders</span>
          </label>

          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.push.journal}
              onChange={() => handleToggle('push', 'journal')}
            />
            <span>Journal Entry Reminders</span>
          </label>

          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.push.messages}
              onChange={() => handleToggle('push', 'messages')}
            />
            <span>New Messages</span>
          </label>

          <label className={styles.notificationOption}>
            <input
              type="checkbox"
              checked={settings.push.mentions}
              onChange={() => handleToggle('push', 'mentions')}
            />
            <span>Mentions</span>
          </label>
        </div>
      </section>

      <section className={styles.notificationSection}>
        <h3>Notification Frequency</h3>
        <div className={styles.frequencySelect}>
          <select
            value={settings.frequency}
            onChange={handleFrequencyChange}
            className={styles.select}
          >
            <option value="immediate">Immediate</option>
            <option value="hourly">Hourly Digest</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Digest</option>
          </select>
        </div>
      </section>

      <div className={styles.saveButtonContainer}>
        <button onClick={handleSave} className={styles.saveButton}>
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;