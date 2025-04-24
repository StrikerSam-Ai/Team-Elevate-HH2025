import React from 'react';
import { IconButton } from './';

const ViewToggle = ({ view, onToggle }) => {
  return (
    <div className="view-toggle">
      <IconButton
        icon="▤"
        onClick={() => onToggle('grid')}
        className={`view-toggle-btn ${view === 'grid' ? 'active' : ''}`}
        aria-label="Grid View"
      />
      <IconButton
        icon="☰"
        onClick={() => onToggle('list')}
        className={`view-toggle-btn ${view === 'list' ? 'active' : ''}`}
        aria-label="List View"
      />
    </div>
  );
};

export default ViewToggle;