import React, { useState } from 'react';
import { IconButton } from './';

const SearchBar = ({ onSearch, availableTags, selectedTags, onTagToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search memories..."
          className="search-input"
        />
        {searchTerm && (
          <IconButton
            icon="×"
            onClick={() => {
              setSearchTerm('');
              onSearch('');
            }}
            className="clear-search"
          />
        )}
      </div>
      {availableTags.length > 0 && (
        <div className="tag-filters">
          {availableTags.map(tag => (
            <button
              key={tag}
              className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;