import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Community.module.css';

const EventCard = ({ event }) => {
  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImage}>
        {/* Event image will go here */}
      </div>
      <div className={styles.eventContent}>
        <div className={styles.eventMeta}>
          <span className={styles.eventDate}>
            {event?.date || 'Date TBD'}
          </span>
          <span className={styles.eventType}>
            {event?.type || 'Community Event'}
          </span>
        </div>
        <h3 className={styles.eventTitle}>{event?.title || 'Event Title'}</h3>
        <p className={styles.eventDescription}>
          {event?.description || 'Event description will go here'}
        </p>
        <div className={styles.eventFooter}>
          <div className={styles.eventAttendees}>
            <span className={styles.attendeeCount}>
              {event?.attendeeCount || 0} attending
            </span>
          </div>
          <Link to={`/events/${event?.id}`} className={styles.registerButton}>
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;