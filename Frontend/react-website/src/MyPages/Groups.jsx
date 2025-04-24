import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import YogaImg from './Yoga.jpg';
import Profile from './Profile';  // Add this import
import Jaya from './Jaya.jpg';   // Add this import

const Groups = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);  // Add this state
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Suresh', content: 'Good morning everyone!', type: 'text', time: '9:00 AM' },
    { id: 2, sender: 'Geeta', content: "Today's session was great!", type: 'text', time: '9:05 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        type: 'text',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const message = {
          id: messages.length + 1,
          sender: 'You',
          content: e.target.result,
          type: 'image',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, message]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceMessage = () => {
    alert('Voice message feature coming soon!');
  };

  return (
    <div className="group-page">
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

      <div className="group-header">
        <div className="group-banner">
          <div className="group-image">
            <img src={YogaImg} alt="Yoga Group" className="group-profile-img" />
          </div>
          <div className="group-info">
            <h1>Yoga Group</h1>
            <p>A community dedicated to practicing and sharing yoga experiences. Join us for daily sessions and wellness discussions.</p>
            <div className="group-stats">
              <span>Members: 25</span>
              <span>•</span>
              <span>Active since: Jan 2023</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-container" ref={chatContainerRef}>
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
            <span className="sender">{message.sender}</span>
            <div className="message-content">
              {message.type === 'text' ? (
                message.content
              ) : (
                <img src={message.content} alt="Shared" />
              )}
            </div>
            <span className="time">{message.time}</span>
          </div>
        ))}
      </div>

      <form className="message-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <div className="message-actions">
          <button 
            type="button" 
            onClick={() => fileInputRef.current.click()}
            className="upload-button"
            title="Upload an image"
          >
            📷
          </button>
          <button 
            type="button" 
            onClick={handleVoiceMessage}
            className="voice-button"
            title="Record voice message"
          >
            🎤
          </button>
          <button 
            type="submit"
            className="send-button"
            title="Send message"
          >
            Send
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </form>
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default Groups;
