import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default Layout;