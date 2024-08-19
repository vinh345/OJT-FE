import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaUser,
  FaBuilding,
  FaBriefcase,
  FaCubes,
  FaLayerGroup,
  FaBox,
  FaWpforms,
  FaTable,
  FaEnvelope,
} from "react-icons/fa"; // Import icons
import "../../style/Sidebar.css";
import { RightOutlined } from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoM-aQo_ABKBzAHrKjMpNKmIq_oVjlJ0KGGQ&s"
          alt="Profile"
          className="profile-pic"
        />
        {/* <h2>Admin</h2> */}
        <p className="p-section">Chào mừng bạn trở lại</p>
      </div>
      <ul>
        <li>
          <h2>PERSONAL</h2>
        </li>{" "}
        <br />
        <li>
          <NavLink to="/admin/dashboard" activeClassName="active">
            <FaChartBar className="icon" /> Dashboard
            {/* <div className="icon1">
              <RightOutlined /> 
            </div> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/candidate" activeClassName="active">
            <FaUser className="icon" />
            <div className="iconad">Quản lý ứng viên</div>
            {/* <div className="icon1">
              <RightOutlined />
            </div> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/company" activeClassName="active">
            <FaBuilding className="icon" /> Quản lý công ty
            {/* <div className="icon1">
              <RightOutlined />
            </div> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/jobs" activeClassName="active">
            <FaBriefcase className="icon" /> Quản lý công việc
            {/* <div className="icon1">
              <RightOutlined />
            </div> */}
          </NavLink>
        </li>
        <br /> <br />
        <li>
          <h2>Form, Table & Layout</h2>
        </li>{" "}
        <br />
        <li>
          <NavLink to="/admin/products" activeClassName="active">
            <FaCubes className="icon" /> Widgets
            
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" activeClassName="active">
            <FaLayerGroup className="icon" /> Layout Options
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventory" activeClassName="active">
            <FaBox className="icon" /> Box
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/salary" activeClassName="active">
            <FaWpforms className="icon" /> Form
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/reports" activeClassName="active">
            <FaTable className="icon" /> Tables
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/calendar" activeClassName="active">
            <FaEnvelope className="icon" /> Email
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
