import React, { useState } from 'react';
import styles from './Settings.module.css';

const PrivacySettings = ({ onSave }) => {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    journalVisibility: 'friends',
    activityVisibility: 'public',
    searchable: true,
    showAge: true,
    showLocation: true,
    allowDirectMessages: true,
    blockList: []
  });

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlockedUser = (action, userId) => {
    if (action === 'add') {
      // Mock implementation - would integrate with API
      setSettings(prev => ({
        ...prev,
        blockList: [...prev.blockList, { id: Date.now(), name: 'User Name' }]
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        blockList: prev.blockList.filter(user => user.id !== userId)
      }));
    }
  };

  return (
    <div className={styles.privacySettings}>
      <section className={styles.privacySection}>
        <h3>Profile Visibility</h3>
        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>Who can see your profile?</label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => handleChange('profileVisibility', e.target.value)}
            className={styles.select}
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>

        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>Journal Entries Visibility</label>
          <select
            value={settings.journalVisibility}
            onChange={(e) => handleChange('journalVisibility', e.target.value)}
            className={styles.select}
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>

        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>Activity Visibility</label>
          <select
            value={settings.activityVisibility}
            onChange={(e) => handleChange('activityVisibility', e.target.value)}
            className={styles.select}
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>
      </section>

      <section className={styles.privacySection}>
        <h3>Profile Information</h3>
        <div className={styles.checkboxOptions}>
          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={settings.searchable}
              onChange={(e) => handleChange('searchable', e.target.checked)}
            />
            <span>Allow others to find me in search</span>
          </label>

          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={settings.showAge}
              onChange={(e) => handleChange('showAge', e.target.checked)}
            />
            <span>Show my age on my profile</span>
          </label>

          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={settings.showLocation}
              onChange={(e) => handleChange('showLocation', e.target.checked)}
            />
            <span>Show my location on my profile</span>
          </label>

          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={settings.allowDirectMessages}
              onChange={(e) => handleChange('allowDirectMessages', e.target.checked)}
            />
            <span>Allow direct messages</span>
          </label>
        </div>
      </section>

      <section className={styles.privacySection}>
        <h3>Blocked Users</h3>
        <div className={styles.blockedUsers}>
          {settings.blockList.length > 0 ? (
            <div className={styles.blockList}>
              {settings.blockList.map(user => (
                <div key={user.id} className={styles.blockedUser}>
                  <span>{user.name}</span>
                  <button
                    onClick={() => handleBlockedUser('remove', user.id)}
                    className={styles.unblockButton}
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noBlocked}>No blocked users</p>
          )}
          <button
            onClick={() => handleBlockedUser('add')}
            className={styles.blockUserButton}
          >
            Block a User
          </button>
        </div>
      </section>

      <div className={styles.saveButtonContainer}>
        <button 
          onClick={() => onSave(settings)}
          className={styles.saveButton}
        >
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;