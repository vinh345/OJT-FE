import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl">Oops! Chúng tôi không tìm thấy trang này.</p>
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

export default NotFoundPage;
