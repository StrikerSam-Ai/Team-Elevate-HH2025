import React, { useState } from 'react';
import './HealthJournal.css';
import { FaRegCalendarAlt, FaChevronLeft, FaChevronRight, FaPlusCircle, FaSearch } from 'react-icons/fa';

const HealthJournal = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: new Date(2025, 3, 26), // April 26, 2025
      mood: 'good',
      symptoms: ['Mild headache', 'Slight dizziness'],
      notes: 'Took medication at 8am and 2pm. Drank 6 glasses of water. Went for a 15-minute walk.',
      sleepHours: 7,
      painLevel: 2
    },
    {
      id: 2,
      date: new Date(2025, 3, 25), // April 25, 2025
      mood: 'excellent',
      symptoms: ['None'],
      notes: 'Felt great today. Had video call with my granddaughter. Took all medications as scheduled.',
      sleepHours: 8.5,
      painLevel: 0
    },
    {
      id: 3,
      date: new Date(2025, 3, 24), // April 24, 2025
      mood: 'fair',
      symptoms: ['Joint pain', 'Fatigue', 'Low appetite'],
      notes: 'Weather change seems to be affecting my joints. Rested most of the day. Called nurse to adjust pain medication.',
      sleepHours: 6,
      painLevel: 4
    }
  ]);
  
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    mood: 'good',
    symptoms: '',
    notes: '',
    sleepHours: 7,
    painLevel: 0
  });

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Navigate to previous day
  const goToPreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
  };
  
  // Navigate to next day
  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  // Helper to check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  // Get entry for current date
  const currentEntry = entries.find(entry => isSameDay(entry.date, currentDate));

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle symptom tags input
  const handleSymptomsChange = (e) => {
    const symptomsText = e.target.value;
    setNewEntry(prev => ({
      ...prev,
      symptoms: symptomsText
    }));
  };

  // Save new entry
  const saveNewEntry = (e) => {
    e.preventDefault();
    
    const symptomsArray = newEntry.symptoms
      .split(',')
      .map(symptom => symptom.trim())
      .filter(symptom => symptom !== '');
    
    const entryToSave = {
      id: Date.now(),
      date: new Date(currentDate),
      mood: newEntry.mood,
      symptoms: symptomsArray.length > 0 ? symptomsArray : ['None'],
      notes: newEntry.notes,
      sleepHours: parseFloat(newEntry.sleepHours) || 0,
      painLevel: parseInt(newEntry.painLevel) || 0
    };
    
    setEntries(prev => [entryToSave, ...prev]);
    setShowNewEntryForm(false);
    setNewEntry({
      mood: 'good',
      symptoms: '',
      notes: '',
      sleepHours: 7,
      painLevel: 0
    });
  };

  // Emoji mapping for mood
  const moodEmoji = {
    excellent: '😀',
    good: '🙂',
    fair: '😐',
    poor: '😔',
    terrible: '😣'
  };

  return (
    <div className="health-journal">
      <div className="journal-header">
        <h2>Health Journal</h2>
        <p>Track your daily health, symptoms, and well-being</p>
      </div>
      
      <div className="date-navigator">
        <button className="nav-button" onClick={goToPreviousDay} aria-label="Previous day">
          <FaChevronLeft className="nav-icon" />
        </button>
        <div className="current-date">
          <FaRegCalendarAlt className="calendar-icon" />
          <span>{formatDate(currentDate)}</span>
        </div>
        <button className="nav-button" onClick={goToNextDay} aria-label="Next day" disabled={isSameDay(currentDate, new Date())}>
          <FaChevronRight className="nav-icon" />
        </button>
      </div>
      
      {showNewEntryForm ? (
        <div className="journal-entry-form">
          <h3>Create New Entry</h3>
          <form onSubmit={saveNewEntry}>
            <div className="form-group">
              <label htmlFor="mood">How are you feeling today?</label>
              <select 
                id="mood" 
                name="mood" 
                value={newEntry.mood} 
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="excellent">Excellent {moodEmoji.excellent}</option>
                <option value="good">Good {moodEmoji.good}</option>
                <option value="fair">Fair {moodEmoji.fair}</option>
                <option value="poor">Poor {moodEmoji.poor}</option>
                <option value="terrible">Terrible {moodEmoji.terrible}</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="symptoms">Symptoms (separate with commas)</label>
              <input 
                type="text" 
                id="symptoms" 
                name="symptoms" 
                placeholder="E.g. Headache, Fatigue, Dizziness" 
                value={newEntry.symptoms}
                onChange={handleSymptomsChange}
                className="form-control"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="sleepHours">Hours of Sleep</label>
                <input 
                  type="number" 
                  id="sleepHours" 
                  name="sleepHours" 
                  min="0" 
                  max="24" 
                  step="0.5" 
                  value={newEntry.sleepHours}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group half">
                <label htmlFor="painLevel">Pain Level (0-10)</label>
                <input 
                  type="range" 
                  id="painLevel" 
                  name="painLevel" 
                  min="0" 
                  max="10" 
                  value={newEntry.painLevel}
                  onChange={handleInputChange}
                  className="form-control pain-slider"
                />
                <div className="pain-level-value">{newEntry.painLevel}</div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea 
                id="notes" 
                name="notes" 
                placeholder="Add any additional notes about your health today..." 
                value={newEntry.notes}
                onChange={handleInputChange}
                className="form-control"
                rows="4"
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setShowNewEntryForm(false)}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Entry
              </button>
            </div>
          </form>
        </div>
      ) : currentEntry ? (
        <div className="journal-entry">
          <div className="entry-mood">
            <span className="mood-emoji">{moodEmoji[currentEntry.mood]}</span>
            <span className="mood-text">Feeling <strong>{currentEntry.mood}</strong></span>
          </div>
          
          <div className="entry-metrics">
            <div className="metric">
              <div className="metric-value">{currentEntry.sleepHours}</div>
              <div className="metric-label">Hours of Sleep</div>
            </div>
            
            <div className="metric">
              <div className="metric-value">{currentEntry.painLevel}/10</div>
              <div className="metric-label">Pain Level</div>
            </div>
          </div>
          
          <div className="entry-symptoms">
            <h4>Symptoms</h4>
            <div className="symptoms-list">
              {currentEntry.symptoms.map((symptom, index) => (
                <span key={index} className="symptom-tag">{symptom}</span>
              ))}
            </div>
          </div>
          
          <div className="entry-notes">
            <h4>Notes</h4>
            <p>{currentEntry.notes}</p>
          </div>
          
          <div className="entry-actions">
            <button className="edit-btn">Edit Entry</button>
          </div>
        </div>
      ) : (
        <div className="no-entry">
          <div className="no-entry-message">
            <div className="no-entry-icon">📝</div>
            <h3>No entry for this date</h3>
            <p>Create a new entry to track your health and wellness</p>
            <button className="add-entry-btn" onClick={() => setShowNewEntryForm(true)}>
              <FaPlusCircle />
              Add New Entry
            </button>
          </div>
        </div>
      )}
      
      <div className="journal-history">
        <div className="history-header">
          <h3>Recent Entries</h3>
          <div className="search-entries">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search entries..." className="search-input" />
          </div>
        </div>
        
        <div className="history-list">
          {entries.map(entry => (
            <div 
              key={entry.id} 
              className={`history-item ${isSameDay(entry.date, currentDate) ? 'active' : ''}`}
              onClick={() => setCurrentDate(new Date(entry.date))}
            >
              <div className="history-item-date">
                {entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className="history-item-mood">{moodEmoji[entry.mood]}</div>
              <div className="history-item-symptoms">
                {entry.symptoms.length > 1 
                  ? `${entry.symptoms[0]} +${entry.symptoms.length - 1}`
                  : entry.symptoms[0]
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="journal-insights">
        <h3>Health Insights</h3>
        <p className="insights-description">Track patterns in your health over time</p>
        
        <div className="insights-placeholder">
          <div className="insights-message">
            <span className="insights-icon">📊</span>
            <p>Health insights will appear here after you add more entries</p>
          </div>
        </div>
        
        <div className="insights-actions">
          <button className="share-btn">
            Share with Doctor
          </button>
          <button className="print-btn">
            Print Journal
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthJournal;