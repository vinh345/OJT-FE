import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobCardItem from "./JobCardItem";
import { getListJob } from "../../service/jobService";
import { IDLE } from "../../constants/status";

export default function ListJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: jobs, loading, error } = useSelector((state) => state.jobs);
  console.log(jobs);

  // State để lưu giá trị tìm kiếm
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    if (loading[0] === IDLE) {
      dispatch(
        getListJob({
          title: searchTitle,
          nameCity: searchLocation,
        })
      );
    }
  }, [dispatch, loading, searchTitle, searchLocation]);

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    dispatch(getListJob({ title: searchTitle, nameCity: searchLocation }));
  };

  // Hàm điều hướng sang trang chi tiết công việc
  const handleSeeJobDetail = (jobId) => {
    navigate(`/company/jobDetail/${jobId}`);
  };

  return (
    <div className="mx-auto my-8">
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

      <div className="grid grid-cols-3 gap-4">
        {loading[0] === "pending" && <p>Loading jobs...</p>}
        {loading[0] === "failed" && <p>Error: {error}</p>}
        {jobs?.content?.length ? (
          jobs.content.map((job) => (
            <div key={job.id} onClick={() => handleSeeJobDetail(job.id)}>
              <JobCardItem job={job} />
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}
