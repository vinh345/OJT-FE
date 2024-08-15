import React, { useState } from "react";

export default function UpdateCompanyForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    website: "",
    linkFacebook: "",
    linkLinkedin: "",
    size: "",
    description: "",
    phone: "",
    policy: "",
    typeCompany: "",
    address: "",
    mapUrl: "",
    locationId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center  justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          Cập nhật thông tin doanh nghiệp
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-4 ">
            <label className="block text-sm font-medium text-gray-700">
              Tên công ty
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="ABC Corp"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://www.example.com"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <input
              type="file"
              name="logo"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Facebook
            </label>
            <input
              type="text"
              name="linkFacebook"
              value={formData.linkFacebook}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://www.facebook.com/yourcompany"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <input
              type="text"
              name="linkLinkedin"
              value={formData.linkLinkedin}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://www.linkedin.com/company/yourcompany"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quy mô
            </label>
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter company size"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter company description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Chính sách
            </label>
            <textarea
              name="policy"
              value={formData.policy}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter company policy"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Loại công ty
            </label>
            <input
              type="text"
              name="typeCompany"
              value={formData.typeCompany}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter company type"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter company address"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Map URL
            </label>
            <input
              type="text"
              name="mapUrl"
              value={formData.mapUrl}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Map URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Location ID
            </label>
            <input
              type="text"
              name="locationId"
              value={formData.locationId}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Location ID"
            />
          </div>

          <div className="flex justify-end space-x-4 col-span-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
