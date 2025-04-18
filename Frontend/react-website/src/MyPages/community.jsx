import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Community = () => {
  const [connections, setConnections] = useState({
    total: 36,
    new: 3,
    requests: [
      { id: 1, name: 'Jaya', isConnected: false },
      { id: 2, name: 'Kamala', isConnected: false }
    ]
  });

  const [people] = useState([
    { id: 1, name: 'Suresh', place: 'Medinipore', age: 67 },
    { id: 2, name: 'Geeta', place: 'Burdwan', age: 65 },
    { id: 3, name: 'Namita', place: 'Khidirpur', age: 70 }
  ]);

  const handleConnect = (personId) => {
    setConnections(prev => ({
      ...prev,
      requests: prev.requests.map(req =>
        req.id === personId ? { ...req, isConnected: true } : req
      )
    }));
  };

  const handleRemove = (personId) => {
    setConnections(prev => ({
      ...prev,
      requests: prev.requests.filter(req => req.id !== personId)
    }));
  };

  // Add this function after your other state and handlers
  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  const navigate = useNavigate();

  return (
    <div className="community-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/community" className="active">Community</Link>
          <Link to="/events">Events</Link>
        </div>
      </nav>

      {/* Community Header */}
      <section className="community-header">
        <h1>COMMUNITY</h1>
        <div className="community-intro">
          <p>“Welcome to your community space! Connect with fellow users, see who's following you, and manage your friend requests — all in one place.”</p>
        </div>
      </section>

      {/* People Cards */}
      <section className="people-grid">
        {people.map(person => (
          <div key={person.id} className="person-card">
            <div className="avatar"></div>
            <h3>{person.name}</h3>
            <p>Place: {person.place}</p>
            <p>age: {person.age}</p>
            <button className="connect-btn">Connect</button>
          </div>
        ))}
      </section>

      {/* Connections Section */}
      <section className="connections-section">
        <div className="connections-header">
          <h2>Your Connections</h2>
          <div className="connections-stats">
            <p>Total: {connections.total}</p>
            <p>New: {connections.new}</p>
          </div>
        </div>

        <div className="new-requests">
          <h3>New Request</h3>
          {connections.requests.map(request => (
            <div key={request.id} className="request-item">
              <div className="avatar-small"></div>
              <span>{request.name}</span>
              <div className="request-buttons">
                <button 
                  className={`connect-btn ${request.isConnected ? 'connected' : ''}`}
                  onClick={() => handleConnect(request.id)}
                >
                  {request.isConnected ? 'Connected' : 'Connect'}
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemove(request.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* <button className="video-call-btn">Video Call</button> */}
      </section>

      {/* Groups Section */}
      <section className="groups-container">
        {/* Find Groups Section */}
        <div className="find-groups">
          <><h2>Find your groups</h2><div className="groups-grid">
            {[
              {
                id: 1,
                name: 'Morning Walkers',
                members: 45,
                category: 'Health',
                description: 'Join fellow early birds for daily morning walks and health discussions.'
              },
              {
                id: 2,
                name: 'Book Club',
                members: 28,
                category: 'Reading',
                description: 'Weekly book discussions and reading recommendations for literature lovers.'
              },
              {
                id: 3,
                name: 'Gardening Club',
                members: 32,
                category: 'Hobby',
                description: 'Share gardening tips and grow your green thumb with other plant enthusiasts.'
              }
            ].map(group => (
              <div key={group.id} className="group-card">
                <div className="group-image"></div>
                <h3>{group.name}</h3>
                <p className="group-members">{group.members} members</p>
                <p className="group-category">Category: {group.category}</p>
                <p className="group-description">{group.description}</p>
                <button className="join-btn">Join Group</button>
              </div>
            ))}
          </div></>
        </div>

        {/* Your Groups Section */}
        <div className="your-groups">
          <><h2>Your groups</h2><div className="group-list">
            {[
              { id: 1, name: 'Yoga Group', members: 25, lastActive: '2 hours ago' },
              { id: 2, name: 'Chess Club', members: 15, lastActive: '1 day ago' }
            ].map(group => (
              <div key={group.id} className="group-item">
                <div className="group-item-image"></div>
                <div className="group-item-info">
                  <h3>{group.name}</h3>
                  <p>{group.members} members</p>
                  <p>Last active: {group.lastActive}</p>
                </div>
                <div className="group-item-actions">
                  <button
                    className="view-group-btn"
                    onClick={() => handleGroupClick(group.id)} // Now this will work
                  >
                    View Group
                  </button>
                </div>
              </div>
            ))}
          </div></>
        </div>
      </section>
    </div>
  );
};

export default Community;