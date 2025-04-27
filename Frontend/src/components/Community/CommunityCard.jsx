import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Community.module.css';

const CommunityCard = ({ community }) => {
  return (
    <div className={styles.communityCard}>
      <div className={styles.communityHeader}>
        <div className={styles.communityImage}>
          {/* Community image will go here */}
        </div>
        <div className={styles.communityInfo}>
          <h3 className={styles.communityName}>{community?.name || 'Community Name'}</h3>
          <p className={styles.communityType}>{community?.type || 'Interest Group'}</p>
        </div>
      </div>
      <p className={styles.communityDescription}>
        {community?.description || 'Community description will go here'}
      </p>
      <div className={styles.communityStats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{community?.memberCount || 0}</span>
          <span className={styles.statLabel}>Members</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{community?.groupCount || 0}</span>
          <span className={styles.statLabel}>Groups</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{community?.eventCount || 0}</span>
          <span className={styles.statLabel}>Events</span>
        </div>
      </div>
      <Link to={`/community/${community?.id}`} className={styles.exploreButton}>
        Explore Community
      </Link>
    </div>
  );
};

export default CommunityCard;