import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../style/AdminLayout.scss'; // Ensure to link the CSS file

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
