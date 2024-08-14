import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CompanyCardItem from "./CompanyCardItem";
// import Footer from "../../../layouts/Footer";
import { getListCompanies } from "../../../service/companyService";

export default function ListCompany() {
  const dispatch = useDispatch();
  const {
    data: companies,
    loading,
    error,
  } = useSelector((state) => state.companies);
  console.log(companies);

  // State để lưu giá trị tìm kiếm
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    if (loading[0] === "idle") {
      dispatch(
        getListCompanies({ name: searchName, location: searchLocation })
      );
    }
  }, [loading, searchName, searchLocation]);

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    dispatch(getListCompanies({ name: searchName, location: searchLocation }));
  };

  return (
    <>
      <div className="mx-auto my-8">
        <div className="flex items-center mb-4 space-x-2">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Search by: Company Name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="City, state or zip code"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <button
            className="px-4 py-2 border border-gray-300 rounded bg-gray-200"
            onClick={handleSearch}
          >
            Filters
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-r"
            onClick={handleSearch}
          >
            Find Company
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {loading[0] === "pending" && <p>Loading companies...</p>}
          {loading[0] === "failed" && <p>Error: {error}</p>}
          {companies?.content?.map((company) => (
            <CompanyCardItem key={company.id} company={company} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
