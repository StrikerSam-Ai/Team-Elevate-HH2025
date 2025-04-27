import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Categories for events
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'social', name: 'Social Gatherings' },
    { id: 'learning', name: 'Learning & Education' },
    { id: 'wellness', name: 'Health & Wellness' },
    { id: 'technology', name: 'Technology Workshops' },
    { id: 'arts', name: 'Arts & Culture' }
  ];

  // Mock fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample events data
        const sampleEvents = [
          {
            id: 1,
            title: 'Weekly Coffee Meetup',
            description: 'Join us for coffee and conversation at our weekly meetup. A great way to make new friends and catch up with old ones.',
            category: 'social',
            date: '2025-04-29T10:00:00',
            endDate: '2025-04-29T12:00:00',
            location: 'Sunrise Cafe, 123 Main St',
            attendees: 15,
            maxAttendees: 30,
            isVirtual: false,
            isFree: true,
            imageUrl: '/assets/images/events/coffee-meetup.jpg',
            tags: ['social', 'community', 'conversation']
          },
          {
            id: 2,
            title: 'Digital Photography Basics',
            description: 'Learn the fundamentals of digital photography in this beginner-friendly workshop. Bring your own camera or smartphone.',
            category: 'learning',
            date: '2025-05-02T14:00:00',
            endDate: '2025-05-02T16:30:00',
            location: 'Senior Center, Classroom B, 456 Oak Avenue',
            attendees: 8,
            maxAttendees: 15,
            isVirtual: false,
            isFree: false,
            price: '$5.00',
            imageUrl: '/assets/images/events/photography-workshop.jpg',
            tags: ['learning', 'photography', 'technology', 'creative']
          },
          {
            id: 3,
            title: 'Chair Yoga for Seniors',
            description: 'Gentle yoga exercises you can do while seated. Great for improving flexibility, strength, and relaxation.',
            category: 'wellness',
            date: '2025-04-30T11:00:00',
            endDate: '2025-04-30T12:00:00',
            location: 'Community Center, Room 104, 789 Elm Street',
            attendees: 12,
            maxAttendees: 20,
            isVirtual: false,
            isFree: true,
            imageUrl: '/assets/images/events/chair-yoga.jpg',
            tags: ['wellness', 'exercise', 'relaxation', 'health']
          },
          {
            id: 4,
            title: 'Virtual Book Club: "The Lincoln Highway"',
            description: 'Join our monthly book club discussion. This month we\'re reading "The Lincoln Highway" by Amor Towles.',
            category: 'social',
            date: '2025-05-04T16:00:00',
            endDate: '2025-05-04T17:30:00',
            location: 'Zoom (Link provided after registration)',
            attendees: 22,
            maxAttendees: 50,
            isVirtual: true,
            isFree: true,
            imageUrl: '/assets/images/events/book-club.jpg',
            tags: ['books', 'reading', 'discussion', 'social']
          },
          {
            id: 5,
            title: 'Smartphone Tips & Tricks',
            description: 'Learn helpful tips to get the most out of your smartphone. Bring your device for hands-on assistance.',
            category: 'technology',
            date: '2025-05-06T13:00:00',
            endDate: '2025-05-06T15:00:00',
            location: 'Public Library, Tech Room, 321 Pine Street',
            attendees: 10,
            maxAttendees: 15,
            isVirtual: false,
            isFree: true,
            imageUrl: '/assets/images/events/smartphone-tips.jpg',
            tags: ['technology', 'learning', 'smartphone', 'tutorial']
          },
          {
            id: 6,
            title: 'Watercolor Painting Workshop',
            description: 'Learn basic watercolor techniques in this hands-on workshop. All materials provided.',
            category: 'arts',
            date: '2025-05-10T14:00:00',
            endDate: '2025-05-10T16:00:00',
            location: 'Arts Center, Studio 3, 555 Maple Avenue',
            attendees: 6,
            maxAttendees: 12,
            isVirtual: false,
            isFree: false,
            price: '$10.00',
            imageUrl: '/assets/images/events/watercolor-workshop.jpg',
            tags: ['arts', 'creative', 'painting', 'workshop']
          }
        ];
        
        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time function
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  // Filter events based on category and search query
  useEffect(() => {
    let result = events;
    
    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(event => event.category === filter);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredEvents(result);
  }, [filter, searchQuery, events]);

  // Handle category filter change
  const handleFilterChange = (categoryId) => {
    setFilter(categoryId);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="events-page">
      <header className="events-header">
        <h1>Community Events</h1>
        <p>Discover activities and events in your community</p>
      </header>
      
      <div className="events-search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search events by name, description, or location..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search events"
          />
          <div className="search-icon">🔍</div>
        </div>
        
        <div className="filter-container">
          <div className="filter-label">Filter by:</div>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-button ${filter === category.id ? 'active' : ''}`}
                onClick={() => handleFilterChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                {/* In a real app, display the actual image */}
                <div className="image-placeholder">
                  📅
                </div>
                {event.isVirtual && (
                  <span className="event-badge virtual">Virtual</span>
                )}
                {!event.isFree && (
                  <span className="event-badge paid">{event.price || 'Paid'}</span>
                )}
              </div>
              
              <div className="event-content">
                <div className="event-date">
                  <div className="date-display">
                    <span className="date-day">{new Date(event.date).getDate()}</span>
                    <span className="date-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  </div>
                  <div className="time-display">
                    {formatTime(event.date)}
                  </div>
                </div>
                
                <h2 className="event-title">{event.title}</h2>
                
                <div className="event-meta">
                  <div className="event-location">
                    <span className="meta-icon">📍</span>
                    <span className="meta-text">{event.location}</span>
                  </div>
                  <div className="event-attendees">
                    <span className="meta-icon">👥</span>
                    <span className="meta-text">{event.attendees}/{event.maxAttendees} Registered</span>
                  </div>
                </div>
                
                <p className="event-description">
                  {event.description.length > 120 
                    ? `${event.description.substring(0, 120)}...` 
                    : event.description
                  }
                </p>
                
                <div className="event-tags">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="event-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="event-actions">
                  <Link to={`/events/${event.id}`} className="view-details-button">
                    View Details
                  </Link>
                  <button className="register-button">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-events-found">
          <div className="no-events-icon">🔎</div>
          <h2>No Events Found</h2>
          <p>We couldn't find any events matching your search criteria. Try adjusting your filters or search term.</p>
          <button className="reset-button" onClick={() => {setFilter('all'); setSearchQuery('')}}>
            Reset Filters
          </button>
        </div>
      )}
      
      <div className="create-event-section">
        <h2>Don't see what you're looking for?</h2>
        <p>Organize your own event and invite others from your community</p>
        <Link to="/events/create" className="create-event-button">
          Create an Event
        </Link>
      </div>
      
      <div className="events-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How do I register for an event?</h3>
            <p>Click the "Register" button on any event card. You'll receive a confirmation email with all the details.</p>
          </div>
          <div className="faq-item">
            <h3>Are all events free?</h3>
            <p>Most community events are free, but some may have a small fee to cover materials or other costs. Paid events are marked accordingly.</p>
          </div>
          <div className="faq-item">
            <h3>Can I attend virtual events without technical knowledge?</h3>
            <p>Yes! Virtual events include simple instructions to join. Our Tech Helper companion can also assist you if needed.</p>
          </div>
          <div className="faq-item">
            <h3>How can I organize my own event?</h3>
            <p>Click the "Create an Event" button and follow the simple form. Your event will be reviewed and published promptly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;