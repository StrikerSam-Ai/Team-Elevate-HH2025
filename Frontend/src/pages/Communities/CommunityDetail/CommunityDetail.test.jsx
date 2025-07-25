import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CommunityDetail from './index';
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

describe('CommunityDetail Component', () => {
  const mockCommunity = {
    id: 1,
    name: 'Test Community',
    description: 'Test Description',
    category: 'Health',
  };

  const mockMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Admin',
      profile_photo: null,
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Member',
      profile_photo: null,
    },
  ];

  const mockEvents = [
    {
      id: 1,
      title: 'Test Event',
      description: 'Test Event Description',
      start_time: '2024-03-20T10:00:00Z',
      end_time: '2024-03-20T12:00:00Z',
      location: 'Test Location',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockImplementation((url) => {
      if (url.includes('/communities/1/')) {
        return Promise.resolve({ data: mockCommunity });
      }
      if (url.includes('/members')) {
        return Promise.resolve({ data: mockMembers });
      }
      if (url.includes('/events')) {
        return Promise.resolve({ data: mockEvents });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  const renderCommunityDetail = () => {
    return render(
      <BrowserRouter>
        <CommunityDetail />
      </BrowserRouter>
    );
  };

  it('renders community details', async () => {
    renderCommunityDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Test Community')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Health')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    renderCommunityDetail();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    renderCommunityDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch community details. Please try again later.')).toBeInTheDocument();
    });
  });

  it('displays members list', async () => {
    renderCommunityDetail();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Member')).toBeInTheDocument();
    });
  });

  it('displays events list', async () => {
    renderCommunityDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Events')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Events'));

    await waitFor(() => {
      expect(screen.getByText('Test Event')).toBeInTheDocument();
      expect(screen.getByText('Test Event Description')).toBeInTheDocument();
      expect(screen.getByText('Test Location')).toBeInTheDocument();
    });
  });

  it('opens create event dialog', async () => {
    renderCommunityDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Events')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Events'));
    fireEvent.click(screen.getByText('Create Event'));

    expect(screen.getByText('Create New Event')).toBeInTheDocument();
  });

  it('creates new event', async () => {
    const newEvent = {
      title: 'New Event',
      description: 'New Description',
      start_time: '2024-03-21T10:00:00',
      end_time: '2024-03-21T12:00:00',
      location: 'New Location',
    };

    axios.post.mockResolvedValueOnce({ data: { id: 2, ...newEvent } });
    renderCommunityDetail();

    await waitFor(() => {
      expect(screen.getByText('Events')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Events'));
    fireEvent.click(screen.getByText('Create Event'));

    fireEvent.change(screen.getByLabelText('Event Title'), {
      target: { value: newEvent.title },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: newEvent.description },
    });
    fireEvent.change(screen.getByLabelText('Start Time'), {
      target: { value: newEvent.start_time },
    });
    fireEvent.change(screen.getByLabelText('End Time'), {
      target: { value: newEvent.end_time },
    });
    fireEvent.change(screen.getByLabelText('Location'), {
      target: { value: newEvent.location },
    });

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        newEvent
      );
    });
  });

  it('navigates to event details', async () => {
    renderCommunityDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Events')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Events'));
    fireEvent.click(screen.getByText('View Details'));

    expect(mockNavigate).toHaveBeenCalledWith('/events/1');
  });

  it('shows join button for non-members', async () => {
    // Mock user as non-member
    jest.spyOn(require('../../../contexts/AuthContext'), 'useAuth')
      .mockImplementation(() => ({
        user: {
          id: 3, // Different from mockMembers
          name: 'New User',
          email: 'new@example.com',
        },
      }));

    renderCommunityDetail();
    
    await waitFor(() => {
      expect(screen.getByText('Join Community')).toBeInTheDocument();
    });
  });

  it('hides join button for members', async () => {
    renderCommunityDetail();
    
    await waitFor(() => {
      expect(screen.queryByText('Join Community')).not.toBeInTheDocument();
    });
  });
}); 