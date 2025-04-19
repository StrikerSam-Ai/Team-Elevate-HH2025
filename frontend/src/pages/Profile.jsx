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
    </div>
  );
};

export default Profile;