import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Hero = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h2>Connect, Share, and Thrive</h2>
        <p>Join a vibrant community of seniors who are embracing technology to stay connected, 
           share experiences, and maintain an active lifestyle.</p>
        <div className={styles.heroActions}>
          <Link to="/register" className={styles.ctaButton}>Get Started</Link>
          <Link to="/community" className={styles.secondaryButton}>Explore Community</Link>
        </div>
      </div>
      <div className={styles.heroImage}>
        {/* Hero image will go here */}
      </div>
    </div>
  );
};

export default Hero;