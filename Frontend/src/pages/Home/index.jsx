import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to ElderHub</h1>
          <p className="hero-subtitle">Your community for active and connected senior living</p>
          <p className="hero-description">Join a vibrant community of seniors who are embracing technology to stay connected, 
             share experiences, and maintain an active lifestyle.</p>
          <div className="hero-actions">
            <Link to="/register" className="cta-button">Join Now</Link>
            <Link to="/community" className="secondary-button">Explore Community</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* This will be filled with an appropriate image */}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Community Groups</h3>
            <p>Join groups based on your interests and connect with like-minded seniors</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎉</div>
            <h3>Local Events</h3>
            <p>Discover and participate in events happening in your area</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Digital Journal</h3>
            <p>Document your experiences and memories in your personal digital journal</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💪</div>
            <h3>Health & Wellness</h3>
            <p>Access resources and connect with others focused on healthy living</p>
          </div>
        </div>
      </section>

      {/* Community Highlights */}
      <section className="community-section">
        <h2 className="section-title">Community Highlights</h2>
        <div className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-image"></div>
            <div className="highlight-content">
              <h3>Book Club</h3>
              <p>Join weekly discussions on bestsellers and classics</p>
              <Link to="/community" className="highlight-link">Learn More</Link>
            </div>
          </div>
          <div className="highlight-card">
            <div className="highlight-image"></div>
            <div className="highlight-content">
              <h3>Walking Group</h3>
              <p>Stay active with our community walks in local parks</p>
              <Link to="/community" className="highlight-link">Learn More</Link>
            </div>
          </div>
          <div className="highlight-card">
            <div className="highlight-image"></div>
            <div className="highlight-content">
              <h3>Tech Workshops</h3>
              <p>Learn new technology skills with hands-on guidance</p>
              <Link to="/community" className="highlight-link">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="get-started-section">
        <h2 className="section-title">Ready to Get Started?</h2>
        <p>Join our community today and start connecting with others!</p>
        <div className="benefits-grid">
          <div className="benefit-item">
            <span className="benefit-icon">🤝</span>
            <h3>Connect</h3>
            <p>Join a welcoming community of active seniors</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🌟</span>
            <h3>Share</h3>
            <p>Share your experiences and learn from others</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🎯</span>
            <h3>Grow</h3>
            <p>Discover new interests and expand your horizons</p>
          </div>
        </div>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button">Create Account</Link>
          <Link to="/about" className="text-button">Learn More</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;