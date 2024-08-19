import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import JobCardItem from "./JobCardItem";
// import { getListJob } from "../../service/jobService";
// import { IDLE } from "../../constants/status";
// import { Pagination } from "antd";
import { getCandidate } from "../../../service/permitAllService";
import CandidateCardItem from "../../job/card/CandidateCardItem";
import { Pagination } from "antd";

export default function ListCandidate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState();

  // State để lưu giá trị tìm kiếm
  const [search, setSearch] = useState("");

  const [total, setTotal] = useState();
  const [page, setPage] = useState(null);
  const [sort, setSort] = useState(null);
  useEffect(() => {
    dispatch(
      getCandidate({
        search: search,
        page: page - 1,
      })
    ).then((res) => {
      console.log(res);
      setTotal(res.payload.data.totalElements);
      setCandidates(res.payload.data.content);
    });
  }, [search, sort, page]);

  // Hàm điều hướng sang trang chi tiết công việc
  const handleSeeCandidateDetail = (id) => {
    navigate(`/company/candidate/detail/${id}`);
  };
  const handleChangePage = (e) => {
    console.log(e);
    setPage(e);
  };
  return (
    <>
      <div className="mx-auto my-8  h-[650px] px-36 ">
        <div className="flex items-center mb-4 space-x-2">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Search by: Job Title..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-r"
            // onClick={handleSearch}
          >
            Find Candidate
          </button>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4 ">
            {candidates ? (
              candidates.map((cand) => (
                <div
                  className="cursor-pointer"
                  key={cand.id}
                  onClick={() => handleSeeCandidateDetail(cand.id)}
                >
                  <CandidateCardItem candidate={cand} />
                </div>
              ))
            ) : (
              <p>No Candidate found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-36 mb-14">
        {" "}
        {/* Thêm div bọc để căn giữa */}
        <Pagination
        pageSize={9}
          className="self-center"
          onChange={handleChangePage}
          simple
          total={total}
        />
      </div>
    </>
  );
}
