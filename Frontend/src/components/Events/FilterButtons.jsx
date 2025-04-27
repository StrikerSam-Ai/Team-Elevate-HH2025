import React from 'react';
import styles from './Events.module.css';

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'registered', label: 'Registered' },
    { id: 'past', label: 'Past Events' }
  ];

  return (
    <div className={styles.filterButtons}>
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;