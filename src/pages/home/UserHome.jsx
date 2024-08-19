import React, { useEffect, useState } from "react";
import JobCard from "../job/card/JobCar";
import { useDispatch } from "react-redux";
import {
  getOutStandingCompany,
  getOutStandingJobs,
} from "../../service/permitAllService";
import CompanyCard from "../job/card/CompanyCard";
import { Link } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
export default function UserHome() {
  const [jobData, setJobData] = useState();
  const [companyData, setCompanyData] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOutStandingJobs()).then((res) => {
      setJobData(res.payload.data);
    });
    dispatch(getOutStandingCompany()).then((res) => {
      setCompanyData(res.payload.data);
    });
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* <Banner/> */}
      <div className="container mx-auto p-4 mb-24">
        <div className="flex justify-between items-center">
          <h1 className="  text-4xl font-bold mb-14 mt-28">
            Công việc nổi bật
          </h1>
          <Link to="/job" className="text-red-500">Xem thêm <EastIcon/></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {jobData?.slice(0, 9).map((job, index) => (
            <div key={index} className="flex">
              <JobCard
                id={job.job.id}
                title={job.job.title}
                type={job.typeJob}
                salary={job.job.salary}
                logo={job.job.addressCompany.company.logo}
                company={job.job.addressCompany.company.name}
                location={job.job.addressCompany.address}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <h1 className="  text-4xl font-bold mb-14 mt-28">
            Công ty nổi bật
          </h1>
          <Link to="/user/listCompany" className="text-red-500">Xem thêm <EastIcon/></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {companyData?.slice(0, 9).map((comp, index) => (
            <div key={index} className="flex">
              <CompanyCard
                id={comp.id}
                logo={comp.logo}
                company={comp.name}
                website={comp.website}
                type={comp.typeCompany.name}
                email={comp.emailCompany}
                phone={comp.phone}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
