import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';

const FeaturesView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-accent font-montserrat">
      <PublicHeader navigate={navigate} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <h1 className="text-4xl font-bold text-center text-secondary mb-12 font-century-gothic">Features</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">Global Payments</h2>
            <p className="text-secondary/80">
              Receive payments from anyone, anywhere in the world. We handle the currency conversion for you.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">Creative Portfolio</h2>
            <p className="text-secondary/80">
              Showcase your best work with a stunning, customizable portfolio. Let your creativity shine.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">Project Management</h2>
            <p className="text-secondary/80">
              Manage your projects from start to finish. Keep track of milestones, deadlines, and client communication.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">Invoice &amp; Billing</h2>
            <p className="text-secondary/80">
              Send professional invoices and get paid on time. Automate your billing and spend more time creating.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">Secure Escrow</h2>
            <p className="text-secondary/80">
              Work with new clients with confidence. Our secure escrow service protects both you and your clients.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">Analytics &amp; Insights</h2>
            <p className="text-secondary/80">
              Gain valuable insights into your creative business. Track your earnings, projects, and client growth.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeaturesView;
