import React, { useState, useEffect } from 'react';
import './FamilyConnection.css';

const FamilyConnection = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch family members and alerts
    const fetchData = async () => {
      try {
        setLoading(true);
        // Mock data for now - will be replaced with actual API calls later
        const mockFamilyMembers = [
          {
            id: 1,
            name: 'Anita Sharma',
            relation: 'Daughter',
            lastActive: '10 minutes ago',
            phone: '+1 (555) 123-4567',
            email: 'anita@example.com',
            avatar: '👩',
            permission: {
              healthData: true,
              location: true,
              emergencyAlerts: true
            }
          },
          {
            id: 2,
            name: 'Rahul Singh',
            relation: 'Son',
            lastActive: '2 hours ago',
            phone: '+1 (555) 987-6543',
            email: 'rahul@example.com',
            avatar: '👨',
            permission: {
              healthData: true,
              location: false,
              emergencyAlerts: true
            }
          },
          {
            id: 3,
            name: 'Priya Patel',
            relation: 'Granddaughter',
            lastActive: '1 day ago',
            phone: '+1 (555) 456-7890',
            email: 'priya@example.com',
            avatar: '👧',
            permission: {
              healthData: false,
              location: true,
              emergencyAlerts: true
            }
          }
        ];

        const mockAlerts = [
          {
            id: 1,
            type: 'medication',
            message: 'Medication reminder sent to family',
            timestamp: '2025-04-27T08:30:00',
            acknowledged: true,
            acknowledgedBy: 'Anita Sharma'
          },
          {
            id: 2,
            type: 'health',
            message: 'Blood pressure reading shared',
            timestamp: '2025-04-26T14:45:00',
            acknowledged: true,
            acknowledgedBy: 'Rahul Singh'
          },
          {
            id: 3,
            type: 'activity',
            message: 'Daily activity summary shared',
            timestamp: '2025-04-25T20:15:00',
            acknowledged: false,
            acknowledgedBy: null
          }
        ];

        setFamilyMembers(mockFamilyMembers);
        setAlerts(mockAlerts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching family data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // In a real implementation, this would send the message to the backend
    alert(`Message sent: ${message}`);
    setMessage('');
  };

  const triggerEmergencyAlert = () => {
    // In a real implementation, this would send an emergency alert to all family members
    alert('Emergency alert sent to all family members');
  };

  const renderDashboard = () => (
    <div className="family-dashboard">
      <div className="family-stats">
        <div className="stat-card">
          <h3>Connected Family</h3>
          <div className="stat-value">{familyMembers.length}</div>
          <p>Family members</p>
        </div>
        <div className="stat-card">
          <h3>Health Updates</h3>
          <div className="stat-value">5</div>
          <p>This week</p>
        </div>
        <div className="stat-card">
          <h3>Messages</h3>
          <div className="stat-value">12</div>
          <p>Unread messages</p>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {alerts.map(alert => (
            <div className="activity-item" key={alert.id}>
              <div className="activity-icon">
                {alert.type === 'medication' && '💊'}
                {alert.type === 'health' && '❤️'}
                {alert.type === 'activity' && '🚶'}
              </div>
              <div className="activity-details">
                <p>{alert.message}</p>
                <span className="activity-time">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="activity-status">
                {alert.acknowledged ? 
                  <span className="acknowledged">✓ Seen by {alert.acknowledgedBy}</span> : 
                  <span className="pending">Pending</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="emergency-section">
        <button className="emergency-button" onClick={triggerEmergencyAlert}>
          Send Emergency Alert
        </button>
        <p>Press in case of emergency to alert all connected family members</p>
      </div>
    </div>
  );

  const renderFamilyMembers = () => (
    <div className="family-members-section">
      <div className="add-family">
        <button className="add-family-button">
          <span>+</span> Add Family Member
        </button>
      </div>
      
      <div className="family-list">
        {familyMembers.map(member => (
          <div className="family-card" key={member.id}>
            <div className="family-avatar">{member.avatar}</div>
            <div className="family-info">
              <h3>{member.name}</h3>
              <p className="relation">{member.relation}</p>
              <p className="last-active">Last active: {member.lastActive}</p>
            </div>
            <div className="family-contact">
              <p><strong>Phone:</strong> {member.phone}</p>
              <p><strong>Email:</strong> {member.email}</p>
            </div>
            <div className="family-permissions">
              <h4>Sharing Permissions</h4>
              <div className="permission-item">
                <span>Health Data</span>
                <span className={member.permission.healthData ? "enabled" : "disabled"}>
                  {member.permission.healthData ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="permission-item">
                <span>Location</span>
                <span className={member.permission.location ? "enabled" : "disabled"}>
                  {member.permission.location ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="permission-item">
                <span>Emergency Alerts</span>
                <span className={member.permission.emergencyAlerts ? "enabled" : "disabled"}>
                  {member.permission.emergencyAlerts ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
            <div className="family-actions">
              <button className="action-button message">Message</button>
              <button className="action-button edit">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="family-messages-section">
      <div className="messages-container">
        <div className="message-history">
          <div className="message received">
            <span className="message-sender">Anita Sharma</span>
            <div className="message-content">
              Hi Mom! How are you feeling today? Did you take your medicine?
            </div>
            <span className="message-time">10:30 AM</span>
          </div>
          
          <div className="message sent">
            <div className="message-content">
              I'm feeling much better today. Yes, I took my morning pills. The doctor's appointment went well yesterday.
            </div>
            <span className="message-time">10:45 AM</span>
          </div>
          
          <div className="message received">
            <span className="message-sender">Rahul Singh</span>
            <div className="message-content">
              That's great to hear! I'll stop by this weekend with some groceries. Need anything specific?
            </div>
            <span className="message-time">11:15 AM</span>
          </div>
          
          <div className="message sent">
            <div className="message-content">
              Thank you, dear. Some fresh fruits would be nice. And maybe those biscuits I like.
            </div>
            <span className="message-time">11:20 AM</span>
          </div>
        </div>
        
        <form className="message-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
      
      <div className="family-contacts">
        <h3>Family Contacts</h3>
        <div className="contacts-list">
          {familyMembers.map(member => (
            <div className="contact-item" key={member.id}>
              <div className="contact-avatar">{member.avatar}</div>
              <div className="contact-info">
                <h4>{member.name}</h4>
                <p>{member.relation}</p>
              </div>
              <div className="contact-status">
                <span className="status-indicator online"></span>
                <span>{member.lastActive}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="family-connection-page">
      <header className="page-header">
        <h1>Family Connection</h1>
        <p>Stay connected with your loved ones, share updates, and manage emergency contacts</p>
      </header>

      <div className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-button ${activeTab === 'family' ? 'active' : ''}`} 
          onClick={() => setActiveTab('family')}
        >
          Family Members
        </button>
        <button 
          className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`} 
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>

      <div className="tab-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading family data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'family' && renderFamilyMembers()}
            {activeTab === 'messages' && renderMessages()}
          </>
        )}
      </div>

      <div className="info-section">
        <h3>About Family Connection</h3>
        <p>
          The Family Connection feature helps you stay connected with your loved ones.
          Share health updates, location information, and communicate directly with family members.
          In case of emergency, you can alert all connected family members with a single click.
        </p>
        <div className="help-contact">
          <h4>Need Help?</h4>
          <p>Contact our support team at <strong>support@elderhub.com</strong> or call <strong>1-800-ELDER-HUB</strong></p>
        </div>
      </div>
    </div>
  );
};

export default FamilyConnection;