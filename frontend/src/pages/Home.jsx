import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="#">Event Finder</Link>
          <Link to="#">Community</Link>
          <Link to="#">About Us</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <section className="hero-section">
          <h1>ElderHub</h1>
          <ul className="welcome-points">
            <li>👋 Welcome to your personal companion for a happier, healthier life!</li>
            <li>Discover events, set reminders, chat with friends, and get what you need — all in one place.</li>
            <li>Here to make life easier, safer, and more social — just for you.</li>
          </ul>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <div className="testimonial-grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="testimonial-card">
                <p>"I live alone now… sometimes days pass without hearing another voice.
                    The silence is loud, and it makes me feel invisible.
                    I miss the warmth of company, even if it's just a short conversation."</p>
                <span className="author1">- Hemanta</span>
              </div>
            ))}
          </div>
          <p className="feedback-message">"We're always learning. Your words help us to  get better."</p>
        </section>
      </main>
    </div>
  );
};

export default Home;