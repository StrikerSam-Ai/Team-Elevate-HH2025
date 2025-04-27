import React, { useState } from 'react';
import './HealthTracker.css';

const HealthTracker = () => {
  const [activeMetric, setActiveMetric] = useState('steps');
  
  // Mock data - in a real application this would come from an API or state management
  const healthData = {
    steps: {
      today: 8754,
      goal: 10000,
      weekly: [9823, 7403, 10342, 8754, 6543, 12054, 8432]
    },
    sleep: {
      last: 7.5,
      goal: 8,
      weekly: [7.2, 6.8, 8.1, 7.5, 7.9, 6.5, 8.3]
    },
    bloodPressure: {
      latest: {
        systolic: 122,
        diastolic: 78,
        date: new Date().setDate(new Date().getDate() - 1)
      },
      readings: [
        {
          systolic: 122,
          diastolic: 78,
          date: new Date().setDate(new Date().getDate() - 1)
        },
        {
          systolic: 125,
          diastolic: 80,
          date: new Date().setDate(new Date().getDate() - 3)
        },
        {
          systolic: 128,
          diastolic: 82,
          date: new Date().setDate(new Date().getDate() - 5)
        },
        {
          systolic: 118,
          diastolic: 76,
          date: new Date().setDate(new Date().getDate() - 7)
        }
      ]
    },
    weight: {
      current: 168,
      goal: 160,
      history: [172, 170, 169, 168, 167, 169, 168]
    },
    mood: {
      today: 4,
      weekly: [3, 4, 5, 4, 2, 4, 4]
    }
  };
  
  // Chart display data
  const getChartData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    
    // Reorder days to start from last Sunday
    const orderedDays = [];
    for (let i = 0; i < 7; i++) {
      const index = (today - 6 + i + 7) % 7;
      orderedDays.push(days[index]);
    }
    
    return orderedDays;
  };
  
  const days = getChartData();
  
  // Function to add new health data
  const handleAddReading = (type) => {
    // In a real app, this would open a form modal
    alert(`Recording new ${type} measurement. This would open a form.`);
  };
  
  return (
    <div className="health-tracker">
      <div className="tracker-header">
        <h2>Health Trackers</h2>
        <p>Monitor your health metrics and see your progress</p>
      </div>
      
      <div className="metrics-navigation">
        <button 
          className={`metric-nav-button ${activeMetric === 'steps' ? 'active' : ''}`}
          onClick={() => setActiveMetric('steps')}
        >
          <span className="metric-icon">👣</span>
          <span className="metric-name">Steps</span>
        </button>
        <button 
          className={`metric-nav-button ${activeMetric === 'sleep' ? 'active' : ''}`}
          onClick={() => setActiveMetric('sleep')}
        >
          <span className="metric-icon">💤</span>
          <span className="metric-name">Sleep</span>
        </button>
        <button 
          className={`metric-nav-button ${activeMetric === 'bloodPressure' ? 'active' : ''}`}
          onClick={() => setActiveMetric('bloodPressure')}
        >
          <span className="metric-icon">❤️</span>
          <span className="metric-name">Blood Pressure</span>
        </button>
        <button 
          className={`metric-nav-button ${activeMetric === 'weight' ? 'active' : ''}`}
          onClick={() => setActiveMetric('weight')}
        >
          <span className="metric-icon">⚖️</span>
          <span className="metric-name">Weight</span>
        </button>
        <button 
          className={`metric-nav-button ${activeMetric === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveMetric('mood')}
        >
          <span className="metric-icon">😊</span>
          <span className="metric-name">Mood</span>
        </button>
      </div>
      
      <div className="metric-details">
        {activeMetric === 'steps' && (
          <div className="steps-tracker metric-panel">
            <div className="metric-summary">
              <div className="today-metric">
                <h3>Today's Steps</h3>
                <div className="metric-value">{healthData.steps.today.toLocaleString()}</div>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min((healthData.steps.today / healthData.steps.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="goal-text">
                    {Math.round((healthData.steps.today / healthData.steps.goal) * 100)}% of daily goal ({healthData.steps.goal.toLocaleString()} steps)
                  </div>
                </div>
              </div>
              
              <div className="metric-actions">
                <button 
                  className="record-button"
                  onClick={() => handleAddReading('steps')}
                >
                  Record Steps
                </button>
                <button className="edit-goal-button">
                  Edit Goal
                </button>
              </div>
            </div>
            
            <div className="weekly-chart">
              <h3>Weekly Steps</h3>
              <div className="chart-container">
                <div className="chart-bars">
                  {healthData.steps.weekly.map((steps, index) => (
                    <div key={index} className="chart-bar-container">
                      <div className="chart-label">{days[index]}</div>
                      <div className="chart-bar-wrapper">
                        <div 
                          className="chart-bar"
                          style={{ 
                            height: `${(steps / healthData.steps.goal) * 100}%`,
                            backgroundColor: steps >= healthData.steps.goal ? '#4CAF50' : '#4a6da7'
                          }}
                        ></div>
                      </div>
                      <div className="chart-value">{steps > 0 ? steps.toLocaleString() : '-'}</div>
                    </div>
                  ))}
                </div>
                <div className="goal-line">
                  <div className="line"></div>
                  <div className="label">Goal: {healthData.steps.goal.toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            <div className="health-tips">
              <h3>Tips for Increasing Daily Steps</h3>
              <ul className="tip-list">
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Park farther away from entrances when shopping or running errands.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Take the stairs instead of the elevator for short trips.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Schedule short 5-10 minute walks throughout your day.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {activeMetric === 'sleep' && (
          <div className="sleep-tracker metric-panel">
            <div className="metric-summary">
              <div className="today-metric">
                <h3>Last Night's Sleep</h3>
                <div className="metric-value">{healthData.sleep.last} hours</div>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min((healthData.sleep.last / healthData.sleep.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="goal-text">
                    {Math.round((healthData.sleep.last / healthData.sleep.goal) * 100)}% of sleep goal ({healthData.sleep.goal} hours)
                  </div>
                </div>
              </div>
              
              <div className="metric-actions">
                <button 
                  className="record-button"
                  onClick={() => handleAddReading('sleep')}
                >
                  Record Sleep
                </button>
                <button className="edit-goal-button">
                  Edit Goal
                </button>
              </div>
            </div>
            
            <div className="weekly-chart">
              <h3>Weekly Sleep</h3>
              <div className="chart-container">
                <div className="chart-bars">
                  {healthData.sleep.weekly.map((hours, index) => (
                    <div key={index} className="chart-bar-container">
                      <div className="chart-label">{days[index]}</div>
                      <div className="chart-bar-wrapper">
                        <div 
                          className="chart-bar"
                          style={{ 
                            height: `${(hours / 12) * 100}%`,
                            backgroundColor: hours >= healthData.sleep.goal ? '#4CAF50' : '#4a6da7'
                          }}
                        ></div>
                      </div>
                      <div className="chart-value">{hours > 0 ? `${hours} hrs` : '-'}</div>
                    </div>
                  ))}
                </div>
                <div className="goal-line">
                  <div className="line"></div>
                  <div className="label">Goal: {healthData.sleep.goal} hours</div>
                </div>
              </div>
            </div>
            
            <div className="health-tips">
              <h3>Tips for Better Sleep</h3>
              <ul className="tip-list">
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Keep a consistent sleep schedule, going to bed and waking up at the same time each day.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Create a relaxing bedtime routine, such as reading or listening to calming music.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Avoid caffeine, large meals, and screen time before bed.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {activeMetric === 'bloodPressure' && (
          <div className="blood-pressure-tracker metric-panel">
            <div className="metric-summary">
              <div className="today-metric">
                <h3>Latest Blood Pressure</h3>
                <div className="metric-value">
                  {healthData.bloodPressure.latest.systolic}/{healthData.bloodPressure.latest.diastolic}
                </div>
                <div className="bp-category">
                  {(() => {
                    const { systolic, diastolic } = healthData.bloodPressure.latest;
                    if (systolic < 120 && diastolic < 80) {
                      return <span className="normal">Normal</span>;
                    } else if ((systolic >= 120 && systolic <= 129) && diastolic < 80) {
                      return <span className="elevated">Elevated</span>;
                    } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
                      return <span className="stage-1">Stage 1 Hypertension</span>;
                    } else if (systolic >= 140 || diastolic >= 90) {
                      return <span className="stage-2">Stage 2 Hypertension</span>;
                    } else {
                      return <span className="normal">Unclassified</span>;
                    }
                  })()}
                </div>
                <div className="last-measured">
                  Last measured: {new Date(healthData.bloodPressure.latest.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
              </div>
              
              <div className="metric-actions">
                <button 
                  className="record-button"
                  onClick={() => handleAddReading('bloodPressure')}
                >
                  Record Blood Pressure
                </button>
                <button className="view-history-button">
                  View History
                </button>
              </div>
            </div>
            
            <div className="bp-readings">
              <h3>Recent Readings</h3>
              <table className="bp-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Systolic</th>
                    <th>Diastolic</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {healthData.bloodPressure.readings.map((reading, index) => {
                    const date = new Date(reading.date);
                    let category;
                    
                    if (reading.systolic < 120 && reading.diastolic < 80) {
                      category = <span className="normal">Normal</span>;
                    } else if ((reading.systolic >= 120 && reading.systolic <= 129) && reading.diastolic < 80) {
                      category = <span className="elevated">Elevated</span>;
                    } else if ((reading.systolic >= 130 && reading.systolic <= 139) || (reading.diastolic >= 80 && reading.diastolic <= 89)) {
                      category = <span className="stage-1">Stage 1</span>;
                    } else if (reading.systolic >= 140 || reading.diastolic >= 90) {
                      category = <span className="stage-2">Stage 2</span>;
                    } else {
                      category = <span>-</span>;
                    }
                    
                    return (
                      <tr key={index}>
                        <td>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                        <td>{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                        <td>{reading.systolic}</td>
                        <td>{reading.diastolic}</td>
                        <td>{category}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="health-tips">
              <h3>Blood Pressure Management Tips</h3>
              <ul className="tip-list">
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Reduce sodium (salt) in your diet to help lower blood pressure.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Regular physical activity can help reduce blood pressure.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Take your medications as prescribed by your doctor.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {activeMetric === 'weight' && (
          <div className="weight-tracker metric-panel">
            <div className="metric-summary">
              <div className="today-metric">
                <h3>Current Weight</h3>
                <div className="metric-value">{healthData.weight.current} lbs</div>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min(100 - Math.abs((healthData.weight.current - healthData.weight.goal) / healthData.weight.goal * 100), 100)}%`,
                        backgroundColor: healthData.weight.current <= healthData.weight.goal ? '#4CAF50' : '#4a6da7'
                      }}
                    ></div>
                  </div>
                  <div className="goal-text">
                    {Math.abs(healthData.weight.current - healthData.weight.goal)} lbs {healthData.weight.current > healthData.weight.goal ? 'above' : 'below'} goal ({healthData.weight.goal} lbs)
                  </div>
                </div>
              </div>
              
              <div className="metric-actions">
                <button 
                  className="record-button"
                  onClick={() => handleAddReading('weight')}
                >
                  Record Weight
                </button>
                <button className="edit-goal-button">
                  Edit Goal
                </button>
              </div>
            </div>
            
            <div className="weight-history">
              <h3>Weight History</h3>
              <div className="line-chart">
                {/* In a real app, this would be a proper line chart */}
                <div className="chart-placeholder">
                  <div className="chart-line">
                    {healthData.weight.history.map((weight, index) => (
                      <div 
                        key={index}
                        className="chart-point"
                        style={{ 
                          left: `${index * 15}%`, 
                          bottom: `${((weight - Math.min(...healthData.weight.history)) / (Math.max(...healthData.weight.history) - Math.min(...healthData.weight.history))) * 80}%` 
                        }}
                      >
                        <div className="point"></div>
                        <div className="point-value">{weight}</div>
                      </div>
                    ))}
                  </div>
                  <div className="goal-line" style={{ bottom: `${((healthData.weight.goal - Math.min(...healthData.weight.history)) / (Math.max(...healthData.weight.history) - Math.min(...healthData.weight.history))) * 80}%` }}>
                    <div className="line"></div>
                    <div className="label">Goal: {healthData.weight.goal} lbs</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="health-tips">
              <h3>Weight Management Tips</h3>
              <ul className="tip-list">
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Focus on eating nutrient-dense foods like fruits, vegetables, lean proteins, and whole grains.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Stay hydrated by drinking water throughout the day.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Engage in strength training exercises to maintain muscle mass.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {activeMetric === 'mood' && (
          <div className="mood-tracker metric-panel">
            <div className="metric-summary">
              <div className="today-metric">
                <h3>Today's Mood</h3>
                <div className="mood-display">
                  {(() => {
                    switch(healthData.mood.today) {
                      case 1: return <span className="mood-emoji">😞</span>;
                      case 2: return <span className="mood-emoji">😔</span>;
                      case 3: return <span className="mood-emoji">😐</span>;
                      case 4: return <span className="mood-emoji">🙂</span>;
                      case 5: return <span className="mood-emoji">😊</span>;
                      default: return <span className="mood-emoji">❓</span>;
                    }
                  })()}
                </div>
                <div className="mood-description">
                  {(() => {
                    switch(healthData.mood.today) {
                      case 1: return "Very Low";
                      case 2: return "Low";
                      case 3: return "Neutral";
                      case 4: return "Good";
                      case 5: return "Excellent";
                      default: return "Not recorded";
                    }
                  })()}
                </div>
              </div>
              
              <div className="metric-actions">
                <button 
                  className="record-button"
                  onClick={() => handleAddReading('mood')}
                >
                  Record Mood
                </button>
                <button className="view-history-button">
                  View Journal
                </button>
              </div>
            </div>
            
            <div className="weekly-mood">
              <h3>Weekly Mood</h3>
              <div className="mood-week">
                {healthData.mood.weekly.map((moodValue, index) => (
                  <div key={index} className="day-mood">
                    <div className="mood-day">{days[index]}</div>
                    <div className="mood-indicator">
                      {moodValue > 0 ? (
                        (() => {
                          switch(moodValue) {
                            case 1: return <span className="mood-emoji">😞</span>;
                            case 2: return <span className="mood-emoji">😔</span>;
                            case 3: return <span className="mood-emoji">😐</span>;
                            case 4: return <span className="mood-emoji">🙂</span>;
                            case 5: return <span className="mood-emoji">😊</span>;
                            default: return <span className="mood-emoji">❓</span>;
                          }
                        })()
                      ) : (
                        <span className="no-mood">-</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="health-tips">
              <h3>Mental Wellness Tips</h3>
              <ul className="tip-list">
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Take time each day for an activity you enjoy, even if just for a few minutes.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Practice deep breathing or meditation to reduce stress.</span>
                </li>
                <li className="tip-item">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">Connect with friends or family members regularly, even if just by phone.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthTracker;