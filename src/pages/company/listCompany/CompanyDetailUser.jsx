import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LocationOn, Group } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  getAllJobsByCompanyUser,
  getCompanyDetail,
  getRelatedCompanies,
} from "../../../service/companyService";
import {
  followCompany,
  unfollowCompany,
} from "../../../service/candidateService";
import { FAILED, PENDING } from "../../../constants/status";
import JobCardItemPermitAll from "../../job/JobCardItemPermitAll";
import CompanyCardItem from "./CompanyCardItem";

export default function CompanyDetail() {
  debugger;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false); //  trạng thái follow
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [isFavorited, setIsFavorited] = useState(false); // yêu thích

  // Lấy thông tin chi tiết công ty
  const {
    data: company,
    loading: companyLoading,
    error: companyError,
  } = useSelector((state) => state.companyDetail);

  // Lấy danh sách việc làm của công ty
  const {
    data: jobs,
    loading: jobLoading,
    error: jobError,
  } = useSelector((state) => state.getAllJobsByCompanyUser);

  // Lấy danh sách công ty cùng lĩnh vực
  const {
    data: relatedCompanies,
    loading: relatedCompaniesLoading,
    error: relatedCompaniesError,
  } = useSelector((state) => state.relatedCompanies);

  useEffect(() => {
    dispatch(getCompanyDetail(id));
    dispatch(getRelatedCompanies(id));
    dispatch(
      getAllJobsByCompanyUser({
        companyId: id,
        title: "",
        location: "",
        page: 0,
        size: 10,
        sort: "id",
        direction: "ASC",
      })
    );
  }, [dispatch, id]);

  useEffect(() => {
    // Kiểm tra xem người dùng đã follow công ty chưa
    if (company && company.isFollowing) {
      setIsFollowing(true);
    }
  }, [company]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      dispatch(unfollowCompany({ companyId: id }))
        .then(() => {
          setIsFollowing(false);
          // Cập nhật lại số lượng người theo dõi nếu cần
          dispatch(getCompanyDetail(id));
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(followCompany({ companyId: id }))
        .then(() => {
          setIsFollowing(true);
          // Cập nhật lại số lượng người theo dõi nếu cần
          dispatch(getCompanyDetail(id));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const handleSearch = () => {
    dispatch(
      getAllJobsByCompanyUser({
        companyId: id,
        title: searchTitle,
        location: searchLocation,
        page: 0,
        size: 10,
        sort: "id",
        direction: "ASC",
      })
    );
  };

  const handleSeeJobDetail = (jobId) => {
    navigate(`/user/jobDetail/${jobId}`);
  };

  if (companyLoading === PENDING) return <p>Đang tải thông tin công ty...</p>;
  if (companyLoading === FAILED) return <p>Lỗi: {companyError}</p>;

  return (
    <div className="p-6">
      {company ? (
        <>
          {/* Tiêu đề công ty */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <img
                src={company.logo}
                alt={company.name}
                className="w-24 h-24 object-contain mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold">{company.name}</h1>
                <div className="flex items-center">
                  <LocationOn className="mr-2" />
                  <span>{company.address}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FavoriteBorderIcon
                style={{ fontSize: "40px", cursor: "pointer" }}
                className={`${
                  isFavorited
                    ? "text-red-600 bg-gray-100"
                    : "text-black bg-gray-100"
                }`}
                onClick={handleFavoriteToggle}
              />
              <button
                className={`bg-${
                  isFollowing ? "gray" : "red"
                }-500 text-white px-4 py-2 rounded h-10 w-56`}
                onClick={handleFollowToggle}
              >
                {isFollowing ? "Hủy theo dõi" : "Theo dõi công ty"}
              </button>
            </div>
          </div>

          {/* Phần nội dung chính */}
          <div className="flex justify-between">
            <div className="w-8/12">
              {/* Mô tả và chính sách công ty */}
              <div className="bg-white p-4 rounded-md shadow-md mb-6">
                <section className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
                  <p className="whitespace-pre-wrap break-words">
                    {company.description}
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold mb-2">Chính sách</h2>
                  <p className="whitespace-pre-wrap break-words">
                    {company.policy}
                  </p>
                </section>
              </div>

              {/* Danh sách công việc */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                  Công việc tuyển dụng
                </h2>
                <div className="flex items-center mb-4 space-x-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    placeholder="Tìm kiếm theo: Chức danh công việc..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    placeholder="Thành phố, tỉnh hoặc mã bưu chính"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded-r"
                    onClick={handleSearch}
                  >
                    Tìm việc
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {jobLoading === PENDING && (
                    <p>Đang tải danh sách công việc...</p>
                  )}
                  {jobLoading === FAILED && <p>Lỗi: {jobError}</p>}
                  {jobs?.content?.length ? (
                    jobs.content.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => handleSeeJobDetail(job.id)}
                        className="cursor-pointer"
                      >
                        <JobCardItemPermitAll job={job} />
                      </div>
                    ))
                  ) : (
                    <p>Không có công việc nào được tìm thấy.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-1/4">
              {/* Tổng quan về công ty */}
              <div className="bg-white p-4 rounded-md shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Tổng quan công ty
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Group className="text-red-500 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold">Người theo dõi</h3>
                      <p className="text-sm text-gray-500">
                        {company.followers}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <LocationOn className="text-red-500 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold">Thành phố</h3>
                      <p className="text-sm text-gray-500">
                        {company.nameCity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <LocationOn className="text-red-500 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold">Địa chỉ</h3>
                      <p className="text-sm text-gray-500">{company.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <LocationOn className="text-red-500 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold">Bản đồ</h3>
                      <p className="text-sm text-gray-500">
                        <a
                          href={company.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Xem trên bản đồ
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách các công ty liên quan */}
          <div className="mt-10">
            <h2 className="text-3xl font-bold">Công ty cùng lĩnh vực</h2>
            {relatedCompaniesLoading === PENDING && (
              <p>Đang tải danh sách các công ty liên quan...</p>
            )}
            {relatedCompaniesLoading === FAILED && (
              <p>Lỗi: {relatedCompaniesError}</p>
            )}
            {relatedCompanies && relatedCompanies.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {relatedCompanies.map((relatedCompany) => (
                  <CompanyCardItem
                    key={relatedCompany.id}
                    company={relatedCompany}
                  />
                ))}
              </div>
            ) : (
              <p>Không tìm thấy công ty liên quan.</p>
            )}
          </div>
        </>
      ) : (
        <p>Không có thông tin chi tiết công ty.</p>
      )}
    </div>
  );
}
