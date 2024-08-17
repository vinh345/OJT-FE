import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@cyntler/react-doc-viewer/dist/index.css";
import { fetchCVById, fetchDefaultCV } from "../../../service/candidateService";
import CVBody from "../../../components/cv/CVBody";

const DefaultCV = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchDefaultCV();

      setProfile(data);
    };
    loadProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return <CVBody profile={profile} />;
};

export default DefaultCV;
