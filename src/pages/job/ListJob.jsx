import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListJob } from "../../service/jobService";
import { Pagination } from "antd";
import JobCardItemPermitAll from "./JobCardItemPermitAll";

export default function ListJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: jobs, loading, error } = useSelector((state) => state.jobs);
  console.log(jobs);

  // State để lưu giá trị tìm kiếm
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  useEffect(() => {
    dispatch(
      getListJob({
        title: searchTitle,
        nameCity: searchLocation,
        page: page - 1,
      })
    ).then((res) => {
      console.log(res.payload.totalElements);
      setTotal(res.payload.totalElements);
    });
  }, [searchTitle, searchLocation, page]);

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    dispatch(getListJob({ title: searchTitle, nameCity: searchLocation }));
  };

  // Hàm điều hướng sang trang chi tiết công việc
  const handleSeeJobDetail = (jobId) => {
    navigate(`/jobDetail/${jobId}`);
  };
  const handleChangePage = (e) => {
    console.log(e);
    setPage(e);
  };
  return (
    <>
      <div className="mx-auto my-8  h-[600px] px-36 ">
        <div className="flex items-center mb-4 space-x-2">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Search by: Job Title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="City, state or zip code"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-r"
            onClick={handleSearch}
          >
            Find Job
          </button>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4 ">
            {jobs?.content?.length ? (
              jobs.content.map((job) => (
                <div
                  className="cursor-pointer"
                  key={job.id}
                  onClick={() => handleSeeJobDetail(job.id)}
                >
                  <JobCardItemPermitAll job={job} />
                </div>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
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
