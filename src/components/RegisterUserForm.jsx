import React, { useState } from "react";
import logo from "../assets/logo.png"; // Đảm bảo đường dẫn tới ảnh là chính xác
import Adminrafiki2 from "../assets/Admin-rafiki2.png"; // Đảm bảo đường dẫn tới ảnh là chính xác

// import "../style/RegisterUserForm.module.scss"; // Import file CSS
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
          } else {
            Swal.fire({
              title: "Success!",
              text: "Regist successfully, please verify your account",
              icon: "success",
            }).then(() => {
              navigate("/verify");
            });
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
 <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-8  h-[700px]">
          <img src={logo} alt="RKEI Edu Logo" className="h-16 mx-auto mb-6" />
          <h2 className="text-center text-xl md:text-2xl font-bold mb-6">
            Cùng Rikkei Education xây dựng hồ
            <br />
            sơ nổi bật và nhận được các cơ hội
            <br />
            sự nghiệp lý tưởng
          </h2>
          <form onSubmit={handleRegist} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Họ tên
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="Nhập họ tên"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {!error.name && (
                <p className="text-red-500 text-sm mt-1">
                  Vui lòng nhập họ và tên
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="abc@gmail.com"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {!error.email && (
                <p className="text-red-500 text-sm mt-1">Vui lòng nhập email</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {!error.password && (
                <p className="text-red-500 text-sm mt-1">
                  Vui lòng nhập mật khẩu
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="Confirmpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="Confirmpassword"
                placeholder="Password"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {!error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Vui lòng xác nhận mật khẩu
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Đăng ký
            </button>
          </form>
          <p className="text-center text-sm mt-6">
            Bạn đã có tài khoản?
            <a href="/login" className="text-blue-500 underline ml-1">
              Đăng nhập ngay.
            </a>
          </p>
        </div>
        <div className="hidden md:block p-8 w-full md:w-1/2 lg:w-1/3 bg-white  h-[700px] border-l-0 ">
          <img
            src={Adminrafiki2}
            alt="Admin Illustration"
            className="w-full h-full object-cover"
          />
        </div>
        </div>
    </>
  );
}
