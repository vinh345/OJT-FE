import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCandidateCV } from "../../service/adminService";
import CVBody from "../../components/cv/CVBody";
import NotFoundPage from "../404/NotFoundPage";

const CandidateCV = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchCandidateCV(id);
      setProfile(data);
    };
    loadProfile();
  }, [id]);

  if (!profile) {
    return <NotFoundPage/>;
  }

  return <CVBody profile={profile} />;
};

export default CandidateCV;
