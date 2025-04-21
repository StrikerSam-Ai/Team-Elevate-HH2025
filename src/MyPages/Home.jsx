import React, { useState } from 'react';
import Profile from './Profile';
import './style.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import HomeImg from './HomeImg.jpg';
import Jaya from './Jaya.jpg';  

const Home = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">Logo</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/community">Community</Link>
            <Link to="/events">Events</Link>
          </div>
        </div>
        <div className="profile-photo" onClick={() => setIsProfileOpen(true)}>
          <img src={Jaya} alt="Profile" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1>ElderHub</h1>
            <ul className="welcome-points">
              <li>👋 Welcome to your personal companion for a happier, healthier life!</li>
              <li>Discover events, set reminders, chat with friends, and get what you need — all in one place.</li>
              <li>Here to make life easier, safer, and more social — just for you.</li>
            </ul>
          </div>
          <div className="hero-image">
            <img src={HomeImg} alt="Elderly people enjoying community activities" />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>"I live alone now… sometimes days pass without hearing another voice.
                  The silence is loud, and it makes me feel invisible.
                  I miss the warmth of company, even if it's just a short conversation."</p>
              <span className="author">- Hemanta, 72</span>
            </div>
            <div className="testimonial-card">
              <p>"Since my children moved abroad, technology has been my biggest challenge.
                  I want to video call them, but it's complicated.
                  Having someone to guide me through these new tools would mean the world."</p>
              <span className="author">- Narayan, 68</span>
            </div>
            <div className="testimonial-card">
              <p>"After retirement, I felt lost without my daily routine.
                  Finding local events and meeting people my age has been difficult.
                  I wish there was an easier way to stay connected with my community."</p>
              <span className="author">- Hina, 65</span>
            </div>
          </div>
          <p className="feedback-message">"We're always learning. Your words help us to get better."</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;