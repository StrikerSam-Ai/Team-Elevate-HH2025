import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Events.module.css';

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImage}>
        {/* Event image will go here */}
      </div>
      
      <div className={styles.eventContent}>
        <div className={styles.eventMeta}>
          <span className={styles.eventCategory}>
            {event?.category || 'Community Event'}
          </span>
          <span className={styles.eventDate}>
            {event?.date ? formatDate(event.date) : 'Date TBD'}
          </span>
        </div>

        <h3 className={styles.eventTitle}>
          {event?.title || 'Event Title'}
        </h3>

        <p className={styles.eventDescription}>
          {event?.description || 'Event description will go here'}
        </p>

        <div className={styles.eventFooter}>
          <div className={styles.eventStats}>
            <span className={styles.eventLocation}>
              {event?.location || 'Location TBD'}
            </span>
            <span className={styles.eventAttendees}>
              {event?.attendeeCount || 0} attending
            </span>
          </div>

          <Link 
            to={`/events/${event?.id}`} 
            className={styles.eventButton}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;