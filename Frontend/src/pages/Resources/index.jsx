import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Resources.css';
import { resourcesAPI } from '../../api/resources';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories and resources on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesData = await resourcesAPI.getResourceCategories();
        setCategories([
          { id: 'all', name: 'All Resources' },
          ...categoriesData
        ]);
        
        // Fetch resources
        const resourcesData = await resourcesAPI.getResources();
        setResources(resourcesData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching resources data:', err);
        setError('Failed to load resources. Please try again later.');
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch resources when filters change
  useEffect(() => {
    const fetchFilteredResources = async () => {
      if (loading) return; // Skip if initial loading is in progress
      
      try {
        setLoading(true);
        
        const filters = {
          category: activeCategory,
          search: searchQuery
        };
        
        const resourcesData = await resourcesAPI.getResources(filters);
        setResources(resourcesData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching filtered resources:', err);
        setError('Failed to apply filters. Please try again.');
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchFilteredResources, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [activeCategory, searchQuery]);

  // Fallback categories if API fails
  const fallbackCategories = [
    { id: 'all', name: 'All Resources' },
    { id: 'medical', name: 'Medical Resources' },
    { id: 'community', name: 'Community Services' },
    { id: 'learning', name: 'Learning & Education' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'technology', name: 'Technology Help' }
  ];

  // Use API categories or fallback
  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  // Fallback to local filtering if API filtering fails
  const filteredResources = resources;

  return (
    <div className="resources-page">
      <header className="resources-header">
        <h1>Resources & Education</h1>
        <p>Helpful information and services to enhance your daily life</p>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="categories-filter">
          {displayCategories.map(category => (
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

      <div className="resources-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading resources...</p>
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
        ) : filteredResources.length > 0 ? (
          <div className="resources-grid">
            {filteredResources.map(resource => (
              <a 
                href={resource.url} 
                className="resource-card"
                key={resource.id}
                target={resource.url.startsWith('http') ? '_blank' : '_self'}
                rel={resource.url.startsWith('http') ? 'noopener noreferrer' : ''}
              >
                <div className="resource-icon">{resource.icon || '📚'}</div>
                <div className="resource-content">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                </div>
                <div className="resource-arrow">→</div>
              </a>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔎</div>
            <h2>No resources found</h2>
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

      <div className="resources-contact">
        <h2>Need Additional Help?</h2>
        <p>Our team is here to assist you with finding specific resources or answering questions.</p>
        <div className="contact-buttons">
          <Link to="/contact" className="contact-button primary">
            Contact Support
          </Link>
          <a href="tel:1-800-ELDER-HUB" className="contact-button secondary">
            Call: 1-800-ELDER-HUB
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resources;