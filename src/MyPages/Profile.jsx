import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Jaya from './Jaya.jpg';  // Add this import

const Profile = () => {
  const [profileData, setProfileData] = useState({
    email: 'jaya@example.com',
    birthday: '1990-01-01',
    phone: '+1234567890',
    city: 'New York',
    password: ''
  });

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={Jaya} alt="Profile" />
          <button className="change-photo-btn">
            Change Photo
          </button>
        </div>
      </div>
      
      <form className="profile-form">
        <input
          type="email"
          placeholder="Email"
          value={profileData.email}
          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
        />
        <input
          type="date"
          value={profileData.birthday}
          onChange={(e) => setProfileData({...profileData, birthday: e.target.value})}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={profileData.phone}
          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
        />
        <input
          type="text"
          placeholder="City"
          value={profileData.city}
          onChange={(e) => setProfileData({...profileData, city: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={profileData.password}
          onChange={(e) => setProfileData({...profileData, password: e.target.value})}
        />
        <button type="submit" className="update-profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;