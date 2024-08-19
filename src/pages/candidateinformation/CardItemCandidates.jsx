import React from "react";
import { Card, Tag, Tooltip } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";

const CardItemCandidates = ({
  id,
  name,
  role,
  createdAt,
  email,
  avatar,
  address,
  gender,
  phone,
}) => {
  const navigate = useNavigate();

  const handleNavigateCandidates = () => {
    navigate(`/company/candidate/detail/${id}`);
  };

  return (
    <Card className="p-4 shadow-md rounded-lg border relative">
      <div className="flex items-center">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{name}</h3>
            </div>
            <Tooltip title="View Details">
              <ArrowRightOutlined
                onClick={handleNavigateCandidates}
                className="text-gray-500 hover:text-gray-800 cursor-pointer"
              />
            </Tooltip>
          </div>

          <div className="mt-2">
            <p className="text-sm font-semibold text-gray-500">Email:</p>
            <Tag color="green" className="mt-1">
              {email}
            </Tag>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm font-semibold text-gray-500">Ngày bắt đầu:</p>
        <Tag color="orange" className="mt-1">
          {createdAt}
        </Tag>
      </div>
      <div className="mt-2 flex items-center text-gray-500">
        <LocationOn className="mr-1" />
        <span>{address}</span>
      </div>
    </Card>
  );
};

export default CardItemCandidates;
