import React from 'react';
import { formatNumber } from '../utils';

const Badge = ({ 
  children, 
  count, 
  variant = 'primary',
  size = 'medium',
  dot = false,
  max = 99,
  className = '' 
}) => {
  const badgeClass = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    dot ? 'badge-dot' : '',
    className
  ].filter(Boolean).join(' ');

  const renderCount = () => {
    if (dot) return null;
    if (!count) return children;
    const formattedCount = count > max ? `${max}+` : formatNumber(count);
    return formattedCount;
  };

  return (
    <div className="badge-wrapper">
      {children}
      <span className={badgeClass}>
        {renderCount()}
      </span>
    </div>
  );
};

export default Badge;