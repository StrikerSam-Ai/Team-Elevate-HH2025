import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  
  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    bio: ''
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    eventReminders: true,
    groupMessages: true,
    newsletter: false
  });
  
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Load user data
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        bio: user.bio || ''
      });
      
      if (user.preferences) {
        setPreferences(user.preferences);
      }
    }
  }, [user]);
  
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePreferencesChange = (e) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const savePersonalInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await updateUserProfile({ ...personalInfo });
      setMessage({
        type: 'success',
        text: 'Your personal information has been updated successfully.'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({
        type: 'error',
        text: 'Failed to update your information. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const savePreferences = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await updateUserProfile({ preferences });
      setMessage({
        type: 'success',
        text: 'Your preferences have been updated successfully.'
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      setMessage({
        type: 'error',
        text: 'Failed to update your preferences. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const changePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    // Validate passwords
    if (password.newPassword !== password.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match.'
      });
      setIsLoading(false);
      return;
    }
    
    if (password.newPassword.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password should be at least 8 characters long.'
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // This would call the actual API endpoint to change password
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulating API call
      
      setMessage({
        type: 'success',
        text: 'Your password has been changed successfully. Please log in with your new password.'
      });
      
      // Reset form
      setPassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Auto logout after password change
      setTimeout(() => {
        if (logout) logout();
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage({
        type: 'error',
        text: 'Failed to change your password. Please check your current password and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const deactivateAccount = () => {
    if (window.confirm('Are you sure you want to deactivate your account? This action is reversible but will hide your profile and activity until you log in again.')) {
      // Actual implementation would call the backend
      alert('Account deactivation feature would be implemented here.');
    }
  };
  
  const deleteAccount = () => {
    if (window.confirm('Are you absolutely sure you want to permanently delete your account? This action CANNOT be undone.')) {
      if (window.confirm('All your data will be permanently deleted. Continue?')) {
        // Actual implementation would call the backend
        alert('Account deletion feature would be implemented here.');
      }
    }
  };
  
  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your personal information and account settings</p>
      </header>
      
      <div className="profile-content">
        <aside className="profile-sidebar">
          <div className="user-avatar">
            {user?.profileImage ? (
              <img src={user.profileImage} alt={`${personalInfo.firstName} ${personalInfo.lastName}`} />
            ) : (
              <div className="avatar-placeholder">
                {personalInfo.firstName && personalInfo.lastName ? 
                  `${personalInfo.firstName[0]}${personalInfo.lastName[0]}` : 'U'}
              </div>
            )}
            <button className="change-avatar">Change Photo</button>
          </div>
          
          <nav className="profile-nav">
            <button 
              className={`nav-button ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <span className="icon">👤</span>
              Personal Information
            </button>
            <button 
              className={`nav-button ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <span className="icon">⚙️</span>
              Notification Preferences
            </button>
            <button 
              className={`nav-button ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <span className="icon">🔒</span>
              Security Settings
            </button>
            <button 
              className={`nav-button ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <span className="icon">📝</span>
              Activity History
            </button>
            <button 
              className={`nav-button ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <span className="icon">⚠️</span>
              Account Management
            </button>
          </nav>
        </aside>
        
        <main className="profile-main">
          {message.text && (
            <div className={`message ${message.type}`}>
              <p>{message.text}</p>
              <button 
                className="close-message" 
                onClick={() => setMessage({ type: '', text: '' })}
              >
                ✕
              </button>
            </div>
          )}
          
          {activeTab === 'personal' && (
            <section className="profile-section">
              <h2>Personal Information</h2>
              <p className="section-description">Update your personal details</p>
              
              <form onSubmit={savePersonalInfo} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      disabled
                    />
                    <small>Contact support to change your email address.</small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="birthDate">Date of Birth</label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={personalInfo.birthDate}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">About Me</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={personalInfo.bio}
                    onChange={handlePersonalInfoChange}
                    rows="4"
                    placeholder="Share a little about yourself"
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="save-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </section>
          )}
          
          {activeTab === 'preferences' && (
            <section className="profile-section">
              <h2>Notification Preferences</h2>
              <p className="section-description">Manage how you receive notifications from ElderHub</p>
              
              <form onSubmit={savePreferences} className="profile-form">
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={preferences.emailNotifications}
                      onChange={handlePreferencesChange}
                    />
                    <span>Email Notifications</span>
                    <small>Receive important updates and announcements via email</small>
                  </label>
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="eventReminders"
                      checked={preferences.eventReminders}
                      onChange={handlePreferencesChange}
                    />
                    <span>Event Reminders</span>
                    <small>Get reminded about upcoming events you've signed up for</small>
                  </label>
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="groupMessages"
                      checked={preferences.groupMessages}
                      onChange={handlePreferencesChange}
                    />
                    <span>Group Messages</span>
                    <small>Receive notifications when someone posts in your groups</small>
                  </label>
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={preferences.newsletter}
                      onChange={handlePreferencesChange}
                    />
                    <span>Monthly Newsletter</span>
                    <small>Stay informed with our monthly newsletter featuring community highlights</small>
                  </label>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="save-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </form>
            </section>
          )}
          
          {activeTab === 'security' && (
            <section className="profile-section">
              <h2>Security Settings</h2>
              <p className="section-description">Manage your password and account security</p>
              
              <form onSubmit={changePassword} className="profile-form">
                <h3>Change Password</h3>
                
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={password.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <small>Password must be at least 8 characters long</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="save-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
              
              <div className="security-info">
                <h3>Login Activity</h3>
                <p>Last login: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                <p>If you notice any suspicious activity, please change your password immediately and contact support.</p>
              </div>
            </section>
          )}
          
          {activeTab === 'activity' && (
            <section className="profile-section">
              <h2>Activity History</h2>
              <p className="section-description">Review your recent activities on ElderHub</p>
              
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">📅</div>
                  <div className="activity-details">
                    <p className="activity-title">RSVP to Morning Walk Event</p>
                    <p className="activity-date">April 25, 2025 at 3:42 PM</p>
                  </div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon">✍️</div>
                  <div className="activity-details">
                    <p className="activity-title">Created a new journal entry</p>
                    <p className="activity-date">April 25, 2025 at 10:15 AM</p>
                  </div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon">👥</div>
                  <div className="activity-details">
                    <p className="activity-title">Joined the Book Club group</p>
                    <p className="activity-date">April 22, 2025 at 2:30 PM</p>
                  </div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon">💬</div>
                  <div className="activity-details">
                    <p className="activity-title">Posted a comment in Book Club group</p>
                    <p className="activity-date">April 22, 2025 at 2:35 PM</p>
                  </div>
                </div>
              </div>
              
              <button className="load-more-button">Load More Activity</button>
            </section>
          )}
          
          {activeTab === 'account' && (
            <section className="profile-section">
              <h2>Account Management</h2>
              <p className="section-description">Manage your account settings</p>
              
              <div className="account-management">
                <div className="account-section">
                  <h3>Download Your Data</h3>
                  <p>Request a copy of all the data associated with your account</p>
                  <button className="download-data-button">Request Data</button>
                </div>
                
                <div className="account-section warning-section">
                  <h3>Deactivate Account</h3>
                  <p>Temporarily disable your account. You can reactivate it anytime by logging in.</p>
                  <button 
                    className="deactivate-button"
                    onClick={deactivateAccount}
                  >
                    Deactivate Account
                  </button>
                </div>
                
                <div className="account-section danger-section">
                  <h3>Delete Account</h3>
                  <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <button 
                    className="delete-button"
                    onClick={deleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;