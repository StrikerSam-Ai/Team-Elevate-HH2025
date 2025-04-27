import React, { useState } from 'react';
import './Events.css';

const Events = () => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="page events-page">
      <header className="page-header">
        <h1 className="page-title">Events</h1>
        <p className="page-subtitle">Discover and join upcoming events in your community</p>
      </header>

      <main className="page-content">
        {/* Search and Filters */}
        <section className="events-section search">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search events..." 
              className="search-input"
            />
            <div className="filter-buttons">
              <button 
                className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-button ${filter === 'upcoming' ? 'active' : ''}`}
                onClick={() => setFilter('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`filter-button ${filter === 'registered' ? 'active' : ''}`}
                onClick={() => setFilter('registered')}
              >
                Registered
              </button>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="events-section featured">
          <h2>Featured Events</h2>
          <div className="featured-events">
            {/* Featured event cards will go here */}
          </div>
        </section>

        {/* All Events */}
        <section className="events-section all-events">
          <h2>All Events</h2>
          <div className="events-grid">
            {/* Event cards will go here */}
          </div>
        </section>

        {/* Event Categories */}
        <section className="events-section categories">
          <h2>Browse by Category</h2>
          <div className="categories-grid">
            {/* Category cards will go here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Events;