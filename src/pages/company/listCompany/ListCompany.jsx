import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CompanyCardItem from "./CompanyCardItem";
import Footer from "../../../layouts/footers";
import { getListCompanies } from "../../../service/companyService";
import { Pagination } from "antd";

export default function ListCompany() {
  const dispatch = useDispatch();
  const {
    data: companies,
    loading,
    error,
  } = useSelector((state) => state.companies);
  console.log(companies);
  const [total, setTotal] = useState();
  const [page, setPage] = useState();

  // State để lưu giá trị tìm kiếm
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleChangePage = (e) => {
    setPage(e);
  };
  useEffect(() => {
    if (loading[0] === "idle") {
      dispatch(
        getListCompanies({
          name: searchName,
          location: searchLocation,
          page: page,
        })
      ).then((res) => {
        console.log(res);
        setTotal(res.payload.totalElements);
      });
    }
  }, [loading, searchName, searchLocation, page]);

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    dispatch(getListCompanies({ name: searchName, location: searchLocation }));
  };

  return (
    <>
      {/* <div className="bg-gray-100 p-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-gray-900 font-bold">
            Trang chủ
          </a>{" "}
          /
          <a
            href="/thong-tin-doanh-nghiep"
            className="hover:text-gray-900 ml-2 font-bold"
          >
            Danh sách công ty
          </a>{" "}
        </nav>
      </div> */}
      <div className="mx-auto my-8 px-36 h-[600px]">
        <div className="flex items-center mb-4 space-x-2 ">
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
        <div className="grid grid-cols-3 gap-4 mt-10">
          {loading[0] === "pending" && <p>Loading companies...</p>}
          {loading[0] === "failed" && <p>Error: {error}</p>}
          {companies?.content?.map((company) => (
            <CompanyCardItem key={company.id} company={company} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-14">
        {" "}
        {/* Thêm div bọc để căn giữa */}
        <Pagination
          className="self-center"
          onChange={handleChangePage}
          simple
          total={total}
          pageSize={9}
        />
      </div>
    </>
  );
}
