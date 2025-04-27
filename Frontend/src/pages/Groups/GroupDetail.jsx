import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './GroupDetail.module.css';

const GroupDetail = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const response = await fetch(`/api/groups/${id}`);
        const data = await response.json();
        setGroup(data);
        setIsJoined(data.isJoined);
        setError(null);
      } catch (err) {
        setError('Failed to load group details. Please try again later.');
        console.error('Error fetching group details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

  const handleJoinGroup = async () => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/groups/${id}/join`, {
        method: 'POST',
      });
      setIsJoined(true);
    } catch (err) {
      console.error('Error joining group:', err);
      // Show error notification
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading group details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <Link to="/groups" className={styles.backButton}>
          Back to Groups
        </Link>
      </div>
    );
  }

  if (!group) {
    return (
      <div className={styles.errorContainer}>
        <h2>Group Not Found</h2>
        <p>The group you're looking for doesn't exist or has been removed.</p>
        <Link to="/groups" className={styles.backButton}>
          Back to Groups
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.groupDetailPage}>
      <div className={styles.header} style={{ backgroundImage: `url(${group.coverImage})` }}>
        <div className={styles.headerOverlay}>
          <div className={styles.headerContent}>
            <div className={styles.groupInfo}>
              <h1>{group.name}</h1>
              <div className={styles.metadata}>
                <span>{group.memberCount} members</span>
                <span>{group.location}</span>
                <span>{group.meetingFrequency}</span>
                <span className={styles.categoryBadge}>{group.category}</span>
              </div>
            </div>
            {!isJoined ? (
              <button onClick={handleJoinGroup} className={styles.joinButton}>
                Join Group
              </button>
            ) : (
              <button className={styles.memberButton} disabled>
                Member
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <section className={styles.about}>
            <h2>About</h2>
            <p>{group.description}</p>
          </section>

          <section className={styles.upcomingMeetings}>
            <h2>Upcoming Meetings</h2>
            {group.upcomingMeetings && group.upcomingMeetings.length > 0 ? (
              <div className={styles.meetingsList}>
                {group.upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className={styles.meetingCard}>
                    <div className={styles.meetingDate}>
                      <span className={styles.day}>
                        {new Date(meeting.date).getDate()}
                      </span>
                      <span className={styles.month}>
                        {new Date(meeting.date).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <div className={styles.meetingInfo}>
                      <h3>{meeting.title}</h3>
                      <p>{meeting.description}</p>
                      <div className={styles.meetingMeta}>
                        <span>{meeting.time}</span>
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noMeetings}>No upcoming meetings scheduled</p>
            )}
          </section>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.organizers}>
            <h2>Organizers</h2>
            <div className={styles.organizersList}>
              {group.organizers.map(organizer => (
                <div key={organizer.id} className={styles.organizerCard}>
                  <img src={organizer.avatar} alt={organizer.name} />
                  <div>
                    <h3>{organizer.name}</h3>
                    <p>{organizer.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {isJoined && (
            <section className={styles.groupChat}>
              <h2>Group Chat</h2>
              <Link to={`/groups/${id}/chat`} className={styles.chatButton}>
                Open Chat
              </Link>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
};

export default GroupDetail;