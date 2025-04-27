import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="page home-page">
      <header className="page-header">
        <h1 className="page-title">Welcome to ElderHub</h1>
        <p className="page-subtitle">Your community for active and connected senior living</p>
      </header>

      <main className="page-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h2>Connect, Share, and Thrive</h2>
            <p>Join a vibrant community of seniors who are embracing technology to stay connected, 
               share experiences, and maintain an active lifestyle.</p>
            <div className="hero-actions">
              <Link to="/register" className="cta-button">Join Now</Link>
              <Link to="/community" className="secondary-button">Explore Community</Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Community Groups</h3>
              <p>Join groups based on your interests and connect with like-minded seniors</p>
            </div>
            <div className="feature-card">
              <h3>Local Events</h3>
              <p>Discover and participate in events happening in your area</p>
            </div>
            <div className="feature-card">
              <h3>Digital Journal</h3>
              <p>Document your experiences and memories in your personal digital journal</p>
            </div>
          </div>
        </section>

        {/* Community Highlights */}
        <section className="community-section">
          <h2>Community Highlights</h2>
          <div className="highlights-grid">
            {/* Community highlight cards will go here */}
          </div>
        </section>

        {/* Get Started */}
        <section className="get-started-section">
          <h2>Ready to Get Started?</h2>
          <p>Join our community today and start connecting with others!</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button">Create Account</Link>
            <Link to="/about" className="text-button">Learn More</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;