import React, { useEffect, useState } from "react";
import { Card, Button, Tag, Row, Col, Divider, List, Avatar } from "antd";
import { PhoneOutlined, MailOutlined } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import "tailwindcss/tailwind.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCandidateInfo } from "../../service/companyService";
import Skill from "../candidateinformation/Skill";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [candidateInfo, setCandidateInfo] = useState();
  useEffect(() => {
    dispatch(getCandidateInfo(id)).then((res) => {
      console.log(res);
      setCandidateInfo(res.payload.data);
      window.scrollTo(0, 0);
    });
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <Card className="w-screen rounded-lg shadow-lg p-0 bg-white overflow-hidden">
        <div className="flex flex-col justify-center items-center">
          <Avatar
            size={100}
            src={candidateInfo?.avatar}
            alt="Avatar"
            className="mb-4 p-0"
          />
          <div>
            <h1 className="text-center text-2xl font-bold">
              {candidateInfo?.name}
            </h1>
            <p className="text-center text-green-500 mb-4">
              {candidateInfo?.position}
            </p>
          </div>
          <Button
            type="primary"
            shape="round"
            className="bg-red-500 border-none w-44 mx-auto"
          >
            Đặt Lịch Phỏng Vấn
          </Button>
        </div>

        <Row className="w-full" gutter={16}>
          {/* Cột trái */}
          <Col xs={24} md={13} className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">Mô tả về bản thân</h1>
            </div>
            <p className="text-gray-700 mb-6">{candidateInfo?.aboutme}</p>

            <h2 className="text-xl font-bold">Học vấn</h2>
            <List
              size="small"
              dataSource={candidateInfo?.edu}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              className="text-gray-700 mb-6"
            />
            <h2 className="text-xl font-bold">Kinh nghiệm làm việc</h2>
            <List
              size="small"
              dataSource={candidateInfo?.exp}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              className="text-gray-700 mb-6"
            />
            <h2 className="text-xl font-bold">Dự án</h2>
            <List
              size="small"
              dataSource={candidateInfo?.project}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              className="text-gray-700 mb-6"
            />
          </Col>
          <Col xs={24} md={4} />
          {/* Cột phải */}
          <Col xs={24} md={6} className=" p-6">
            <div className="flex flex-col gap-10">
              <Card>
                <h2 className="text-lg font-semibold">Địa chỉ cá nhân</h2>
                <p className="text-gray-600 mb-4">
                  <MapIcon className="mr-2" /> {candidateInfo?.address}
                </p>
                <h2 className="text-lg font-semibold">Thông tin liên hệ</h2>
                <p>
                  <PhoneOutlined className="mr-2" /> {candidateInfo?.phone}
                </p>
                <p>
                  <MailOutlined className="mr-2" /> {candidateInfo?.email}
                </p>
              </Card>
              <Card>
                <h2 className="text-lg font-semibold">Kỹ năng</h2>
                <div className="space-y-2 mb-4">
                  {candidateInfo?.skills.map((skill) => (
                    <Tag color="green">{skill}</Tag>
                  ))}
                </div>

                <h2 className="text-lg font-semibold">Chứng chỉ</h2>
                <div className="space-y-2 mb-4">
                  {candidateInfo?.certi.map((certi) => (
                    <Tag color="blue">{certi}</Tag>
                  ))}
                </div>
              </Card>
              <Card>
                <h2 className="text-lg font-semibold">Thông tin cá nhân</h2>
                <div className="flex gap-3">
                  <a href={candidateInfo?.linkLinkedin}>
                    <LinkedInIcon />
                  </a>
                  <a href={candidateInfo?.linkGit}>
                    <GitHubIcon />
                  </a>
                  <a href="#">
                    <FacebookIcon />
                  </a>
                  <a href="#">
                    <EmailIcon />
                  </a>
                </div>
              </Card>
            </div>

            <Link to={`/company/candidate/cv/${id}`}>
              <Button
                type="primary"
                block
                className="mt-4 bg-red-500 border-none"
              >
                Truy Cập CV
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;
