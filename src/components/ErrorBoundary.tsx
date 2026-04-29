import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          background: '#08040F', 
          color: '#fff', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <h1 style={{ color: '#FF6B00', marginBottom: '20px' }}>Oops! Something went wrong.</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>
            Chunav Saathi encountered an unexpected glitch. Don't worry, your democracy points are safe!
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              padding: '12px 24px', 
              background: '#FF6B00', 
              border: 'none', 
              borderRadius: '30px', 
              color: '#fff', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
          >
            Reload Adventure
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
