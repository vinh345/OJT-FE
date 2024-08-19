import React from "react";
import { Avatar, Button, Card, Tag } from "antd";
import { AntDesignOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function JobCard({
  title,
  type,
  salary,
  company,
  location,
  logo,
  id,
}) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`jobDetail/${id}`)}
      hoverable
      className="w-full flex flex-col justify-between pl-12 pt-4 pb-4"
      bodyStyle={{
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold mb-3 ">
          <b>{title}</b>
        </h3>
        <Tag className="text-base mb-3" color={"green"}>
          {type}
        </Tag>
        <p className="text-gray-500 mt-1 text-base">Salary: ${salary}</p>
      </div>
      <div className="flex items-center mt-2">
        <Avatar
          size={{ xs: 32, sm: 40, md: 48, lg: 72, xl: 96, xxl: 120 }}
          icon={<AntDesignOutlined />}
          src={logo}
        />
        <div className="ml-1">
          <p className="text-xl font-semibold">{company}</p>
          <p className="text-gray-500 text-lg">
            <EnvironmentOutlined /> {location}
          </p>
        </div>
      </div>
      <Button onClick={() => navigate(`jobDetail/${id}`)} danger className="mt-3">
        Xem chi tiết
      </Button>
    </Card>
  );
}
