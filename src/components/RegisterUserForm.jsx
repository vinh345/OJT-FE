import React, { useState } from "react";
import logo from "../assets/logo.png"; // Đảm bảo đường dẫn tới ảnh là chính xác
import Adminrafiki2 from "../assets/Admin-rafiki2.png"; // Đảm bảo đường dẫn tới ảnh là chính xác
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { candidateRegist } from "../service/authService";
import { notification } from "antd";
import Swal from "sweetalert2";
import { RemoveRedEyeRounded, VisibilityOff } from "@mui/icons-material";

export default function RegisterUserForm() {
  const [registForm, setRegistForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const api = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistForm({ ...registForm, [name]: value });

    let errorMessage = "";

    if (value === "") {
      errorMessage = `Vui lòng nhập ${name === "confirmPassword" ? "xác nhận mật khẩu" : name}`;
    } else {
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Email không hợp lệ";
        }
      }

      if (name === "password" || name === "confirmPassword") {
        if (value.length < 6) {
          errorMessage = "Mật khẩu phải có ít nhất 6 ký tự";
        }
      }
    }

    setError({ ...error, [name]: errorMessage });
  };

  const handleRegist = (e) => {
    e.preventDefault();
    if (
      registForm.name &&
      registForm.email &&
      registForm.password &&
      registForm.confirmPassword
    ) {
      if (registForm.password.length >= 6) {
        if (registForm.password === registForm.confirmPassword) {
          dispatch(
            candidateRegist({
              name: registForm.name,
              email: registForm.email,
              password: registForm.password,
              confirmPassword: registForm.confirmPassword,
            })
          ).then((res) => {
            if (res.payload.error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: res.payload.message,
              });
            } else {
              Swal.fire({
                title: "Success!",
                text: "Đăng ký thành công, vui lòng xác nhận tài khoản của bạn",
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
          password: "Mật khẩu phải có ít nhất 6 ký tự",
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
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-8 h-[700px]">
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
              {error.name && (
                <p className="text-red-500 text-sm mt-1">{error.name}</p>
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
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <VisibilityOff/> : <RemoveRedEyeRounded/>}
                </button>
              </div>
              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="Confirmpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="Confirmpassword"
                  placeholder="Password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? <VisibilityOff/> : <RemoveRedEyeRounded/>}
                </button>
              </div>
              {error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {error.confirmPassword}
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
            <Link to="/user/login" className="text-blue-500 underline ml-1">
              Đăng nhập ngay.
            </Link>
          </p>
        </div>
        <div className="hidden md:block p-8 w-full md:w-1/2 lg:w-1/3 bg-white h-[700px] border-l-0">
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
