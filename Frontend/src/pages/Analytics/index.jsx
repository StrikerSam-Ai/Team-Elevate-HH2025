import React, { useState, useEffect } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [healthData, setHealthData] = useState({});
  const [activityData, setActivityData] = useState({});
  const [usageData, setUsageData] = useState({});
  const [timeRange, setTimeRange] = useState('weekly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API calls to fetch analytics data
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);

        // Mock data - will be replaced with actual API calls
        // Health metrics mock data
        const mockHealthData = {
          bloodPressure: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            systolic: [120, 118, 122, 125, 119, 121, 118],
            diastolic: [80, 78, 82, 84, 79, 81, 78],
            target: { systolic: 120, diastolic: 80 },
          },
          heartRate: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [72, 74, 71, 73, 75, 70, 72],
            target: { min: 60, max: 100 },
          },
          sleep: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [7.5, 6.8, 7.2, 6.5, 8.0, 7.8, 7.3],
            target: 7,
          },
          weight: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            values: [68.5, 68.2, 67.8, 67.5],
          }
        };

        // Activity metrics mock data
        const mockActivityData = {
          steps: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [5200, 4800, 6100, 5500, 7200, 8500, 6000],
            target: 6000,
          },
          exercise: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [30, 0, 45, 20, 0, 60, 30],
            target: 30,
          },
          standingHours: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [8, 7, 9, 8, 7, 10, 8],
          }
        };

        // Platform usage mock data
        const mockUsageData = {
          featureUsage: [
            { name: 'Companions', percentage: 35 },
            { name: 'Resources', percentage: 25 },
            { name: 'Events', percentage: 20 },
            { name: 'Family', percentage: 15 },
            { name: 'Journal', percentage: 5 }
          ],
          companionInteractions: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [12, 8, 15, 10, 14, 20, 18],
          },
          activeSessions: {
            labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
            values: [35, 25, 30, 10],
          }
        };

        setHealthData(mockHealthData);
        setActivityData(mockActivityData);
        setUsageData(mockUsageData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange]); // Re-fetch data when time range changes

  const renderChart = (data, title, type) => {
    if (!data || !data.labels) return null;
    
    // This is a simplified chart representation - in a real app, you'd use a charting library like Chart.js or Recharts
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3>{title}</h3>
          {data.target && (
            <div className="target-info">
              {typeof data.target === 'object' ? (
                <span>Target: {data.target.min}-{data.target.max}</span>
              ) : (
                <span>Target: {data.target}</span>
              )}
            </div>
          )}
        </div>
        <div className="chart-content">
          <div className="chart-visualization">
            {/* This is a placeholder for the actual chart */}
            <div className="chart-placeholder">
              <p>Chart visualization for {title}</p>
              {type === 'line' && <div className="line-chart-icon">📈</div>}
              {type === 'bar' && <div className="bar-chart-icon">📊</div>}
              {type === 'pie' && <div className="pie-chart-icon">🥧</div>}
            </div>
          </div>
          <div className="chart-data">
            <table>
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {data.labels.map((label, index) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>
                      {data.values ? 
                        data.values[index] : 
                        data.systolic ? 
                          `${data.systolic[index]}/${data.diastolic[index]}` : 
                          '---'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderHealthMetrics = () => (
    <div className="analytics-section health-metrics">
      <h2>Health Metrics</h2>
      <div className="metrics-grid">
        {renderChart(healthData.bloodPressure, 'Blood Pressure', 'line')}
        {renderChart(healthData.heartRate, 'Heart Rate', 'line')}
        {renderChart(healthData.sleep, 'Sleep Hours', 'bar')}
        {renderChart(healthData.weight, 'Weight Tracking', 'line')}
      </div>
      <div className="health-summary">
        <h3>Summary</h3>
        <ul>
          <li>Blood pressure has remained within target range this week</li>
          <li>Heart rate shows normal variation within healthy limits</li>
          <li>Average sleep is slightly above target at 7.3 hours</li>
          <li>Weight shows a gradual decrease of 1kg over the past month</li>
        </ul>
      </div>
    </div>
  );

  const renderActivityTracking = () => (
    <div className="analytics-section activity-tracking">
      <h2>Activity Tracking</h2>
      <div className="metrics-grid">
        {renderChart(activityData.steps, 'Daily Steps', 'bar')}
        {renderChart(activityData.exercise, 'Exercise Minutes', 'bar')}
        {renderChart(activityData.standingHours, 'Standing Hours', 'bar')}
      </div>
      <div className="activity-summary">
        <h3>Summary</h3>
        <ul>
          <li>You exceeded your daily step goal 3 out of 7 days this week</li>
          <li>Total exercise time: 185 minutes (target: 210 minutes)</li>
          <li>Average standing hours: 8.1 hours per day</li>
        </ul>
      </div>
    </div>
  );

  const renderUsageAnalytics = () => (
    <div className="analytics-section usage-analytics">
      <h2>Platform Usage</h2>
      <div className="metrics-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3>Feature Usage</h3>
          </div>
          <div className="chart-content">
            <div className="chart-visualization">
              <div className="chart-placeholder">
                <p>Pie chart of feature usage</p>
                <div className="pie-chart-icon">🥧</div>
              </div>
            </div>
            <div className="chart-data">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Usage %</th>
                  </tr>
                </thead>
                <tbody>
                  {usageData.featureUsage && usageData.featureUsage.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {renderChart(usageData.companionInteractions, 'Companion Interactions', 'bar')}
        {renderChart(usageData.activeSessions, 'Daily Active Sessions', 'pie')}
      </div>
      <div className="usage-summary">
        <h3>Summary</h3>
        <ul>
          <li>AI Companions are your most used feature (35% of total usage)</li>
          <li>Your peak platform usage is on weekends</li>
          <li>Most active time period: Morning (35% of sessions)</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="analytics-page">
      <header className="page-header">
        <h1>Health & Usage Analytics</h1>
        <p>Track your health metrics, activity levels, and platform usage patterns</p>
      </header>

      <div className="analytics-controls">
        <div className="time-range-selector">
          <label>Time Range:</label>
          <div className="range-buttons">
            <button 
              className={`range-button ${timeRange === 'daily' ? 'active' : ''}`}
              onClick={() => setTimeRange('daily')}
            >
              Daily
            </button>
            <button 
              className={`range-button ${timeRange === 'weekly' ? 'active' : ''}`}
              onClick={() => setTimeRange('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`range-button ${timeRange === 'monthly' ? 'active' : ''}`}
              onClick={() => setTimeRange('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`range-button ${timeRange === 'yearly' ? 'active' : ''}`}
              onClick={() => setTimeRange('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="export-button">
          <button 
            className="action-button export"
            onClick={() => alert('Reports will be exported in a real implementation')}
          >
            Export Reports
          </button>
        </div>
      </div>

      <div className="analytics-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading analytics data...</p>
          </div>
        ) : (
          <>
            {renderHealthMetrics()}
            {renderActivityTracking()}
            {renderUsageAnalytics()}
          </>
        )}
      </div>

      <div className="notes-section">
        <h3>Notes About Your Data</h3>
        <p>
          All health metrics are securely stored and encrypted. You have full control over your data
          and can choose what to share with family members or healthcare providers through the
          Family Connection feature.
        </p>
        <p>
          The recommendations provided are not medical advice. Please consult with your healthcare
          provider before making significant changes to your health regimen.
        </p>
      </div>

      <div className="share-section">
        <h3>Share Analytics</h3>
        <p>
          Share your health metrics with family members or healthcare providers.
          Select what data to share and with whom.
        </p>
        <button 
          className="action-button share"
          onClick={() => alert('Sharing options will be shown in a real implementation')}
        >
          Share Health Report
        </button>
      </div>
    </div>
  );
};

export default Analytics;