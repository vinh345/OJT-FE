import React from "react";

export default function AddJobBusiness() {
  return (
    <>
      <div className="bg-gray-100 p-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-gray-900 font-bold">
            Trang chủ
          </a>
          /
          <a
            href="/thong-tin-doanh-nghiep"
            className="hover:text-gray-900 ml-2 font-bold"
          >
            Thông tin doanh nghiệp
          </a>
          /
          <a
            href="/doanh-nghiep-cua-toi"
            className="hover:text-gray-900 ml-2 font-bold"
          >
            Doanh nghiệp của tôi
          </a>
          <span className="text-gray-900 ml-2 font-bold">
            / Thêm việc làm mới
          </span>
        </nav>
      </div>
      <div className="p-6">
        <h2>Thêm việc làm mới</h2>
      </div>
    </>
  );
}
