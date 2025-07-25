import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Communities from './index';
import axios from '../../utils/axios';

// Mock axios
jest.mock('../../utils/axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Communities Component', () => {
  const mockCommunities = [
    {
      id: 1,
      name: 'Test Community 1',
      description: 'Description for community 1',
      category: 'Health',
      member_count: 10,
      event_count: 5,
    },
    {
      id: 2,
      name: 'Test Community 2',
      description: 'Description for community 2',
      category: 'Wellness',
      member_count: 15,
      event_count: 3,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockCommunities });
  });

  const renderCommunities = () => {
    return render(
      <BrowserRouter>
        <Communities />
      </BrowserRouter>
    );
  };

  it('renders communities list', async () => {
    renderCommunities();
    
    await waitFor(() => {
      expect(screen.getByText('Test Community 1')).toBeInTheDocument();
      expect(screen.getByText('Test Community 2')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    renderCommunities();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    renderCommunities();
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch communities. Please try again later.')).toBeInTheDocument();
    });
  });

  it('filters communities based on search query', async () => {
    renderCommunities();
    
    await waitFor(() => {
      expect(screen.getByText('Test Community 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search communities...');
    fireEvent.change(searchInput, { target: { value: 'Test Community 1' } });

    expect(screen.getByText('Test Community 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Community 2')).not.toBeInTheDocument();
  });

  it('opens create community dialog', async () => {
    renderCommunities();
    
    await waitFor(() => {
      expect(screen.getByText('Create Community')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Create Community'));
    expect(screen.getByText('Create New Community')).toBeInTheDocument();
  });

  it('creates new community', async () => {
    const newCommunity = {
      name: 'New Community',
      description: 'New Description',
      category: 'New Category',
    };

    axios.post.mockResolvedValueOnce({ data: { id: 3, ...newCommunity } });
    renderCommunities();

    await waitFor(() => {
      expect(screen.getByText('Create Community')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Create Community'));

    fireEvent.change(screen.getByLabelText('Community Name'), {
      target: { value: newCommunity.name },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: newCommunity.description },
    });
    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: newCommunity.category },
    });

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        newCommunity
      );
    });
  });

  it('navigates to community details', async () => {
    renderCommunities();
    
    await waitFor(() => {
      expect(screen.getByText('View Details')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('View Details'));
    expect(mockNavigate).toHaveBeenCalledWith('/communities/1');
  });

  it('navigates to join community', async () => {
    renderCommunities();
    
    await waitFor(() => {
      expect(screen.getByText('Join Community')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Join Community'));
    expect(mockNavigate).toHaveBeenCalledWith('/communities/1/join');
  });
}); 