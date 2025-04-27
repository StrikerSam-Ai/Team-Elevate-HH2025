import React, { useState } from 'react';
import { EntryCard } from '.';
import styles from './Journal.module.css';

const EntryList = ({ entries = [] }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');

  const getSortedEntries = () => {
    return [...entries].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return b.title.localeCompare(a.title);
    });
  };

  return (
    <div className={styles.entryList}>
      <div className={styles.listControls}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
        </div>

        <select 
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      <div className={`${styles.entriesContainer} ${styles[viewMode]}`}>
        {getSortedEntries().length > 0 ? (
          getSortedEntries().map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No journal entries yet. Start writing your first entry!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryList;