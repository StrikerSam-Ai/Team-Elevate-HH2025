import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const GetStarted = () => {
  return (
    <div className={styles.getStartedSection}>
      <h2>Ready to Get Started?</h2>
      <p>Join our community today and start connecting with others!</p>
      <div className={styles.ctaButtons}>
        <Link to="/register" className={styles.ctaButton}>Create Account</Link>
        <Link to="/about" className={styles.textButton}>Learn More</Link>
      </div>
      <div className={styles.benefitsGrid}>
        <div className={styles.benefitItem}>
          <span className={styles.benefitIcon}>🤝</span>
          <h3>Connect</h3>
          <p>Join a welcoming community of active seniors</p>
        </div>
        <div className={styles.benefitItem}>
          <span className={styles.benefitIcon}>🌟</span>
          <h3>Share</h3>
          <p>Share your experiences and learn from others</p>
        </div>
        <div className={styles.benefitItem}>
          <span className={styles.benefitIcon}>🎯</span>
          <h3>Grow</h3>
          <p>Discover new interests and expand your horizons</p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;