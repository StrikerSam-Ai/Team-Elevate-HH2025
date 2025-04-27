import React, { useState } from 'react';
import styles from './Profile.module.css';

const UserInfo = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    interests: user?.interests?.join(', ') || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      interests: formData.interests.split(',').map(i => i.trim())
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.userInfo}>
      <div className={styles.userHeader}>
        <div className={styles.userAvatar}>
          {/* User avatar will go here */}
        </div>
        <div className={styles.userMeta}>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.editInput}
              placeholder="Your name"
            />
          ) : (
            <h2 className={styles.userName}>{user?.name || 'User Name'}</h2>
          )}
          <span className={styles.userStatus}>
            Member since {new Date(user?.joinDate).getFullYear() || 'N/A'}
          </span>
        </div>
        <button
          className={styles.editButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label htmlFor="bio" className={styles.formLabel}>Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={styles.formTextarea}
              placeholder="Tell us about yourself"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.formLabel}>Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Your location"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="interests" className={styles.formLabel}>Interests</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Interests (comma-separated)"
            />
          </div>

          <button type="submit" className={styles.saveButton}>
            Save Changes
          </button>
        </form>
      ) : (
        <div className={styles.userDetails}>
          <p className={styles.userBio}>{user?.bio || 'No bio yet'}</p>
          
          <div className={styles.userLocation}>
            <span className={styles.locationIcon}>📍</span>
            {user?.location || 'No location set'}
          </div>

          <div className={styles.userInterests}>
            <h3>Interests</h3>
            <div className={styles.interestTags}>
              {user?.interests?.map((interest, index) => (
                <span key={index} className={styles.interestTag}>
                  {interest}
                </span>
              )) || 'No interests added'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;