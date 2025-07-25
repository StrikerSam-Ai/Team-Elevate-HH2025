import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Profile from './index';
import axios from '../../utils/axios';

// Mock axios
jest.mock('../../utils/axios');

// Mock useAuth hook
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      birthDate: '1990-01-01',
      address: '123 Main St',
      dateJoined: '2024-01-01',
      lastLogin: '2024-03-19T10:00:00Z',
      emailVerified: true,
      accountType: 'Standard',
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '0987654321',
      },
    },
    updateProfile: jest.fn(),
  }),
}));

describe('Profile Component', () => {
  const mockUpdateProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderProfile = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders user information correctly', () => {
    renderProfile();
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
  });

  it('displays emergency contact information', () => {
    renderProfile();
    
    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Spouse')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0987654321')).toBeInTheDocument();
  });

  it('enables editing mode when Edit Profile button is clicked', () => {
    renderProfile();
    
    const editButton = screen.getByText('Edit Profile');
    fireEvent.click(editButton);
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('updates form data when input fields are changed', () => {
    renderProfile();
    
    const editButton = screen.getByText('Edit Profile');
    fireEvent.click(editButton);
    
    const nameInput = screen.getByLabelText('Full Name');
    fireEvent.change(nameInput, { target: { value: 'John Smith' } });
    
    expect(nameInput.value).toBe('John Smith');
  });

  it('handles profile photo upload', async () => {
    renderProfile();
    
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const photoInput = screen.getByLabelText('Upload Photo');
    
    fireEvent.change(photoInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/upload-photo'),
        expect.any(FormData),
        expect.any(Object)
      );
    });
  });

  it('displays success message after successful profile update', async () => {
    renderProfile();
    
    const editButton = screen.getByText('Edit Profile');
    fireEvent.click(editButton);
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText('Profile updated successfully')).toBeInTheDocument();
    });
  });

  it('displays error message when profile update fails', async () => {
    const mockError = new Error('Update failed');
    mockUpdateProfile.mockRejectedValueOnce(mockError);
    
    renderProfile();
    
    const editButton = screen.getByText('Edit Profile');
    fireEvent.click(editButton);
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText('Update failed')).toBeInTheDocument();
    });
  });

  it('cancels editing mode when Cancel button is clicked', () => {
    renderProfile();
    
    const editButton = screen.getByText('Edit Profile');
    fireEvent.click(editButton);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.queryByText('Save Changes')).not.toBeInTheDocument();
  });

  it('displays account information correctly', () => {
    renderProfile();
    
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });
}); 