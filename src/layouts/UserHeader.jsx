import React from 'react';
import '../style/Header.css'; // Make sure to create this CSS file

export default function UserHeader() {
  return (
    <header className="header">
      <div className="header-left">
        <img src="https://rikkei.edu.vn/wp-content/uploads/2022/08/chuong-trinh-hoc-lap-trinh-tinh-gon-tai-rikkei-academy-min.png" alt="Logo" className="logo" />
        <nav>
          <a href="#">Trang chủ</a>
          <a href="#">Việc làm</a>
          <a href="#">CV của bạn</a>
          <a href="#">Customer Supports</a>
        </nav>
      </div>
      <div className="header-right">
        <select className="location-select">
          <option value="Hà Nội">Hà Nội</option>
        </select>
        <input type="text" placeholder="Job title, keyword, company" className="search-input" /> 
        <button className="btn login">Đăng Nhập</button>
        <button className="btn register">Đăng Kí</button>
        <button className="btn post-job">Đăng Tuyển</button> 
        <div className="contact-info">
          <span>+1-202-555-0178</span>
          <img src="path_to_flag.png" alt="Flag" className="flag" />
        </div>
      </div> 
    </header>
  );
}
