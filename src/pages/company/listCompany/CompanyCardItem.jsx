import React from "react";
import { Button, Badge } from "antd";
import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CompanyCardItem = ({ company }) => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  // Kiểm tra nếu company là undefined hoặc null
  if (!company) {
    return null; // Hoặc trả về một component placeholder
  }
  // Hàm điều hướng đến trang chi tiết công ty
  const handleOpenPosition = () => {
    navigate(`/user/company/detail/${company.id}`);
  };
  return (
    <Card className="border rounded-lg shadow-sm p-4">
      <div className="flex items-center">
        <img
          src={company.logo || "https://via.placeholder.com/48"}
          alt="company logo"
          className="w-12 h-12"
        />
        <div className="ml-4 flex-grow">
          <div className="flex items-center justify-between">
            <h6 className="font-semibold">
              {company.name || "No name available"}
            </h6>
            <Badge
              count={`${company.followers || 0} Followers`}
              style={{ backgroundColor: "#f50" }}
            />
          </div>
          <div className="flex items-center mt-2">
            <EnvironmentOutlined className="text-gray-500 mr-2" />
            <span className="text-gray-500">
              {company.nameCity || "No address available"}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <GlobalOutlined className="text-gray-500 mr-2" />
            <a href={company.website} className="text-blue-500">
              {company.website || "No website"}
            </a>
          </div>
        </div>
      </div>
      <Button
        type="primary"
        className="mt-4 w-full"
        onClick={handleOpenPosition}
      >
        Open Position
      </Button>
    </Card>
  );
};

export default CompanyCardItem;
