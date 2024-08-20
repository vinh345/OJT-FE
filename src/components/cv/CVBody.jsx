import React, { useState, useEffect } from "react";
import { LinkedIn, GitHub, Home, Phone } from "@mui/icons-material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVDocument from "../../components/download/CVDocument";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { formatDate } from "../../utils/formatData";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function CVBody({ profile }) {
  const [isPDF, setIsPDF] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const name = cookie.get("name");
  const fileName = profile.name
    ? `cv-${profile.name.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`
    : `cv-${name.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

  const getFileTypeFromUrl = (url) => {
    const filename = url.split("/").pop().split("?")[0];
    return filename.split(".").pop().toLowerCase();
  };

  useEffect(() => {
    if (profile.url) {
      const fileType = getFileTypeFromUrl(profile.url);
      const isPdfFile = fileType === "pdf";
      const isDocFile = fileType === "doc" || fileType === "docx";
      setIsPDF(isPdfFile);
      setIsDoc(isDocFile);
      if (isDocFile) {
        setDocs([{ uri: `${profile.url}` }]);
      }
    }
  }, [profile.url]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 rounded-lg shadow-lg ">
      {profile.url ? (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-purple-500">
            Resume / CV
          </h2>
          {isPDF ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={profile.url}
                width="100%"
                height="100%"
                renderMode="svg"
              />
            </Worker>
          ) : (
            <div className="flex flex-col h-screen">
              <DocViewer
                documents={docs}
                initialActiveDocument={docs[0]}
                pluginRenderers={DocViewerRenderers}
                style={{ flex: 1 }}
              />
            </div>
          )}
          <div className="flex align-middle justify-center mt-4">
            <a
              className="bg-red-500 text-white py-2 px-4 rounded hover:cursor-pointer"
              href={profile.url}
            >
              Download CV
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 ">
          <div className="flex rounded-lg shadow-lg p-6  bg-gradient-to-r from-gray-100 via-gray-200 to-gray-500">
            {/* Left Side */}
            <div className="bg-blue-200 w-1/4 p-4 rounded-lg shadow-inner">
              {profile.avatar && (
                <div className="flex items-center justify-center p-4 rounded-lg mb-4">
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="rounded-full shadow-lg border-4 border-white"
                  />
                </div>
              )}
              <h1 className="text-3xl font-semibold text-black text-center mb-4">
                {profile.name}
              </h1>
              <div className="p-2 mb-2">
                <span className="font-semibold text-gray-600">Age: </span>
                {profile.age}
              </div>
              <div className="p-2 mb-2">
                <span className="font-semibold text-gray-600">Gender: </span>
                {profile.gender ? "Male" : "Female"}
              </div>
              {profile.address && (
                <div className="p-2 mb-2 flex items-center">
                  <Home className="text-gray-600 h-5 w-5 mr-2" />
                  <p className="text-gray-600 leading-none">
                    {profile.address}
                  </p>
                </div>
              )}
              {profile.phone && (
                <div className="p-2 mb-2 flex items-center">
                  <Phone className="text-gray-600 h-5 w-5 mr-2" />
                  <p className="text-gray-600 leading-none">{profile.phone}</p>
                </div>
              )}

              {profile.skills.length > 0 && (
                <div className="p-2">
                  <h3 className="text-xl font-semibold text-red-600 mb-2">
                    Skills
                  </h3>
                  <ul className="list-disc pl-5">
                    {profile.skills.map((skill, index) => (
                      <li key={index} className="text-gray-600">
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
                <div className="flex items-center mt-4 p-2">
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
                <div className="flex items-center mt-4 p-2">
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
            {/* Right Side */}

            <div className="w-3/4 p-4">
              {profile.about && (
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold text-blue-500">
                    About
                  </h2>
                  <p className="mt-2 text-gray-700">{profile.about}</p>
                </div>
              )}
              {profile.experience.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold text-green-500">
                    Experience
                  </h2>
                  <div className="list-disc ml-5 mt-2 ">
                    {profile.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="mt-2 p-4 bg-gray-100 rounded-lg"
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

              {profile.projects.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold text-orange-500">
                    Projects
                  </h2>
                  <div className="list-disc pl-5 mt-2">
                    {profile.projects.map((proj, index) => (
                      <div
                        key={index}
                        className="mt-2 p-4 bg-gray-100 rounded-lg"
                      >
                        <div className="font-bold text-lg text-gray-600">
                          {proj.name}
                        </div>
                        <div className="text-sm italic text-gray-500">
                          {formatDate(proj.startAt)} - {formatDate(proj.endAt)}{" "}
                        </div>
                        <div className="mt-2">
                          Link:{" "}
                          <a
                            href={proj.link}
                            className="text-blue-500 underline"
                          >
                            {proj.link}
                          </a>
                        </div>
                        <div className="mt-2 text-gray-700">{proj.info}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profile.educations.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold text-green-500">
                    Education
                  </h2>
                  <ul className="list-disc pl-5 mt-2">
                    {profile.educations.map((edu, index) => (
                      <div
                        key={index}
                        className="mt-2 p-4 bg-gray-100 rounded-lg"
                      >
                        <div className="font-bold text-lg text-yellow-500">
                          {edu.nameEducation}
                        </div>
                        <div className="text-sm italic text-gray-500">
                          {formatDate(edu.startAt)} - {formatDate(edu.endAt)}{" "}
                        </div>
                        <div className="text-gray-700">{edu.info}</div>
                      </div>
                    ))}
                  </ul>
                </div>
              )}

              {profile.certificates && (
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold text-red-500">
                    Certificates
                  </h2>
                  <ul className="list-disc pl-5 mt-2">
                    {profile.certificates.map((cert, index) => (
                      <div
                        key={index}
                        className="mt-2 p-4 bg-gray-100 rounded-lg"
                      >
                        <div className="font-bold italic text-lg text-orange-500">
                          {cert.name}
                        </div>
                        <div className="italic text-sm text-gray-500">
                          {cert.organization}
                        </div>
                        <div className="text-sm italic text-gray-500">
                          {formatDate(cert.startAt)} - {formatDate(cert.endAt)}{" "}
                        </div>
                        <div className="text-gray-700">{cert.info}</div>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex align-middle justify-center mt-4">
            <PDFDownloadLink
              document={<CVDocument profile={profile} />}
              fileName={fileName}
              className="bg-red-500 text-white py-2 px-4 rounded hover:cursor-pointer"
            >
              {({ loading }) =>
                loading ? "Đang tạo file PDF..." : "Download CV"
              }
            </PDFDownloadLink>
          </div>
        </div>
      )}
    </div>
  );
}
