import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div className="community-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/event-finder">Event Finder</Link>
          <Link to="/community" className="active">Community</Link>
          <Link to="/about">About Us</Link>
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

        <button className="video-call-btn">Video Call</button>
      </section>
    </div>
  );
};

export default Community;