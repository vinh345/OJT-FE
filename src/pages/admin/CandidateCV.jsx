import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCandidateCV } from "../../service/adminService";
import CVBody from "../../components/cv/CVBody";

const CandidateCV = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchCandidateCV(id);

      setProfile(data);
    };
    loadProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return <CVBody profile={profile} />;
};

export default CandidateCV;
