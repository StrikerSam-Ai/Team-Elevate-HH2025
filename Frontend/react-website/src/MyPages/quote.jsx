import React from 'react';
import './style.css'; 

const QuoteCard = ({ quote, author }) => {
  return (
    <div className="quote-card">
      <p className="quote-text">“{quote}”</p>
      <p className="quote-author">— {author}</p>
    </div>
  );
};

export default QuoteCard;
