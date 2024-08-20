import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany } from "../../service/companyService";
import { Select } from "antd";
import { fetchTypeCompanys } from "../../service/typeCompany/typeCompanyService";
import { getListLocation } from "../../service/Location/locationService";

export default function UpdateCompanyForm({ onClose, companyData }) {
  const dispatch = useDispatch();
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
    // mapUrl: "",
    locationId: "",
  });

  useEffect(() => {
    dispatch(fetchTypeCompanys({}));
    dispatch(getListLocation());
  }, [dispatch]);

  useEffect(() => {
    if (companyData) {
      setFormData({
        name: companyData.name || "",
        logo: null,
        website: companyData.website || "",
        linkFacebook: companyData.linkFacebook || "",
        linkLinkedin: companyData.linkLinkedin || "",
        size: companyData.size || "",
        description: companyData.description || "",
        phone: companyData.phone || "",
        policy: companyData.policy || "",
        typeCompany: companyData.typeCompanyName || "",
        address: companyData.address || "",
        // mapUrl: companyData.mapUrl || "",
        locationId: companyData.nameCity || "",
      });
    }
  }, [companyData]);

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, typeCompany: value }));
  };

  const handleLocationChange = (value) => {
    setFormData((prev) => ({ ...prev, locationId: value }));
  };

  const { data: typeCompanys } = useSelector((state) => state.typeCompanys);
  const { data: locations } = useSelector((state) => state.locations);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["name", "website", "phone"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} không được để trống`);
        return;
      }
    }

    const updatedData = {
      ...formData,
      locationId: parseInt(formData.locationId, 10),
      typeCompany: parseInt(formData.typeCompany, 10),
    };

    console.log("Dữ liệu biểu mẫu trước khi cập nhật:", updatedData);

    dispatch(updateCompany(updatedData))
      .then((response) => {
        console.log("Update successful:", response);
        onClose();
      })
      .catch((error) => {
        console.error("Error during update:", error);
      });
  };
  return (
    <div className="fixed inset-0 flex items-center  justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          Cập nhật thông tin doanh nghiệp
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-4">
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
            {formData.logo && formData.logo instanceof File && (
              <img
                src={URL.createObjectURL(formData.logo)}
                alt="Map Preview"
                className="w-7 h-7 mb-2"
              />
            )}
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
            <Select
              value={formData.typeCompany}
              onChange={handleSelectChange}
              className="mt-1 block w-full"
              placeholder="Chọn loại công ty"
            >
              {typeCompanys?.content?.map((typeCompany) => (
                <Select.Option key={typeCompany.id} value={typeCompany.id}>
                  {typeCompany.name}
                </Select.Option>
              ))}
            </Select>
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

          {/* <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Map URL
            </label>
            {formData.mapUrl && formData.mapUrl instanceof File && (
              <img
                src={URL.createObjectURL(formData.mapUrl)}
                alt="Map Preview"
                className="w-7 h-7 mb-2"
              />
            )}
            <input
              type="file"
              name="mapUrl"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ID vị trí
            </label>
            <Select
              value={formData.locationId}
              onChange={handleLocationChange}
              className="mt-1 block w-full"
              placeholder="Chọn vị trí"
            >
              {locations?.content?.map((location) => (
                <Select.Option key={location.id} value={location.id}>
                  {location.nameCity}
                </Select.Option>
              ))}
            </Select>
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
