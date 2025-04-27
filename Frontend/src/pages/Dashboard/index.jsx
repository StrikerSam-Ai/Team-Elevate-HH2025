import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentConversations, setRecentConversations] = useState([]);
  const [wellnessStats, setWellnessStats] = useState(null);
  
  // Fetch user data, events, conversations, and wellness stats
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API calls with timeouts
        await Promise.all([
          fetchUser(),
          fetchEvents(),
          fetchConversations(),
          fetchWellnessStats()
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Mock fetch functions
  const fetchUser = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    setUser({
      name: 'Elizabeth Johnson',
      avatar: '/assets/images/avatars/user-avatar.jpg',
      joinDate: '2024-12-15',
      preferences: {
        interests: ['Reading', 'Gardening', 'History', 'Technology'],
        companionPreference: 'Daily Companion'
      }
    });
  };
  
  const fetchEvents = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setUpcomingEvents([
      {
        id: 1,
        title: 'Weekly Coffee Meetup',
        date: '2025-04-28T10:00:00',
        location: 'Sunrise Cafe, Downtown',
        isAttending: true
      },
      {
        id: 2,
        title: 'Digital Photography Basics',
        date: '2025-05-02T10:00:00',
        location: 'Senior Center, Classroom B',
        isAttending: true
      },
      {
        id: 3,
        title: 'Book Club Discussion: The Lincoln Highway',
        date: '2025-04-30T14:00:00',
        location: 'Community Center, Room 104',
        isAttending: false
      }
    ]);
  };
  
  const fetchConversations = async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    setRecentConversations([
      {
        id: 1,
        companionId: 'wellness-coach',
        companionName: 'Wellness Coach',
        lastMessage: 'Here are some gentle stretching exercises you can do daily to improve flexibility.',
        timestamp: '2025-04-26T14:30:00',
        unread: false
      },
      {
        id: 2,
        companionId: 'tech-helper',
        companionName: 'Tech Helper',
        lastMessage: 'I can help you set up video calling on your tablet. When would you like to start?',
        timestamp: '2025-04-26T09:15:00',
        unread: true
      },
      {
        id: 3,
        companionId: 'daily-companion',
        companionName: 'Daily Companion',
        lastMessage: 'Good morning! Today\'s forecast shows sunny weather with a high of 75°F.',
        timestamp: '2025-04-27T08:00:00',
        unread: false
      }
    ]);
  };
  
  const fetchWellnessStats = async () => {
    await new Promise(resolve => setTimeout(resolve, 900));
    setWellnessStats({
      steps: 3250,
      stepGoal: 5000,
      sleepHours: 7.5,
      sleepGoal: 8,
      weeklyActivity: [2800, 3100, 2600, 4200, 3800, 3250, 0],
      weeklyMood: [3, 4, 3, 5, 4, 4, 0]
    });
  };
  
  // Format time ago function
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hr ago`;
    } else {
      return `${diffDays} day ago`;
    }
  };

  // Wellness progress calculation
  const calculateProgress = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };
  
  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <div className="user-greeting">
          <div className="user-avatar">
            {/* In a real app, display user's actual avatar */}
            <div className="avatar-placeholder">
              {user.name.charAt(0)}
            </div>
          </div>
          <div className="greeting-text">
            <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="date-today">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
        <div className="quick-actions">
          <Link to="/companions" className="quick-action-button">
            <span className="action-icon">💬</span>
            <span className="action-text">Chat with Companion</span>
          </Link>
          <Link to="/events" className="quick-action-button">
            <span className="action-icon">📅</span>
            <span className="action-text">Browse Events</span>
          </Link>
          <Link to="/wellness" className="quick-action-button">
            <span className="action-icon">❤️</span>
            <span className="action-text">Wellness Check</span>
          </Link>
        </div>
      </div>
      
      <div className="dashboard-grid">
        {/* Upcoming Events Section */}
        <section className="dashboard-section upcoming-events">
          <div className="section-header">
            <h2>Upcoming Events</h2>
            <Link to="/events" className="view-all-link">View All</Link>
          </div>
          <div className="events-list">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <div key={event.id} className="event-card dashboard-card">
                  <div className="event-date">
                    <span className="date-day">{new Date(event.date).getDate()}</span>
                    <span className="date-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  </div>
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-location">
                      <span className="detail-icon">📍</span>
                      {event.location}
                    </p>
                    <p className="event-time">
                      <span className="detail-icon">🕒</span>
                      {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="event-status">
                    {event.isAttending ? (
                      <span className="attending-badge">Attending</span>
                    ) : (
                      <button className="rsvp-button">RSVP</button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>You have no upcoming events</p>
                <Link to="/events" className="action-button">Find Events</Link>
              </div>
            )}
          </div>
        </section>
        
        {/* Recent Conversations Section */}
        <section className="dashboard-section recent-conversations">
          <div className="section-header">
            <h2>Recent Conversations</h2>
            <Link to="/companions" className="view-all-link">All Companions</Link>
          </div>
          <div className="conversations-list">
            {recentConversations.length > 0 ? (
              recentConversations.map(conversation => (
                <Link 
                  to={`/chat/${conversation.companionId}`} 
                  key={conversation.id} 
                  className="conversation-card dashboard-card"
                >
                  <div className="companion-avatar">
                    <div className="avatar-placeholder">
                      {conversation.companionName.charAt(0)}
                    </div>
                  </div>
                  <div className="conversation-details">
                    <div className="conversation-header">
                      <h3 className="companion-name">{conversation.companionName}</h3>
                      <span className="conversation-time">{formatTimeAgo(conversation.timestamp)}</span>
                    </div>
                    <p className="last-message">
                      {conversation.lastMessage.length > 60 
                        ? conversation.lastMessage.substring(0, 60) + '...' 
                        : conversation.lastMessage
                      }
                    </p>
                  </div>
                  {conversation.unread && (
                    <span className="unread-badge"></span>
                  )}
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <p>No recent conversations</p>
                <Link to="/companions" className="action-button">Start Chatting</Link>
              </div>
            )}
          </div>
        </section>
        
        {/* Wellness Tracker Section */}
        <section className="dashboard-section wellness-tracker">
          <div className="section-header">
            <h2>Wellness Tracker</h2>
            <Link to="/wellness" className="view-all-link">Full Report</Link>
          </div>
          <div className="wellness-stats">
            <div className="wellness-card dashboard-card">
              <div className="wellness-metric">
                <div className="metric-header">
                  <h3>Steps Today</h3>
                  <span className="metric-value">{wellnessStats.steps.toLocaleString()}</span>
                </div>
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${calculateProgress(wellnessStats.steps, wellnessStats.stepGoal)}%` }}
                  ></div>
                </div>
                <p className="goal-text">{Math.round(calculateProgress(wellnessStats.steps, wellnessStats.stepGoal))}% of daily goal</p>
              </div>
            </div>
            
            <div className="wellness-card dashboard-card">
              <div className="wellness-metric">
                <div className="metric-header">
                  <h3>Sleep Last Night</h3>
                  <span className="metric-value">{wellnessStats.sleepHours} hrs</span>
                </div>
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${calculateProgress(wellnessStats.sleepHours, wellnessStats.sleepGoal)}%` }}
                  ></div>
                </div>
                <p className="goal-text">{Math.round(calculateProgress(wellnessStats.sleepHours, wellnessStats.sleepGoal))}% of sleep goal</p>
              </div>
            </div>
            
            <div className="wellness-tip dashboard-card">
              <h3>Daily Wellness Tip</h3>
              <p>Try to drink at least 8 glasses of water today. Staying hydrated helps with energy levels and cognition.</p>
              <Link to="/wellness/tips" className="small-link">More tips</Link>
            </div>
          </div>
        </section>
        
        {/* Resource Links Section */}
        <section className="dashboard-section resource-links">
          <div className="section-header">
            <h2>Quick Links</h2>
          </div>
          <div className="resources-grid">
            <Link to="/resources/medical" className="resource-card">
              <span className="resource-icon">🏥</span>
              <h3>Medical Resources</h3>
            </Link>
            <Link to="/resources/community" className="resource-card">
              <span className="resource-icon">🏙️</span>
              <h3>Community Services</h3>
            </Link>
            <Link to="/resources/learning" className="resource-card">
              <span className="resource-icon">📚</span>
              <h3>Learning Center</h3>
            </Link>
            <Link to="/resources/entertainment" className="resource-card">
              <span className="resource-icon">🎭</span>
              <h3>Entertainment</h3>
            </Link>
          </div>
        </section>
      </div>
      
      <section className="personalized-suggestions">
        <h2>Suggested For You</h2>
        <div className="suggestions-grid">
          <div className="suggestion-card dashboard-card">
            <div className="suggestion-content">
              <span className="suggestion-icon">📱</span>
              <div className="suggestion-text">
                <h3>Learn Smartphone Basics</h3>
                <p>A beginner-friendly guide to using your smartphone effectively</p>
              </div>
            </div>
            <Link to="/learning/smartphone-basics" className="suggestion-action">
              View Guide
            </Link>
          </div>
          
          <div className="suggestion-card dashboard-card">
            <div className="suggestion-content">
              <span className="suggestion-icon">🧘</span>
              <div className="suggestion-text">
                <h3>Chair Yoga Session</h3>
                <p>Join a beginner-friendly chair yoga class this Thursday</p>
              </div>
            </div>
            <Link to="/events/245" className="suggestion-action">
              Learn More
            </Link>
          </div>
          
          <div className="suggestion-card dashboard-card">
            <div className="suggestion-content">
              <span className="suggestion-icon">👪</span>
              <div className="suggestion-text">
                <h3>Family Connection</h3>
                <p>Schedule a video call with your family members</p>
              </div>
            </div>
            <Link to="/family-connect" className="suggestion-action">
              Connect Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;