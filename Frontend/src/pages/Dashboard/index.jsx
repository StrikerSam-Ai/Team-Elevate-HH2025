import React from 'react';
import { ActivityList, EventsList, QuickActions } from '../../components/Dashboard';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="page dashboard-page">
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's an overview of your activities.</p>
      </header>

      <main className="page-content">
        <div className="dashboard-grid">
          <section className="dashboard-card">
            <h2>Recent Activity</h2>
            <ActivityList />
          </section>

          <section className="dashboard-card">
            <h2>Upcoming Events</h2>
            <EventsList />
          </section>

          <section className="dashboard-card">
            <h2>Quick Actions</h2>
            <QuickActions />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;