import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Events.module.css';

const FeaturedEvent = ({ event }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.featuredEvent}>
      <div className={styles.featuredImageContainer}>
        <div className={styles.featuredImage}>
          {/* Event image will go here */}
        </div>
        <div className={styles.featuredOverlay} />
      </div>
      
      <div className={styles.featuredContent}>
        <div className={styles.featuredMeta}>
          <span className={styles.featuredCategory}>
            {event?.category || 'Community Event'}
          </span>
          <span className={styles.featuredDate}>
            {event?.date ? formatDate(event.date) : 'Date TBD'}
          </span>
        </div>

        <h2 className={styles.featuredTitle}>
          {event?.title || 'Featured Event Title'}
        </h2>

        <p className={styles.featuredDescription}>
          {event?.description || 'Event description will go here'}
        </p>

        <div className={styles.featuredFooter}>
          <div className={styles.featuredStats}>
            <span className={styles.featuredAttendees}>
              {event?.attendeeCount || 0} attending
            </span>
            <span className={styles.featuredLocation}>
              {event?.location || 'Location TBD'}
            </span>
          </div>

          <Link 
            to={`/events/${event?.id}`}
            className={styles.registerButton}
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;