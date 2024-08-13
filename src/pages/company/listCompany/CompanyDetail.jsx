import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompanyDetail } from "../../../service/companyService";
import { FAILED, PENDING } from "../../../constants/status";
import {
  LocationOn,
  MonetizationOn,
  Group,
  Language,
} from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function CompanyDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: company,
    loading,
    error,
  } = useSelector((state) => state.companyDetail);

  useEffect(() => {
    dispatch(getCompanyDetail(id));
  }, [dispatch, id]);

  if (loading === PENDING) return <p>Loading company details...</p>;
  if (loading === FAILED) return <p>Error: {error}</p>;

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
              <BookmarkBorderIcon
                style={{ fontSize: "40px" }}
                className="text-red-500 bg-red-200"
              />
              <button className="bg-red-500 text-white px-4 py-2 rounded h-10 w-56">
                Follow
              </button>
            </div>
          </div>

          {/* Company Details Section */}
          <div className="flex justify-between">
            <div className="w-8/12">
              {/* Company Description and Policy */}
              <div className="bg-white p-4 rounded-md shadow-md">
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
        </>
      ) : (
        <p>No company details found.</p>
      )}
    </div>
  );
}
