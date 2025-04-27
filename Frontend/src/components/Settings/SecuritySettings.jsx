import React, { useState } from 'react';
import styles from './Settings.module.css';

const SecuritySettings = ({ onSave }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showDevices, setShowDevices] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    onSave({ ...formData, twoFactorEnabled });
  };

  const mockDevices = [
    { id: 1, name: 'iPhone 13', lastActive: '2025-04-24T10:30:00' },
    { id: 2, name: 'Chrome - Windows', lastActive: '2025-04-25T09:15:00' },
    { id: 3, name: 'Firefox - MacBook', lastActive: '2025-04-23T14:20:00' }
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.securitySettings}>
      <section className={styles.passwordSection}>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit} className={styles.passwordForm}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <button type="submit" className={styles.saveButton}>
            Update Password
          </button>
        </form>
      </section>

      <section className={styles.twoFactorSection}>
        <h3>Two-Factor Authentication</h3>
        <div className={styles.twoFactorToggle}>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
            <span className={styles.toggleSlider}></span>
          </label>
          <span>Enable Two-Factor Authentication</span>
        </div>
        {twoFactorEnabled && (
          <p className={styles.twoFactorInfo}>
            Two-factor authentication adds an extra layer of security to your account.
            You'll need to enter a code from your authenticator app when signing in.
          </p>
        )}
      </section>

      <section className={styles.devicesSection}>
        <div className={styles.devicesSectionHeader}>
          <h3>Connected Devices</h3>
          <button
            className={styles.toggleDevices}
            onClick={() => setShowDevices(!showDevices)}
          >
            {showDevices ? 'Hide' : 'Show'} Devices
          </button>
        </div>

        {showDevices && (
          <div className={styles.devicesList}>
            {mockDevices.map(device => (
              <div key={device.id} className={styles.deviceItem}>
                <div className={styles.deviceInfo}>
                  <span className={styles.deviceName}>{device.name}</span>
                  <span className={styles.deviceLastActive}>
                    Last active: {formatDate(device.lastActive)}
                  </span>
                </div>
                <button
                  className={styles.revokeButton}
                  onClick={() => console.log('Revoke device:', device.id)}
                >
                  Revoke Access
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SecuritySettings;