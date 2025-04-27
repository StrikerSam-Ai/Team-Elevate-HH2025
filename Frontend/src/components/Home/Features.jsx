import React from 'react';
import styles from './Home.module.css';

const Features = () => {
  const features = [
    {
      title: 'Community Groups',
      description: 'Join groups based on your interests and connect with like-minded seniors',
      icon: '👥'
    },
    {
      title: 'Local Events',
      description: 'Discover and participate in events happening in your area',
      icon: '🎉'
    },
    {
      title: 'Digital Journal',
      description: 'Document your experiences and memories in your personal digital journal',
      icon: '📝'
    },
    {
      title: 'Health & Wellness',
      description: 'Access resources and connect with others focused on healthy living',
      icon: '💪'
    }
  ];

  return (
    <div className={styles.featuresSection}>
      <h2>What We Offer</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;