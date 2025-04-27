import React from 'react';
import styles from './About.module.css';

const MissionStatement = () => {
  return (
    <div className={styles.missionSection}>
      <h2>Our Mission</h2>
      <div className={styles.missionContent}>
        <p className={styles.missionText}>
          We believe in empowering seniors to stay connected, engaged, and active in their communities. 
          Our platform is designed to bridge the digital divide and create meaningful connections that 
          enhance the quality of life for our senior members.
        </p>
        
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>🤝</span>
            <h3>Connection</h3>
            <p>Building meaningful relationships through shared interests and experiences</p>
          </div>
          
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>💡</span>
            <h3>Empowerment</h3>
            <p>Providing tools and resources for continued personal growth and independence</p>
          </div>
          
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>🌟</span>
            <h3>Well-being</h3>
            <p>Promoting physical, mental, and social wellness through community engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;