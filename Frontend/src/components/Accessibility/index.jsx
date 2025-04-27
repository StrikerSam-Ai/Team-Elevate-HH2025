import React, { useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import './Accessibility.css';

const Accessibility = () => {
  // State to control visibility of the accessibility panel
  const [isOpen, setIsOpen] = useState(false);
  
  // Get accessibility context values and functions
  const { 
    fontSize, setFontSize,
    highContrast, setHighContrast,
    reducedMotion, setReducedMotion,
    screenReader, setScreenReader,
    dyslexicFont, setDyslexicFont,
    resetSettings
  } = useAccessibility();

  // Toggle the accessibility panel
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Handle font size changes
  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  return (
    <div className="accessibility-container">
      {/* Accessibility button that's always visible */}
      <button 
        className="accessibility-toggle-button" 
        onClick={togglePanel}
        aria-expanded={isOpen}
        aria-label="Accessibility options"
      >
        <span className="accessibility-icon">♿</span>
      </button>
      
      {/* Accessibility panel with options */}
      <div className={`accessibility-panel ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="accessibility-header">
          <h2>Accessibility Options</h2>
          <button 
            className="accessibility-close-button"
            onClick={togglePanel}
            aria-label="Close accessibility panel"
          >
            &times;
          </button>
        </div>
        
        <div className="accessibility-options">
          {/* Text Size options */}
          <div className="accessibility-option">
            <h3>Text Size</h3>
            <div className="font-size-buttons">
              <button 
                className={fontSize === 'small' ? 'active' : ''}
                onClick={() => handleFontSizeChange('small')}
                aria-pressed={fontSize === 'small'}
                aria-label="Small text size"
              >
                A<span className="sr-only"> (Small)</span>
              </button>
              <button 
                className={fontSize === 'medium' ? 'active' : ''}
                onClick={() => handleFontSizeChange('medium')}
                aria-pressed={fontSize === 'medium'}
                aria-label="Medium text size"
              >
                A<span className="sr-only"> (Medium)</span>
              </button>
              <button 
                className={fontSize === 'large' ? 'active' : ''}
                onClick={() => handleFontSizeChange('large')}
                aria-pressed={fontSize === 'large'}
                aria-label="Large text size"
              >
                A<span className="sr-only"> (Large)</span>
              </button>
              <button 
                className={fontSize === 'x-large' ? 'active' : ''}
                onClick={() => handleFontSizeChange('x-large')}
                aria-pressed={fontSize === 'x-large'}
                aria-label="Extra large text size"
              >
                A<span className="sr-only"> (Extra Large)</span>
              </button>
            </div>
          </div>
          
          {/* High Contrast toggle */}
          <div className="accessibility-option">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={highContrast}
                onChange={() => setHighContrast(!highContrast)}
                aria-label="High contrast mode"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">High Contrast</span>
            </label>
            <p className="option-description">Increases contrast for better readability</p>
          </div>
          
          {/* Reduced Motion toggle */}
          <div className="accessibility-option">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={reducedMotion}
                onChange={() => setReducedMotion(!reducedMotion)}
                aria-label="Reduced motion"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Reduced Motion</span>
            </label>
            <p className="option-description">Decreases animations throughout the site</p>
          </div>
          
          {/* Screen Reader Optimizations toggle */}
          <div className="accessibility-option">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={screenReader}
                onChange={() => setScreenReader(!screenReader)}
                aria-label="Screen reader optimizations"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Screen Reader Optimizations</span>
            </label>
            <p className="option-description">Improves compatibility with screen readers</p>
          </div>
          
          {/* Dyslexia-friendly Font toggle */}
          <div className="accessibility-option">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={dyslexicFont}
                onChange={() => setDyslexicFont(!dyslexicFont)}
                aria-label="Dyslexia-friendly font"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Dyslexia-friendly Font</span>
            </label>
            <p className="option-description">Uses a font designed for readers with dyslexia</p>
          </div>
        </div>
        
        <div className="accessibility-footer">
          <button 
            className="reset-button"
            onClick={resetSettings}
            aria-label="Reset all accessibility settings"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;