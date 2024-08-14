import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkedIn, GitHub, Home, Phone } from "@mui/icons-material";
import { fetchCandidateCV } from "../../service/adminService";
import { formatDate } from "../../utils/formatData";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVDocument from "../../components/download/CVDocument";

const CandidateCV = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      console.log(id);
      const data = await fetchCandidateCV(id);
      // const data = {
      //   name: "John Doe",
      //   about:
      //     "A passionate software engineer with over 5 years of experience in full-stack development.",
      //   phone: "123-456-7890",
      //   age: 30,
      //   address: "123 Main St, Anytown, USA",
      //   avatar:
      //     "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      //   gender: true,
      //   linkLinkedin: "linkedin.com/in/johndoe",
      //   linkGit: "github.com/johndoe",
      //   certificates: [
      //     {
      //       name: "AWS Certified Solutions Architect",
      //       organization: "Amazon Web Services",
      //       startAt: "2021-01-01",
      //       endAt: "2024-01-01",
      //       info: "Certified in designing and deploying scalable systems on AWS.",
      //     },
      //     {
      //       name: "Certified Kubernetes Administrator",
      //       organization: "Cloud Native Computing Foundation",
      //       startAt: "2020-06-15",
      //       endAt: "2023-06-15",
      //       info: "Expertise in managing Kubernetes clusters.",
      //     },
      //   ],
      //   skills: [
      //     {
      //       name: "JavaScript",
      //       level: "Advanced",
      //     },
      //     {
      //       name: "React",
      //       level: "Advanced",
      //     },
      //     {
      //       name: "Node.js",
      //       level: "Intermediate",
      //     },
      //     {
      //       name: "Docker",
      //       level: "Intermediate",
      //     },
      //   ],
      //   experience: [
      //     {
      //       position: "Senior Software Engineer",
      //       company: "Tech Solutions Inc.",
      //       startAt: "2019-03-01",
      //       endAt: "Present",
      //       info: "Lead a team of 5 engineers in developing scalable web applications.",
      //     },
      //     {
      //       position: "Software Engineer",
      //       company: "Web Innovations LLC",
      //       startAt: "2016-08-01",
      //       endAt: "2019-02-28",
      //       info: "Worked on front-end and back-end development for various client projects.",
      //     },
      //   ],
      //   projects: [
      //     {
      //       name: "E-commerce Platform",
      //       link: "https://github.com/johndoe/ecommerce-platform",
      //       startAt: "2020-05-01",
      //       endAt: "2021-08-01",
      //       info: "Developed a full-stack e-commerce platform using React, Node.js, and MongoDB.",
      //     },
      //     {
      //       name: "Real-time Chat Application",
      //       link: "https://github.com/johndoe/chat-app",
      //       startAt: "2019-01-01",
      //       endAt: "2019-06-01",
      //       info: "Built a real-time chat application with WebSocket, React, and Node.js.",
      //     },
      //   ],
      //   educations: [
      //     {
      //       nameEducation: "University A",
      //       major: "Computer Science",
      //       startAt: "2012",
      //       endAt: "2016",
      //       info: "Graduated with a Bachelor's degree.",
      //     },
      //     {
      //       nameEducation: "University B",
      //       major: "Software Engineering",
      //       startAt: "2017",
      //       endAt: "2019",
      //       info: "Completed a Master's degree.",
      //     },
      //   ],
      // };
      console.log(data);

      setProfile(data);
    };
    loadProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-500 p-8 rounded-lg shadow-lg flex">
        <div className="w-3/4 pr-8">
          {profile.about && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-blue-500">
                MÔ TẢ BẢN THÂN
              </h2>
              <p className="mt-2 text-justify">{profile.about}</p>
            </div>
          )}

          {profile.experience && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-green-500">
                KINH NGHIỆM LÀM VIỆC
              </h2>
              <div className="list-disc ml-5 mt-2 ">
                {profile.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="mt-2 p-4 bg-white bg-opacity-10 rounded-lg"
                  >
                    <div className="flex justify-between text-lg font-bold">
                      <div className="text-yellow-500">{exp.company}</div>
                      <div className="text-red-500">{exp.position}</div>
                    </div>
                    <div className="text-sm italic">
                      {formatDate(exp.startAt)} - {formatDate(exp.endAt)}
                    </div>
                    <div className="mt-2">{exp.info}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.projects && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-orange-500">DỰ ÁN</h2>
              <div className="list-disc ml-5 mt-2">
                {profile.projects.map((proj, index) => (
                  <div
                    key={index}
                    className="mt-2 p-4 bg-white bg-opacity-10 rounded-lg"
                  >
                    <div className="font-bold text-lg text-gray-600">
                      {proj.name}
                    </div>
                    <div className="text-sm italic">
                      {formatDate(proj.startAt)} - {formatDate(proj.endAt)}
                    </div>
                    <div className="mt-2">
                      Link:{" "}
                      <a href={proj.link} className="text-blue-300 underline">
                        {proj.link}
                      </a>
                    </div>
                    <div className="mt-2">{proj.info}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Học vấn */}
          {profile.educations && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-blue-500">HỌC VẤN</h2>
              <ul className="list-disc ml-5 mt-2">
                {profile.educations.map((edu, index) => (
                  <div
                    key={index}
                    className="mt-2 p-4 bg-white bg-opacity-10 rounded-lg flex flex-col gap-2"
                  >
                    <div className="flex justify-between text-lg font-bold">
                      <div className="text-yellow-400 font-bold text-lg">
                        {edu.nameEducation}
                      </div>
                      <div className="text-green-500">{edu.major}</div>
                    </div>
                    <div className="text-gray-800 italic">
                      {formatDate(edu.startAt)} - {formatDate(edu.endAt)}
                    </div>
                    <div className="">{edu.info}</div>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {/* Chứng chỉ */}

          {profile.certificates && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-red-500">CHỨNG CHỈ</h2>
              <ul className="list-disc ml-5 mt-2">
                {profile.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="mt-2 p-4 bg-white bg-opacity-10 rounded-lg flex flex-col gap-2"
                  >
                    <div className="font-bold italic text-lg text-blue-500">
                      {cert.name}
                    </div>
                    <div className="italic font-semibold text-sm">
                      {cert.organization}
                    </div>
                    <div className="text-sm italic">
                      {formatDate(cert.startAt)} - {formatDate(cert.endAt)}
                    </div>
                    <div className="mt-2">{cert.info}</div>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <div className="flex align-middle justify-center">
            <PDFDownloadLink
              document={<CVDocument id={id} />}
              fileName={`cv-${profile.name}.pdf`}
              className="bg-red-500 text-white py-2 px-4 rounded hover:cursor-pointer"
            >
              {({ loading }) =>
                loading ? "Đang tạo file PDF..." : "Download CV"
              }
            </PDFDownloadLink>
          </div>
        </div>

        {/* Góc phải */}
        <div className="bg-gradient-to-b from-green-500 via-blue-200 to-blue-500 w-1/4 pl-8 rounded-lg shadow-inner">
          {profile.avatar && (
            <div className="flex items-center justify-center p-4 rounded-lg mb-4">
              <img
                src={profile.avatar}
                alt="Ảnh"
                className="rounded-full shadow-lg border-4 border-white"
              />
            </div>
          )}
          <h1 className="text-3xl font-semibold text-white text-center mb-4">
            {profile.name}
          </h1>
          <div className="p-4 rounded-lg mb-4 flex items-center">
            <span className="font-semibold text-gray-700">Tuổi: </span>&nbsp;
            {profile.age}
          </div>
          <div className="p-4 rounded-lg mb-4 flex items-center">
            <span className="font-semibold text-gray-700">Giới tính:</span>
            &nbsp;
            {profile.age ? "Nam" : "Nữ"}
          </div>
          {profile.address && (
            <div className="p-4 rounded-lg mb-4 flex items-center">
              <Home className="mr-2 text-gray-800" />
              <p className="text-gray-800">{profile.address}</p>
            </div>
          )}
          {profile.phone && (
            <div className="p-4 rounded-lg mb-4 flex items-center">
              <Phone className="mr-2 text-gray-800" />
              <p className="text-gray-800">{profile.phone}</p>
            </div>
          )}
          {profile.skills && (
            <div className="p-4 rounded-lg mb-4">
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                Kỹ năng
              </h3>
              <ul className="list-disc pl-5">
                {profile.skills.map((skill, index) => (
                  <li key={index} className="text-gray-500 mb-1">
                    {skill.name} -{" "}
                    <span className="font-bold text-red-600">
                      {skill.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {profile.linkLinkedin && (
            <div className="flex items-center mt-4 p-4">
              <LinkedIn className="mr-2" />
              <a
                href={`https://${profile.linkLinkedin}`}
                className="underline text-blue-600"
              >
                {profile.linkLinkedin}
              </a>
            </div>
          )}
          {profile.linkGit && (
            <div className="flex items-center mt-4 p-4">
              <GitHub className="mr-2" />
              <a
                href={`https://${profile.linkGit}`}
                className="underline text-gray-800"
              >
                {profile.linkGit}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateCV;
