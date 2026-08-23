import React, { ErrorInfo, ReactNode } from 'react';
import { RiAlertLine, RiRefreshLine, RiHomeLine } from 'react-icons/ri';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-accent flex items-center justify-center p-4 font-montserrat">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-secondary/15 p-8 md:p-12 max-w-md w-full text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-red-50 border-2 border-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <RiAlertLine className="text-red-500 text-3xl" />
            </div>

            <h1 className="text-xl md:text-2xl font-medium text-black mb-2 font-montserrat">
              Something went wrong
            </h1>

            <p className="text-xs md:text-sm text-black/70 font-normal mb-6 leading-relaxed">
              We encountered an unexpected problem while rendering this view. Please refresh or return home.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="w-full bg-gray-50 border border-black/10 rounded-xl p-3 mb-6 text-left max-h-32 overflow-y-auto text-[11px] text-red-600 font-mono">
                {this.state.error.message}
              </div>
            )}

            <div className="w-full flex gap-3">
              <button
                onClick={this.handleGoHome}
                className="flex-1 py-2.5 border border-black text-black rounded-full text-xs font-normal uppercase tracking-widest hover:bg-black hover:text-white transition-all font-montserrat flex items-center justify-center gap-1.5"
              >
                <RiHomeLine size={14} /> Home
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 py-2.5 bg-secondary text-white rounded-full text-xs font-normal uppercase tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat flex items-center justify-center gap-1.5"
              >
                <RiRefreshLine size={14} /> Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
