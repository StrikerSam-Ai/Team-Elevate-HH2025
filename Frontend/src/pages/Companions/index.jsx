import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Companions.css';

const Companions = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [companions, setCompanions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories and companions on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // For now, use hardcoded categories since API endpoint might not be ready
        setCategories([
          { id: 'all', name: 'All Companions' },
          { id: 'health', name: 'Health Advisors' },
          { id: 'entertainment', name: 'Entertainment' },
          { id: 'learning', name: 'Learning Companions' },
          { id: 'daily', name: 'Daily Assistants' }
        ]);
        
        // For now, use hardcoded data for companions
        setCompanions([
          {
            id: 1,
            name: 'Dr. Wellness',
            description: 'Your personal health advisor. Get medical information, medication reminders, and wellness tips.',
            category: 'health',
            avatar: '👩‍⚕️',
            features: ['Health advice', 'Medication tracking', 'Exercise suggestions']
          },
          {
            id: 2,
            name: 'Story Time',
            description: 'Enjoy interesting stories, jokes, and entertainment tailored to your interests.',
            category: 'entertainment',
            avatar: '📚',
            features: ['Stories', 'Jokes', 'Trivia', 'Fun facts']
          },
          {
            id: 3,
            name: 'Tech Helper',
            description: 'Get friendly help with technology questions and guidance on using digital devices.',
            category: 'daily',
            avatar: '👨‍💻',
            features: ['Tech support', 'Device tutorials', 'App guidance']
          },
          {
            id: 4,
            name: 'Memory Lane',
            description: 'Engage in conversations about history, culture, and nostalgic topics from the past decades.',
            category: 'entertainment',
            avatar: '🕰️',
            features: ['Historical discussions', 'Cultural memories', 'Nostalgic conversations']
          },
          {
            id: 5,
            name: 'Learn Something New',
            description: 'Expand your knowledge with educational content on various subjects of your interest.',
            category: 'learning',
            avatar: '🧠',
            features: ['Educational content', 'New skills', 'Brain exercises']
          },
          {
            id: 6,
            name: 'Daily Companion',
            description: 'Start your day with weather updates, news summaries, and friendly conversation.',
            category: 'daily',
            avatar: '☀️',
            features: ['Daily briefings', 'Weather updates', 'News summaries', 'Reminders']
          },
          {
            id: 7,
            name: 'Fitness Friend',
            description: 'Your personal fitness guide with age-appropriate exercise routines and wellness tracking.',
            category: 'health',
            avatar: '🏋️‍♀️',
            features: ['Exercise routines', 'Wellness tracking', 'Nutrition advice']
          },
          {
            id: 8,
            name: 'Bookworm',
            description: 'Discuss books, get reading recommendations, and enjoy literary conversations.',
            category: 'learning',
            avatar: '📖',
            features: ['Book discussions', 'Reading recommendations', 'Literary quotes']
          }
        ]);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching companions data:', err);
        setError('Failed to load companions. Please try again later.');
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Filter companions based on active category and search query
  const filteredCompanions = companions.filter(companion => {
    const matchesCategory = activeCategory === 'all' || companion.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      companion.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      companion.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="companions-page">
      <header className="companions-header">
        <h1>AI Companions</h1>
        <p>Meet your friendly digital companions designed to assist, entertain, and keep you company</p>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search companions..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="categories-filter">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="companions-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading companions...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : filteredCompanions.length > 0 ? (
          <div className="companions-grid">
            {filteredCompanions.map(companion => (
              <div className="companion-card" key={companion.id}>
                <div className="companion-avatar">{companion.avatar}</div>
                <div className="companion-content">
                  <h3>{companion.name}</h3>
                  <p className="companion-description">{companion.description}</p>
                  <div className="companion-features">
                    {companion.features.map((feature, index) => (
                      <span className="feature-tag" key={index}>{feature}</span>
                    ))}
                  </div>
                </div>
                <div className="companion-actions">
                  <Link to={`/companions/${companion.id}`} className="action-button preview">
                    Preview
                  </Link>
                  <Link to={`/companions/${companion.id}/chat`} className="action-button chat">
                    Start Chat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔎</div>
            <h2>No companions found</h2>
            <p>Try adjusting your search or filter criteria</p>
            <button 
              className="reset-button"
              onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <div className="companions-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>What are AI companions?</h3>
            <p>AI companions are friendly digital assistants designed specifically for seniors. They can have conversations, provide information, offer entertainment, and help with daily tasks.</p>
          </div>
          <div className="faq-item">
            <h3>How do I start a conversation?</h3>
            <p>Simply click the "Start Chat" button on any companion card, and you'll be taken to a private chat room where you can begin typing messages to your companion.</p>
          </div>
          <div className="faq-item">
            <h3>Are my conversations private?</h3>
            <p>Yes, all conversations with companions are private and secure. Your data is protected according to our privacy policy.</p>
          </div>
          <div className="faq-item">
            <h3>Can I have multiple companions?</h3>
            <p>Absolutely! You can chat with as many different companions as you like, each specialized for different purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companions;