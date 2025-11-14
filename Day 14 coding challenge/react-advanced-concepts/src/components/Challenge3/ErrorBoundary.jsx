import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to console
    console.error('Error caught by Error Boundary:', error);
    console.error('Error Info:', errorInfo);
    
    // You can also log to an error reporting service here
    this.logErrorToService(error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  logErrorToService = (error, errorInfo) => {
    // Mock API call to error monitoring service
    console.log('Sending error to monitoring service...', {
      message: error.toString(),
      stack: errorInfo.componentStack
    });
  };

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger m-3" role="alert">
          <h4 className="alert-heading">Oops! Something went wrong</h4>
          <p>We're sorry, but something unexpected happened. Our team has been notified.</p>
          <hr />
          <details className="mb-3">
            <summary style={{ cursor: 'pointer' }}>Error Details</summary>
            <pre className="mt-2 text-danger">
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          <button className="btn btn-primary" onClick={this.resetError}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;