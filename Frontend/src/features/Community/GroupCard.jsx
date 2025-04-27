import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Community.module.css';

const GroupCard = ({ group }) => {
  return (
    <div className={styles.groupCard}>
      <div className={styles.groupImage}>
        <img src={group.image} alt={group.name} className={styles.groupImg} />
      </div>
      <h3>{group.name}</h3>
      <p className={styles.groupMembers}>{group.memberCount} members</p>
      <p className={styles.groupCategory}>{group.category}</p>
      <p className={styles.groupDescription}>{group.description}</p>
      <Link to={`/groups/${group.id}`} className={styles.joinBtn}>
        View Group
      </Link>
    </div>
  );
};

export default GroupCard;