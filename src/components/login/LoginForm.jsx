import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../service/authService";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RemoveRedEyeRounded, VisibilityOff } from "@mui/icons-material";

const LoginForm = ({ isCompany }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const role = isCompany ? "company" : "candidate";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    try {
      const formData = { email, password, role };

      // Dispatch the login thunk and unwrap the result
      const actionResult = await dispatch(login(formData)).unwrap();

      // If the login is successful, actionResult will contain the response data
      // Handle the successful login case here (e.g., redirect, update UI)
      console.log("Login successful:", actionResult);
      navigate("/");
    } catch (err) {
      console.log("Error occurred:", err);

      if (typeof err === "object") {
        setEmailError(err.email);
        setPasswordError(err.password);
      } else {
        // Fallback for unknown errors
        setGeneralError(err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className=" mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityOff /> : <RemoveRedEyeRounded />}
            </button>
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
        </div>

        {generalError && (
          <div className="mb-4 text-sm text-red-600">{generalError}</div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Đăng nhập
          </button>
        </div>
      </form>
      <div>
        <div className="mt-4 text-center">
          <Link to={"/auth/recoverPassword"}>
            <p className="text-red-500">Quên mật khẩu?</p>
          </Link>
        </div>
        <div className="mt-2 text-center">
          <span>
            Bạn không có tài khoản?{" "} 
            <Link
              to={isCompany ? "/company/register" : "/user/register"}
              className="text-red-500"
            >
              Tạo 1 tài khoản
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
