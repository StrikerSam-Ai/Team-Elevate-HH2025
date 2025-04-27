import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(formData);
      // Redirect to the page they tried to visit or dashboard
      navigate(from, { replace: true });
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your journey with ElderHub</p>
          </div>
          
          {error && (
            <div className="auth-error">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="auth-form">
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
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <span>Remember me</span>
              </label>
              
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>OR</span>
          </div>
          
          <div className="social-login">
            <button type="button" className="social-button google">
              <span className="icon">G</span>
              Continue with Google
            </button>
            <button type="button" className="social-button facebook">
              <span className="icon">f</span>
              Continue with Facebook
            </button>
          </div>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
          </div>
        </div>
        
        <div className="auth-image">
          <div className="image-overlay">
            <h2>Connect with Your Community</h2>
            <p>Access your groups, events, and personal journal all in one place.</p>
          </div>
        </div>
      </div>
      
      <div className="auth-help">
        <p>Need help? <a href="tel:1-800-ELDER-HUB">Call Support at 1-800-ELDER-HUB</a></p>
      </div>
    </div>
  );
};

export default Login;