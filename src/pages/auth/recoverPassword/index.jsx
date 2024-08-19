import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { recoverPassword } from "../../../service/authService";
import Investmentdatarafiki1 from "../../../assets/Investmentdatarafiki1.png";
import { Link } from "react-router-dom";


export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("candidate"); // Default to 'candidate', adjust as needed
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    const formData = {
      email,
      role,
    };

    try {
      const response = await dispatch(recoverPassword(formData)).unwrap();
      setSuccessMessage(response.message);
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else {
        setError("Failed to send recovery email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mx-40"> 
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <CircularProgress size={60} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 w-4/5 mx-auto">
        <div className="flex justify-center align-middle gap-4">
          <div className="flex flex-col h-full w-full align-middle justify-center">
            <h2 className="text-2xl font-bold text-center mb-5">
              Khôi phục mật khẩu
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Chức năng tài khoản
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="candidate">Người tìm việc</option>
                    <option value="admin">Quản trị hệ thống</option>
                    <option value="company">Công ty tuyển dụng</option>
                  </select>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {successMessage && (
                <p className="text-sm text-green-600">{successMessage}</p>
              )}

              <div className="flex align-middle justify-center">
                <button
                  type="submit"
                  className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={loading}
                >
                  Lấy mật khẩu
                </button>
              </div>
            </form>
            <span className="flex justify-center pt-2">Chưa có tài khoản?{" "} <Link to={"/user/register" }><a className="text-red-600">Đăng ký</a></Link></span>

          </div>
          <div className="h-full w-px bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300"></div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={Investmentdatarafiki1}
            alt="Background"
            className="max-h-96 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
