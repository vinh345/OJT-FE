import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../style/AdminLayout.scss"; // Ensure to link the CSS file
import AdminHeader from "../../layouts/header/AdminHeader1";
import Footer from "../../layouts/footers";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div>
        <AdminHeader />
      </div>
      <div className="admin-layout-1">
        <Sidebar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
