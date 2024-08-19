import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getOutStandingCandidate,
} from "../../service/permitAllService";
import EastIcon from '@mui/icons-material/East';
import CandidateCard from "../job/card/CandidateCard";
import { Link } from "react-router-dom";

export default function CompanyHome() {
  const [candidateData, setCandidateData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOutStandingCandidate()).then((res) => {
      setCandidateData(res.payload.data);
    });
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <>
        <div className="container mx-auto p-4 mb-24">
        <div className="flex justify-between items-center">
          <h1 className="  text-4xl font-bold mb-14 mt-28">
            Ứng viên nổi bật
          </h1>
          <Link to="/company/list-candidate" className="text-red-500">Xem thêm <EastIcon/></Link>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {candidateData?.slice(0, 9).map((cand, index) => (
              <div key={index} className="flex">
                <CandidateCard
                  avatar={cand.avatar}
                  name={cand.name}
                  position={cand.position}
                  linkedin={cand.linkLinkedin}
                  email={cand.account.email}
                  id={cand.id}
                  address={cand.address}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
