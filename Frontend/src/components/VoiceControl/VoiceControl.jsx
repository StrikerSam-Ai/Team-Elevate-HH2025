import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceControl.css';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();
  const { increaseTextSize, decreaseTextSize, toggleHighContrast } = useAccessibility();

  // Voice commands and their corresponding actions
  const commands = {
    'go to home': () => navigateTo('/'),
    'go to dashboard': () => navigateTo('/dashboard'),
    'go to companions': () => navigateTo('/companions'),
    'go to chat': () => navigateTo('/chat'),
    'go to settings': () => navigateTo('/settings'),
    'increase text': () => {
      increaseTextSize();
      setFeedback('Text size increased');
    },
    'decrease text': () => {
      decreaseTextSize();
      setFeedback('Text size decreased');
    },
    'toggle contrast': () => {
      toggleHighContrast();
      setFeedback('Contrast mode toggled');
    },
    'show help': () => setShowHelp(true),
    'hide help': () => setShowHelp(false)
  };

  const navigateTo = (path) => {
    navigate(path);
    setFeedback(`Navigating to ${path.substring(1) || 'home'}`);
  };

  // Initialize speech recognition
  useEffect(() => {
    let recognition = null;
    
    const setupSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          setIsListening(true);
          setFeedback('Listening...');
        };
        
        recognition.onresult = (event) => {
          const command = event.results[0][0].transcript.toLowerCase().trim();
          setTranscript(command);
          
          // Check if the command matches any of our defined commands
          let commandFound = false;
          
          Object.entries(commands).forEach(([phrase, action]) => {
            if (command.includes(phrase)) {
              action();
              commandFound = true;
            }
          });
          
          if (!commandFound) {
            setFeedback("Sorry, I didn't understand that command.");
          }
        };
        
        recognition.onerror = (event) => {
          setIsListening(false);
          setFeedback(`Error: ${event.error}`);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        setFeedback('Speech recognition not supported in this browser.');
      }
    };
    
    setupSpeechRecognition();
    
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      window.speechRecognition?.abort();
      setIsListening(false);
      setFeedback('');
    } else {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = 'en-US';
          
          recognition.onstart = () => {
            setIsListening(true);
            setFeedback('Listening...');
          };
          
          recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase().trim();
            setTranscript(command);
            
            // Check if the command matches any of our defined commands
            let commandFound = false;
            
            Object.entries(commands).forEach(([phrase, action]) => {
              if (command.includes(phrase)) {
                action();
                commandFound = true;
              }
            });
            
            if (!commandFound) {
              setFeedback("Sorry, I didn't understand that command.");
            }
          };
          
          recognition.onerror = (event) => {
            setIsListening(false);
            setFeedback(`Error: ${event.error}`);
          };
          
          recognition.onend = () => {
            setIsListening(false);
          };
          
          recognition.start();
          window.speechRecognition = recognition;
        } else {
          setFeedback('Speech recognition not supported in this browser.');
        }
      } catch (error) {
        setFeedback(`Error initializing speech recognition: ${error.message}`);
      }
    }
  };

  return (
    <div className="voice-control">
      <button 
        className={`voice-button ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
        aria-label="Voice control"
      >
        <i className={`fa ${isListening ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
      </button>
      
      {feedback && (
        <div className="voice-feedback">
          <p>{feedback}</p>
          {transcript && <small>You said: "{transcript}"</small>}
        </div>
      )}
      
      <button 
        className="voice-help-button"
        onClick={() => setShowHelp(!showHelp)}
        aria-label="Voice control help"
      >
        <i className="fa fa-question-circle"></i>
      </button>
      
      {showHelp && (
        <div className="voice-help-panel">
          <h3>Voice Commands</h3>
          <ul>
            {Object.keys(commands).map((command) => (
              <li key={command}>"{command}"</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VoiceControl;