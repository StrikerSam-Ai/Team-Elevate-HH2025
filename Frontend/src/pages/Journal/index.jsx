import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Journal.css';

const Journal = () => {
  const [activeView, setActiveView] = useState('grid');
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'happy',
    isPublic: false
  });

  // Simulate fetching journal entries
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample data - would come from actual API
        const sampleEntries = [
          {
            id: 1,
            title: 'Morning Walk Reflections',
            content: 'Had a wonderful morning walk at the park today. The flowers are starting to bloom and the weather was perfect.',
            date: '2025-04-25T08:30:00',
            mood: 'happy',
            images: []
          },
          {
            id: 2,
            title: 'Book Club Discussion',
            content: 'Our book club discussed "The Midnight Library" today. Such an insightful conversation about paths not taken and appreciation for the present.',
            date: '2025-04-22T14:00:00',
            mood: 'thoughtful',
            images: []
          }
        ];
        
        setEntries(sampleEntries);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEntries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // This would be replaced with an actual API call
    console.log('Submitting entry:', formData);
    
    // Simulate successful submission
    const newEntry = {
      id: entries.length + 1,
      ...formData,
      date: new Date().toISOString(),
      images: []
    };
    
    setEntries(prev => [newEntry, ...prev]);
    
    // Reset form
    setFormData({
      title: '',
      content: '',
      mood: 'happy',
      isPublic: false
    });
  };

  // Function to format dates in a user-friendly way
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get mood emoji based on mood value
  const getMoodEmoji = (mood) => {
    const moods = {
      'happy': '😊',
      'sad': '😢',
      'angry': '😠',
      'thoughtful': '🤔',
      'excited': '😃'
    };
    return moods[mood] || '😐';
  };

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1>My Journal</h1>
        <p>Document your thoughts, experiences, and memories</p>
      </header>

      <div className="journal-main">
        <section className="new-entry-section">
          <h2>Create New Entry</h2>
          <form onSubmit={handleSubmit} className="entry-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Give your entry a title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="What's on your mind today?"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group mood-selector">
                <label htmlFor="mood">How are you feeling?</label>
                <select
                  id="mood"
                  name="mood"
                  value={formData.mood}
                  onChange={handleInputChange}
                >
                  <option value="happy">Happy 😊</option>
                  <option value="sad">Sad 😢</option>
                  <option value="angry">Angry 😠</option>
                  <option value="thoughtful">Thoughtful 🤔</option>
                  <option value="excited">Excited 😃</option>
                </select>
              </div>
              
              <div className="form-group visibility-toggle">
                <label>
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                  />
                  <span>Share with community</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">Save Entry</button>
            </div>
          </form>
        </section>

        <section className="entries-section">
          <div className="entries-header">
            <h2>My Entries</h2>
            <div className="view-toggle">
              <button 
                className={`view-button ${activeView === 'grid' ? 'active' : ''}`}
                onClick={() => setActiveView('grid')}
                aria-label="Grid View"
              >
                <span className="grid-icon">▤</span>
              </button>
              <button 
                className={`view-button ${activeView === 'list' ? 'active' : ''}`}
                onClick={() => setActiveView('list')}
                aria-label="List View"
              >
                <span className="list-icon">☰</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your journal entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any journal entries yet.</p>
              <p>Start documenting your thoughts and experiences above!</p>
            </div>
          ) : (
            <div className={`entries-container view-${activeView}`}>
              {entries.map(entry => (
                <div key={entry.id} className="journal-entry">
                  <div className="entry-header">
                    <h3>{entry.title}</h3>
                    <span className="entry-date">{formatDate(entry.date)}</span>
                  </div>
                  <div className="entry-content">
                    <p>{entry.content}</p>
                  </div>
                  <div className="entry-footer">
                    <span className="entry-mood">{getMoodEmoji(entry.mood)}</span>
                    <Link to={`/journal/${entry.id}`} className="view-entry-link">Read More</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="journal-stats">
          <h2>Journal Stats</h2>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-value">{entries.length}</div>
              <div className="stat-label">Total Entries</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{entries.filter(e => e.mood === 'happy').length}</div>
              <div className="stat-label">Happy Moments</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{entries.filter(e => new Date(e.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</div>
              <div className="stat-label">This Week</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Journal;