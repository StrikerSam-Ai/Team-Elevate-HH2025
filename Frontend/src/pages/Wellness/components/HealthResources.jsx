import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HealthResources.css';

const HealthResources = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Categories for filtering resources
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'physical', name: 'Physical Health' },
    { id: 'mental', name: 'Mental Wellness' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'medication', name: 'Medication' },
    { id: 'emergency', name: 'Emergency' }
  ];

  // Mock resources data
  const resources = [
    {
      id: 1,
      title: 'Senior-friendly Exercise Routines',
      description: 'Gentle exercises to improve mobility, strength, and balance, designed specifically for seniors.',
      category: 'physical',
      image: '/assets/wellness/exercise-routines.jpg',
      type: 'article',
      featured: true,
      new: false,
      url: '/resources/senior-exercises'
    },
    {
      id: 2,
      title: 'Managing Medication Schedules',
      description: 'Tips and tools to help you remember when to take your medications and avoid potentially harmful interactions.',
      category: 'medication',
      image: '/assets/wellness/medication-management.jpg',
      type: 'guide',
      featured: false,
      new: true,
      url: '/resources/medication-management'
    },
    {
      id: 3,
      title: 'Healthy Eating After 65',
      description: 'Nutritional guidelines tailored for older adults, including meal plans and recipes.',
      category: 'nutrition',
      image: '/assets/wellness/healthy-eating.jpg',
      type: 'article',
      featured: true,
      new: false,
      url: '/resources/senior-nutrition'
    },
    {
      id: 4,
      title: 'Mindfulness for Better Sleep',
      description: 'Meditation and relaxation techniques to improve sleep quality and reduce insomnia.',
      category: 'mental',
      image: '/assets/wellness/mindfulness-sleep.jpg',
      type: 'video',
      featured: false,
      new: false,
      url: '/resources/mindfulness-sleep'
    },
    {
      id: 5,
      title: 'Warning Signs of a Stroke',
      description: 'Learn to recognize the early signs of stroke and what actions to take immediately.',
      category: 'emergency',
      image: '/assets/wellness/stroke-signs.jpg',
      type: 'guide',
      featured: true,
      new: false,
      url: '/resources/stroke-signs'
    },
    {
      id: 6,
      title: 'Finding Joy in Daily Activities',
      description: 'Practical strategies to enhance emotional well-being and find meaning in everyday life.',
      category: 'mental',
      image: '/assets/wellness/daily-joy.jpg',
      type: 'article',
      featured: false,
      new: true,
      url: '/resources/finding-joy'
    },
    {
      id: 7,
      title: 'Heart-Healthy Recipes',
      description: 'Delicious recipes designed to support cardiovascular health and manage cholesterol.',
      category: 'nutrition',
      image: '/assets/wellness/heart-recipes.jpg',
      type: 'collection',
      featured: false,
      new: false,
      url: '/resources/heart-healthy-recipes'
    },
    {
      id: 8,
      title: 'Emergency Contacts & Preparedness',
      description: 'Create an emergency plan and keep important contacts accessible when needed.',
      category: 'emergency',
      image: '/assets/wellness/emergency-plan.jpg',
      type: 'guide',
      featured: false,
      new: false,
      url: '/resources/emergency-preparedness'
    },
  ];

  // Filter resources based on active category
  const filteredResources = resources.filter(resource => 
    activeCategory === 'all' || resource.category === activeCategory
  );

  // Get featured resources
  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="health-resources">
      <section className="resources-header">
        <h2>Health Resources</h2>
        <p>Reliable health information tailored for seniors to support your wellness journey</p>
      </section>

      <section className="featured-resources">
        <h3>Featured Resources</h3>
        <div className="featured-container">
          {featuredResources.map(resource => (
            <Link to={resource.url} key={resource.id} className="featured-resource">
              <div className="featured-image">
                {/* In a real app, this would be an actual image */}
                <div className="resource-image-placeholder">
                  {resource.type === 'video' && <span className="resource-type-icon">▶️</span>}
                  {resource.type === 'article' && <span className="resource-type-icon">📄</span>}
                  {resource.type === 'guide' && <span className="resource-type-icon">📋</span>}
                  {resource.type === 'collection' && <span className="resource-type-icon">📚</span>}
                </div>
                <div className="resource-category-badge">{resource.category}</div>
              </div>
              <div className="featured-content">
                <h4>{resource.title}</h4>
                <p>{resource.description}</p>
                <span className="resource-type">{resource.type}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="browse-resources">
        <div className="resources-filters">
          <h3>Browse All Resources</h3>
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="resources-grid">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <Link to={resource.url} key={resource.id} className="resource-card">
                <div className="resource-image">
                  {/* In a real app, this would be an actual image */}
                  <div className="resource-image-placeholder">
                    {resource.type === 'video' && <span className="resource-type-icon">▶️</span>}
                    {resource.type === 'article' && <span className="resource-type-icon">📄</span>}
                    {resource.type === 'guide' && <span className="resource-type-icon">📋</span>}
                    {resource.type === 'collection' && <span className="resource-type-icon">📚</span>}
                  </div>
                  {resource.new && <div className="new-badge">New</div>}
                </div>
                <div className="resource-content">
                  <h4>{resource.title}</h4>
                  <p>{resource.description}</p>
                  <div className="resource-meta">
                    <span className="resource-category">{
                      categories.find(cat => cat.id === resource.category)?.name
                    }</span>
                    <span className="resource-type">{resource.type}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-resources">
              <p>No resources found for this category.</p>
              <button className="reset-filter" onClick={() => setActiveCategory('all')}>
                View All Resources
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="personalized-resources">
        <div className="resources-cta">
          <div className="cta-content">
            <h3>Get Personalized Health Recommendations</h3>
            <p>
              Our AI companion can provide health resources tailored to your specific needs and interests.
              Connect with our Wellness Coach for a personalized wellness plan.
            </p>
            <div className="cta-buttons">
              <Link to="/chat/wellness-coach" className="primary-button">
                Talk to Wellness Coach
              </Link>
              <Link to="/wellness/assessment" className="secondary-button">
                Take Health Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="emergency-resources">
        <h3>Emergency Information</h3>
        <div className="emergency-cards">
          <div className="emergency-card">
            <span className="emergency-icon">🚑</span>
            <h4>Emergency Services</h4>
            <p>Call <strong>911</strong> for immediate medical emergencies</p>
          </div>
          <div className="emergency-card">
            <span className="emergency-icon">☎️</span>
            <h4>Nurse Hotline</h4>
            <p>Free 24/7 nurse consultation: <strong>1-800-555-NURSE</strong></p>
          </div>
          <div className="emergency-card">
            <span className="emergency-icon">💊</span>
            <h4>Poison Control</h4>
            <p>National Poison Control: <strong>1-800-222-1222</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthResources;