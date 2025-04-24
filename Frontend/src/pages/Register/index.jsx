import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PATHS } from '../../config/paths';
import './styles.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birthDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate(PATHS.DASHBOARD);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Create Account</h2>
        <div className="form-group">
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              name: e.target.value
            }))}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              email: e.target.value
            }))}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            name="password" 
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              password: e.target.value
            }))}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="date" 
            name="birthDate" 
            value={formData.birthDate}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              birthDate: e.target.value
            }))}
          />
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account?{' '}
          <span onClick={() => navigate(PATHS.LOGIN)} className="link">
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;