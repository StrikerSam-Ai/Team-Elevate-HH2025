import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    age: 25,
    location: 'New York',
    interests: ['Programming', 'Reading', 'Travel']
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-image-section">
        <div className="profile-image">
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <div className="placeholder-image">
              <span>Upload Image</span>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="image-upload"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="upload-button">
          Choose Photo
        </label>
      </div>

      <div className="profile-details">
        <h2>{userData.name}</h2>
        <div className="detail-item">
          <span className="label">Age:</span>
          <span>{userData.age}</span>
        </div>
        <div className="detail-item">
          <span className="label">Location:</span>
          <span>{userData.location}</span>
        </div>
        <div className="detail-item">
          <span className="label">Interests:</span>
          <div className="interests-list">
            {userData.interests.map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;