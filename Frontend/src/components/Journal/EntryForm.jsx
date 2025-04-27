import React, { useState } from 'react';
import styles from './Journal.module.css';

const EntryForm = () => {
  const [entry, setEntry] = useState({
    title: '',
    content: '',
    mood: 'happy',
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form className={styles.entryForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.formLabel}>Title</label>
        <input
          type="text"
          id="title"
          className={styles.formInput}
          value={entry.title}
          onChange={(e) => setEntry({ ...entry, title: e.target.value })}
          placeholder="Give your entry a title"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.formLabel}>Content</label>
        <textarea
          id="content"
          className={styles.formTextarea}
          value={entry.content}
          onChange={(e) => setEntry({ ...entry, content: e.target.value })}
          placeholder="Write your thoughts here..."
          rows={6}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Mood</label>
        <div className={styles.moodSelector}>
          <button
            type="button"
            className={`${styles.moodButton} ${entry.mood === 'happy' ? styles.active : ''}`}
            onClick={() => setEntry({ ...entry, mood: 'happy' })}
          >
            😊 Happy
          </button>
          <button
            type="button"
            className={`${styles.moodButton} ${entry.mood === 'neutral' ? styles.active : ''}`}
            onClick={() => setEntry({ ...entry, mood: 'neutral' })}
          >
            😐 Neutral
          </button>
          <button
            type="button"
            className={`${styles.moodButton} ${entry.mood === 'sad' ? styles.active : ''}`}
            onClick={() => setEntry({ ...entry, mood: 'sad' })}
          >
            😔 Sad
          </button>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          Save Entry
        </button>
        <button type="button" className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EntryForm;