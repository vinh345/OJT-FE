
import React, { useState } from "react";

import logo from "../assets/logo.png"; // Đảm bảo đường dẫn tới ảnh là chính xác
import Adminrafiki2 from "../assets/Admin-rafiki2.png"; // Đảm bảo đường dẫn tới ảnh là chính xác

import "../style/RegisterUserForm.module.scss"; // Import file CSS

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { candidateRegist } from "../service/authService";
import { notification } from "antd";
import Swal from "sweetalert2";


export default function RegisterUserForm() {
  const [registForm, setRegistForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: "a",
    email: "a",
    password: "a",
    confirmPassword: "a",
  });
  const api = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegistForm({ ...registForm, [e.target.name]: e.target.value });
    if (e.target.value === "") {
      setError({ ...error, [e.target.name]: e.target.value });
    } else {
      setError({ ...error, [e.target.name]: e.target.value });
    }
  };

  const handleRegist = (e) => {
    e.preventDefault();
    if (
      registForm.name &&
      registForm.email &&
      registForm.password &&
      registForm.confirmPassword
    ) {
      if (registForm.password === registForm.confirmPassword) {
        dispatch(
          candidateRegist({
            name: registForm.name,
            email: registForm.email,
            password: registForm.password,
            confirmPassword: registForm.confirmPassword,
          })
        ).then((res) => {
          console.log(res);
          if (res.payload.error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.payload.message,
            });
          } else{
            Swal.fire({
              title: "Success!",
              text: "Regist successfully, please verify your account",
              icon: "success"
            })
            .then(() => {navigate("/verify")});
          }
        });
      } else {
        setError({
          ...error,
          password: "Mật khẩu không trùng khớp",
          confirmPassword: "Mật khẩu không trùng khớp",
        });
      }
    } else {
      setError({
        ...error,
        name: "Vui lòng nhập họ và tên",
        email: "Vui lòng nhập email",
        password: "Vui lòng nhập mật khẩu",
        confirmPassword: "Vui lòng nhập lại mật khẩu",
      });
    }
  };
  return (

    <>

      <div className="container">
        <div className="container1">
          <img src={logo} alt="RKEI Edu Logo" height={"70px"} className="lgo" />{" "}
          {/* Thêm thuộc tính chiều cao ở đây */}

          <h2><b>
            Cùng Rikkei Education xây dựng hồ <br />
            sơ nổi bật và nhận được các cơ hội <br />
            sự nghiệp lý tưởng
            </b>
          </h2>
          <form onSubmit={handleRegist}>
            <div className="form-group">
              <label htmlFor="email">Họ tên</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                placeholder=" Nhập họ tên"
              />
              {!error.name && (
                <p style={{ color: "red" }}>Vui lòng nhập họ và tên</p>
              )}

            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input

                onChange={handleChange}

                type="email"
                name="email"
                id="email"
                placeholder="abc@gmail.com"
              />

              {!error.email && (
                <p style={{ color: "red" }}>Vui lòng nhập email</p>
              )}

            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input

                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              {!error.password && (
                <p style={{ color: "red" }}>Vui lòng nhập mật khẩu</p>
              )}

            </div>
            <div className="form-group">
              <label htmlFor="Confirmpassword">Confirm password</label>
              <input

                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="Confirmpassword"
                placeholder="Password"
              />
              {!error.confirmPassword && (
                <p style={{ color: "red" }}>Vui lòng xác nhận mật khẩu</p>
              )}
            </div>
            <button type="submit">Đăng ký</button>
          </form>
          <p>
            Bạn đã có tài khoản?<Link>Đăng nhập ngay.</Link>
          </p>{" "}
          <br />
  
        </div>
        <div className="container2">
        
          <img src={Adminrafiki2} alt="Admin Illustration" />
        </div>
      </div>
    </>
  );
}
