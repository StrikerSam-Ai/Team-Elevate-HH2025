import React from 'react';
import styles from './Journal.module.css';

const StatsCard = ({ stats }) => {
  const calculateStreak = () => {
    return stats?.currentStreak || 0;
  };

  return (
    <div className={styles.statsCard}>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats?.totalEntries || 0}</span>
          <span className={styles.statLabel}>Total Entries</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{calculateStreak()}</span>
          <span className={styles.statLabel}>Day Streak</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats?.thisMonth || 0}</span>
          <span className={styles.statLabel}>This Month</span>
        </div>
      </div>

      <div className={styles.moodDistribution}>
        <h3>Mood Distribution</h3>
        <div className={styles.moodBars}>
          <div className={styles.moodBar}>
            <span className={styles.moodLabel}>😊</span>
            <div className={styles.barContainer}>
              <div 
                className={styles.barFill} 
                style={{ width: `${stats?.moodPercentages?.happy || 0}%` }}
              />
            </div>
            <span className={styles.moodPercentage}>
              {stats?.moodPercentages?.happy || 0}%
            </span>
          </div>
          <div className={styles.moodBar}>
            <span className={styles.moodLabel}>😐</span>
            <div className={styles.barContainer}>
              <div 
                className={styles.barFill}
                style={{ width: `${stats?.moodPercentages?.neutral || 0}%` }}
              />
            </div>
            <span className={styles.moodPercentage}>
              {stats?.moodPercentages?.neutral || 0}%
            </span>
          </div>
          <div className={styles.moodBar}>
            <span className={styles.moodLabel}>😔</span>
            <div className={styles.barContainer}>
              <div 
                className={styles.barFill}
                style={{ width: `${stats?.moodPercentages?.sad || 0}%` }}
              />
            </div>
            <span className={styles.moodPercentage}>
              {stats?.moodPercentages?.sad || 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;