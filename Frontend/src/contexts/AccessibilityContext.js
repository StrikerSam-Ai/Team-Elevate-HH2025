import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

// Default accessibility settings
const defaultSettings = {
  fontSize: 'medium',  // small, medium, large
  contrast: 'normal',  // normal, high, dark
  reducedMotion: false,
  textToSpeech: false
};

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEYS.ACCESSIBILITY);
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Update localStorage when settings change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACCESSIBILITY, JSON.stringify(settings));
    
    // Apply settings to document
    document.documentElement.setAttribute('data-font-size', settings.fontSize);
    document.documentElement.setAttribute('data-contrast', settings.contrast);
    document.documentElement.setAttribute('data-reduced-motion', settings.reducedMotion);
    
    // Apply class for reduced motion if needed
    if (settings.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
  }, [settings]);

  // Function to update a single setting
  const updateSetting = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Function to reset settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // Convenience functions for common operations
  const increaseFontSize = () => {
    setSettings(prev => {
      const sizes = ['small', 'medium', 'large'];
      const currentIndex = sizes.indexOf(prev.fontSize);
      const nextIndex = currentIndex < sizes.length - 1 ? currentIndex + 1 : currentIndex;
      return {
        ...prev,
        fontSize: sizes[nextIndex]
      };
    });
  };

  const decreaseFontSize = () => {
    setSettings(prev => {
      const sizes = ['small', 'medium', 'large'];
      const currentIndex = sizes.indexOf(prev.fontSize);
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      return {
        ...prev,
        fontSize: sizes[nextIndex]
      };
    });
  };

  const toggleContrast = () => {
    setSettings(prev => {
      const contrastModes = ['normal', 'high', 'dark'];
      const currentIndex = contrastModes.indexOf(prev.contrast);
      const nextIndex = (currentIndex + 1) % contrastModes.length;
      return {
        ...prev,
        contrast: contrastModes[nextIndex]
      };
    });
  };

  const toggleReducedMotion = () => {
    setSettings(prev => ({
      ...prev,
      reducedMotion: !prev.reducedMotion
    }));
  };

  const toggleTextToSpeech = () => {
    setSettings(prev => ({
      ...prev,
      textToSpeech: !prev.textToSpeech
    }));
  };

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSetting,
      resetSettings,
      increaseFontSize,
      decreaseFontSize,
      toggleContrast,
      toggleReducedMotion,
      toggleTextToSpeech
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};