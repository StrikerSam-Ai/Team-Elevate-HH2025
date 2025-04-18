import React, { useState, useRef, useEffect } from 'react';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date().getTime()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        text: "Hello! How can I help you today?",
        isUser: false,
        timestamp: new Date().getTime()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="chatbot-fullscreen">
      <div className="chatbot-container">
        <div className="chat-header">
          <h2>AI Assistant</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot">
              <div className="typing-indicator">AI is typing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="button" className="voice-button">
            🎤
          </button>
          <label className="upload-button">
            📎
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => {
                // Handle file upload here
                console.log(e.target.files[0]);
              }}
            />
          </label>
          <button type="button" className="language-button">
            🌐
          </button>
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;