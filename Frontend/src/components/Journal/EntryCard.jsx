import React from 'react';
import styles from './Journal.module.css';

const EntryCard = ({ entry }) => {
  const moodEmoji = {
    happy: '😊',
    neutral: '😐',
    sad: '😔'
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.entryCard}>
      <div className={styles.entryHeader}>
        <h3 className={styles.entryTitle}>{entry?.title || 'Untitled Entry'}</h3>
        <span className={styles.entryMood}>
          {moodEmoji[entry?.mood || 'neutral']}
        </span>
      </div>
      
      <p className={styles.entryDate}>
        {entry?.date ? formatDate(entry.date) : 'No date'}
      </p>
      
      <div className={styles.entryContent}>
        <p>{entry?.content || 'No content'}</p>
      </div>

      {entry?.images?.length > 0 && (
        <div className={styles.entryImages}>
          {entry.images.map((image, index) => (
            <div key={index} className={styles.imagePreview}>
              {/* Image preview will go here */}
            </div>
          ))}
        </div>
      )}

      <div className={styles.entryActions}>
        <button className={styles.editButton}>Edit</button>
        <button className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default EntryCard;