import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleNotch } from "react-icons/fa";
import { GiLotusFlower } from "react-icons/gi";
import './style.css';
import Profile from './Profile';
import Footer from './Footer';
import SlideTransition from './SlideTransition';
import Jaya from './Jaya.jpg';
import HomeImg from './HomeImg.jpg';
import ElderHubLogo from './ElderHubLogo.jpg';  // Add this import

const Home = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <SlideTransition />
      <div className="home-container">
        <nav className="navbar">
          <div className="nav-content">
            <div className="logo">
              <img src={ElderHubLogo} alt="ElderHub Logo" />
            </div>
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
                <li>👋 <span> Welcome to your personal companion for a happier, healthier life!</span></li>
                <li><span className="icon-wrapper"><FaCircleNotch /> Discover events, set reminders, chat with friends, and get what you need — all in one place.</span></li>
                <li><span className="icon-wrapper"><GiLotusFlower /> Here to make life easier, safer, and more social — just for you.</span></li>
              </ul>
            </div>
            <div className="hero-image">
              <img src={HomeImg} alt="Elderly people having fun" />
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials">
            <div className="testimonial-grid">
              <div className="testimonial-card">
                <p>"The yoga classes they recommend are gentle and perfect for someone like me. I also attend bhajan meetups through the app, and the chatbot greets me every morning. It’s like having a friend who is never tired of listening. no more juggling apps and logins. It’s simple, spiritual, and smart."</p>
                <span className="author">- Hemanta, 72</span>
              </div>
              <div className="testimonial-card">
                <p>"this app has been like a second family. My children live abroad, but I never feel alone anymore. The morning kirtan alerts  and the Punjabi-speaking chatbot make me feel at home. Even my wife started using it for recipes and bhajan groups! My son also loves the family dashboard — he knows I took my medicines today"</p>
                <span className="author">- Narayan, 68</span>
              </div>
              <div className="testimonial-card">
                <p>"Being alone after retirement was quite isolating. This app helped me rediscover my love for reading and virtual events. I recently joined an online book club where we discuss novels over video calls — never thought I'd do that at this age! The medication reminders are spot-on, and the interface is large and easy to use even with my eyesight issues. Brilliant idea."</p>
                <span className="author">- Hina, 65</span>
              </div>
            </div>
            <p className="feedback-message">"We're always learning. Your words help us to get better."</p>
          </section>
        </main>
        <Footer />
      </div>
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

export default Home;