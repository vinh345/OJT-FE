import React from "react";
import { Link } from "react-router-dom";

const AccessDeniedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-500 to-yellow-500 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold">403</h1>
        <p className="text-2xl">Bạn không có quyền truy cập.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-700 transition duration-300"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
