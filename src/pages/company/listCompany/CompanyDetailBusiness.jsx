import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetail } from "../../../service/companyService";
import { FAILED, IDLE, PENDING } from "../../../constants/status";
import { getAllJobsByCompany, getListJob } from "../../../service/jobService";
import JobCardItemBusiness from "../../job/JobCardItemBusiness";
import {
  Email,
  Facebook,
  LinkedIn,
  LocationOn,
  Twitter,
} from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import LinkIcon from "@mui/icons-material/Link";
import UpdateCompanyForm from "../../../components/company/UpdateCompanyForm";
export default function CompanyDetailBusiness() {
  const { id } = useParams();
  const [isFormVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    data: company,
    loading: companyLoading,
    error: companyError,
  } = useSelector((state) => state.companyDetail);

  useEffect(() => {
    dispatch(getCompanyDetail(id));
  }, [dispatch, id]);

  // Lấy danh sách việc làm của công ty
  const {
    data: jobs,
    loading: jobLoading,
    error: jobError,
  } = useSelector((state) => state.getAllJobsByCompanys);
  console.log(jobs);

  useEffect(() => {
    if (jobLoading === IDLE) {
      dispatch(
        getAllJobsByCompany({
          title: "",
          location: "",
          page: 0,
          size: 10,
        })
      );
    }
  }, [dispatch, jobLoading]);

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  const handleFormClose = () => {
    setFormVisible(false);
  };

  const handleEditClick = () => {
    setFormVisible(true);
  };

  if (companyLoading === PENDING) return <p>Loading company details...</p>;
  if (companyLoading === FAILED) return <p>Error: {companyError}</p>;
  // Kiểm tra nếu `company` là null hoặc undefined
  if (!company) return <p>Company not found</p>;
  return (
    <>
      <div className="bg-gray-100 p-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-gray-900 font-bold">
            Trang chủ
          </a>{" "}
          /
          <a
            href="/thong-tin-doanh-nghiep"
            className="hover:text-gray-900 ml-2 font-bold"
          >
            Thông tin doanh nghiệp
          </a>{" "}
          /
          <a
            href="/doanh-nghiep-cua-toi"
            className="text-gray-900 ml-2 font-bold"
          >
            Doanh nghiệp của tôi
          </a>{" "}
        </nav>
      </div>
      <div className="p-6">
        {isFormVisible && <UpdateCompanyForm onClose={handleFormClose} />}
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <img
                className="w-24 h-24 object-contain mr-4"
                src={company.logo || "https://via.placeholder.com/96"}
                alt="Logo công ty"
              />
              <div>
                <h1 className="text-3xl font-bold">
                  {company.name || "Tên công ty"}
                </h1>
                <div className="flex items-center">
                  <PersonIcon className="mr-2" />
                  <span>{company.size || "Số lượng nhân viên"} Nhân viên</span>
                  <FavoriteIcon className="text-red-500 ml-8" />
                  <span className="ml-2">
                    {company.followers || 0} người theo dõi
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleEditClick}
              className="bg-red-500 text-white px-4 py-2 rounded h-10 w-56 hover:bg-blue-400 hover:text-white"
            >
              Chỉnh sửa
            </button>
          </div>

          <div className="flex justify-between">
            <div className="w-8/12">
              {/* Mô tả công ty và Chính sách */}
              <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                <section className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Mô tả công ty</h2>
                  <p className="whitespace-break-spaces break-words">
                    {company.description || "Mô tả công ty"}
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold mb-2">Chính sách</h2>
                  <p className="whitespace-break-spaces break-words">
                    {company.policy || "Chính sách công ty"}
                  </p>
                </section>
              </div>

              {/* Danh sách việc làm */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-4">
                    Việc làm đang mở
                  </h2>
                  <button className="font-semibold text-red-400 border-2 border-red-500 rounded-md px-4 py-1 hover:bg-red-500 hover:text-white">
                    Thêm việc làm mới
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-8">
                  {jobLoading[0] === "pending" && <p>Loading jobs...</p>}
                  {jobLoading[0] === "failed" && <p>Error: {jobError}</p>}
                  {jobs?.content?.length ? (
                    jobs.content.map((job) => (
                      <div key={job.id}>
                        <JobCardItemBusiness job={job} />
                      </div>
                    ))
                  ) : (
                    <p>No jobs found.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-1/4">
              <div className="bg-white p-4 rounded-md flex justify-between items-center shadow-md mb-6">
                <div className="flex items-center">
                  <LocationOn className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-500">
                      {company.address || "Địa chỉ công ty"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {company.nameCity || "Thành phố"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md shadow-md mb-6">
                <MapIcon className="text-red-500" />
                <span className="ml-3 font-semibold text-xl">Xem trên map</span>
                <img
                  src={company.mapUrl || "https://via.placeholder.com/200"}
                  alt="Map"
                  className="mt-4"
                />
              </div>

              <div className="bg-white p-4 rounded-md shadow-md mb-6">
                <h2 className="font-semibold text-lg">
                  Chia sẻ thông tin đến mọi người
                </h2>
                <div className="flex gap-2">
                  <button
                    className="bg-pink-100 text-red-500 hover:bg-pink-300 px-4 py-2 rounded flex items-center"
                    onClick={() => handleRedirect("https://www.google.com/")}
                  >
                    <LinkIcon className="mr-2" />
                    Copy Links
                  </button>
                  <button
                    className="bg-pink-100 text-red-500 hover:bg-pink-300 p-2 rounded flex items-center"
                    onClick={() => handleRedirect("https://www.linkedin.com")}
                  >
                    <LinkedIn className="text-red-500" />
                  </button>
                  <button
                    className="bg-pink-100 text-red-500 hover:bg-pink-300 p-2 rounded flex items-center"
                    onClick={() => handleRedirect("https://www.facebook.com")}
                  >
                    <Facebook className="text-red-500" />
                  </button>
                  <button
                    className="bg-pink-100 text-red-500 hover:bg-pink-300 p-2 rounded flex items-center"
                    onClick={() => handleRedirect("https://www.twitter.com")}
                  >
                    <Twitter className="text-red-500" />
                  </button>
                  <button
                    className="bg-pink-100 text-red-500 hover:bg-pink-300 p-2 rounded flex items-center"
                    onClick={() =>
                      handleRedirect("https://mail.google.com/mail/u/0/#inbox")
                    }
                  >
                    <Email className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
