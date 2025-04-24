import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Jaya from './Jaya.jpg';
import CommunityImg from './CommunityImg.jpg';
import Profile from './Profile';  
import Footer from './Footer';    
import YogaImg from './Yoga.jpg';   
import ChessImg from './Chess.jpg'; 
import MorningWalkerImg from './MorningWalker.jpg';
import BookImg from './Book.jpg';
import GardeningImg from './Gardening.jpg';
import SlideTransition from './SlideTransition';
import Chatbot from './Chatbot';  

const Community = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);  

  const handleChatbotToggle = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleChatbotClose = () => {
    setIsChatbotOpen(false);
  };

  const getTodaysQuote = () => {
    const quotes = [
      { quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
      { quote: "Every wrinkle tells a story — and yours is a bestseller.", author: "Unknown" },
      { quote: "The best is not behind you. It’s still unfolding — one beautiful day at a time.", author: "Unknown" },
      { quote: "Old age is like everything else. To make a success of it, you’ve got to start young!", author: "Fred Astaire" },
      { quote: "You don’t stop laughing when you grow old, you grow old when you stop laughing.", author: "George Bernard Shaw" },
      { quote: "Do not regret growing older. It is a privilege denied to many.", author: "Unknown" },
      { quote: "Life isn’t about counting the years — it’s about making the years count.", author: "Muhammad Ali" },
      { quote: "Each day you wake up is another chance to bring joy — to yourself and others.", author: "Unknown" }
    ];
  
    const today = new Date().toISOString().split('T')[0];
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % quotes.length;
    return quotes[index];
  };
  

  return (
    <>
      <SlideTransition />
      <div className="community-container">
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

        {/* Community Header */}
        <section className="community-header">
          <div className="community-content">
 
            <div className="quote-card">
              <p className="quote-text">“{getTodaysQuote().quote}”</p>
              <p className="quote-author">— {getTodaysQuote().author}</p>
           </div>
          </div>

          <div className="community-image">
            <img src={CommunityImg} alt="Community members interacting" />
          </div>
        </section>

        {/* Groups Section */}
        <section className="groups-container">
          {/* Find Groups Section */}
          <div className="find-groups">
            <h2>Find your groups</h2>
            <div className="groups-grid">
              {[
                {
                  id: 1,
                  name: 'Morning Walkers',
                  members: 45,
                  category: 'Health',
                  description: 'Join fellow early birds for daily morning walks and health discussions.',
                  image: MorningWalkerImg  
                },
                {
                  id: 2,
                  name: 'Book Club',
                  members: 28,
                  category: 'Reading',
                  description: 'Weekly book discussions and reading recommendations for literature lovers.',
                  image: BookImg  
                },
                {
                  id: 3,
                  name: 'Gardening Club',
                  members: 32,
                  category: 'Hobby',
                  description: 'Share gardening tips and grow your green thumb with other plant enthusiasts.',
                  image: GardeningImg  
                }
              ].map(group => (
                <div key={group.id} className="group-card">
                  <div className="group-image">
                    <img src={group.image} alt={group.name} className="group-img" />
                  </div>
                  <h3>{group.name}</h3>
                  <p className="group-members">{group.members} members</p>
                  <p className="group-category">Category: {group.category}</p>
                  <p className="group-description">{group.description}</p>
                  <button className="join-btn">Join Group</button>
                </div>
              ))}
            </div>
          </div>

          {/* Your Groups Section */}
          <div className="your-groups">
            <h2>Your groups</h2>
            <div className="group-list">
              {[
                { id: 1, name: 'Yoga Group', members: 25, lastActive: '2 hours ago', image: YogaImg },  // Update this
                { id: 2, name: 'Chess Club', members: 15, lastActive: '1 day ago', image: ChessImg }   // Update this
              ].map(group => (
                <div key={group.id} className="group-item">
                  <div className="group-item-image">
                    <img src={group.image} alt={group.name} className="group-item-img" />
                  </div>
                  <div className="group-item-info">
                    <h3>{group.name}</h3>
                    <p>{group.members} members</p>
                    <p>Last active: {group.lastActive}</p>
                  </div>
                  <div className="group-item-actions">
                    <Link 
                      to={group.name === 'Chess Club' ? '/groups1' : `/groups/${group.id}`} 
                      className="view-group-btn"
                    >
                      View Group
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        {isChatbotOpen && <Chatbot onClose={handleChatbotClose} />}
        <button 
          className="chatbot-toggle-btn"
          onClick={handleChatbotToggle}
        >
          💬
        </button>
        <Footer />
      </div>
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

export default Community;