import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ 
  title, 
  subtitle, 
  image, 
  content, 
  footer,
  onClick,
  className,
  elevation = 'medium',
  imagePosition = 'top',
  roundedCorners = true
}) => {
  const cardClasses = [
    'card',
    `elevation-${elevation}`,
    roundedCorners ? 'rounded' : '',
    imagePosition === 'left' ? 'card-horizontal' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? '0' : undefined}>
      {image && (
        <div className={`card-image ${imagePosition}`}>
          {typeof image === 'string' ? (
            <img src={image} alt={title || 'Card image'} />
          ) : (
            image
          )}
        </div>
      )}
      
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <h4 className="card-subtitle">{subtitle}</h4>}
        
        {content && (
          <div className="card-body">
            {content}
          </div>
        )}
        
        {footer && (
          <div className="card-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.node,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  elevation: PropTypes.oneOf(['none', 'low', 'medium', 'high']),
  imagePosition: PropTypes.oneOf(['top', 'left']),
  roundedCorners: PropTypes.bool
};

export default Card;