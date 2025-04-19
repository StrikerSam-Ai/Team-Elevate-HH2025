<<<<<<< HEAD:frontend/src/pages/Profile.jsx
// frontend/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import './style.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    age: '',
    interests: '',
    bio: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile/');
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      // Get CSRF token
      const tokenResponse = await axios.get('/get-csrf-token/');
      const csrfToken = tokenResponse.data.csrfToken;
      
      // Submit profile update
      const response = await axios.post('/api/profile/', profile, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        }
      });
      
      if (response.data.success) {
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        fetchProfile(); // Refresh profile data
      } else {
        setMessage('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      {message && <div className="message">{message}</div>}
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
              disabled
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={profile.age || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="interests">Interests:</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={profile.interests || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio || ''}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          
          <div className="button-group">
            <button type="submit" className="submit-button">Save Changes</button>
            <button 
              type="button" 
              className="cancel-button" 
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name || 'Not set'}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.age && <p><strong>Age:</strong> {profile.age}</p>}
          {profile.interests && <p><strong>Interests:</strong> {profile.interests}</p>}
          {profile.bio && (
            <div>
              <p><strong>Bio:</strong></p>
              <p className="bio-text">{profile.bio}</p>
            </div>
          )}
          
          <button 
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
=======
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
>>>>>>> 80d9ef0d5dab9ef00ce5fe8b19b03a87ca4e474d:Frontend/react-website/src/MyPages/Profile.jsx
    </div>
  );
};

<<<<<<< HEAD:frontend/src/pages/Profile.jsx
export default Profile;
=======
export default ProfilePage;
>>>>>>> 80d9ef0d5dab9ef00ce5fe8b19b03a87ca4e474d:Frontend/react-website/src/MyPages/Profile.jsx
