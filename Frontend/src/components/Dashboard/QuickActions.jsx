import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const QuickActions = () => {
  const actions = [
    { label: 'New Journal Entry', path: '/journal', icon: '📝' },
    { label: 'Join Event', path: '/events', icon: '🎉' },
    { label: 'Find Group', path: '/community', icon: '👥' },
    { label: 'Edit Profile', path: '/profile', icon: '⚙️' }
  ];

  return (
    <div className={styles.quickActions}>
      <div className={styles.actionsGrid}>
        {actions.map((action, index) => (
          <Link 
            key={index} 
            to={action.path} 
            className={styles.actionButton}
          >
            <span className={styles.actionIcon}>{action.icon}</span>
            <span className={styles.actionLabel}>{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;