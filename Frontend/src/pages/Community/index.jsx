import React from 'react';
import { GroupCard, CommunityCard, EventCard } from '../../components/Community';
import './Community.css';

const Community = () => {
  // Example data - will be replaced with real data from API
  const mockGroups = [
    { id: 1, name: 'Book Club', memberCount: 24, postCount: 156 },
    { id: 2, name: 'Walking Group', memberCount: 45, postCount: 89 }
  ];

  const mockCommunities = [
    { id: 1, name: 'Arts & Culture', memberCount: 230, groupCount: 12, eventCount: 5 },
    { id: 2, name: 'Health & Wellness', memberCount: 450, groupCount: 15, eventCount: 8 }
  ];

  const mockEvents = [
    { id: 1, title: 'Art Exhibition', date: '2025-05-01', attendeeCount: 15 },
    { id: 2, title: 'Group Walk', date: '2025-05-03', attendeeCount: 28 }
  ];

  return (
    <div className="page community-page">
      <header className="page-header">
        <h1 className="page-title">Community</h1>
        <p className="page-subtitle">Connect with fellow members and join groups that interest you.</p>
      </header>

      <main className="page-content">
        {/* Featured Groups */}
        <section className="community-section">
          <h2>Featured Groups</h2>
          <div className="groups-grid">
            {mockGroups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>

        {/* Active Communities */}
        <section className="community-section">
          <h2>Active Communities</h2>
          <div className="communities-grid">
            {mockCommunities.map(community => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="community-section">
          <h2>Upcoming Community Events</h2>
          <div className="events-grid">
            {mockEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Community;