import React, { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import InfoSection from "./AboutMe";
import SideBar from "./SideBar";
import "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateInfo } from "../../service/candidateService";
import Certificate from "./Certificate";
import Education from "./Education";
import Experience from "./Experience";
import Project from "./Project";
import Skill from "./Skill";
import AboutMe from "./AboutMe";
import FormEditInfo from "./form/FormEditInfo";
import FormEditAboutMe from "./form/FormEditAboutMe";
import FormAddEducation from "./form/education/FormAddEducation";
export default function index() {
  const [toggleDelete, setToggleDelete] = useState()
  const changeDelete = () =>{
    setToggleDelete(!toggleDelete)
  }
  /////////////////////////////////Edit Info
  const [isModalEditInfoOpen, setIsModalEditInfoOpen] = useState(false);
  const showModalEditInfo = () => {
    setIsModalEditInfoOpen(!isModalEditInfoOpen);
  };
  ////////////////////////////////Edit About Me
  const [isModalEditAboutMeOpen, setIsModalEditAboutMeOpen] = useState(false);
  const showModalEditAboutMe = () => {
    setIsModalEditAboutMeOpen(!isModalEditAboutMeOpen);
  };
  ////////////////////////////////Education
  const [isModalAddEduOpen, setIsModalAddEduOpen] = useState(false);

  const showModalAddEduOpen = () => {
    setIsModalAddEduOpen(!isModalAddEduOpen);
  };
  const [isModalEditEduOpen, setIsModalEditEduOpen] = useState(false);

  const showModalEditEduOpen = () => {
    setIsModalEditEduOpen(!isModalEditEduOpen);
  };
  ////////////////////////////////Experience
  const [isModalAddExpOpen, setIsModalAddExpOpen] = useState(false);

  const showModalAddExpOpen = () => {
    setIsModalAddExpOpen(!isModalAddExpOpen);
  };
  const [isModalEditExpOpen, setIsModalEditExpOpen] = useState(false);

  const showModalEditExpOpen = () => {
    setIsModalEditExpOpen(!isModalEditExpOpen);
  }
  ////////////////////////////////
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.userInfor);
  useEffect(() => {
    dispatch(getCandidateInfo()).then((res) => {
      console.log(res.payload.data.data);
    });
  }, [isModalEditExpOpen,isModalAddExpOpen,isModalEditInfoOpen,isModalEditAboutMeOpen,isModalAddEduOpen,isModalEditEduOpen,toggleDelete]);
  return (
    <>
      <FormEditInfo
        isModalEditInfoOpen={isModalEditInfoOpen}
        showModalEditInfo={showModalEditInfo}
        info={data?.candidate}
      />
      <FormEditAboutMe  
        isModalEditAboutMeOpen={isModalEditAboutMeOpen}
        showModalEditAboutMe={showModalEditAboutMe}
        data={data?.candidate?.aboutme}
      />
  
      <div className="container mx-auto p-4 grid grid-cols-10 gap-4 ">
        <div className="col-span-4">
          <SideBar />
        </div>
        <div className="col-span-6 flex flex-col gap-10">
          <ProfileSection
            showModalEditInfo={showModalEditInfo}
            info={data?.candidate}
          />
          <AboutMe
            title="Giới Thiệu Bản Thân"
            content="Nội dung giới thiệu bản thân"
            data={data?.candidate?.aboutme}
            showModalEditAboutMe={showModalEditAboutMe}
          />
          <Education
            title="Học Vấn"
            content="Nội dung học vấn"
            data={data?.education}
            isModalAddEduOpen={isModalAddEduOpen}
            showModalAddEduOpen={showModalAddEduOpen}
            isModalEditEduOpen={isModalEditEduOpen}
            showModalEditEduOpen={showModalEditEduOpen}
            changeDelete={changeDelete}
          />
          <Experience
            title="Kinh Nghiệm Làm Việc"
            content="Nội dung kinh nghiệm làm việc"
            data={data?.experience}
            isModalAddExpOpen={isModalAddExpOpen}
            showModalAddExpOpen={showModalAddExpOpen}
            isModalEditExpOpen={isModalEditExpOpen}
            showModalEditExpOpen={showModalEditExpOpen}
            changeDelete={changeDelete}
          />
          <Project
            title="Dự Án Cá Nhân"
            content="Nội dung dự án cá nhân"
            data={data?.project}
          />
          <Certificate
            title="Chứng Chỉ"
            content="Nội dung chứng chỉ"
            data={data?.certificate}
          />
          <Skill
            title="Kỹ Năng"
            content="Nội dung chứng chỉ"
            data={data?.skillsCandidates}
          />
        </div>
      </div>
    </>
  );
}
