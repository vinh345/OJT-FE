import React, { useEffect, useState } from "react";
import { fetchProfile } from "../../service/adminService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatData";

import {
  CopyAll,
  LinkedIn,
  GitHub,
  Favorite,
  NearMe,
  AutoStories,
  AccountBox,
} from "@mui/icons-material";
import NotFoundPage from "../404/NotFoundPage";

const CandidateProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile(id);
      console.log(data);

      setProfile(data);
    };
    loadProfile();
  }, [id]);

  if (!profile) {
    return <NotFoundPage />;
  }

  const copyLink = () => {
    const links = {};
    if (profile.linkLinkedin)
      links.linkedin = `https://${profile.linkLinkedin}`;
    if (profile.linkGit) links.github = `https://${profile.linkGit}`;
    const linkText = Object.values(links).join("\n");
    navigator.clipboard.writeText(linkText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-center">
      <div className="container bg-white max-w-screen-lg mx-auto p-8 shadow-md my-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex p-8 items-center justify-start gap-2">
            <img src={profile.avatar} alt={profile.name} className="w-28" />
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              {(profile.position || profile.level) && (
                <div className="mt-2">
                  {profile.position && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm mr-2">
                      {profile.position}
                    </span>
                  )}
                  {profile.level && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                      {profile.level}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-pink-200 p-2 rounded">
              <Favorite className="text-white" />
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">
              Đặt Lịch Phỏng Vấn
            </button>
          </div>
        </div>
        <div className=" p-8 rounded-lg flex">
          {/* Left Section */}
          <div className="w-2/3 pr-8">
            {profile.about && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Mô tả về bản thân</h2>
                <p className="mt-2 text-justify text-gray-500">
                  {profile.about}
                </p>
              </div>
            )}

            {/* Uncomment if needed */}
            {profile.experience.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Kinh nghiệm làm việc</h2>
                <div className="list-disc ml-5 mt-2">
                  {profile.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="mt-2 p-4 bg-white bg-opacity-10 rounded-lg"
                    >
                      <div className="flex justify-between text-lg font-bold">
                        <div className="text-yellow-500">{exp.company}</div>
                        <div className="text-red-500">{exp.position}</div>
                      </div>
                      {exp.startAt && exp.endAt && (
                        <div className="text-sm italic">
                          {formatDate(exp.startAt)} - {formatDate(exp.endAt)}
                        </div>
                      )}
                      <div className="mt-2 text-gray-500">{exp.info}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.careerOrientation && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Định hướng phát triển</h2>
                <ul className="list-disc ml-5 mt-2">
                  {profile.careerOrientation.map((item, index) => (
                    <li key={index} className="mt-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {profile.letter && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Định hướng phát triển</h2>
                <p>{profile.letter}</p>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="w-1/3 pl-8">
            {profile.address && (
              <div className="border-2 border-gray-200 p-4 rounded-lg mb-6">
                <div className="flex gap-2">
                  <NearMe className="text-red-600 p-1 border-2 border-red-400 rounded-full" />
                  <h3 className="font-semibold">Địa chỉ cá nhân</h3>
                </div>
                <p className="mt-2">{profile.address}</p>
              </div>
            )}

            {/* Uncomment if needed */}
            {profile.skills.length > 0 && (
              <div className="border-2 border-gray-200 p-4 rounded-lg mb-6">
                <div className="flex gap-2">
                  <AutoStories className="text-red-600 p-1 " />
                  <h3 className="font-semibold">Kĩ năng</h3>
                </div>
                <ul className="mt-2 flex gap-2">
                  {profile.skills.map((skill, index) => (
                    <li
                      key={index}
                      className="mt-1 pl-2 pr-2 font-medium bg-green-200 text-green-800"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-2 border-gray-200 p-4 rounded-lg mb-6">
              <h3 className="font-semibold">Thông tin cá nhân</h3>
              <ul className="mt-2 flex gap-2">
                <li
                  className="flex items-center mt-2 hover:cursor-pointer bg-red-300 p-2 rounded-xl "
                  onClick={copyLink}
                >
                  <CopyAll /> Copy links
                </li>
                {profile.linkLinkedin && (
                  <li className="flex items-center justify-center mt-2  bg-red-300 p-2 rounded-xl">
                    <a
                      href={`https://${profile.linkLinkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedIn className="mr-2" />
                    </a>
                  </li>
                )}
                {profile.linkGit && (
                  <li className="flex items-center mt-2 justify-center bg-red-300 p-2 rounded-xl">
                    <a
                      href={`https://${profile.linkGit}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHub className="mr-2" />
                    </a>
                  </li>
                )}
              </ul>
              {copied && (
                <div className="text-green-500 mt-2 text-sm">
                  Sao chép thành công!
                </div>
              )}
            </div>

            <div className="border-2 border-gray-200 p-4 rounded-lg mb-6 flex flex-col gap-3">
              <div className="text-left flex gap-2">
                <AccountBox className="mr-2" fontSize="large" />
                <p className="font-medium">
                  Truy cập CV của {profile.name} để xem thêm
                </p>
              </div>
              <div className="flex align-middle justify-center">
                <Link to={`/admin/candidateCV/${id}`}>
                  <button className="bg-red-600 p-4 text-white rounded-lg">
                    Truy cập CV
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
