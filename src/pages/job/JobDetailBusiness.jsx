import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getJobDetailBusiness } from "../../service/jobService";
import {
  AccessTime,
  Event,
  LocationOn,
  MonetizationOn,
  School,
  Work,
} from "@mui/icons-material";
import { Button } from "antd";
import "tailwindcss/tailwind.css";
import JobEditModal from "../../components/job/JobEditModal";
import { Email, Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import LinkIcon from "@mui/icons-material/Link";
import CardItemCandidates from "../candidateinformation/CardItemCandidates";
import { getCandidatesByJob } from "../../service/jobCandidate/jobCandidateService";
import { formatDate } from "../../utils/formatData";

const JobDetailBusiness = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: jobData, loading: jobLoading } = useSelector(
    (state) => state.getJobDetailBusiness
  );
  const job = jobData?.data;

  console.log(job);

  const { data: jobCandidates, loading: candidatesLoading } = useSelector(
    (state) => state.jobCandidates
  );
  console.log(jobCandidates);

  useEffect(() => {
    dispatch(getJobDetailBusiness(id));
    dispatch(getCandidatesByJob(id));
  }, [dispatch, id]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = () => {
    dispatch(getJobDetailBusiness(id));
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4 p-6">
          <div className="flex items-center">
            <img
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="w-24 h-24 object-contain mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold">{job?.title}</h1>
              <h2 className="text-xl">
                <span className="font-semibold">Tên công ty:</span>{" "}
                {job?.company?.name}
              </h2>
              <div className="flex items-center mb-4">
                <LocationOn className="mr-2" />
                <span>{job?.addressCompany?.address}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded h-10 w-56"
              onClick={showModal}
            >
              Cập Nhật Thông Tin
            </Button>
          </div>
        </div>

        <div className="flex justify-between p-6">
          <div className="w-8/12">
            <div className="bg-white p-4 rounded-md shadow-md">
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Job Description</h2>
<p className="whitespace-pre-wrap break-words ">
                  {job?.description}
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                <p className="whitespace-pre-wrap break-words  ">
                  {job?.requirements}
                </p>
              </section>
            </div>
          </div>

          <div className="w-1/4">
            <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center mb-6 ">
              <div className="flex items-center">
                <MonetizationOn className="text-red-500 mr-2" />
                <div>
                  <h3 className="text-xl font-semibold text-green-500">
                    {job?.salary}
                  </h3>
                  <p className="text-sm text-gray-500">Yearly salary</p>
                </div>
              </div>
              <div className="flex items-center">
                <LocationOn className="text-red-500 mr-2" />
                <div>
                  <h3 className="text-lg font-semibold">
                    {job?.addressCompany?.location?.nameCity}
                  </h3>
                  <p className="text-sm text-gray-500">Job Location</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Event className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">Job Posted</h3>
                    <p className="text-sm text-gray-500">
                      {job?.createdAt
                        ? formatDate(job.createdAt)
                        : "Date not available"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <AccessTime className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">Job Expire in</h3>
                    <p className="text-sm text-gray-500">{job?.expireAt}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Work className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">Job Level</h3>
                    {/* Display job levels here */}
                    <ul className="list-disc pl-4">
                      {job?.levelJobs?.map((levelJob) => (
                        <li key={levelJob.id} className="text-sm text-gray-500">
                          {levelJob.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
<div className="flex items-center">
                  <MonetizationOn className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">Salary</h3>
                    <p className="text-sm text-gray-500">{job?.salary}</p>
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

        <div className="p-6">
          <h2 className="text-3xl font-bold">Candidates</h2>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {jobCandidates?.map((candidate, index) => (
              <CardItemCandidates
                id={index}
                name={candidate.name}
                role={candidate.role}
                createdAt={candidate.createdAt}
email={candidate.account.email}
                avatar={candidate.avatar}
                address={candidate.address}
                gender={candidate.gender}
                phone={candidate.phone}
              />
            ))}
          </div>
        </div>
      </div>

      <JobEditModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        job={job}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default JobDetailBusiness;