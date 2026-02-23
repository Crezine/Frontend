import React from 'react';
import { AppView } from '../types';
import UserHeader from '../components/UserHeader';

const DashboardView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-montserrat">
      <UserHeader navigate={navigate} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary">Dashboard</h1>
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-xs sm:text-sm font-bold font-century-gothic tracking-wide">Account Verified</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-secondary mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-primary">$12,345.67</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-secondary mb-2">Projects</h3>
            <p className="text-3xl font-bold text-primary">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-secondary mb-2">Clients</h3>
            <p className="text-3xl font-bold text-primary">8</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-secondary mb-4">Recent Activity</h3>
          <ul>
            <li className="flex justify-between items-center py-3 border-b">
              <p className="text-secondary/80">Payment received from <span className="font-semibold text-secondary">Client A</span></p>
              <p className="text-green-500 font-semibold">+$2,500</p>
            </li>
            <li className="flex justify-between items-center py-3 border-b">
              <p className="text-secondary/80">New project started: <span className="font-semibold text-secondary">Project X</span></p>
              <p className="text-gray-500">2 days ago</p>
            </li>
            <li className="flex justify-between items-center py-3">
              <p className="text-secondary/80">Milestone completed for <span className="font-semibold text-secondary">Project Y</span></p>
              <p className="text-gray-500">4 days ago</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
