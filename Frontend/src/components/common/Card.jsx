import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

/**
 * Card component for displaying content in a consistent card layout
 */
const Card = ({
  children,
  title,
  subtitle,
  headerActions,
  footer,
  className = '',
  elevation = 'medium',
  variant = 'default',
  hoverable = false,
  onClick,
  ...props
}) => {
  const cardClass = [
    'card',
    `card-${variant}`,
    `elevation-${elevation}`,
    hoverable ? 'card-hoverable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClass} 
      onClick={onClick}
      {...props}
    >
      {(title || headerActions) && (
        <div className="card-header">
          <div className="card-header-content">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerActions && (
            <div className="card-header-actions">
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      <div className="card-content">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  headerActions: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  elevation: PropTypes.oneOf(['low', 'medium', 'high']),
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
  hoverable: PropTypes.bool,
  onClick: PropTypes.func
};

export default Card;