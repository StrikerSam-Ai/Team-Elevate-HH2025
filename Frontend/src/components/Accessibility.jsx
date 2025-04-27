import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import './Accessibility.css';

const Accessibility = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings,
    increaseFontSize,
    decreaseFontSize,
    toggleContrast,
    toggleReducedMotion,
    toggleTextToSpeech,
    resetSettings
  } = useAccessibility();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className="accessibility-toggle"
        onClick={togglePanel}
        aria-expanded={isOpen}
        aria-label="Accessibility settings"
      >
        <span className="sr-only">Accessibility</span>
        <i className="fas fa-universal-access"></i>
      </button>

      <div className={`accessibility-panel ${isOpen ? 'open' : ''}`}>
        <div className="accessibility-header">
          <h3>Accessibility Settings</h3>
          <button 
            className="close-button"
            onClick={togglePanel}
            aria-label="Close accessibility panel"
          >
            ×
          </button>
        </div>
        
        <div className="accessibility-options">
          <div className="option-group">
            <h4>Text Size</h4>
            <div className="controls">
              <button 
                onClick={decreaseFontSize}
                disabled={settings.fontSize === 'small'}
                aria-label="Decrease font size"
              >
                A-
              </button>
              <span className="current-value">{settings.fontSize}</span>
              <button 
                onClick={increaseFontSize}
                disabled={settings.fontSize === 'large'}
                aria-label="Increase font size"
              >
                A+
              </button>
            </div>
          </div>

          <div className="option-group">
            <h4>Contrast</h4>
            <button 
              className={`toggle-button ${settings.contrast !== 'normal' ? 'active' : ''}`}
              onClick={toggleContrast}
            >
              {settings.contrast === 'normal' ? 'Normal' : 
               settings.contrast === 'high' ? 'High Contrast' : 'Dark Mode'}
            </button>
          </div>

          <div className="option-group">
            <h4>Reduced Motion</h4>
            <button 
              className={`toggle-button ${settings.reducedMotion ? 'active' : ''}`}
              onClick={toggleReducedMotion}
            >
              {settings.reducedMotion ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="option-group">
            <h4>Text to Speech</h4>
            <button 
              className={`toggle-button ${settings.textToSpeech ? 'active' : ''}`}
              onClick={toggleTextToSpeech}
              aria-label={`${settings.textToSpeech ? 'Disable' : 'Enable'} text to speech`}
            >
              {settings.textToSpeech ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <button 
            className="reset-button"
            onClick={resetSettings}
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </>
  );
};

export default Accessibility;