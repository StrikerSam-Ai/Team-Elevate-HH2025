import React from 'react';
import PropTypes from 'prop-types';
import GroupCard from './GroupCard';
import styles from './Groups.module.css';

const GroupList = ({ groups, loading, error }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading groups...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          Error loading groups: {error}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>🔍</div>
        <h3>No Groups Found</h3>
        <p>Try adjusting your filters or create a new group!</p>
      </div>
    );
  }

  return (
    <div className={styles.groupList}>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

GroupList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      memberCount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      location: PropTypes.string.isRequired,
      meetingFrequency: PropTypes.string.isRequired,
      isJoined: PropTypes.bool.isRequired
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string
};

GroupList.defaultProps = {
  groups: [],
  loading: false,
  error: null
};

export default GroupList;