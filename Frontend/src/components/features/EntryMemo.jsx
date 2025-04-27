import React, { useState } from 'react';
import { IconButton } from './';

const EntryMemo = ({ tags = [], notes = '', onTagsChange, onNotesChange }) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="entry-memo">
      <div className="tags-section">
        <div className="tags-input-container">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a tag..."
            className="tag-input"
          />
          <IconButton
            icon="+"
            onClick={handleAddTag}
            disabled={!newTag.trim()}
            className="add-tag-btn"
          />
        </div>
        <div className="tags-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <IconButton
                icon="×"
                onClick={() => handleRemoveTag(tag)}
                className="remove-tag-btn"
                size="small"
              />
            </span>
          ))}
        </div>
      </div>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Add notes about this memory..."
        className="memo-notes"
        rows={2}
      />
    </div>
  );
};

export default EntryMemo;