import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../service/authService";

const LoginForm = ({ isCompany }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const dispatch = useDispatch();
  const role = isCompany ? "company" : "candidate";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    try {
      const formData = { email, password, role };
      const response = await dispatch(login(formData)).unwrap();

      if (response.data.error) {
        setEmailError(response.data.message.email);
        setPasswordError(response.data.message.password);
      }
    } catch (error) {
      console.log(error.response.data.error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;
        console.log(errorData);

        if (errorData.message) {
          setGeneralError(errorData.message);
        } else {
          setGeneralError("An unknown error occurred. Please try again.");
        }
      } else {
        setGeneralError("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1">
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

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
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
      <div className="mt-4 text-center">
        <a href="#" className="text-blue-500">
          Quên mật khẩu?
        </a>
      </div>
      <div className="mt-2 text-center">
        <span>
          Bạn không có tài khoản?{" "}
          <a href="#" className="text-red-500">
            Tạo 1 tài khoản
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
