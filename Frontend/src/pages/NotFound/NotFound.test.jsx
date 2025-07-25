import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './index';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NotFound Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderNotFound = () => {
    return render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
  };

  it('renders 404 error message', () => {
    renderNotFound();
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('displays helpful message to user', () => {
    renderNotFound();
    
    expect(screen.getByText(/The page you are looking for might have been removed/)).toBeInTheDocument();
  });

  it('provides navigation buttons', () => {
    renderNotFound();
    
    expect(screen.getByText('Go Back')).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
  });

  it('navigates back when Go Back button is clicked', () => {
    renderNotFound();
    
    fireEvent.click(screen.getByText('Go Back'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('navigates to home when Go to Home button is clicked', () => {
    renderNotFound();
    
    fireEvent.click(screen.getByText('Go to Home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
}); 