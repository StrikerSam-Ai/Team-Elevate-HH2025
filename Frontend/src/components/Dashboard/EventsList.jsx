import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const EventsList = () => {
  return (
    <div className={styles.eventsList}>
      <div className={styles.eventsHeader}>
        <h3>Upcoming Events</h3>
        <Link to="/events" className={styles.seeAll}>See All</Link>
      </div>
      <div className={styles.eventsItems}>
        <div className={styles.eventItem}>
          <div className={styles.eventDate}>
            {/* Date will go here */}
          </div>
          <div className={styles.eventDetails}>
            <h4>No upcoming events</h4>
            <p>Check the events page to find activities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;