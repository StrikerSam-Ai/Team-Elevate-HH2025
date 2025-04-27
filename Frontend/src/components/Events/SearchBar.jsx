import React, { useState } from 'react';
import styles from './Events.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, location });
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.searchInputs}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;