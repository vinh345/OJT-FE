import React, { useEffect, useState } from "react";
import { fetchProfile } from "../../service/companyService";
import { useParams } from "react-router-dom";
import {
  HeartBroken,
  CopyAll,
  LinkedIn,
  GitHub,
  MonitorHeart,
  Favorite,
} from "@mui/icons-material";

const CandidateProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [copied, setCopied] = useState(false);
  //   useEffect(() => {
  //     const loadProfile = async () => {
  //       const data = await fetchProfile(id);
  //       console.log(data);
  //       setProfile(data);
  //     };
  //     loadProfile();
  //   }, [id]);

  //   if (!profile) {
  //     return <div>Loading...</div>;
  //   }

  useEffect(() => {
    const loadProfile = async () => {
      // Mock profile data for testing
      const testProfile = {
        name: "Hung",
        position: "Software Engineer",
        level: "Senior",
        about: "Hello my name is Lorem.",
        address: "HN",
        experience: ["3 years at Company A", "2 years at Company B"],
        careerOrientation: ["Become a team lead", "Specialize in AI"],
        skills: ["JavaScript", "React", "Node.js"],
        linkLinkedin: "linkedin.com",
        linkGit: "github.com",
      };

      // Simulating data fetching by using the test profile instead
      // const data = await fetchProfile(id);
      const data = testProfile;
      console.log(data);
      setProfile(data);
    };
    loadProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
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
    <div className="container bg-white mx-auto p-8">
      <div className="flex p-8 items-center justify-between">
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
        <div className="flex gap-3">
          <button className="text-pink-400">
            <Favorite />
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full">
            Đặt Lịch Phỏng Vấn
          </button>
        </div>
      </div>
      <div className=" p-8 rounded-lg shadow-md flex">
        {/* Left Section */}
        <div className="w-3/4 pr-8">
          {profile.about && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Mô tả về bản thân</h2>
              <p className="mt-2 text-justify">{profile.about}</p>
            </div>
          )}

          {/* Uncomment if needed */}
          {profile.experience && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Kinh nghiệm làm việc</h2>
              <ul className="list-disc ml-5 mt-2">
                {profile.experience.map((exp, index) => (
                  <li key={index} className="mt-2">
                    {exp}
                  </li>
                ))}
              </ul>
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
        </div>

        {/* Right Section */}
        <div className="w-1/4 pl-8">
          {profile.address && (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="font-semibold">Địa chỉ cá nhân</h3>
              <p className="mt-2">{profile.address}</p>
            </div>
          )}

          {/* Uncomment if needed */}
          {profile.skills && (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="font-semibold">Kĩ năng</h3>
              <ul className="mt-2">
                {profile.skills.map((skill, index) => (
                  <li key={index} className="mt-1">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold">Thông tin cá nhân</h3>
            <ul className="mt-2 flex gap-2">
              <li
                className="flex items-center mt-2 hover:cursor-pointer bg-red-300 p-2 rounded-xl "
                onClick={copyLink}
              >
                <CopyAll /> Copy links
              </li>
              {profile.linkLinkedin && (
                <li className="flex items-center mt-2  bg-red-300 p-2 rounded-xl">
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
                <li className="flex items-center mt-2  bg-red-300 p-2 rounded-xl">
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
                Copied successfully!
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded-full w-full">
              Truy Cập CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
