import React, { useState } from 'react';
import './Journal.css';

const Journal = () => {
  const [activeView, setActiveView] = useState('grid');

  return (
    <div className="page journal-page">
      <header className="page-header">
        <h1 className="page-title">Journal</h1>
        <p className="page-subtitle">Document your thoughts and experiences</p>
      </header>

      <main className="page-content">
        {/* Journal Entry Form */}
        <section className="journal-section new-entry">
          <h2>New Entry</h2>
          <div className="entry-form">
            {/* Entry form will go here */}
          </div>
        </section>

        {/* Journal Entries */}
        <section className="journal-section entries">
          <div className="entries-header">
            <h2>My Entries</h2>
            <div className="view-toggle">
              <button 
                className={`toggle-button ${activeView === 'grid' ? 'active' : ''}`}
                onClick={() => setActiveView('grid')}
              >
                Grid
              </button>
              <button 
                className={`toggle-button ${activeView === 'list' ? 'active' : ''}`}
                onClick={() => setActiveView('list')}
              >
                List
              </button>
            </div>
          </div>
          
          <div className={`entries-container view-${activeView}`}>
            {/* Journal entries will go here */}
          </div>
        </section>

        {/* Entry Statistics */}
        <section className="journal-section stats">
          <h2>Journal Stats</h2>
          <div className="stats-grid">
            {/* Stats cards will go here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Journal;