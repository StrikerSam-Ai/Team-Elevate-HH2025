import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // For multi-step registration
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (error) setError('');
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email address is invalid');
      return false;
    }
    return true;
  };
  
  const validateStep2 = () => {
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password should be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service');
      return false;
    }
    return true;
  };

  const goToNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const goToPreviousStep = () => {
    setStep(1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      goToNextStep();
      return;
    }
    
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter your last name"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
      </div>
    </>
  );
  
  const renderStep2 = () => (
    <>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a password"
          required
        />
        <small className="form-hint">Password must be at least 8 characters long</small>
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          required
        />
      </div>
      
      <div className="form-checkbox">
        <label>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            required
          />
          <span>I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link></span>
        </label>
      </div>
    </>
  );

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Create Your Account</h1>
            <p>Join the ElderHub community</p>
          </div>
          
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-name">Personal Info</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-name">Security</span>
            </div>
          </div>
          
          {error && (
            <div className="auth-error">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="auth-form">
            {step === 1 ? renderStep1() : renderStep2()}
            
            <div className="form-navigation">
              {step === 2 && (
                <button 
                  type="button" 
                  className="back-button"
                  onClick={goToPreviousStep}
                >
                  Back
                </button>
              )}
              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {step === 1 ? 'Next' : isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="auth-divider">
            <span>OR</span>
          </div>
          
          <div className="social-login">
            <button type="button" className="social-button google">
              <span className="icon">G</span>
              Sign up with Google
            </button>
            <button type="button" className="social-button facebook">
              <span className="icon">f</span>
              Sign up with Facebook
            </button>
          </div>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
        
        <div className="auth-image">
          <div className="image-overlay">
            <h2>Join Our Community</h2>
            <p>Connect with like-minded seniors, participate in events, and create lasting memories.</p>
          </div>
        </div>
      </div>
      
      <div className="auth-help">
        <p>Need help? <a href="tel:1-800-ELDER-HUB">Call Support at 1-800-ELDER-HUB</a></p>
      </div>
    </div>
  );
};

export default Register;