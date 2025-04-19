import React from 'react';
import './style.css';

const EventFinder = () => {
  return (
    <div className="event-finder-container">
      <header className="event-header">
        <h1>Event Finder</h1>
        <p>Discover amazing events happening around you</p>
      </header>

      <section className="latest-events">
        <div className="content-wrapper">
          <div className="text-content">
            <h2>Find the latest events</h2>
            <p>Stay connected with the most exciting events in your community</p>
            <button className="explore-btn">Explore All Events</button>
          </div>
          <div className="image-placeholder">
            {/* Add your image here */}
          </div>
        </div>
      </section>

      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        <div className="event-cards">
          {[1, 2, 3].map((item) => (
            <div key={item} className="event-card">
              <div className="event-image"></div>
              <h3>Event Title {item}</h3>
              <p>Date: XX-MM-YY</p>
              <p>A brief description of the event goes here</p>
              <button className="register-btn">Register Now</button>
            </div>
          ))}
        </div>
      </section>

      <div className="events-grid">
        <section className="online-events">
          <h2>Online Events</h2>
          <div className="event-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="event-item">
                <h3>Online Event {item}</h3>
                <p>Date: XX-MM-YY</p>
                <p>Time: HH:MM</p>
                <div className="registration-status">
                  {item === 1 ? 'Registered' : 'Registration Open'}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="offline-events">
          <h2>Offline Events</h2>
          <div className="event-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="event-item">
                <h3>Offline Event {item}</h3>
                <p>Date: XX-MM-YY</p>
                <p>Location: Venue Name</p>
                <p>A brief description of the offline event</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventFinder;