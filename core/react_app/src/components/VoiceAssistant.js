import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const navigate = useNavigate();

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;

    useEffect(() => {
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript;
            setTranscript(command);
            handleCommand(command);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        return () => {
            recognition.stop();
        };
    }, []);

    const handleCommand = async (command) => {
        try {
            const response = await fetch('/api/voice-assistant/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command: command.toLowerCase() }),
            });

            const data = await response.json();

            if (data.action === 'navigate') {
                navigate(data.url); // Use React Router navigation
                speakResponse(`Navigating to ${data.url.replace('/', '')}`);
            } else if (data.action === 'speak') {
                speakResponse(data.message);
            }
        } catch (error) {
            console.error('Error processing command:', error);
            speakResponse('Sorry, there was an error processing your command.');
        }
    };

    const speakResponse = (message) => {
        const speech = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(speech);
    };

    const toggleListening = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    return (
        <div className="voice-assistant">
            <button 
                onClick={toggleListening}
                className={`voice-button ${isListening ? 'listening' : ''}`}
                aria-label={isListening ? 'Stop listening' : 'Start voice command'}
            >
                {isListening ? 'Listening...' : '🎤'}
            </button>
            {transcript && (
                <div className="transcript" role="status" aria-live="polite">
                    <p>You said: {transcript}</p>
                </div>
            )}
            <style jsx>{`
                .voice-assistant {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                }
                
                .voice-button {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    font-size: 24px;
                }
                
                .voice-button.listening {
                    background-color: #dc3545;
                    animation: pulse 1.5s infinite;
                }
                
                .transcript {
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    min-width: 200px;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default VoiceAssistant;