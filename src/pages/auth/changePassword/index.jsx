import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword, logOut } from "../../../service/authService";
import Investmentdatarafiki1 from "../../../assets/Investmentdatarafiki1.png";
import { RemoveRedEyeRounded, VisibilityOff } from "@mui/icons-material";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    const formData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      repeatPassword: confirmPassword,
    };

    const response = await dispatch(changePassword(formData))
      .unwrap()
      .then((response) => {
        setSuccessMessage(response.message);
        dispatch(logOut)
      })
      .catch((err) => {
        console.log(err);
        if (typeof err === "string") {
          setError(err);
        }
        if (err.currentPassword) {
          setError(err.currentPassword);
        } else if (err.newPassword) {
          setError(err.newPassword);
        } else if (err.repeatPassword) {
          setError(err.repeatPassword);
        } else {
          setError("An error occurred while setting up the request.");
        }
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 w-4/5 mx-auto">
      <div className="flex justify-center align-middle gap-4">
        <div className="flex flex-col h-full w-full align-middle justify-center">
          <div className="w-full mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-5">
              Thay đổi mật khẩu
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu hiện tại
                </label>
                <div className="mt-1 relative">
                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                    onClick={toggleCurrentPasswordVisibility}
                  >
                    {showCurrentPassword ? (
                      <VisibilityOff />
                    ) : (
                      <RemoveRedEyeRounded />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu mới{" "}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <RemoveRedEyeRounded />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Xác nhận mật khẩu{" "}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <RemoveRedEyeRounded />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {successMessage && (
                <p className="text-sm text-green-600">{successMessage}</p>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 flex justify-center px-2 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Thay đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
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
  );
}
