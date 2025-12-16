import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // In production, you would send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>

            <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase mb-4">
              Something Went Wrong
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              We're sorry for the inconvenience. The application encountered an unexpected error.
              Our team has been notified and is working on a fix.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-8 text-left bg-gray-100 dark:bg-zinc-800 rounded-xl p-4 overflow-auto">
                <p className="font-mono text-sm text-red-600 dark:text-red-400 mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-xs text-gray-600 dark:text-gray-400 uppercase font-bold">
                      Stack Trace
                    </summary>
                    <pre className="text-xs text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wide hover:bg-orange-600 transition flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="bg-transparent border border-gray-300 dark:border-white/20 text-zinc-900 dark:text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-white/5 transition"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
