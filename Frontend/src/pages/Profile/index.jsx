import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="page profile-page">
      <header className="page-header">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Manage your personal information and preferences</p>
      </header>

      <main className="page-content">
        {/* Profile Overview */}
        <section className="profile-section">
          <div className="profile-header">
            <div className="profile-avatar">
              {/* Avatar component will go here */}
            </div>
            <div className="profile-info">
              <h2>Personal Information</h2>
              <button 
                className="edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="profile-details">
            {/* Profile form or details will go here */}
          </div>
        </section>

        {/* Preferences Section */}
        <section className="profile-section">
          <h2>Preferences</h2>
          <div className="preferences-grid">
            {/* Preference toggles will go here */}
          </div>
        </section>

        {/* Connected Accounts */}
        <section className="profile-section">
          <h2>Connected Accounts</h2>
          <div className="accounts-list">
            {/* Connected accounts will go here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;