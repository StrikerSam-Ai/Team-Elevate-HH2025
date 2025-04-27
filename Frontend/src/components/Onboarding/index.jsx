import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const Onboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const onboardingSteps = [
    {
      title: "Welcome to ElderHub",
      description: "Your companion app for staying connected, healthy, and engaged. Let's walk through the main features together.",
      image: "/images/onboarding/welcome.png",
    },
    {
      title: "Dashboard",
      description: "Your home page shows your upcoming events, health reminders, and quick access to companions.",
      image: "/images/onboarding/dashboard.png",
    },
    {
      title: "AI Companions",
      description: "Chat with specialized companions who can help with health questions, tech support, or just friendly conversation.",
      image: "/images/onboarding/companions.png",
    },
    {
      title: "Community Events",
      description: "Discover local events and activities designed for seniors. Join a class or meet new friends.",
      image: "/images/onboarding/events.png",
    },
    {
      title: "Voice Control",
      description: "Click the microphone button to navigate by voice. Try saying 'Go to Dashboard' or 'Chat with Nurse Nancy'.",
      image: "/images/onboarding/voice.png",
    },
    {
      title: "Accessibility Features",
      description: "Adjust text size with the 'A+' button or enable high contrast mode for better visibility.",
      image: "/images/onboarding/accessibility.png",
    }
  ];

  useEffect(() => {
    // Check if it's the first visit
    const isFirstVisit = !localStorage.getItem('onboardingCompleted');
    if (isFirstVisit) {
      setShowOnboarding(true);
    }
  }, []);

  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
    navigate('/');
  };

  const skipOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
  };

  const restartOnboarding = () => {
    setCurrentStep(0);
  };

  if (!showOnboarding) {
    return null;
  }

  const currentStepData = onboardingSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-container">
        <button className="close-button" onClick={skipOnboarding} aria-label="Skip tutorial">
          ✕
        </button>
        
        <div className="onboarding-content">
          <div className="onboarding-image">
            <img 
              src={currentStepData.image || "https://via.placeholder.com/400x300?text=ElderHub"} 
              alt={currentStepData.title}
            />
          </div>
          
          <div className="onboarding-text">
            <h2>{currentStepData.title}</h2>
            <p>{currentStepData.description}</p>
          </div>
        </div>
        
        <div className="onboarding-progress">
          {onboardingSteps.map((_, index) => (
            <span 
              key={index} 
              className={`progress-dot ${index === currentStep ? 'active' : ''}`}
              onClick={() => setCurrentStep(index)}
              aria-label={`Step ${index + 1}`}
            ></span>
          ))}
        </div>
        
        <div className="onboarding-actions">
          {!isFirstStep && (
            <button className="btn btn-secondary" onClick={handlePrevStep}>
              Previous
            </button>
          )}
          
          <button className="btn btn-primary" onClick={handleNextStep}>
            {isLastStep ? 'Get Started' : 'Next'}
          </button>
        </div>
        
        {!isFirstStep && (
          <button className="restart-button" onClick={restartOnboarding}>
            Restart Tutorial
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;