import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceControl.css';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      // Configure recognition
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      // Event handlers
      recognitionInstance.onstart = () => {
        setIsListening(true);
        setFeedback('Listening...');
      };
      
      recognitionInstance.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        setTranscript(speechResult);
        processCommand(speechResult);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setFeedback(`Error: ${event.error}`);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    } else {
      setFeedback('Voice control is not supported in this browser.');
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition', error);
      }
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setFeedback('Voice control paused.');
    }
  };

  const processCommand = (command) => {
    // Navigation commands
    if (command.includes('go to dashboard') || command.includes('go home')) {
      navigateTo('/');
      provideFeedback('Navigating to Dashboard');
    } else if (command.includes('go to companions') || command.includes('show companions')) {
      navigateTo('/companions');
      provideFeedback('Navigating to Companions');
    } else if (command.includes('go to events') || command.includes('show events')) {
      navigateTo('/events');
      provideFeedback('Navigating to Events');
    } else if (command.includes('go to wellness') || command.includes('show wellness')) {
      navigateTo('/wellness');
      provideFeedback('Navigating to Wellness');
    } else if (command.includes('go to resources') || command.includes('show resources')) {
      navigateTo('/resources');
      provideFeedback('Navigating to Resources');
    } 
    // Chat with companion commands
    else if (command.includes('chat with') || command.includes('talk to')) {
      const companionMatch = command.match(/chat with\s+([a-z\s]+)/i) || 
                             command.match(/talk to\s+([a-z\s]+)/i);
      if (companionMatch && companionMatch[1]) {
        const companion = companionMatch[1].trim().toLowerCase();
        
        // Map common companion names to their IDs
        const companionMap = {
          'nurse': 'nurse-nancy',
          'nancy': 'nurse-nancy',
          'tech': 'tech-helper',
          'helper': 'tech-helper',
          'friend': 'friendly-frank',
          'frank': 'friendly-frank'
        };
        
        const companionId = companionMap[companion] || companion;
        navigateTo(`/chat/${companionId}`);
        provideFeedback(`Starting chat with ${companion}`);
      } else {
        provideFeedback("I didn't catch which companion you want to chat with. Please try again.");
      }
    }
    // Accessibility commands
    else if (command.includes('increase text') || command.includes('larger text')) {
      document.dispatchEvent(new CustomEvent('elderhub:increaseTextSize'));
      provideFeedback('Increasing text size');
    } else if (command.includes('toggle contrast') || command.includes('high contrast')) {
      document.dispatchEvent(new CustomEvent('elderhub:toggleContrast'));
      provideFeedback('Toggling high contrast mode');
    }
    // Help command
    else if (command.includes('help') || command.includes('what can i say')) {
      showHelp();
    } else {
      provideFeedback("I'm not sure what you want. Try saying 'What can I say?' for help.");
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const provideFeedback = (message) => {
    setFeedback(message);
    
    // Optional: Use speech synthesis for audio feedback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      // Using a slightly slower rate for senior users
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const showHelp = () => {
    const helpMessage = "You can say: 'Go to Dashboard', 'Show Companions', 'Go to Events', 'Chat with Nurse Nancy', 'Increase text size', or 'Toggle contrast'.";
    provideFeedback(helpMessage);
  };

  return (
    <div className="voice-control">
      <button 
        className={`voice-button ${isListening ? 'listening' : ''}`}
        onClick={isListening ? stopListening : startListening}
        aria-label="Voice Control"
      >
        <span className="microphone-icon">🎤</span>
        <span className={`pulse-ring ${isListening ? 'active' : ''}`}></span>
      </button>
      
      {feedback && (
        <div className={`voice-feedback ${isListening ? 'listening' : ''}`}>
          <p>{feedback}</p>
          {transcript && <p className="transcript">"{transcript}"</p>}
        </div>
      )}
    </div>
  );
};

export default VoiceControl;