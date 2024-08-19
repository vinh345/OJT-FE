import React from 'react';

// import '../style/Header.scss'; // Make sure to create this CSS file

import '../style/Header.module.scss'; // Make sure to create this CSS file

import logo from'../assets/logo.png'

export default function UserHeader() {
  return (
    <header className="header">
      <div className="header-left">
        <nav>
          <a href="#">Trang chủ</a>
          <a href="#">Việc làm</a>
          <a href="#">CV của bạn</a>
          <a href="#">Customer Supports</a>
        </nav>
        <div className="contact-info">
          <span>+1-202-555-0178</span>
          <img src="path_to_flag.png" alt="Flag" className="flag" />
        </div>
      </div>
      <div className="header-right">
      <img src={logo} alt="Logo" className="" width='120px'/>
        <select className="location-select">
          <option value="Hà Nội">Hà Nội</option>
        </select>
        <input type="text" placeholder="Job title, keyword, company" className="search-input" /> 
       
         <button className="btn login">Đăng Nhập</button>
        <button className="btn register">Đăng Kí</button>
        <button className="btn post-job">Đăng Tuyển</button> 
       
      </div> 
    </header> 
  );
}
