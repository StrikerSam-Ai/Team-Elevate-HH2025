import React from 'react';
import styles from './Profile.module.css';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'event':
        return '🎉';
      case 'group':
        return '👥';
      case 'journal':
        return '📝';
      case 'comment':
        return '💬';
      default:
        return '📌';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.activityFeed}>
      <h3 className={styles.feedTitle}>Recent Activity</h3>
      
      {activities.length > 0 ? (
        <div className={styles.activityList}>
          {activities.map((activity, index) => (
            <div key={index} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className={styles.activityContent}>
                <p className={styles.activityText}>
                  {activity.text}
                </p>
                <span className={styles.activityDate}>
                  {formatDate(activity.date)}
                </span>
              </div>

              {activity.link && (
                <a 
                  href={activity.link}
                  className={styles.activityLink}
                  aria-label={`View details for ${activity.text}`}
                >
                  View
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyFeed}>
          <p>No recent activity to show</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;