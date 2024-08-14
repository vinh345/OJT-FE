import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LocationOn, Group } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getCompanyDetail } from "../../../service/companyService";
import { FAILED, PENDING, IDLE } from "../../../constants/status";
import { getListJob } from "../../../service/jobService";
import { getRelatedCompanies } from "../../../service/companyService";
import JobCardItem from "../../job/JobCardItem";
import CompanyCardItem from "./CompanyCardItem";

export default function CompanyDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Lấy thông tin chi tiết công ty
  const {
    data: company,
    loading: companyLoading,
    error: companyError,
  } = useSelector((state) => state.companyDetail);

  // Lấy danh sách việc làm liên quan
  const {
    data: jobs,
    loading: jobLoading,
    error: jobError,
  } = useSelector((state) => state.jobs);

  // Lấy danh sách công ty cùng lĩnh vực
  const {
    data: relatedCompanies,
    loading: relatedCompaniesLoading,
    error: relatedCompaniesError,
  } = useSelector((state) => state.relatedCompanies);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    dispatch(getCompanyDetail(id));
    dispatch(getRelatedCompanies(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (jobLoading[0] === IDLE) {
      dispatch(
        getListJob({
          title: searchTitle,
          nameCity: searchLocation,
        })
      );
    }
  }, [dispatch, jobLoading, searchTitle, searchLocation]);

  const handleSearch = () => {
    dispatch(getListJob({ title: searchTitle, nameCity: searchLocation }));
  };

  if (companyLoading === PENDING) return <p>Loading company details...</p>;
  if (companyLoading === FAILED) return <p>Error: {companyError}</p>;

  return (
    <div className="p-6">
      {company ? (
        <>
          {/* Company Header */}
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
                style={{ fontSize: "40px" }}
                className="text-red-500 bg-red-200"
              />
              <button className="bg-red-500 text-white px-4 py-2 rounded h-10 w-56">
                Follow
              </button>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex justify-between">
            <div className="w-8/12">
              {/* Company Description and Policy */}
              <div className="bg-white p-4 rounded-md shadow-md mb-6">
                <section className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="whitespace-pre-wrap break-words">
                    {company.description}
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold mb-2">Policy</h2>
                  <p className="whitespace-pre-wrap break-words">
                    {company.policy}
                  </p>
                </section>
              </div>

              {/* Job Listings Section */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Job Openings</h2>
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
                <div className="grid grid-cols-2 gap-4">
                  {jobLoading[0] === "pending" && <p>Loading jobs...</p>}
                  {jobLoading[0] === "failed" && <p>Error: {jobError}</p>}
                  {jobs?.content?.length ? (
                    jobs.content.map((job) => (
                      <div key={job.id}>
                        <JobCardItem job={job} />
                      </div>
                    ))
                  ) : (
                    <p>No jobs found.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-1/4">
              <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <LocationOn className="text-red-500 mr-2" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-500">
                      {company.address}
                    </h3>
                    <p className="text-sm text-gray-500">Địa chỉ công ty</p>
                  </div>
                </div>
              </div>

              {/* Company Overview Section */}
              <div className="bg-white p-4 rounded-md shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Group className="text-red-500 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold">Followers</h3>
                      <p className="text-sm text-gray-500">
                        {company.followers}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <LocationOn className="text-red-500 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold">City</h3>
                      <p className="text-sm text-gray-500">
                        {company.nameCity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <LocationOn className="text-red-500 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold">Address</h3>
                      <p className="text-sm text-gray-500">{company.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <LocationOn className="text-red-500 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold">Map</h3>
                      <p className="text-sm text-gray-500">
                        <a
                          href={company.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on map
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Companies Section */}
          <div className="mt-10">
            <h2 className="text-3xl font-bold">Công ty cùng lĩnh vực</h2>
            {relatedCompaniesLoading === PENDING && (
              <p>Loading related companies...</p>
            )}
            {relatedCompaniesLoading === FAILED && (
              <p>Error: {relatedCompaniesError}</p>
            )}
            {relatedCompanies.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {relatedCompanies.map((relatedCompany) => (
                  <CompanyCardItem
                    key={relatedCompany.id}
                    company={relatedCompany}
                  />
                ))}
              </div>
            ) : (
              <p>No related companies found.</p>
            )}
          </div>
        </>
      ) : (
        <p>No company found with the specified ID.</p>
      )}
    </div>
  );
}
