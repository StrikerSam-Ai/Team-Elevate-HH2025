import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';

const Community = () => {
  // State for search and filter functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Sample data for community page components
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'arts', name: 'Arts & Culture' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'tech', name: 'Technology' },
    { id: 'books', name: 'Book Club' },
    { id: 'games', name: 'Games & Hobbies' }
  ];
  
  const groups = [
    {
      id: 1, 
      name: 'Morning Walking Club',
      category: 'health',
      image: '/assets/images/groups/walking-club.jpg',
      description: 'Join our daily morning walks in local parks. All fitness levels welcome. Great way to start your day with fresh air and good company.',
      memberCount: 45,
      meetingFrequency: 'Daily'
    },
    {
      id: 2, 
      name: 'Book Lovers Club',
      category: 'books',
      image: '/assets/images/groups/book-club.jpg',
      description: 'Weekly book discussions covering bestsellers, classics, and member recommendations. Share your thoughts and discover new favorite reads.',
      memberCount: 28,
      meetingFrequency: 'Weekly'
    },
    {
      id: 3, 
      name: 'Digital Photography',
      category: 'arts',
      image: '/assets/images/groups/photography-group.jpg',
      description: 'Learn digital photography skills, share your work, and participate in monthly themed photo contests with supportive feedback.',
      memberCount: 17,
      meetingFrequency: 'Bi-weekly'
    },
    {
      id: 4, 
      name: 'Technology Helpers',
      category: 'tech',
      image: '/assets/images/groups/tech-helpers.jpg',
      description: 'A friendly group for seniors helping each other with technology questions. From smartphones to computers, we\'re here to help.',
      memberCount: 32,
      meetingFrequency: 'Weekly'
    },
    {
      id: 5, 
      name: 'Chess & Strategy Games',
      category: 'games',
      image: '/assets/images/groups/chess-club.jpg',
      description: 'Play chess and other strategy board games in a friendly, casual environment. All skill levels welcome, from beginners to experts.',
      memberCount: 19,
      meetingFrequency: 'Weekly'
    },
    {
      id: 6, 
      name: 'Garden Enthusiasts',
      category: 'health',
      image: '/assets/images/groups/garden-club.jpg',
      description: 'Share gardening tips, swap plants, and discuss sustainable growing practices. Seasonal outings to local botanical gardens.',
      memberCount: 26,
      meetingFrequency: 'Monthly'
    },
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'Book Club Discussion: The Lincoln Highway',
      date: 'Apr 30, 2025',
      time: '2:00 PM - 3:30 PM',
      location: 'Community Center, Room 104',
      groupId: 2,
      attendingCount: 12
    },
    {
      id: 2,
      title: 'Tech Workshop: Smartphone Photography',
      date: 'May 3, 2025',
      time: '10:00 AM - 12:00 PM',
      location: 'Senior Center, Computer Lab',
      groupId: 4,
      attendingCount: 8
    },
    {
      id: 3,
      title: 'Chess Tournament',
      date: 'May 7, 2025',
      time: '1:00 PM - 4:00 PM',
      location: 'Community Library, Meeting Room',
      groupId: 5,
      attendingCount: 16
    }
  ];

  // Filter groups based on active category and search term
  const filteredGroups = groups.filter(group => {
    const matchesCategory = activeCategory === 'all' || group.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="community-page">
      <header className="community-header">
        <h1>Community</h1>
        <p>Connect with people who share your interests</p>
      </header>

      <section className="search-filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search groups..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
        <div className="categories-filter">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <div className="community-content">
        <main className="groups-section">
          <div className="section-header">
            <h2>Groups & Activities</h2>
            <Link to="/community/create" className="create-button">Create Group</Link>
          </div>

          {filteredGroups.length === 0 ? (
            <div className="empty-state">
              <p>No groups match your search.</p>
              <button 
                className="reset-button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="groups-grid">
              {filteredGroups.map(group => (
                <div key={group.id} className="group-card">
                  <div className="group-image">
                    {/* Image would be displayed here, using background-color as placeholder */}
                  </div>
                  <div className="group-content">
                    <h3>{group.name}</h3>
                    <span className="member-count">{group.memberCount} members</span>
                    <span className="meeting-frequency">{group.meetingFrequency}</span>
                    <p className="group-description">{group.description}</p>
                    <Link to={`/community/groups/${group.id}`} className="view-group-button">
                      View Group
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <aside className="community-sidebar">
          <section className="upcoming-events">
            <h2>Upcoming Events</h2>
            <div className="events-list">
              {upcomingEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-details">
                    <h3>{event.title}</h3>
                    <div className="event-meta">
                      <p className="event-date">
                        <span className="icon">📅</span> {event.date}
                      </p>
                      <p className="event-time">
                        <span className="icon">🕒</span> {event.time}
                      </p>
                      <p className="event-location">
                        <span className="icon">📍</span> {event.location}
                      </p>
                    </div>
                    <div className="event-attendance">
                      <span>{event.attendingCount} attending</span>
                    </div>
                  </div>
                  <Link to={`/community/events/${event.id}`} className="view-event-button">
                    Details
                  </Link>
                </div>
              ))}
            </div>
            <Link to="/events" className="see-all-link">See all events</Link>
          </section>

          <section className="join-community">
            <h2>Benefits of Joining</h2>
            <ul className="benefits-list">
              <li><span className="benefit-icon">🤝</span> Connect with like-minded seniors</li>
              <li><span className="benefit-icon">🎯</span> Find activities you enjoy</li>
              <li><span className="benefit-icon">📊</span> Improve your well-being</li>
              <li><span className="benefit-icon">🏆</span> Share your knowledge and expertise</li>
            </ul>
            <p>Being part of a community helps reduce loneliness and improves mental health.</p>
            <Link to="/community/join" className="join-button">Find Your Community</Link>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Community;