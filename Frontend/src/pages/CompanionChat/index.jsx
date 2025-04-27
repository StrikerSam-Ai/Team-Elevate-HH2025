import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CompanionChat.css';

const CompanionChat = () => {
  const { companionId } = useParams();
  const navigate = useNavigate();
  const [companion, setCompanion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample companion profiles
  const companionProfiles = {
    'wellness-coach': {
      id: 'wellness-coach',
      name: 'Wellness Coach',
      avatar: '/assets/images/companions/wellness-coach.jpg',
      description: 'I can help you with exercise routines, healthy eating tips, and general wellness advice tailored for seniors.',
      greeting: "Hello! I'm your Wellness Coach. I'm here to help you stay active, eat well, and feel your best. What would you like to focus on today?",
      expertiseAreas: ['Physical Activity', 'Nutrition', 'Sleep', 'Mental Wellness'],
    },
    'tech-helper': {
      id: 'tech-helper',
      name: 'Tech Helper',
      avatar: '/assets/images/companions/tech-helper.jpg',
      description: 'I provide friendly technology support and can explain digital concepts in simple terms.',
      greeting: "Hi there! I'm your Tech Helper, ready to assist with any technology questions you might have. From smartphones to computers, I'm here to make tech easier for you. What can I help you with today?",
      expertiseAreas: ['Smartphones', 'Computers', 'Internet', 'Apps & Software'],
    },
    'memory-keeper': {
      id: 'memory-keeper',
      name: 'Memory Keeper',
      avatar: '/assets/images/companions/memory-keeper.jpg',
      description: 'I can help you document and organize your life stories, photos, and memories to share with loved ones.',
      greeting: "Hello! I'm your Memory Keeper companion. I'm here to help you preserve and share your precious memories and life stories. Would you like to talk about a special memory or start organizing your life stories?",
      expertiseAreas: ['Life Stories', 'Photo Organization', 'Family History', 'Legacy Projects'],
    }
  };

  // Fetch companion data and initialize chat
  useEffect(() => {
    const fetchCompanionData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const foundCompanion = companionProfiles[companionId];
        if (foundCompanion) {
          setCompanion(foundCompanion);
          // Initialize with greeting message
          setMessages([
            {
              id: 1,
              text: foundCompanion.greeting,
              sender: 'companion',
              timestamp: new Date().toISOString()
            }
          ]);
        } else {
          // Handle invalid companion ID
          navigate('/companions');
        }
      } catch (error) {
        console.error('Error fetching companion data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanionData();
  }, [companionId, navigate]);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message function
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate AI response
      let aiResponse;
      if (inputMessage.toLowerCase().includes('help')) {
        aiResponse = `I'd be happy to help you with that! As your ${companion.name}, I can provide guidance on ${companion.expertiseAreas.join(', ')}. What specific information are you looking for?`;
      } else if (inputMessage.toLowerCase().includes('thank')) {
        aiResponse = "You're very welcome! I'm glad I could be of assistance. Is there anything else I can help you with today?";
      } else {
        aiResponse = `That's a great question about ${inputMessage.split(' ').slice(0, 3).join(' ')}... Let me share some thoughts on that. ${companion.expertiseAreas[Math.floor(Math.random() * companion.expertiseAreas.length)]} is an important aspect to consider. Would you like more specific information?`;
      }

      const companionMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'companion',
        timestamp: new Date().toISOString()
      };

      setMessages(prevMessages => [...prevMessages, companionMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="companion-chat-loading">
        <div className="loading-spinner"></div>
        <p>Connecting to your companion...</p>
      </div>
    );
  }

  return (
    <div className="companion-chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <div className="companion-info">
            <div className="companion-avatar">
              {/* In a real app, this would display the actual companion image */}
              <div className="avatar-placeholder">
                {companion.name.charAt(0)}
              </div>
            </div>
            <div className="companion-details">
              <h1>{companion.name}</h1>
              <span className="online-status">Online</span>
            </div>
          </div>
          <div className="chat-actions">
            <button className="action-button" title="Voice Call">
              📞
            </button>
            <button className="action-button" title="Settings">
              ⚙️
            </button>
          </div>
        </div>

        <div className="chat-body">
          {messages.map(message => (
            <div 
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'companion-message'}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message companion-message">
              <div className="message-content typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-footer">
          <div className="message-input-container">
            <textarea
              className="message-input"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
            />
            <div className="input-actions">
              <button className="input-action-button" title="Voice Input">
                🎤
              </button>
              <button 
                className="send-button"
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="companion-sidebar">
        <div className="companion-profile">
          <h2>About {companion.name}</h2>
          <p>{companion.description}</p>
        </div>

        <div className="companion-expertise">
          <h3>Expertise Areas</h3>
          <ul className="expertise-list">
            {companion.expertiseAreas.map((area, index) => (
              <li key={index} className="expertise-item">{area}</li>
            ))}
          </ul>
        </div>

        <div className="interaction-tips">
          <h3>Conversation Starters</h3>
          <div className="suggestion-chips">
            {companion.id === 'wellness-coach' && (
              <>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("Can you suggest some gentle exercises for seniors?")}
                >
                  Gentle exercises
                </button>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("What foods help with joint pain?")}
                >
                  Foods for joint health
                </button>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("How can I improve my sleep quality?")}
                >
                  Better sleep tips
                </button>
              </>
            )}

            {companion.id === 'tech-helper' && (
              <>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("How do I video call with my family?")}
                >
                  Video calling
                </button>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("I'm getting strange emails, what should I do?")}
                >
                  Email security
                </button>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("How do I save photos from my phone?")}
                >
                  Saving photos
                </button>
              </>
            )}

            {companion.id === 'memory-keeper' && (
              <>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("How can I organize my family photos?")}
                >
                  Organize photos
                </button>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("I'd like to start writing my life story")}
                >
                  Life story
                </button>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("How can I record voice memories?")}
                >
                  Voice memories
                </button>
              </>
            )}
          </div>
        </div>

        <div className="companion-feedback">
          <h3>How is this companion helping you?</h3>
          <div className="rating-buttons">
            <button className="rating-button">👍 Helpful</button>
            <button className="rating-button">👎 Not helpful</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanionChat;