import React from 'react';

const Skeleton = ({ variant = 'text', count = 1, className = '' }) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'journal-entry':
        return (
          <div className="skeleton-journal-entry">
            <div className="skeleton-header">
              <div className="skeleton-line w-60" />
              <div className="skeleton-badge" />
            </div>
            <div className="skeleton-content">
              <div className="skeleton-line w-100" />
              <div className="skeleton-line w-90" />
              <div className="skeleton-line w-80" />
            </div>
            <div className="skeleton-media">
              <div className="skeleton-image" />
              <div className="skeleton-image" />
            </div>
            <div className="skeleton-tags">
              <div className="skeleton-tag" />
              <div className="skeleton-tag" />
              <div className="skeleton-tag" />
            </div>
          </div>
        );
      case 'text':
      default:
        return <div className="skeleton-line" />;
    }
  };

  return (
    <div className={`skeleton ${className}`}>
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="skeleton-item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;