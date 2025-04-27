import React from 'react';
import { Button } from './';
import '../../styles/components/common/ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      isRetrying: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // Send to error reporting service if available
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = async () => {
    this.setState({ isRetrying: true });
    try {
      if (this.props.onRetry) {
        await this.props.onRetry();
        this.setState({ hasError: false, error: null, errorInfo: null });
      } else {
        window.location.reload();
      }
    } catch (error) {
      this.setState({ error, hasError: true });
    } finally {
      this.setState({ isRetrying: false });
    }
  };

  render() {
    if (this.state.hasError) {
      // Check for specialized error messages
      const isNetworkError = this.state.error?.message?.includes('network') || 
                            this.state.error?.message?.includes('Network');
      const isBlockchainError = this.state.error?.message?.includes('blockchain') || 
                               this.state.error?.message?.includes('wallet');
      const isDataError = this.state.error?.message?.includes('data') || 
                         this.state.error?.message?.includes('fetch');
                         
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (isNetworkError) {
        errorMessage = 'Network connection issue. Please check your internet connection and try again.';
      } else if (isBlockchainError) {
        errorMessage = 'Unable to connect to the blockchain. This could be due to network issues or your wallet not being connected.';
      } else if (isDataError) {
        errorMessage = 'Unable to load or save data. Please try again.';
      }

      return (
        <div className="error-boundary">
          <h2>{this.props.title || 'Something went wrong'}</h2>
          <p>{this.props.message || errorMessage}</p>
          
          {this.props.showDetails && this.state.error && (
            <pre>{this.state.error.toString()}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          )}
          
          <Button 
            onClick={this.handleRetry}
            disabled={this.state.isRetrying}
          >
            {this.state.isRetrying ? 'Retrying...' : 'Try Again'}
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;