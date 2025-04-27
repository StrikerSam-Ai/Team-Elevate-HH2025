import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Groups.module.css';

const GroupCard = ({ group }) => {
  const {
    id,
    name,
    description,
    memberCount,
    category,
    imageUrl,
    location,
    meetingFrequency,
    isJoined
  } = group;

  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.groupImageContainer}>
        <img
          src={imageUrl || '/default-group-image.jpg'}
          alt={name}
          className={styles.groupImage}
        />
        <span className={styles.categoryBadge}>{category}</span>
      </div>

      <div className={styles.groupContent}>
        <h3 className={styles.groupName}>
          <Link to={`/groups/${id}`}>{name}</Link>
        </h3>

        <div className={styles.groupMetadata}>
          <span className={styles.location}>
            <i className="fas fa-map-marker-alt"></i> {location}
          </span>
          <span className={styles.memberCount}>
            <i className="fas fa-users"></i> {memberCount} members
          </span>
          <span className={styles.meetingFrequency}>
            <i className="fas fa-calendar"></i> {meetingFrequency}
          </span>
        </div>

        <p className={styles.groupDescription}>
          {truncateDescription(description)}
        </p>

        <div className={styles.groupActions}>
          {isJoined ? (
            <>
              <button className={styles.memberButton} disabled>
                Member
              </button>
              <Link 
                to={`/groups/${id}/chat`}
                className={styles.chatButton}
              >
                Group Chat
              </Link>
            </>
          ) : (
            <button className={styles.joinButton}>
              Join Group
            </button>
          )}
          <Link 
            to={`/groups/${id}`}
            className={styles.moreInfoButton}
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

GroupCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    memberCount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    location: PropTypes.string.isRequired,
    meetingFrequency: PropTypes.string.isRequired,
    isJoined: PropTypes.bool.isRequired
  }).isRequired
};

export default GroupCard;