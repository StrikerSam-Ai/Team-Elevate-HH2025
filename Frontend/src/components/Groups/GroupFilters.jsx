import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Groups.module.css';

const GroupFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    location: 'all',
    frequency: 'all',
    sortBy: 'newest'
  });

  const categories = [
    'All',
    'Health & Wellness',
    'Arts & Crafts',
    'Book Club',
    'Technology',
    'Games & Recreation',
    'Music & Dance',
    'Travel',
    'Food & Cooking',
    'Education'
  ];

  const locations = [
    'All',
    'Online',
    'Local',
    'Hybrid'
  ];

  const frequencies = [
    'All',
    'Daily',
    'Weekly',
    'Bi-weekly',
    'Monthly'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search groups..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filterOptions}>
        <div className={styles.filterGroup}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={styles.filterSelect}
          >
            {categories.map((category) => (
              <option 
                key={category.toLowerCase()} 
                value={category.toLowerCase()}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className={styles.filterSelect}
          >
            {locations.map((location) => (
              <option 
                key={location.toLowerCase()} 
                value={location.toLowerCase()}
              >
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="frequency">Meeting Frequency:</label>
          <select
            id="frequency"
            value={filters.frequency}
            onChange={(e) => handleFilterChange('frequency', e.target.value)}
            className={styles.filterSelect}
          >
            {frequencies.map((frequency) => (
              <option 
                key={frequency.toLowerCase()} 
                value={frequency.toLowerCase()}
              >
                {frequency}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="sortBy">Sort By:</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className={styles.filterSelect}
          >
            {sortOptions.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.activeFilters}>
        {Object.entries(filters).map(([key, value]) => {
          if (value && value !== 'all' && key !== 'sortBy') {
            return (
              <span key={key} className={styles.filterTag}>
                {value}
                <button
                  onClick={() => handleFilterChange(key, 'all')}
                  className={styles.removeFilter}
                >
                  ×
                </button>
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

GroupFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default GroupFilters;