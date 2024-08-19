import React from "react";
import { Avatar, Button, Card, Tag } from "antd";
import { AntDesignOutlined, EnvironmentOutlined } from "@ant-design/icons";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useNavigate } from "react-router-dom";
export default function CandidateCard({ avatar,name,position,linkedin,email,id,address}) {
  const navigate = useNavigate()

  return (
    <Card
    onClick={() => navigate(`/company/candidate/detail/${id}`)}
      hoverable
      className="w-full flex flex-col justify-between pl-12 pt-4 pb-4"
      bodyStyle={{
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <div className="flex items-center mt-2">
        <Avatar
          size={{ xs: 32, sm: 40, md: 48, lg: 72, xl: 96, xxl: 120 }}
          icon={<AntDesignOutlined />}
          src={avatar}
        />
        <div className="ml-1">
          <p className="text-3xl font-semibold">{name}<Tag className="ml-4 text-lg" color="red">{position}</Tag></p>
          <p className="text-gray-500 text-lg">
            <EnvironmentOutlined /> {address}
          </p>
        </div>
      </div>
      <div><p className="text-gray-500 text-lg"><EmailIcon/>: {email}</p></div>
      <div><p className="text-gray-500 text-lg"><LinkedInIcon/>: {linkedin}</p></div>
      <Button onClick={() => navigate(`/company/candidate/detail/${id}`)} danger className="mt-3">Xem chi tiết </Button>
    </Card>
  );
}
