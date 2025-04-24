import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SlideTransition = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ['/', '/dashboard', '/community', '/events'];

  useEffect(() => {
    const handleKeyPress = (e) => {
      const currentIndex = routes.indexOf(location.pathname);
      
      if (e.key === 'ArrowRight' && currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      }
      else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [location, navigate]);

  return null;
};

export default SlideTransition;