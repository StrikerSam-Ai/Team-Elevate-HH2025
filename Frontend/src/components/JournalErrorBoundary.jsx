import React from 'react';
import { Card, Button } from './';

class JournalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      isRetrying: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Journal error:', error, errorInfo);
  }

  handleRetry = async () => {
    this.setState({ isRetrying: true });
    try {
      if (this.props.onRetry) {
        await this.props.onRetry();
      }
      this.setState({ hasError: false, error: null });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isRetrying: false });
    }
  };

  render() {
    if (this.state.hasError) {
      const isBlockchainError = this.state.error?.message?.includes('blockchain');
      const isIPFSError = this.state.error?.message?.includes('IPFS');

      return (
        <Card className="error-card">
          <h3>Something went wrong</h3>
          <p>
            {isBlockchainError 
              ? 'Unable to connect to the blockchain. This could be due to network issues or your wallet not being connected.'
              : isIPFSError
              ? 'Unable to load or save media content. Please check your internet connection and try again.'
              : 'An unexpected error occurred. Please try again.'}
          </p>
          <Button 
            onClick={this.handleRetry}
            disabled={this.state.isRetrying}
          >
            {this.state.isRetrying ? 'Retrying...' : 'Try Again'}
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default JournalErrorBoundary;