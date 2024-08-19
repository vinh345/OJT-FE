import React, { useEffect, useState } from "react";
import Banner from "../../layouts/banner/HomeBanner";
import { Cookies } from "react-cookie";
import CompanyHome from "./CompanyHome";
import UserHome from "./UserHome";
import Testimonial from "./Testimonial";
import PublicHome from "./PublicHome";
import ProfilePage from "../company/CandidateInfo";


export default function Home() {
  const cooke = new Cookies();
  return (
    <>
      <Banner />
      <div className="bg-white mt-28">
        {cooke.get("role") === "ROLE_CANDIDATE" ? (
          <UserHome />
        ) : cooke.get("role") === "ROLE_COMPANY" ? (
          <CompanyHome />
        ) : (
          <PublicHome />
        )}
      </div>
      <Testimonial />
      {/* <ProfilePage/> */}
    </>
  );
}
