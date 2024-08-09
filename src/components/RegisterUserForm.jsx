import React from "react";
import logo from "../assets/logo.png"; // Đảm bảo đường dẫn tới ảnh là chính xác
import Adminrafiki2 from "../assets/Admin-rafiki2.png"; // Đảm bảo đường dẫn tới ảnh là chính xác

import "../style/RegisterUserForm.scss"; // Import file CSS

export default function RegisterUserForm() {
  return (
    <div>
      <div className="container">
        <div className="container1">
          <img src={logo} alt="RKEI Edu Logo" height={"70px"} className="lgo" />{" "}
          {/* Thêm thuộc tính chiều cao ở đây */}
          <h2>
            Cùng Rikkei Education xây dựng hồ <br />
            sơ nổi bật và nhận được các cơ hội <br />
            sự nghiệp lý tưởng
          </h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Họ tên</label>
              <input
                type="email"
                name="name"
                id="email"
                placeholder=" Nhập họ tên"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="***************"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Confirmpassword">Confirm password</label>
              <input
                type="Confirmpassword"
                name="Confirmpassword"
                id="Confirmpassword"
                placeholder="***************"
              />
            </div>
            <button type="submit">Đăng nhập</button>
          </form>
          <a href="/">Quên mật khẩu?</a> <br />
          {/* Bạn không có tài khoản? <a href="/">Tạo 1 tài khoản</a> */}
        </div>
        <div className="container2">
          {/* Bạn có thể thêm nội dung hoặc hình ảnh khác vào đây */}
          <img src={Adminrafiki2} alt="Admin Illustration" />
        </div>
      </div>
    </div>
  );
}
