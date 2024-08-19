import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import Adminrafiki2 from "../assets/Admin-rafiki2.png";
import "../style/FormLoginAdmin.scss";

export default function FormLoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api.myservice.com/v1/auth/admin/sign-in",
        {
          email,
          password,
        }
      );

      // Xử lý kết quả đăng nhập thành công
      console.log("Đăng nhập thành công:", response.data);
      // Lưu token vào localStorage hoặc state để sử dụng sau
      localStorage.setItem("accessToken", response.data.accessToken);
 localStorage.setItem("isLogin",true)
 localStorage.setItem("role", "ROLE_ADMIN")
      // Chuyển hướng đến trang quản lý ứng viên hoặc trang chính của admin
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="adm-container">
      <div className="adm-container-1">
        <img
          src={logo}
          alt="RKEI Edu Logo"
          height={"70px"}
          className="img-logo"
        />

        <form onSubmit={handleSubmit} className="form-adm">
          <div className="adm-container-3">
            <h2 className="title-adm">Admin CV Management</h2>
            <div>
              <label
                htmlFor="email"
                style={{
                  color: "#333", // Text color
                  fontSize: "14px", // Font size
                }}
              >
                Email
              </label>{" "}
              <br /> <br />
              <input
                className="input-adm"
                type="email"
                name="email"
                id="email"
                placeholder="     abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                style={{
                  color: "#333", // Text color
                  fontSize: "14px", // Font size
                }}
              >
                Password
              </label>{" "}
              <br /> <br />
              <input
                className="input-adm"
                type="password"
                name="password"
                id="password"
                placeholder="     ***************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn-adm">
            Đăng nhập
          </button>{" "}
          <br />
          <div className="forgot-adm">
            <a href="/auth/recoverPassword">Quên mật khẩu?</a> <br />
          </div>
        </form>
      </div>
      <div className="adm-container-2">
        <img
          src={Adminrafiki2}
          alt="Admin Illustration" 
          className="img-logo2"
        />
      </div>
    </div>
  );
}
