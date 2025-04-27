import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import VoiceControl from '../VoiceControl';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import './Layout.css';

const Layout = () => {
  const { toggleHighContrast, increaseTextSize } = useAccessibility();
  
  useEffect(() => {
    // Listen for custom events from voice control
    const handleToggleContrast = () => {
      toggleHighContrast();
    };
    
    const handleIncreaseTextSize = () => {
      increaseTextSize();
    };
    
    document.addEventListener('elderhub:toggleContrast', handleToggleContrast);
    document.addEventListener('elderhub:increaseTextSize', handleIncreaseTextSize);
    
    return () => {
      document.removeEventListener('elderhub:toggleContrast', handleToggleContrast);
      document.removeEventListener('elderhub:increaseTextSize', handleIncreaseTextSize);
    };
  }, [toggleHighContrast, increaseTextSize]);

  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
      <VoiceControl />
    </div>
  );
};

export default Layout;