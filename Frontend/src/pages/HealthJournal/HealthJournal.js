import React, { useState, useEffect } from 'react';
import { FaPlus, FaPrint, FaCloudRain, FaSun, FaMoon, FaThermometerHalf, FaHeartbeat } from 'react-icons/fa';
import { MdOutlineMood, MdOutlineWaterDrop, MdLocalHospital, MdOutlineInsights } from 'react-icons/md';
import { BsCalendar3, BsClock, BsMoonStars } from 'react-icons/bs';
import './HealthJournal.css';

const HealthJournal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [currentView, setCurrentView] = useState('list');
  const [selectedTag, setSelectedTag] = useState('all');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    mood: 'good',
    painLevel: 1,
    sleepHours: 7,
    waterIntake: 6,
    symptoms: [],
    factors: [],
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Mock data for demonstration purposes
  const mockEntries = [
    {
      id: 1,
      date: '2025-04-26',
      time: '09:30 AM',
      title: 'Morning check-in',
      mood: 'good',
      painLevel: 2,
      sleepHours: 7.5,
      waterIntake: 5,
      symptoms: ['Mild headache', 'Stiffness'],
      factors: ['Weather change', 'Stress'],
      notes: 'Woke up with a slight headache, probably from the weather change. Feeling a bit stiff but overall okay.'
    },
    {
      id: 2,
      date: '2025-04-25',
      time: '08:15 PM',
      title: 'Evening summary',
      mood: 'excellent',
      painLevel: 1,
      sleepHours: 8,
      waterIntake: 7,
      symptoms: [],
      factors: ['Exercise', 'Good diet'],
      notes: 'Had a great day! Exercise in the morning really helped. No pain or discomfort throughout the day.'
    },
    {
      id: 3,
      date: '2025-04-24',
      time: '02:45 PM',
      title: 'After doctor appointment',
      mood: 'okay',
      painLevel: 3,
      sleepHours: 6,
      waterIntake: 4,
      symptoms: ['Joint pain', 'Fatigue'],
      factors: ['Medication adjustment', 'Poor sleep'],
      notes: 'Doctor adjusted my blood pressure medication. Feeling a bit tired and some joint pain in the afternoon.'
    }
  ];

  useEffect(() => {
    // Simulate loading data from API
    setIsLoading(true);
    setTimeout(() => {
      setEntries(mockEntries);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateEntry = () => {
    setShowEntryForm(true);
  };

  const handleCancelForm = () => {
    setShowEntryForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      mood: 'good',
      painLevel: 1,
      sleepHours: 7,
      waterIntake: 6,
      symptoms: [],
      factors: [],
      notes: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    // Create new entry
    const newEntry = {
      id: Date.now(),
      date: formData.date,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      title: formData.title,
      mood: formData.mood,
      painLevel: formData.painLevel,
      sleepHours: formData.sleepHours,
      waterIntake: formData.waterIntake,
      symptoms: formData.symptoms,
      factors: formData.factors,
      notes: formData.notes
    };
    
    // Add to entries
    setEntries([newEntry, ...entries]);
    
    // Hide form and reset
    setShowEntryForm(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMoodSelect = (mood) => {
    setFormData({
      ...formData,
      mood
    });
  };

  const handleSymptomsChange = (symptom) => {
    const updatedSymptoms = formData.symptoms.includes(symptom)
      ? formData.symptoms.filter(s => s !== symptom)
      : [...formData.symptoms, symptom];
      
    setFormData({
      ...formData,
      symptoms: updatedSymptoms
    });
  };

  const handleFactorSelect = (factor) => {
    const updatedFactors = formData.factors.includes(factor)
      ? formData.factors.filter(f => f !== factor)
      : [...formData.factors, factor];
      
    setFormData({
      ...formData,
      factors: updatedFactors
    });
  };

  const handlePrintJournal = () => {
    window.print();
  };

  // Filter entries based on selected tag
  const filteredEntries = selectedTag === 'all' 
    ? entries 
    : entries.filter(entry => 
        entry.symptoms.includes(selectedTag) || 
        entry.factors.includes(selectedTag)
      );

  const renderMoodEmoji = (mood) => {
    switch(mood) {
      case 'excellent': return '😃';
      case 'good': return '🙂';
      case 'okay': return '😐';
      case 'poor': return '😕';
      case 'bad': return '😢';
      default: return '😐';
    }
  };

  const getPainLevelClass = (level) => {
    if (level <= 1) return 'level-1';
    if (level <= 2) return 'level-2';
    if (level <= 3) return 'level-3';
    if (level <= 4) return 'level-4';
    return 'level-5';
  };

  // Gather all unique tags for filter
  const allTags = [...new Set(
    entries.flatMap(entry => [...entry.symptoms, ...entry.factors])
  )];

  return (
    <div className="health-journal-page">
      <div className="page-header">
        <h1>Health Journal</h1>
        <p>Track your daily health observations to gain insights about your wellness journey</p>
      </div>

      <div className="journal-controls">
        <div className="control-section">
          <button className="new-entry-button" onClick={handleCreateEntry}>
            <span className="add-icon"><FaPlus /></span>
            New Entry
          </button>
        </div>

        <div className="control-section view-toggle">
          <button 
            className={`view-toggle-button ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            List View
          </button>
          <button 
            className={`view-toggle-button ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => setCurrentView('calendar')}
          >
            Calendar View
          </button>
        </div>

        <div className="control-section tag-filter">
          <span className="filter-label">Filter by:</span>
          <select 
            className="tag-select"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="all">All Entries</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your journal entries...</p>
        </div>
      ) : showEntryForm ? (
        <form className="journal-entry-form" onSubmit={handleSubmitForm}>
          <div className="form-header">
            <h2>New Health Journal Entry</h2>
            <div className="form-actions">
              <button type="button" className="action-button" onClick={handleCancelForm}>Cancel</button>
              <button type="submit" className="action-button primary">Save Entry</button>
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label className="form-label" htmlFor="title">Entry Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Give your entry a title"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">How are you feeling today?</label>
                <div className="mood-selector">
                  <div 
                    className={`mood-option ${formData.mood === 'excellent' ? 'selected' : ''}`}
                    onClick={() => handleMoodSelect('excellent')}
                  >
                    <span className="mood-emoji">😃</span>
                    <span className="mood-label">Excellent</span>
                  </div>
                  <div 
                    className={`mood-option ${formData.mood === 'good' ? 'selected' : ''}`}
                    onClick={() => handleMoodSelect('good')}
                  >
                    <span className="mood-emoji">🙂</span>
                    <span className="mood-label">Good</span>
                  </div>
                  <div 
                    className={`mood-option ${formData.mood === 'okay' ? 'selected' : ''}`}
                    onClick={() => handleMoodSelect('okay')}
                  >
                    <span className="mood-emoji">😐</span>
                    <span className="mood-label">Okay</span>
                  </div>
                  <div 
                    className={`mood-option ${formData.mood === 'poor' ? 'selected' : ''}`}
                    onClick={() => handleMoodSelect('poor')}
                  >
                    <span className="mood-emoji">😕</span>
                    <span className="mood-label">Poor</span>
                  </div>
                  <div 
                    className={`mood-option ${formData.mood === 'bad' ? 'selected' : ''}`}
                    onClick={() => handleMoodSelect('bad')}
                  >
                    <span className="mood-emoji">😢</span>
                    <span className="mood-label">Bad</span>
                  </div>
                </div>
              </div>

              <div className="form-group pain-scale">
                <label className="form-label">Pain Level</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.painLevel}
                  onChange={(e) => handleInputChange({
                    target: { name: 'painLevel', value: parseInt(e.target.value) }
                  })}
                  className="pain-slider"
                />
                <div className="pain-labels">
                  <span>None</span>
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                  <span>Extreme</span>
                </div>
                <div className="current-pain-level">
                  Level: {formData.painLevel}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Common Symptoms</label>
                <div className="checkbox-grid">
                  {['Headache', 'Joint pain', 'Fatigue', 'Stiffness', 'Dizziness', 'Nausea'].map((symptom) => (
                    <div className="checkbox-container" key={symptom}>
                      <input
                        type="checkbox"
                        id={`symptom-${symptom}`}
                        checked={formData.symptoms.includes(symptom)}
                        onChange={() => handleSymptomsChange(symptom)}
                      />
                      <label htmlFor={`symptom-${symptom}`} className="checkbox-label">{symptom}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Hours of Sleep</label>
                <div className="sleep-input">
                  <button 
                    type="button"
                    className="adjust-button"
                    onClick={() => {
                      if (formData.sleepHours > 0) {
                        handleInputChange({
                          target: { name: 'sleepHours', value: formData.sleepHours - 0.5 }
                        });
                      }
                    }}
                  >−</button>
                  <span className="sleep-value">{formData.sleepHours}</span>
                  <button 
                    type="button"
                    className="adjust-button"
                    onClick={() => {
                      handleInputChange({
                        target: { name: 'sleepHours', value: formData.sleepHours + 0.5 }
                      });
                    }}
                  >+</button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Water Intake (glasses)</label>
                <div className="water-input">
                  <button 
                    type="button"
                    className="adjust-button"
                    onClick={() => {
                      if (formData.waterIntake > 0) {
                        handleInputChange({
                          target: { name: 'waterIntake', value: formData.waterIntake - 1 }
                        });
                      }
                    }}
                  >−</button>
                  <span className="water-value">{formData.waterIntake}</span>
                  <button 
                    type="button"
                    className="adjust-button"
                    onClick={() => {
                      handleInputChange({
                        target: { name: 'waterIntake', value: formData.waterIntake + 1 }
                      });
                    }}
                  >+</button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Potential Factors</label>
                <div className="tag-options">
                  {['Weather change', 'Stress', 'Exercise', 'Diet', 'Medication', 'Poor sleep'].map((factor) => (
                    <span
                      key={factor}
                      className={`tag-option ${formData.factors.includes(factor) ? 'selected' : ''}`}
                      onClick={() => handleFactorSelect(factor)}
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group notes-group">
                <label className="form-label" htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-control notes-textarea"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Record any additional details about how you're feeling..."
                />
              </div>
            </div>
          </div>
        </form>
      ) : filteredEntries.length > 0 ? (
        <>
          <div className="journal-entries-list">
            {filteredEntries.map((entry) => (
              <div className="journal-entry-card" key={entry.id}>
                <div className="entry-header">
                  <div className="entry-date">
                    <div className="date-primary">
                      <BsCalendar3 style={{ marginRight: '8px' }} />
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="date-secondary">
                      <BsClock style={{ marginRight: '5px' }} />
                      {entry.time}
                    </div>
                  </div>
                  <button className="entry-action-button">Edit</button>
                </div>
                <div className="entry-content">
                  <h2 className="entry-title">
                    <span className="mood-indicator">
                      {renderMoodEmoji(entry.mood)}
                    </span>
                    {entry.title}
                  </h2>

                  <div className="pain-indicator">
                    <span className="indicator-label">Pain Level:</span>
                    <span className={`pain-level-badge level-${entry.painLevel}`}>
                      {entry.painLevel === 1 ? 'None' : 
                       entry.painLevel === 2 ? 'Mild' :
                       entry.painLevel === 3 ? 'Moderate' :
                       entry.painLevel === 4 ? 'Severe' : 'Extreme'}
                    </span>
                  </div>

                  {entry.symptoms.length > 0 && (
                    <div className="symptom-tags">
                      {entry.symptoms.map((symptom, index) => (
                        <span key={index} className="symptom-tag">{symptom}</span>
                      ))}
                    </div>
                  )}

                  {entry.notes && (
                    <div className="entry-notes">
                      {entry.notes}
                    </div>
                  )}

                  <div className="entry-details">
                    <div className="detail-item">
                      <span className="detail-icon"><BsMoonStars /></span>
                      {entry.sleepHours} hours of sleep
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon"><MdOutlineWaterDrop /></span>
                      {entry.waterIntake} glasses of water
                    </div>
                  </div>

                  {entry.factors.length > 0 && (
                    <div className="factor-tags">
                      {entry.factors.map((factor, index) => (
                        <span key={index} className="factor-tag">{factor}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="journal-insights">
            <h2>Health Insights</h2>
            <p>Based on your recent journal entries, here are some patterns and insights:</p>

            <div className="insights-cards">
              <div className="insight-card">
                <h3>
                  <span className="insight-icon"><MdOutlineMood /></span>
                  Mood Patterns
                </h3>
                <p>Your mood tends to be better on days with:</p>
                <ul className="insights-list">
                  <li>More than 7 hours of sleep</li>
                  <li>Regular exercise recorded</li>
                  <li>Higher water intake</li>
                </ul>
              </div>

              <div className="insight-card">
                <h3>
                  <span className="insight-icon"><MdLocalHospital /></span>
                  Symptom Correlations
                </h3>
                <p>Your reported symptoms show relationships with:</p>
                <ul className="insights-list">
                  <li>Headaches often occur on days with weather changes</li>
                  <li>Joint pain appears to be lower after exercise days</li>
                </ul>
              </div>

              <div className="insight-card">
                <h3>
                  <span className="insight-icon"><MdOutlineInsights /></span>
                  Weekly Summary
                </h3>

                <div className="summary-stats">
                  <div className="summary-stat">
                    <div className="stat-value">7.2</div>
                    <div className="stat-label">Avg. Sleep (hrs)</div>
                  </div>
                  <div className="summary-stat">
                    <div className="stat-value">5.4</div>
                    <div className="stat-label">Water (glasses)</div>
                  </div>
                  <div className="summary-stat">
                    <div className="stat-value">2.1</div>
                    <div className="stat-label">Avg. Pain Level</div>
                  </div>
                </div>

                <a href="#" className="view-reports-button">
                  View Detailed Reports
                </a>
              </div>
            </div>
          </div>

          <div className="print-section">
            <button className="print-button" onClick={handlePrintJournal}>
              <span className="print-icon"><FaPrint /></span>
              Print Health Journal
            </button>
            <p className="print-info">Print your journal entries to share with healthcare providers at your next appointment</p>
          </div>
        </>
      ) : (
        <div className="no-entries-container">
          <div className="no-entries-icon">📔</div>
          <h2>No Journal Entries Yet</h2>
          <p>Start tracking your health by creating your first journal entry</p>
          <button className="create-button" onClick={handleCreateEntry}>
            Create Your First Entry
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthJournal;