import React from 'react';
import './WellnessPage.css';
import HealthTracker from './components/HealthTracker';
import healthData from './data/healthData';

const WellnessPage = () => {
  return (
    <div className="wellness-page">
      <div className="wellness-header">
        <h1>Wellness Dashboard</h1>
        <p>Track your health metrics and improve your well-being</p>
      </div>
      
      <div className="wellness-content">
        <div className="main-section">
          <HealthTracker healthData={healthData} />
          
          {/* We can add more wellness components here later */}
          <div className="coming-soon">
            <h2>More Features Coming Soon</h2>
            <p>Stay tuned for nutrition tracking, exercise plans, and mindfulness resources!</p>
          </div>
        </div>
        
        <div className="sidebar">
          <div className="wellness-tips-card">
            <h3>Daily Wellness Tip</h3>
            <div className="tip-content">
              <div className="tip-icon">💧</div>
              <p className="tip-text">
                <strong>Stay hydrated!</strong> Drinking enough water helps maintain energy levels, 
                improves cognitive function, and supports your overall health.
              </p>
            </div>
          </div>
          
          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <button className="quick-action-button">
              <span className="action-icon">📝</span>
              <span className="action-text">Record Health Data</span>
            </button>
            <button className="quick-action-button">
              <span className="action-icon">📊</span>
              <span className="action-text">View Health Reports</span>
            </button>
            <button className="quick-action-button">
              <span className="action-icon">🏃</span>
              <span className="action-text">Create Exercise Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessPage;