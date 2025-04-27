import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Community.module.css';

const GroupCard = ({ group }) => {
  return (
    <div className={styles.groupCard}>
      <div className={styles.groupImage}>
        {/* Group image will go here */}
      </div>
      <h3 className={styles.groupTitle}>{group?.name || 'Group Name'}</h3>
      <p className={styles.groupDescription}>
        {group?.description || 'Group description will go here'}
      </p>
      <div className={styles.groupMeta}>
        <span className={styles.memberCount}>
          {group?.memberCount || 0} members
        </span>
        <span className={styles.postCount}>
          {group?.postCount || 0} posts
        </span>
      </div>
      <Link to={`/community/groups/${group?.id}`} className={styles.joinButton}>
        Join Group
      </Link>
    </div>
  );
};

export default GroupCard;