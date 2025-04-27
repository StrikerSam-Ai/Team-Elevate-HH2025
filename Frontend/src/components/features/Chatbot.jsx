import React, { useState } from 'react';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: messages.length + 1, text: input, isBot: false };
    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: 'I understand. Let me help you with that.',
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h3>Assistant</h3>
        <button onClick={onClose} className="close-button">&times;</button>
      </div>
      <div className="messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.isBot ? 'bot' : 'user'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;