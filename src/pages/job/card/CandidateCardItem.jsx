import React from "react";
import { Card } from "@mui/material";
import { EnvironmentOutlined } from "@ant-design/icons";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Avatar, Badge } from "antd";
import { EmailOutlined } from "@mui/icons-material";

const CandidateCardItem = ({ candidate }) => {
  if (!candidate) {
    return null;
  }

  const avatar =
    candidate.avatar ||
    "https://sohanews.sohacdn.com/160588918557773824/2024/3/29/photo-7-17116917864761999588629-1711694813016-1711694813242419126640.jpg";
  const candidateName = candidate.name || "No company name specified";
  const cityName = candidate.address || "No location specified";

  return (
    <Card className="border rounded-lg shadow-sm p-4">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">
            {candidate.name || "No title available"}
          </h6>
          <div className="flex items-center mb-2">
            <p className="text-gray-500">
              Position: {candidate.position || "No salary specified"}
            </p>
          </div>
        </div>
        <BookmarkBorderIcon className="text-gray-500" />
      </div>
      <div className="flex items-center mt-2">
        <Avatar
        size={100}
          src={avatar}
          alt="company logo"
          className="w-10 h-10 mr-2"
          onError={(e) => {
            e.target.src =
              "https://cafefcdn.com/203337114487263232/2023/3/13/photo-7-167869696182725217650.jpg";
          }}
        />
        <div className="flex flex-col gap-4"> 
          <div className="flex items-center">
            <EmailOutlined className="text-gray-500 mr-2" />
            <span className="text-gray-500">{candidate.account.email}</span>
          </div>
          <div className="flex items-center">
            <EnvironmentOutlined className="text-gray-500 mr-2" />
            <span className="text-gray-500">{cityName}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CandidateCardItem;
