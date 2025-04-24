import React from 'react';
import { getInitials } from '../utils';

const Avatar = ({ 
  src, 
  name, 
  size = 'medium', 
  className = '',
  onClick 
}) => {
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large'
  };

  const avatarClass = [
    'avatar',
    sizeClasses[size],
    onClick ? 'avatar-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={avatarClass} onClick={onClick}>
      {src ? (
        <img 
          src={src} 
          alt={name || 'Avatar'} 
          className="avatar-image"
        />
      ) : (
        <div className="avatar-initials">
          {name ? getInitials(name) : '?'}
        </div>
      )}
    </div>
  );
};

export default Avatar;