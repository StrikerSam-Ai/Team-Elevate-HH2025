import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventDetail from './index';
import axios from '../../../utils/axios';
import { useAuth } from '../../../contexts/AuthContext';

// Mock axios
jest.mock('../../../utils/axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' }),
}));

// Mock useAuth
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    },
  }),
}));

describe('EventDetail Component', () => {
  const mockEvent = {
    id: 1,
    title: 'Test Event',
    description: 'Test Event Description',
    start_time: '2024-03-20T10:00:00Z',
    end_time: '2024-03-20T12:00:00Z',
    location: 'Test Location',
  };

  const mockParticipants = [
    {
      id: 1,
      name: 'John Doe',
      registration_note: 'Will attend',
      profile_photo: null,
    },
    {
      id: 2,
      name: 'Jane Smith',
      registration_note: 'Looking forward to it',
      profile_photo: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockImplementation((url) => {
      if (url.includes('/events/1/')) {
        return Promise.resolve({ data: mockEvent });
      }
      if (url.includes('/participants')) {
        return Promise.resolve({ data: mockParticipants });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  const renderEventDetail = () => {
    return render(
      <BrowserRouter>
        <EventDetail />
      </BrowserRouter>
    );
  };

  it('renders event details', async () => {
    renderEventDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Test Event')).toBeInTheDocument();
      expect(screen.getByText('Test Event Description')).toBeInTheDocument();
      expect(screen.getByText('Test Location')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    renderEventDetail();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    renderEventDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch event details. Please try again later.')).toBeInTheDocument();
    });
  });

  it('displays participants list', async () => {
    renderEventDetail();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Will attend')).toBeInTheDocument();
      expect(screen.getByText('Looking forward to it')).toBeInTheDocument();
    });
  });

  it('shows register button for non-participants', async () => {
    // Mock user as non-participant
    jest.spyOn(require('../../../contexts/AuthContext'), 'useAuth')
      .mockImplementation(() => ({
        user: {
          id: 3, // Different from mockParticipants
          name: 'New User',
          email: 'new@example.com',
        },
      }));

    renderEventDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Register for Event')).toBeInTheDocument();
    });
  });

  it('shows cancel registration button for participants', async () => {
    renderEventDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Cancel Registration')).toBeInTheDocument();
    });
  });

  it('opens registration dialog', async () => {
    // Mock user as non-participant
    jest.spyOn(require('../../../contexts/AuthContext'), 'useAuth')
      .mockImplementation(() => ({
        user: {
          id: 3,
          name: 'New User',
          email: 'new@example.com',
        },
      }));

    renderEventDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Register for Event')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Register for Event'));
    expect(screen.getByText('Register for Event')).toBeInTheDocument();
  });

  it('registers for event', async () => {
    // Mock user as non-participant
    jest.spyOn(require('../../../contexts/AuthContext'), 'useAuth')
      .mockImplementation(() => ({
        user: {
          id: 3,
          name: 'New User',
          email: 'new@example.com',
        },
      }));

    axios.post.mockResolvedValueOnce({ data: { success: true } });
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Register for Event')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Register for Event'));

    const note = 'I would like to attend';
    fireEvent.change(screen.getByLabelText('Registration Note (Optional)'), {
      target: { value: note },
    });

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        { note }
      );
    });
  });

  it('cancels registration', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Cancel Registration')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cancel Registration'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String)
      );
    });
  });

  it('displays formatted date and time', async () => {
    renderEventDetail();
    
    await waitFor(() => {
      const date = new Date(mockEvent.start_time).toLocaleDateString();
      const time = `${new Date(mockEvent.start_time).toLocaleTimeString()} - ${new Date(mockEvent.end_time).toLocaleTimeString()}`;
      
      expect(screen.getByText(date)).toBeInTheDocument();
      expect(screen.getByText(time)).toBeInTheDocument();
    });
  });
}); 