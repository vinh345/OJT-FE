import React from "react";
import { Card } from "@mui/material";
import { EnvironmentOutlined } from "@ant-design/icons";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Badge } from "antd";

const JobCardItem = ({ job, handleClick }) => {
  if (!job) {
    return null;
  }
const companyNameNew = job?.addressCompany.company.name
  const {
    title,
    company: { logo: companyLogo, name: companyName } = {},
    addressCompany: { address, location: { nameCity: city } = {} } = {},
    salary,
    typeJob,
  } = job;

  return (
    <Card
      className="border rounded-lg shadow-sm p-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{title || "No title available"}</h6>
          <div className="flex items-center mb-2">
            {typeJob && typeJob.length > 0 ? (
              typeJob.map((type, index) => (
                <Badge
                  key={index}
                  count={type}
                  style={{ backgroundColor: "#52c41a", marginRight: "8px" }}
                />
              ))
            ) : (
              <Badge
                count="Full-Time"
                style={{ backgroundColor: "#52c41a", marginRight: "8px" }}
              />
            )}
            <p className="text-gray-500 ml-4">
              Salary: {salary || "No salary specified"}
            </p>
          </div>
        </div>
        <BookmarkBorderIcon className="text-gray-500" />
      </div>
      <div className="flex items-center mt-2">
        <img
          src={
            companyLogo ||
            "https://sohanews.sohacdn.com/160588918557773824/2024/3/29/photo-7-17116917864761999588629-1711694813016-1711694813242419126640.jpg"
          }
          alt="company logo"
          className="w-10 h-10 mr-2"
          onError={(e) => {
            e.target.src =
              "https://cafefcdn.com/203337114487263232/2023/3/13/photo-7-167869696182725217650.jpg";
          }}
        />
        <div>
          <p className="font-semibold">
            {companyNameNew || "No company name specified"}
          </p>
          <div className="flex items-center">
            <EnvironmentOutlined className="text-gray-500 mr-2" />
            <span className="text-gray-500">
              {city || "No location specified"}
            </span>
          </div>
          <p className="text-gray-500">{address || "No address specified"}</p>
        </div>
      </div>
    </Card>
  );
};

export default JobCardItem;
