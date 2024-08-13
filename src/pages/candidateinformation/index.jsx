import React, { useEffect } from "react";
import ProfileSection from "./ProfileSection";
import InfoSection from "./AboutMe";
import SideBar from "./SideBar";
import "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateInfo } from "../../service/userService";
import Certificate from "./Certificate";
import Education from "./Education";
import Experience from "./Experience";
import Project from "./Project";
import Skill from "./Skill";
import AboutMe from "./AboutMe";

export default function index() {
    const dispatch = useDispatch()
    const {data,error} = useSelector((state) => state.userInfor)
    useEffect(()=>{
        dispatch(getCandidateInfo()).then(res=>{
            console.log(res.payload.data.data)
        });
    },[])
  return (
    <>
      <div className="container mx-auto p-4 grid grid-cols-10 gap-4 ">
        <div className="col-span-4">
          <SideBar />
        </div>
        <div className="col-span-6 flex flex-col gap-10">
          <ProfileSection info={data?.candidate}/>
          <AboutMe
            title="Giới Thiệu Bản Thân"
            content="Nội dung giới thiệu bản thân"
            data={data?.candidate?.aboutme}
          />
          <Education title="Học Vấn" content="Nội dung học vấn" data={data?.education}/>
          <Experience
            title="Kinh Nghiệm Làm Việc"
            content="Nội dung kinh nghiệm làm việc"
            data={data?.experience}
          />
          <Project title="Dự Án Cá Nhân" content="Nội dung dự án cá nhân" data={data?.project} />
          <Certificate title="Chứng Chỉ" content="Nội dung chứng chỉ" data={data?.certificate}/>
          <Skill title="Kỹ Năng" content="Nội dung chứng chỉ" data={data?.skillsCandidates}/>
        </div>
      </div>
    </>
  );
}
