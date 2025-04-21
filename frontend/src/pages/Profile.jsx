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
    try {
      const response = await axios.put('/api/profile/', profile);
      setProfile(response.data);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      {message && <div className="success-message">{message}</div>}
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Interests:</label>
            <textarea
              name="interests"
              value={profile.interests}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="save-button">Save</button>
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
        <div className="profile-info">
          <div className="info-group">
            <label>Name:</label>
            <p>{profile.name}</p>
          </div>

          <div className="info-group">
            <label>Email:</label>
            <p>{profile.email}</p>
          </div>

          <div className="info-group">
            <label>Age:</label>
            <p>{profile.age}</p>
          </div>

          <div className="info-group">
            <label>Interests:</label>
            <p>{profile.interests}</p>
          </div>

          <div className="info-group">
            <label>Bio:</label>
            <p>{profile.bio}</p>
          </div>

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
