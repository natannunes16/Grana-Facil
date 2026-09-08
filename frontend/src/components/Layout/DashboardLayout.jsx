import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="gf-dashboard-layout">
      <Sidebar />
      <main className="gf-dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
