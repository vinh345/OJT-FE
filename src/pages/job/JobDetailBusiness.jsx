import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getJobDetail,
  getJobDetailBusiness,
  getJobsBySameType,
} from "../../service/jobService";
import {
  AccessTime,
  Event,
  LocationOn,
  MonetizationOn,
  School,
  Work,
} from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import JobCardItem from "./JobCardItem";
export default function JobDetailBusiness() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.jobs);
  const { data: sameTypeJobsData } = useSelector((state) => state.sameTypeJobs);
  const job = data?.data;
  console.log(job);
  console.log(sameTypeJobsData);

  useEffect(() => {
    dispatch(getJobDetailBusiness(id));
    dispatch(getJobsBySameType(id));
  }, [dispatch, id]);
  // Hàm điều hướng sang trang chi tiết công việc
  const handleSeeJobDetail = (jobId) => {
    navigate(`/jobDetail/${jobId}`);
  };
  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4 p-6">
          <div className="flex items-center">
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-24 h-24 object-contain mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <h2 className="text-xl font-semibold">{job.company.name}</h2>
              <div className="flex items-center mb-4">
                <LocationOn className="mr-2" />
                <span>{job.addressCompany.address}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <BookmarkBorderIcon
              style={{ fontSize: "40px" }}
              className=" h-10 text-red-500 bg-red-200 "
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded h-10 w-56">
              Cập Nhật Thông Tin
            </button>
          </div>
        </div>

        <div className="flex justify-between p-6">
          <div className="w-8/12">
            {/* Job Description and Requirements */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                <p className="whitespace-pre-wrap break-words ">
                  {job.description}
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                <p className="whitespace-pre-wrap break-words  ">
                  {job.requirements}
                </p>
              </section>
            </div>
          </div>

          <div className="w-1/4">
            {/* Salary and Job Location Section */}
            <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center mb-6 ">
              <div className="flex items-center">
                <MonetizationOn className="text-red-500 mr-2" />
                <div>
                  <h3 className="text-xl font-semibold text-green-500">
                    {job.salary}
                  </h3>
                  <p className="text-sm text-gray-500">Yearly salary</p>
                </div>
              </div>
              <div className="flex items-center">
                <LocationOn className="text-red-500 mr-2" />
                <div>
                  <h3 className="text-lg font-semibold">
                    {job.addressCompany.address}
                  </h3>
                  <p className="text-sm text-gray-500">Job Location</p>
                </div>
              </div>
            </div>

            {/* Job Overview Section */}
            <div className="bg-white p-4 rounded-md shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Event className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">Job Posted</h3>
                    <p className="text-sm text-gray-500">{job.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <AccessTime className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">Job Expire in</h3>
                    <p className="text-sm text-gray-500">{job.expireAt}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Work className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">Job Level</h3>
                    <p className="text-sm text-gray-500">Entry Level</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MonetizationOn className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">Experience</h3>
                    <p className="text-sm text-gray-500">$50k-80k/month</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <School className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">Education</h3>
                    <p className="text-sm text-gray-500">Graduation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold">Related Jobs</h2>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {sameTypeJobsData?.length ? (
              sameTypeJobsData.map((job) => (
                <div
                  className="cursor-pointer"
                  key={job.id}
                  onClick={() => handleSeeJobDetail(job.id)}
                >
                  <JobCardItem job={job} />
                </div>
              ))
            ) : (
              <p>No related jobs found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
