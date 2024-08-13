import React from "react";
import logo from "../assets/logo.png"; // Đảm bảo đường dẫn tới ảnh là chính xác
import dg from "../assets/dg.png"; // Đảm bảo đường dẫn tới ảnh là chính xác

// import "../style/CompanyLoginForm.scss"; // Import file CSS

export default function CompanyLoginForm() {
  return (
    <>
      <div className="container">
        <div className="container1">
          <img src={logo} alt="RKEI Edu Logo" height={"70px"} className="lgo" />{" "}
          {/* Thêm thuộc tính chiều cao ở đây */}
          <h2>
            Cùng Rikkei Education tiếp cận nguồn <br /> nhân lực chất lượng cao{" "}
          </h2>
          <form>
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
            <button type="submit">Đăng nhập</button>
          </form>
          <a href="/">Quên mật khẩu?</a> <br />
          {/* Bạn không có tài khoản? <a href="/">Tạo 1 tài khoản</a> */}
        </div>
        <div className="container2">
          {/* Bạn có thể thêm nội dung hoặc hình ảnh khác vào đây */}
          <img src={dg} alt="Admin Illustration" height={"390px"} />
        </div>
      </div>
    </>
  );
}
