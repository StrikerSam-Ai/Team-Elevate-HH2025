import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { NotificationProvider } from '../../contexts/NotificationContext';
import Home from './index';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock useAuth
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  }),
}));

// Mock useNotifications
jest.mock('../../contexts/NotificationContext', () => ({
  useNotifications: () => ({
    notifications: [
      {
        id: 1,
        title: 'New Event',
        message: 'A new event has been scheduled',
      },
      {
        id: 2,
        title: 'Community Update',
        message: 'Your community has new members',
      },
    ],
  }),
}));

describe('Home Component', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  const mockStats = {
    upcomingEvents: [
      {
        id: 1,
        title: 'Test Event',
        start_time: '2024-03-20T10:00:00Z',
        location: 'Test Location',
      },
    ],
    recentActivities: [
      {
        id: 1,
        title: 'Test Activity',
        participants_count: 5,
      },
    ],
    healthSummary: {
      date_time: '2024-03-19T15:00:00Z',
      systolic: 120,
      diastolic: 80,
      heart_rate: 75,
      blood_sugar: 100,
      temperature: 98.6,
    },
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock axios responses
    axios.get.mockImplementation((url) => {
      if (url.includes('/events/upcoming')) {
        return Promise.resolve({ data: mockStats.upcomingEvents });
      }
      if (url.includes('/social-activities/recent')) {
        return Promise.resolve({ data: mockStats.recentActivities });
      }
      if (url.includes('/health-vitals/latest')) {
        return Promise.resolve({ data: mockStats.healthSummary });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  const renderHome = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <Home />
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders loading state initially', () => {
    renderHome();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders welcome message with user name', async () => {
    renderHome();
    await waitFor(() => {
      expect(screen.getByText(/Welcome back, John Doe!/i)).toBeInTheDocument();
    });
  });

  it('renders upcoming events', async () => {
    renderHome();
    await waitFor(() => {
      expect(screen.getByText('Test Event')).toBeInTheDocument();
      expect(screen.getByText(/Test Location/)).toBeInTheDocument();
    });
  });

  it('renders recent activities', async () => {
    renderHome();
    await waitFor(() => {
      expect(screen.getByText('Test Activity')).toBeInTheDocument();
      expect(screen.getByText('5 participants')).toBeInTheDocument();
    });
  });

  it('renders health summary', async () => {
    renderHome();
    await waitFor(() => {
      expect(screen.getByText('120/80 mmHg')).toBeInTheDocument();
      expect(screen.getByText('75 bpm')).toBeInTheDocument();
      expect(screen.getByText('100 mg/dL')).toBeInTheDocument();
      expect(screen.getByText('98.6°F')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    renderHome();
    await waitFor(() => {
      expect(screen.queryByText('Test Event')).not.toBeInTheDocument();
    });
  });

  it('displays quick action cards', () => {
    renderHome();
    
    expect(screen.getByText('Communities')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Journal')).toBeInTheDocument();
  });

  it('navigates to correct path when quick action is clicked', () => {
    renderHome();
    
    fireEvent.click(screen.getByText('Go to Communities'));
    expect(mockNavigate).toHaveBeenCalledWith('/communities');
  });

  it('displays notifications', () => {
    renderHome();
    
    expect(screen.getByText('Recent Notifications')).toBeInTheDocument();
    expect(screen.getByText('New Event')).toBeInTheDocument();
    expect(screen.getByText('Community Update')).toBeInTheDocument();
  });

  it('shows no notifications message when there are no notifications', () => {
    jest.spyOn(require('../../contexts/NotificationContext'), 'useNotifications')
      .mockImplementation(() => ({
        notifications: [],
      }));

    renderHome();
    
    expect(screen.getByText('No new notifications')).toBeInTheDocument();
    expect(screen.getByText('You\'re all caught up!')).toBeInTheDocument();
  });
}); 