import React from 'react';
import styles from './Home.module.css';

const CommunityHighlight = () => {
  const highlights = [
    {
      name: 'Sarah Thompson',
      age: 68,
      story: "Found a walking group that meets every morning. It has improved my health and I've made wonderful friends.",
      image: null
    },
    {
      name: 'Robert Chen',
      age: 72,
      story: 'Started a book club on the platform. Now we have 25 members who meet weekly to discuss literature.',
      image: null
    },
    {
      name: 'Maria Garcia',
      age: 65,
      story: 'The digital journaling feature helps me share stories and photos with my grandchildren across the country.',
      image: null
    }
  ];

  return (
    <div className={styles.communitySection}>
      <h2>Community Stories</h2>
      <div className={styles.highlightsGrid}>
        {highlights.map((highlight, index) => (
          <div key={index} className={styles.highlightCard}>
            <div className={styles.memberImage}>
              {/* Member image will go here */}
            </div>
            <div className={styles.memberInfo}>
              <h3>{highlight.name}</h3>
              <span className={styles.memberAge}>{highlight.age} years young</span>
            </div>
            <p className={styles.memberStory}>{highlight.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityHighlight;