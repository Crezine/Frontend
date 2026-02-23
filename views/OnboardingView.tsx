import React, { useState } from 'react';
import { AppView } from '../types';

const OnboardingView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // If validation passes
    setError('');
    console.log('Creating account with:', { email, password });
    // For now, just navigate to the dashboard on successful "creation"
    navigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-accent flex flex-col items-center justify-center p-4 font-montserrat">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-secondary font-century-gothic mb-2">
            Create Your Cashdoor
          </h2>
          <p className="text-center text-secondary/70 mb-8">
            Join the global creative economy.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleCreateAccount}>
            <div className="mb-4">
              <label className="block text-secondary/80 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-secondary/80 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="w-full bg-secondary text-white font-bold font-montserrat uppercase tracking-tight py-3 rounded-full text-base transition-all duration-300 hover:bg-secondary/90 hover:shadow-2xl hover:shadow-secondary/30 active:scale-95 transform"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
        <div className="text-center mt-6">
          <button onClick={() => navigate('landing')} className="text-sm text-secondary/70 hover:text-secondary">
            &larr; Go Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
