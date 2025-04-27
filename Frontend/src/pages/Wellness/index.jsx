import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Wellness.css';

const Wellness = () => {
  // State for wellness tracking
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock health data
  const healthMetrics = {
    steps: 4250,
    stepsGoal: 5000,
    heartRate: 68,
    heartRateRange: '60-100',
    bloodPressure: '125/82',
    bloodPressureRange: '120/80',
    sleep: 7.5,
    sleepGoal: 8,
    medication: 3,
    medicationTotal: 4,
    weight: 158,
    weightChange: -2,
  };
  
  // Mock medication data
  const medications = [
    { 
      id: 1, 
      name: 'Metformin', 
      dosage: '500mg', 
      frequency: 'Twice daily', 
      time: ['8:00 AM', '8:00 PM'], 
      taken: [true, false], 
      notes: 'Take with food' 
    },
    { 
      id: 2, 
      name: 'Lisinopril', 
      dosage: '10mg', 
      frequency: 'Once daily', 
      time: ['9:00 AM'], 
      taken: [true], 
      notes: 'For blood pressure' 
    },
    { 
      id: 3, 
      name: 'Vitamin D', 
      dosage: '1000 IU', 
      frequency: 'Once daily', 
      time: ['8:00 AM'], 
      taken: [true], 
      notes: '' 
    },
    { 
      id: 4, 
      name: 'Calcium + Magnesium', 
      dosage: '500mg', 
      frequency: 'Once daily', 
      time: ['8:00 PM'], 
      taken: [false], 
      notes: 'Take before bed' 
    }
  ];
  
  // Mock wellness tips data
  const wellnessTips = [
    {
      id: 1,
      category: 'exercise',
      title: 'Chair Yoga for Better Flexibility',
      content: 'Gentle stretching from a seated position can help maintain flexibility. Try these three simple exercises daily.',
      image: '/assets/images/wellness/chair-yoga.jpg',
      link: '/wellness/exercise/chair-yoga'
    },
    {
      id: 2,
      category: 'nutrition',
      title: 'Heart-Healthy Food Choices',
      content: 'Small dietary changes can make a big difference in heart health. Here are the top 5 foods to incorporate daily.',
      image: '/assets/images/wellness/heart-healthy-foods.jpg',
      link: '/wellness/nutrition/heart-health'
    },
    {
      id: 3,
      category: 'sleep',
      title: 'Improve Your Sleep Quality',
      content: 'Better sleep leads to better health. These simple bedtime routine changes can help you get more restful sleep.',
      image: '/assets/images/wellness/sleep-quality.jpg',
      link: '/wellness/sleep/better-sleep'
    },
    {
      id: 4,
      category: 'mindfulness',
      title: '5-Minute Mindfulness Practices',
      content: 'Taking short breaks for mindfulness can reduce stress and improve mental clarity. Try these quick exercises.',
      image: '/assets/images/wellness/mindfulness.jpg',
      link: '/wellness/mindfulness/quick-practices'
    }
  ];
  
  // Mock appointments data
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Primary Care',
      date: '2025-05-15T10:30:00',
      address: 'Wellness Medical Group, 123 Health St, Suite 205',
      phone: '(555) 123-4567',
      notes: 'Bring medication list and insurance card',
      recurring: false
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      date: '2025-06-02T14:00:00',
      address: 'Heart Health Center, 456 Medical Pkwy',
      phone: '(555) 789-0123',
      notes: 'Follow-up appointment. Blood tests 1 week before.',
      recurring: false
    },
    {
      id: 3,
      doctor: 'Dr. Lisa Williams',
      specialty: 'Physical Therapy',
      date: '2025-05-05T13:15:00',
      address: 'Active Life Rehabilitation, 789 Wellness Blvd',
      phone: '(555) 456-7890',
      notes: 'Wear comfortable clothing',
      recurring: true,
      recurrencePattern: 'Weekly on Mondays'
    }
  ];
  
  // Format date function
  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time function
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  // Calculate days until appointment
  const getDaysUntilAppointment = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const appointmentDate = new Date(dateString);
    appointmentDate.setHours(0, 0, 0, 0);
    
    const diffTime = appointmentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays > 0) {
      return `In ${diffDays} days`;
    } else {
      return `${Math.abs(diffDays)} days ago`;
    }
  };
  
  // Calculate metric progress percentage
  const calculateProgress = (value, goal) => {
    return Math.min(Math.round((value / goal) * 100), 100);
  };
  
  return (
    <div className="wellness-page">
      <header className="wellness-header">
        <h1>Health & Wellness</h1>
        <p>Track, manage, and improve your health and wellbeing</p>
      </header>
      
      <div className="wellness-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'medications' ? 'active' : ''}`}
          onClick={() => setActiveTab('medications')}
        >
          Medications
        </button>
        <button 
          className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button 
          className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
      </div>
      
      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="wellness-tab-content">
          <div className="wellness-section">
            <h2>Today's Health Snapshot</h2>
            <p className="section-subtitle">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">👣</div>
                <h3>Daily Steps</h3>
                <div className="metric-value">{healthMetrics.steps.toLocaleString()}</div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{width: `${calculateProgress(healthMetrics.steps, healthMetrics.stepsGoal)}%`}}
                  ></div>
                </div>
                <div className="metric-target">Goal: {healthMetrics.stepsGoal.toLocaleString()} steps</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">❤️</div>
                <h3>Heart Rate</h3>
                <div className="metric-value">{healthMetrics.heartRate} <span className="metric-unit">bpm</span></div>
                <div className="metric-range">
                  Normal range: {healthMetrics.heartRateRange} bpm
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">💤</div>
                <h3>Sleep</h3>
                <div className="metric-value">{healthMetrics.sleep} <span className="metric-unit">hrs</span></div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{width: `${calculateProgress(healthMetrics.sleep, healthMetrics.sleepGoal)}%`}}
                  ></div>
                </div>
                <div className="metric-target">Goal: {healthMetrics.sleepGoal} hours</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">💊</div>
                <h3>Medications</h3>
                <div className="metric-value">
                  {healthMetrics.medication}/{healthMetrics.medicationTotal}
                  <span className="metric-unit"> taken</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{width: `${calculateProgress(healthMetrics.medication, healthMetrics.medicationTotal)}%`}}
                  ></div>
                </div>
                <div className="metric-action">
                  <button className="pill-button" onClick={() => setActiveTab('medications')}>
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="wellness-section">
            <h2>Wellness Tips for You</h2>
            <p className="section-subtitle">
              Personalized recommendations based on your health profile
            </p>
            
            <div className="wellness-tips-grid">
              {wellnessTips.map(tip => (
                <div key={tip.id} className="wellness-tip-card">
                  <div className="tip-image-container">
                    <div className="tip-image-placeholder">
                      {tip.category === 'exercise' && '🏃‍♂️'}
                      {tip.category === 'nutrition' && '🥗'}
                      {tip.category === 'sleep' && '🛌'}
                      {tip.category === 'mindfulness' && '🧘‍♀️'}
                    </div>
                    <div className="tip-category">{tip.category}</div>
                  </div>
                  <div className="tip-content">
                    <h3>{tip.title}</h3>
                    <p>{tip.content}</p>
                    <Link to={tip.link} className="learn-more-link">
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="wellness-section">
            <h2>Upcoming Appointments</h2>
            <p className="section-subtitle">
              Your next 2 scheduled medical appointments
            </p>
            
            {appointments.slice(0, 2).map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-status">
                  <div className="status-badge">
                    {getDaysUntilAppointment(appointment.date)}
                  </div>
                  {appointment.recurring && (
                    <div className="recurring-badge">
                      <span className="recurring-icon">🔄</span> Recurring
                    </div>
                  )}
                </div>
                
                <div className="appointment-details">
                  <h3 className="doctor-name">{appointment.doctor}</h3>
                  <div className="doctor-specialty">{appointment.specialty}</div>
                  
                  <div className="appointment-datetime">
                    <div className="appointment-date">
                      <span className="detail-icon">📅</span>
                      <span className="detail-text">{formatDate(appointment.date)}</span>
                    </div>
                    <div className="appointment-time">
                      <span className="detail-icon">🕒</span>
                      <span className="detail-text">{formatTime(appointment.date)}</span>
                    </div>
                  </div>
                  
                  <div className="appointment-location">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">{appointment.address}</span>
                  </div>
                  
                  <div className="appointment-phone">
                    <span className="detail-icon">📞</span>
                    <span className="detail-text">{appointment.phone}</span>
                  </div>
                  
                  {appointment.notes && (
                    <div className="appointment-notes">
                      <span className="detail-icon">📝</span>
                      <span className="detail-text">{appointment.notes}</span>
                    </div>
                  )}
                </div>
                
                <div className="appointment-actions">
                  <button className="action-button secondary">
                    <span className="action-icon">📅</span> Reschedule
                  </button>
                  <button className="action-button primary">
                    <span className="action-icon">📝</span> Prepare
                  </button>
                </div>
              </div>
            ))}
            
            <div className="view-all-appointments">
              <button className="view-all-button" onClick={() => setActiveTab('appointments')}>
                View All Appointments
              </button>
            </div>
          </div>
          
          <div className="connect-device-section">
            <div className="connect-device-content">
              <h2>Connect Your Health Devices</h2>
              <p>
                Link your smartwatch, blood pressure monitor, or other health devices 
                to automatically track your vitals and activity.
              </p>
              <Link to="/wellness/connect-devices" className="connect-device-button">
                Connect Devices
              </Link>
            </div>
            <div className="connect-device-image">
              <div className="device-image-placeholder">
                <span className="device-icon-large">⌚</span>
                <span className="device-icon-medium">💓</span>
                <span className="device-icon-small">📱</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Medications Tab Content */}
      {activeTab === 'medications' && (
        <div className="wellness-tab-content">
          <div className="wellness-section">
            <div className="section-header-with-actions">
              <div>
                <h2>Medication Tracker</h2>
                <p className="section-subtitle">
                  Keep track of your daily medications and supplements
                </p>
              </div>
              <div className="section-actions">
                <button className="action-button primary">
                  <span className="action-icon">➕</span> Add Medication
                </button>
              </div>
            </div>
            
            <div className="date-navigator">
              <button className="nav-button">
                <span className="nav-icon">◀</span>
              </button>
              <div className="current-date">
                Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </div>
              <button className="nav-button">
                <span className="nav-icon">▶</span>
              </button>
            </div>
            
            <div className="medications-list">
              {medications.map(med => (
                <div key={med.id} className="medication-card">
                  <div className="medication-header">
                    <div className="medication-name-row">
                      <h3>{med.name}</h3>
                      <div className="medication-dosage">{med.dosage}</div>
                    </div>
                    <div className="medication-frequency">{med.frequency}</div>
                  </div>
                  
                  <div className="medication-schedule">
                    {med.time.map((time, index) => (
                      <div key={index} className="dosage-time">
                        <div className="dosage-time-label">{time}</div>
                        <label className="checkbox-container">
                          <input 
                            type="checkbox" 
                            checked={med.taken[index]} 
                            onChange={() => {}} 
                          />
                          <span className="checkmark"></span>
                          <span className="status-text">
                            {med.taken[index] ? 'Taken' : 'Not taken'}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {med.notes && (
                    <div className="medication-notes">
                      <span className="note-icon">📝</span>
                      <span className="note-text">{med.notes}</span>
                    </div>
                  )}
                  
                  <div className="medication-actions">
                    <button className="pill-button secondary">Edit</button>
                    <button className="pill-button">Set Reminder</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="medication-reminders">
              <h3 className="reminders-header">
                <span className="reminder-icon">⏰</span> Medication Reminders
              </h3>
              <p>Never miss a dose with customized reminders</p>
              
              <div className="reminder-options">
                <div className="reminder-option">
                  <div className="option-icon">📱</div>
                  <div className="option-text">App Notifications</div>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="reminder-option">
                  <div className="option-icon">📧</div>
                  <div className="option-text">Email Reminders</div>
                  <label className="switch">
                    <input type="checkbox" checked={false} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="reminder-option">
                  <div className="option-icon">💬</div>
                  <div className="option-text">Text Messages</div>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="wellness-section">
            <div className="section-header-with-actions">
              <div>
                <h2>Medication History</h2>
                <p className="section-subtitle">
                  Track your medication adherence over time
                </p>
              </div>
              <div className="section-actions">
                <button className="action-button secondary">
                  <span className="action-icon">📊</span> View Report
                </button>
              </div>
            </div>
            
            <div className="medication-chart-placeholder">
              <div className="chart-message">
                <span className="chart-icon">📈</span>
                <div>Medication adherence chart would be displayed here</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Appointments Tab Content */}
      {activeTab === 'appointments' && (
        <div className="wellness-tab-content">
          <div className="wellness-section">
            <div className="section-header-with-actions">
              <div>
                <h2>Your Medical Appointments</h2>
                <p className="section-subtitle">
                  Manage all your healthcare appointments in one place
                </p>
              </div>
              <div className="section-actions">
                <button className="action-button secondary">
                  <span className="action-icon">🔍</span> Find Doctor
                </button>
                <button className="action-button primary">
                  <span className="action-icon">➕</span> Add Appointment
                </button>
              </div>
            </div>
            
            <div className="appointments-filters">
              <div className="filter-group">
                <label className="filter-label">Filter by:</label>
                <select className="filter-select">
                  <option value="upcoming">Upcoming Appointments</option>
                  <option value="past">Past Appointments</option>
                  <option value="all">All Appointments</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Specialty:</label>
                <select className="filter-select">
                  <option value="all">All Specialties</option>
                  <option value="primary">Primary Care</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="physical">Physical Therapy</option>
                </select>
              </div>
            </div>
            
            <div className="appointments-list">
              {appointments.map(appointment => (
                <div key={appointment.id} className="appointment-card full">
                  <div className="appointment-status">
                    <div className="status-badge">
                      {getDaysUntilAppointment(appointment.date)}
                    </div>
                    {appointment.recurring && (
                      <div className="recurring-badge">
                        <span className="recurring-icon">🔄</span> Recurring
                        <div className="recurring-tooltip">
                          {appointment.recurrencePattern}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="appointment-details">
                    <h3 className="doctor-name">{appointment.doctor}</h3>
                    <div className="doctor-specialty">{appointment.specialty}</div>
                    
                    <div className="appointment-datetime">
                      <div className="appointment-date">
                        <span className="detail-icon">📅</span>
                        <span className="detail-text">{formatDate(appointment.date)}</span>
                      </div>
                      <div className="appointment-time">
                        <span className="detail-icon">🕒</span>
                        <span className="detail-text">{formatTime(appointment.date)}</span>
                      </div>
                    </div>
                    
                    <div className="appointment-location">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{appointment.address}</span>
                    </div>
                    
                    <div className="appointment-phone">
                      <span className="detail-icon">📞</span>
                      <span className="detail-text">{appointment.phone}</span>
                    </div>
                    
                    {appointment.notes && (
                      <div className="appointment-notes">
                        <span className="detail-icon">📝</span>
                        <span className="detail-text">{appointment.notes}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="appointment-actions">
                    <button className="action-button text">
                      <span className="action-icon">🗑️</span> Cancel
                    </button>
                    <button className="action-button secondary">
                      <span className="action-icon">📅</span> Reschedule
                    </button>
                    <button className="action-button primary">
                      <span className="action-icon">📝</span> Prepare
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="wellness-section">
            <h2>Preparation Checklist</h2>
            <p className="section-subtitle">
              Things to remember before your upcoming appointments
            </p>
            
            <div className="checklist-card">
              <h3>General Appointment Checklist</h3>
              <ul className="preparation-checklist">
                <li>
                  <label className="checkbox-container">
                    <input type="checkbox" onChange={() => {}} />
                    <span className="checkmark"></span>
                    <span className="checklist-text">Bring a list of current medications</span>
                  </label>
                </li>
                <li>
                  <label className="checkbox-container">
                    <input type="checkbox" onChange={() => {}} />
                    <span className="checkmark"></span>
                    <span className="checklist-text">Bring insurance card and photo ID</span>
                  </label>
                </li>
                <li>
                  <label className="checkbox-container">
                    <input type="checkbox" onChange={() => {}} />
                    <span className="checkmark"></span>
                    <span className="checklist-text">Write down questions for your doctor</span>
                  </label>
                </li>
                <li>
                  <label className="checkbox-container">
                    <input type="checkbox" onChange={() => {}} />
                    <span className="checkmark"></span>
                    <span className="checklist-text">Bring recent test results if applicable</span>
                  </label>
                </li>
                <li>
                  <label className="checkbox-container">
                    <input type="checkbox" onChange={() => {}} />
                    <span className="checkmark"></span>
                    <span className="checklist-text">Arrange transportation to and from appointment</span>
                  </label>
                </li>
              </ul>
              <div className="checklist-actions">
                <button className="pill-button">Add Item</button>
                <button className="pill-button secondary">Save as Template</button>
              </div>
            </div>
          </div>
          
          <div className="transportation-section">
            <div className="transportation-content">
              <h2>Need Transportation?</h2>
              <p>
                Our platform offers free transportation services to help you get to 
                and from your medical appointments safely.
              </p>
              <Link to="/wellness/transportation" className="transportation-button">
                Schedule a Ride
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Resources Tab Content */}
      {activeTab === 'resources' && (
        <div className="wellness-tab-content">
          <div className="wellness-section">
            <h2>Health Resources & Education</h2>
            <p className="section-subtitle">
              Curated articles, videos, and guides for your health journey
            </p>
            
            <div className="resources-categories">
              <button className="category-button active">All Resources</button>
              <button className="category-button">Chronic Conditions</button>
              <button className="category-button">Preventive Care</button>
              <button className="category-button">Nutrition</button>
              <button className="category-button">Exercise</button>
              <button className="category-button">Mental Health</button>
            </div>
            
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-type">Article</div>
                <h3>Understanding Blood Pressure Readings</h3>
                <p>
                  Learn what your blood pressure numbers mean and what are 
                  healthy targets for adults over 65.
                </p>
                <div className="resource-meta">
                  <div className="resource-source">American Heart Association</div>
                  <div className="resource-time">5 min read</div>
                </div>
                <Link to="/wellness/resources/blood-pressure-article" className="resource-link">
                  Read Article →
                </Link>
              </div>
              
              <div className="resource-card">
                <div className="resource-type">Video</div>
                <h3>Low-Impact Exercises for Joint Health</h3>
                <p>
                  A collection of gentle exercises designed to maintain 
                  mobility and reduce joint pain.
                </p>
                <div className="resource-meta">
                  <div className="resource-source">Physical Therapy Association</div>
                  <div className="resource-time">12 min video</div>
                </div>
                <Link to="/wellness/resources/joint-health-video" className="resource-link">
                  Watch Video →
                </Link>
              </div>
              
              <div className="resource-card">
                <div className="resource-type">Guide</div>
                <h3>Medication Management Tips for Seniors</h3>
                <p>
                  Practical advice for organizing medications, setting reminders, 
                  and avoiding common medication errors.
                </p>
                <div className="resource-meta">
                  <div className="resource-source">Senior Health Partners</div>
                  <div className="resource-time">8 min read</div>
                </div>
                <Link to="/wellness/resources/medication-management" className="resource-link">
                  Read Guide →
                </Link>
              </div>
              
              <div className="resource-card">
                <div className="resource-type">Tool</div>
                <h3>Sleep Quality Assessment</h3>
                <p>
                  Take this brief assessment to evaluate your sleep quality 
                  and receive personalized recommendations.
                </p>
                <div className="resource-meta">
                  <div className="resource-source">National Sleep Foundation</div>
                  <div className="resource-time">3 min assessment</div>
                </div>
                <Link to="/wellness/resources/sleep-assessment" className="resource-link">
                  Take Assessment →
                </Link>
              </div>
            </div>
            
            <div className="load-more">
              <button className="load-more-button">
                Load More Resources
              </button>
            </div>
          </div>
          
          <div className="wellness-section">
            <h2>Ask a Healthcare Question</h2>
            <p className="section-subtitle">
              Get answers from medical professionals or our AI health companion
            </p>
            
            <div className="question-options">
              <div className="question-option-card">
                <div className="option-icon human">👩‍⚕️</div>
                <h3>Ask a Doctor</h3>
                <p>
                  Submit your health question to be answered by a healthcare professional 
                  within 24-48 hours.
                </p>
                <button className="option-button">
                  Ask Professional
                </button>
              </div>
              
              <div className="question-option-card highlighted">
                <div className="option-icon ai">🤖</div>
                <h3>Ask Health Companion</h3>
                <p>
                  Get immediate answers to general health questions from our 
                  AI health companion.
                </p>
                <button className="option-button">
                  Chat Now
                </button>
                <div className="option-footnote">
                  Note: AI companion provides general information only, 
                  not medical advice.
                </div>
              </div>
            </div>
          </div>
          
          <div className="wellness-section">
            <h2>Find Care Near You</h2>
            <p className="section-subtitle">
              Discover healthcare providers and wellness services in your area
            </p>
            
            <div className="care-search-box">
              <div className="search-row">
                <div className="search-field">
                  <label>I'm looking for:</label>
                  <select>
                    <option>Primary Care Doctor</option>
                    <option>Specialist</option>
                    <option>Pharmacy</option>
                    <option>Urgent Care</option>
                    <option>Wellness Center</option>
                  </select>
                </div>
                <div className="search-field">
                  <label>Location:</label>
                  <input type="text" placeholder="Enter ZIP code" defaultValue="90210" />
                </div>
                <div className="search-field">
                  <label>Insurance:</label>
                  <select>
                    <option>Medicare</option>
                    <option>Blue Cross</option>
                    <option>Aetna</option>
                    <option>United Healthcare</option>
                    <option>Other</option>
                  </select>
                </div>
                <button className="search-button">
                  <span className="search-icon">🔍</span> Search
                </button>
              </div>
            </div>
            
            <div className="map-placeholder">
              <div className="map-message">
                <span className="map-icon">🗺️</span>
                <div>Map with nearby healthcare providers would be displayed here</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wellness;