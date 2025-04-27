import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HealthJournal.css';

const HealthJournal = () => {
  // State for journal entries and current entry being edited
  const [journalEntries, setJournalEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentEntry, setCurrentEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state for new/edited entry
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    notes: '',
    mood: 'good',
    symptoms: [],
    painLevel: 0,
    tags: [],
    medications: [],
    sleep: 7,
    waterIntake: 5
  });
  
  // Mock symptom options
  const symptomOptions = [
    'Headache', 'Dizziness', 'Fatigue', 'Joint Pain', 
    'Back Pain', 'Shortness of Breath', 'Chest Pain', 'Nausea',
    'Cough', 'Sore Throat', 'Fever', 'Chills'
  ];
  
  // Mock medication options (should come from user's medication list)
  const medicationOptions = [
    'Metformin', 'Lisinopril', 'Vitamin D', 'Calcium + Magnesium'
  ];
  
  // Mock tag options
  const tagOptions = [
    'Physical Activity', 'Diet Changes', 'Stress', 'Weather Changes',
    'Sleep Issues', 'Travel', 'Medication Changes'
  ];
  
  // Fetch journal entries
  useEffect(() => {
    const fetchJournalEntries = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockEntries = [
          {
            id: 1,
            date: '2025-04-25',
            title: 'Feeling better today',
            notes: 'Had more energy today. The new medication seems to be working.',
            mood: 'good',
            symptoms: ['Mild Headache'],
            painLevel: 2,
            tags: ['Medication Changes', 'Physical Activity'],
            medications: ['Lisinopril', 'Vitamin D'],
            sleep: 7.5,
            waterIntake: 6
          },
          {
            id: 2,
            date: '2025-04-24',
            title: 'Back pain flare-up',
            notes: 'Back pain returned after gardening yesterday. Applied heat pad which helped some.',
            mood: 'fair',
            symptoms: ['Back Pain', 'Fatigue'],
            painLevel: 6,
            tags: ['Physical Activity', 'Weather Changes'],
            medications: ['Lisinopril', 'Vitamin D'],
            sleep: 5.5,
            waterIntake: 4
          },
          {
            id: 3,
            date: '2025-04-22',
            title: 'Doctor visit follow-up',
            notes: 'Blood pressure reading was good. Doctor adjusted medication dosage slightly.',
            mood: 'good',
            symptoms: [],
            painLevel: 1,
            tags: ['Medication Changes'],
            medications: ['Lisinopril', 'Vitamin D', 'Calcium + Magnesium'],
            sleep: 8,
            waterIntake: 7
          },
          {
            id: 4,
            date: '2025-04-20',
            title: 'Feeling tired today',
            notes: 'Didn\'t sleep well last night. Felt tired all day and had a mild headache.',
            mood: 'poor',
            symptoms: ['Fatigue', 'Headache'],
            painLevel: 3,
            tags: ['Sleep Issues', 'Stress'],
            medications: ['Lisinopril', 'Vitamin D'],
            sleep: 4.5,
            waterIntake: 3
          }
        ];
        setJournalEntries(mockEntries);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJournalEntries();
  }, []);
  
  // Handle changes in form fields
  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Handle array form fields (symptoms, medications, tags)
  const handleArrayFieldToggle = (field, item) => {
    const currentItems = [...formData[field]];
    if (currentItems.includes(item)) {
      setFormData({
        ...formData,
        [field]: currentItems.filter(i => i !== item)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...currentItems, item]
      });
    }
  };
  
  // Handle creating new entry
  const handleCreateEntry = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      notes: '',
      mood: 'good',
      symptoms: [],
      painLevel: 0,
      tags: [],
      medications: [],
      sleep: 7,
      waterIntake: 5
    });
    setIsEditing(true);
    setCurrentEntry(null);
  };
  
  // Handle editing existing entry
  const handleEditEntry = (entry) => {
    setCurrentEntry(entry);
    setFormData({
      date: entry.date,
      title: entry.title,
      notes: entry.notes,
      mood: entry.mood,
      symptoms: [...entry.symptoms],
      painLevel: entry.painLevel,
      tags: [...entry.tags],
      medications: [...entry.medications],
      sleep: entry.sleep,
      waterIntake: entry.waterIntake
    });
    setIsEditing(true);
  };
  
  // Handle saving entry (create or update)
  const handleSaveEntry = () => {
    if (currentEntry) {
      // Updating existing entry
      const updatedEntries = journalEntries.map(entry => 
        entry.id === currentEntry.id ? { ...formData, id: entry.id } : entry
      );
      setJournalEntries(updatedEntries);
    } else {
      // Creating new entry
      const newEntry = {
        ...formData,
        id: Date.now() // Simple id generation for mock data
      };
      setJournalEntries([newEntry, ...journalEntries]);
    }
    setIsEditing(false);
    setCurrentEntry(null);
  };
  
  // Handle canceling edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEntry(null);
  };
  
  // Filter entries based on active view and selected tag
  const filteredEntries = journalEntries.filter(entry => {
    let viewMatch = true;
    let tagMatch = true;
    
    // Filter by view
    if (activeView === 'symptoms') {
      viewMatch = entry.symptoms.length > 0;
    } else if (activeView === 'pain') {
      viewMatch = entry.painLevel >= 5;
    }
    
    // Filter by tag
    if (selectedTag !== 'all') {
      tagMatch = entry.tags.includes(selectedTag);
    }
    
    return viewMatch && tagMatch;
  });
  
  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };
  
  // Get mood emoji
  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'excellent': return '😁';
      case 'good': return '🙂';
      case 'fair': return '😐';
      case 'poor': return '☹️';
      case 'terrible': return '😣';
      default: return '🙂';
    }
  };
  
  return (
    <div className="health-journal-page">
      <header className="page-header">
        <h1>Health Journal</h1>
        <p>Track your daily health observations and patterns</p>
      </header>
      
      {isEditing ? (
        <div className="journal-entry-form">
          <div className="form-header">
            <h2>{currentEntry ? 'Edit Journal Entry' : 'New Journal Entry'}</h2>
            <div className="form-actions">
              <button className="action-button" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="action-button primary" onClick={handleSaveEntry}>
                Save Entry
              </button>
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={formData.date}
                  onChange={(e) => handleFormChange('date', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Brief description of how you're feeling"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Overall Mood</label>
                <div className="mood-selector">
                  <div 
                    className={`mood-option ${formData.mood === 'terrible' ? 'selected' : ''}`}
                    onClick={() => handleFormChange('mood', 'terrible')}
                  >
                    <span className="mood-emoji">😣</span>
                    <span className="mood-label">Terrible</span>
                  </div>
                  <div 
                    className={`mood-option ${formData.mood === 'poor' ? 'selected' : ''}`}
                    onClick={() => handleFormChange('mood', 'poor')}
                  >
                    <span className="mood-emoji">☹️</span>
                    <span className="mood-label">Poor</span>
                  </div>
                  <div 
                    className={`mood-option ${formData.mood === 'fair' ? 'selected' : ''}`}
                    onClick={() => handleFormChange('mood', 'fair')}
                  >
                    <span className="mood-emoji">😐</span>
                    <span className="mood-label">Fair</span>
                  </div>
                  <div 
                    className={`mood-option ${formData.mood === 'good' ? 'selected' : ''}`}
                    onClick={() => handleFormChange('mood', 'good')}
                  >
                    <span className="mood-emoji">🙂</span>
                    <span className="mood-label">Good</span>
                  </div>
                  <div 
                    className={`mood-option ${formData.mood === 'excellent' ? 'selected' : ''}`}
                    onClick={() => handleFormChange('mood', 'excellent')}
                  >
                    <span className="mood-emoji">😁</span>
                    <span className="mood-label">Excellent</span>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Pain Level</label>
                <div className="pain-scale">
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={formData.painLevel}
                    onChange={(e) => handleFormChange('painLevel', parseInt(e.target.value))}
                    className="pain-slider"
                  />
                  <div className="pain-labels">
                    <span>No Pain (0)</span>
                    <span>Severe Pain (10)</span>
                  </div>
                  <div className="current-pain-level">Current: {formData.painLevel}</div>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Sleep (Hours)</label>
                <div className="sleep-input">
                  <button 
                    className="adjust-button"
                    onClick={() => handleFormChange('sleep', Math.max(0, formData.sleep - 0.5))}
                  >
                    −
                  </button>
                  <div className="sleep-value">{formData.sleep}</div>
                  <button 
                    className="adjust-button"
                    onClick={() => handleFormChange('sleep', Math.min(24, formData.sleep + 0.5))}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Water Intake (Glasses)</label>
                <div className="water-input">
                  <button 
                    className="adjust-button"
                    onClick={() => handleFormChange('waterIntake', Math.max(0, formData.waterIntake - 1))}
                  >
                    −
                  </button>
                  <div className="water-value">{formData.waterIntake}</div>
                  <button 
                    className="adjust-button"
                    onClick={() => handleFormChange('waterIntake', Math.min(15, formData.waterIntake + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Symptoms</label>
                <div className="checkbox-grid">
                  {symptomOptions.map(symptom => (
                    <label key={symptom} className="checkbox-container">
                      <input 
                        type="checkbox"
                        checked={formData.symptoms.includes(symptom)}
                        onChange={() => handleArrayFieldToggle('symptoms', symptom)}
                      />
                      <span className="checkbox-label">{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Medications Taken</label>
                <div className="checkbox-grid">
                  {medicationOptions.map(medication => (
                    <label key={medication} className="checkbox-container">
                      <input 
                        type="checkbox"
                        checked={formData.medications.includes(medication)}
                        onChange={() => handleArrayFieldToggle('medications', medication)}
                      />
                      <span className="checkbox-label">{medication}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Related Factors</label>
                <div className="tag-options">
                  {tagOptions.map(tag => (
                    <div 
                      key={tag}
                      className={`tag-option ${formData.tags.includes(tag) ? 'selected' : ''}`}
                      onClick={() => handleArrayFieldToggle('tags', tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-group notes-group">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-control notes-textarea"
                  placeholder="Add any additional details about how you're feeling..."
                  value={formData.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="journal-controls">
            <div className="control-section">
              <button className="new-entry-button" onClick={handleCreateEntry}>
                <span className="add-icon">+</span>
                New Journal Entry
              </button>
            </div>
            
            <div className="control-section">
              <div className="view-toggle">
                <button 
                  className={`view-toggle-button ${activeView === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveView('all')}
                >
                  All Entries
                </button>
                <button 
                  className={`view-toggle-button ${activeView === 'symptoms' ? 'active' : ''}`}
                  onClick={() => setActiveView('symptoms')}
                >
                  With Symptoms
                </button>
                <button 
                  className={`view-toggle-button ${activeView === 'pain' ? 'active' : ''}`}
                  onClick={() => setActiveView('pain')}
                >
                  High Pain
                </button>
              </div>
            </div>
            
            <div className="control-section">
              <div className="tag-filter">
                <label className="filter-label">Filter by Factor:</label>
                <select 
                  className="tag-select"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="all">All Factors</option>
                  {tagOptions.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading journal entries...</p>
            </div>
          ) : filteredEntries.length > 0 ? (
            <div className="journal-entries-list">
              {filteredEntries.map(entry => (
                <div key={entry.id} className="journal-entry-card">
                  <div className="entry-header">
                    <div className="entry-date">
                      <div className="date-primary">{formatDate(entry.date)}</div>
                      <div className="date-secondary">{getRelativeTime(entry.date)}</div>
                    </div>
                    <div className="entry-actions">
                      <button 
                        className="entry-action-button"
                        onClick={() => handleEditEntry(entry)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  <div className="entry-content">
                    <h3 className="entry-title">
                      <span className="mood-indicator">{getMoodEmoji(entry.mood)}</span>
                      {entry.title}
                    </h3>
                    
                    {entry.painLevel > 0 && (
                      <div className="pain-indicator">
                        <span className="indicator-label">Pain Level:</span>
                        <div className={`pain-level-badge level-${Math.min(Math.ceil(entry.painLevel / 2), 5)}`}>
                          {entry.painLevel}/10
                        </div>
                      </div>
                    )}
                    
                    {entry.symptoms.length > 0 && (
                      <div className="symptom-tags">
                        {entry.symptoms.map((symptom, index) => (
                          <span key={index} className="symptom-tag">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {entry.notes && (
                      <p className="entry-notes">{entry.notes}</p>
                    )}
                    
                    <div className="entry-details">
                      <div className="detail-item">
                        <span className="detail-icon">💤</span>
                        <span className="detail-text">{entry.sleep} hrs sleep</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">💧</span>
                        <span className="detail-text">{entry.waterIntake} glasses of water</span>
                      </div>
                      {entry.medications.length > 0 && (
                        <div className="detail-item">
                          <span className="detail-icon">💊</span>
                          <span className="detail-text">
                            {entry.medications.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {entry.tags.length > 0 && (
                      <div className="factor-tags">
                        {entry.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="factor-tag"
                            onClick={() => setSelectedTag(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-entries-container">
              <div className="no-entries-icon">📝</div>
              <h2>No journal entries found</h2>
              <p>
                {activeView !== 'all' || selectedTag !== 'all' 
                  ? 'Try adjusting your filters to see more entries' 
                  : 'Start tracking your health by creating a journal entry'}
              </p>
              <button className="create-button" onClick={handleCreateEntry}>
                Create First Entry
              </button>
            </div>
          )}
          
          <div className="journal-insights">
            <h2>Health Insights</h2>
            <p>Track patterns and identify potential triggers</p>
            
            <div className="insights-cards">
              <div className="insight-card">
                <h3>
                  <span className="insight-icon">🔍</span>
                  Recent Patterns
                </h3>
                <p>Based on your entries, we've noticed some patterns that might be worth discussing with your doctor:</p>
                <ul className="insights-list">
                  <li>Headaches tend to occur on days with less than 6 hours of sleep</li>
                  <li>Back pain increases following days with physical activity</li>
                  <li>Better moods reported on days with higher water intake</li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h3>
                  <span className="insight-icon">📊</span>
                  Monthly Summary
                </h3>
                <div className="summary-stats">
                  <div className="summary-stat">
                    <div className="stat-value">7.2</div>
                    <div className="stat-label">Avg. Sleep (hrs)</div>
                  </div>
                  <div className="summary-stat">
                    <div className="stat-value">5.3</div>
                    <div className="stat-label">Avg. Water (glasses)</div>
                  </div>
                  <div className="summary-stat">
                    <div className="stat-value">2.8</div>
                    <div className="stat-label">Avg. Pain Level</div>
                  </div>
                </div>
                <Link to="/wellness/reports" className="view-reports-button">
                  View Full Reports
                </Link>
              </div>
            </div>
          </div>
          
          <div className="print-section">
            <button className="print-button">
              <span className="print-icon">🖨️</span>
              Print Journal for Doctor Visit
            </button>
            <p className="print-info">
              Generate a printable summary of your journal entries to share with healthcare providers.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default HealthJournal;