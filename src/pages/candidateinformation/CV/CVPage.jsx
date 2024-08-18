import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@cyntler/react-doc-viewer/dist/index.css";
import { fetchCVById, fetchDefaultCV } from "../../../service/candidateService";
import CVBody from "../../../components/cv/CVBody";

const CVPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      var data;
      if (id === "default") {
        data = await fetchDefaultCV();
      } else {
        data = await fetchCVById(id);
      }

      setProfile(data);
    };
    loadProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return <CVBody profile={profile} />;
};

export default CVPage;
