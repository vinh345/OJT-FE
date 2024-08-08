import React from "react";
import logo from '../assets/logo.png'; // Ensure the path to the image is correct
import '../style/CompanyRegister.scss'; // Ensure the path to the CSS file is correct

export default function CompanyRegisterForm() {
  return (
    <div className="containercompany">
      <img src={logo} alt="RKEI Edu Logo" height="70px"/>
      <h2>Đăng kí để có thể tiếp cận nguồn <br />nhân lực chất lượng cao</h2>
      <div className="containerform">
        <div className="containerform1">
          <h3>Thông tin cá nhân</h3>
          <form>
            <label htmlFor="name">Họ tên</label>
            <input type="text" id="name" placeholder="Nhập họ tên" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="abc@gmail.com" />
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" id="password" placeholder="********" />
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input type="password" id="confirmPassword" placeholder="********" />
          </form>
        </div>
        <div className="containerform2">
          <h3>Thông tin công ty</h3>
          <form>
            <label htmlFor="companyName">Tên công ty</label>
            <input type="text" id="companyName" placeholder="Tên công ty" />
            <label htmlFor="location">Địa điểm làm việc</label>
            <select id="location">
              <option value="">Chọn tỉnh/thành phố</option>
              {/* Add more options here */}
            </select>
            <label htmlFor="phone">Số điện thoại</label>
            <input type="tel" id="phone" placeholder="0123456789" />
            <label htmlFor="companyEmail">Email công ty</label>
            <input type="email" id="companyEmail" placeholder="abc@company.com" />
          </form>
        </div>
      </div> 
      <div className="btn">
      <button className="register-button">Đăng kí</button> <br /> <br />
      Đã có tài khoản ? <a href=""> Đăng nhập ngay </a>
      </div>
     
    </div>
  );
}
