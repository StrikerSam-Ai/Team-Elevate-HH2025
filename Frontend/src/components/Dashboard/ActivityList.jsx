import React from 'react';
import styles from './Dashboard.module.css';

const ActivityList = () => {
  return (
    <div className={styles.activityList}>
      <div className={styles.activityItem}>
        <div className={styles.activityIcon}>
          {/* Icon will go here */}
        </div>
        <div className={styles.activityContent}>
          <h3>Recent Activity</h3>
          <p>No recent activities to show</p>
        </div>
        <div className={styles.activityTime}>
          {/* Timestamp will go here */}
        </div>
      </div>
    </div>
  );
};

export default ActivityList;