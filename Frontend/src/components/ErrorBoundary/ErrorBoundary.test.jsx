import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  const originalConsoleError = console.error;
  
  beforeAll(() => {
    // Suppress console.error for expected error
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We apologize for the inconvenience. An error has occurred and we\'re working to fix it.')).toBeInTheDocument();
  });

  it('shows error details in development mode', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();

    process.env.NODE_ENV = originalNodeEnv;
  });

  it('hides error details in production mode', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Test error')).not.toBeInTheDocument();

    process.env.NODE_ENV = originalNodeEnv;
  });

  it('provides refresh and home navigation options', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
  });

  it('calls window.location.reload when refresh button is clicked', () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { reload: jest.fn() };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Refresh Page'));
    expect(window.location.reload).toHaveBeenCalled();

    window.location = originalLocation;
  });

  it('navigates to home when home button is clicked', () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Go to Home'));
    expect(window.location.href).toBe('/');

    window.location = originalLocation;
  });
}); 