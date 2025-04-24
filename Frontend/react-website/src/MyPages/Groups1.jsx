import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import ChessImg from './Chess.jpg';  // Make sure to add a chess related image
import Profile from './Profile';  // Add this import
import Jaya from './Jaya.jpg';   // Add this import

const Groups1 = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);  // Add this state
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Ramesh', content: 'Welcome to Chess Club!', type: 'text', time: '10:00 AM' },
    { id: 2, sender: 'Priya', content: 'Looking forward to today\'s strategy session', type: 'text', time: '10:05 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Add these functions after the useEffect hook
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
            <img src={ChessImg} alt="Chess Club" className="group-profile-img" />
          </div>
          <div className="group-info">
            <h1>Chess Club</h1>
            <p>A community of chess enthusiasts gathering to learn, play, and improve their game. Join us for regular matches and strategic discussions.</p>
            <div className="group-stats">
              <span>Members: 18</span>
              <span>•</span>
              <span>Active since: Mar 2023</span>
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
export default Groups1;