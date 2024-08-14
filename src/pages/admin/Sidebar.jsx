import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../style/Sidebar.css'; // Ensure to link the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src="profile-pic-url" alt="Profile" className="profile-pic" />
        <h2> Admin </h2>
        <p>Chào mừng bạn trở lại</p>
      </div>
      <ul> 
      <li><NavLink to="/admin/dashboard" activeClassName="active">Bảng điều khiển</NavLink></li>
        <li><NavLink to="/admin/candidate" activeClassName="active">Quản lí ứng viên</NavLink></li>
        <li><NavLink to="/admin/company" activeClassName="active">Quản lý công ty</NavLink></li>
        <li><NavLink to="/admin/customers" activeClassName="active">Quản lý khách hàng</NavLink></li>
        <li><NavLink to="/admin/products" activeClassName="active">Quản lý sản phẩm</NavLink></li>
        <li><NavLink to="/admin/orders" activeClassName="active">Quản lý đơn hàng</NavLink></li>
        <li><NavLink to="/admin/inventory" activeClassName="active">Quản lý nội bộ</NavLink></li>
        <li><NavLink to="/admin/salary" activeClassName="active">Bảng lương</NavLink></li>
        <li><NavLink to="/admin/reports" activeClassName="active">Báo cáo doanh thu</NavLink></li>
        <li><NavLink to="/admin/calendar" activeClassName="active">Lịch công tác</NavLink></li>
        <li><NavLink to="/admin/settings" activeClassName="active">Cài đặt hệ thống</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
