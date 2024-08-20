import React, { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import AboutMe from "./AboutMe";
import SideBar from "./SideBar";
import "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateInfo } from "../../service/candidateService";
import Certificate from "./Certificate";
import Education from "./Education";
import Experience from "./Experience";
import Project from "./Project";
import Skill from "./Skill";
import FormEditInfo from "./form/FormEditInfo";
import FormEditAboutMe from "./form/FormEditAboutMe";
import FormAddEducation from "./form/education/FormAddEducation";

const Index = () => {
  // State quản lý các modal và toggleDelete
  const [state, setState] = useState({
    isModalEditInfoOpen: false,
    isModalEditAboutMeOpen: false,
    isModalAddEduOpen: false,
    isModalEditEduOpen: false,
    isModalAddExpOpen: false,
    isModalEditExpOpen: false,
    isModalAddPrjOpen: false,
    isModalEditPrjOpen:false,
    isModalAddCertiOpen: false,
    isModalEditCertiOpen:false,
    isModalAddSkillOpen: false,
    isModalEditSkillOpen:false,
    toggleDelete: false
  });

  // Hàm để mở/đóng modal
  const toggleModal = (modalName) => {
    setState(prev => ({
      ...prev,
      [modalName]: !prev[modalName]
    }));
  };

  // Hàm để thay đổi trạng thái toggleDelete
  const changeDelete = () => {
    setState(prev => ({
      ...prev,
      toggleDelete: !prev.toggleDelete
    }));
  };

  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.userInfor);
  const [data, setData] = useState()
  useEffect(() => {
    
    dispatch(getCandidateInfo()).then((res) => {
      console.log(res.payload.data.data);
      setData(res.payload.data.data);
    });
  }, [dispatch, state]);

  return (
    <>
      <FormEditInfo
        isModalEditInfoOpen={state.isModalEditInfoOpen}
        showModalEditInfo={() => toggleModal('isModalEditInfoOpen')}
        info={data?.candidate}
      />
      <FormEditAboutMe  
        isModalEditAboutMeOpen={state.isModalEditAboutMeOpen}
        showModalEditAboutMe={() => toggleModal('isModalEditAboutMeOpen')}
        data={data?.candidate?.aboutme}
      />
  
      <div className="container mx-auto p-4 grid grid-cols-10 gap-4">
        <div className="col-span-4">
          <SideBar
            showModalEditAboutMe={() => toggleModal('isModalEditAboutMeOpen')}
            showModalAddEduOpen={() => toggleModal('isModalAddEduOpen')}
            showModalAddExpOpen={() => toggleModal('isModalAddExpOpen')}
            showModalAddPrjOpen={() => toggleModal('isModalAddPrjOpen')}
            showModalAddCertiOpen={() => toggleModal('isModalAddCertiOpen')}
            showModalAddSkillOpen={() => toggleModal('isModalAddSkillOpen')}
            
          />
        </div>
        <div className="col-span-6 flex flex-col gap-10">
          <ProfileSection
            showModalEditInfo={() => toggleModal('isModalEditInfoOpen')}
            info={data?.candidate}
          />
          <AboutMe
            title="Giới Thiệu Bản Thân"
            content="Nội dung giới thiệu bản thân"
            data={data?.candidate?.aboutme}
            showModalEditAboutMe={() => toggleModal('isModalEditAboutMeOpen')}
          />
          <Education
            title="Học Vấn"
            content="Nội dung học vấn"
            data={data?.education}
            isModalAddEduOpen={state.isModalAddEduOpen}
            showModalAddEduOpen={() => toggleModal('isModalAddEduOpen')}
            isModalEditEduOpen={state.isModalEditEduOpen}
            showModalEditEduOpen={() => toggleModal('isModalEditEduOpen')}
            changeDelete={changeDelete}
          />
          <Experience
            title="Kinh Nghiệm Làm Việc"
            content="Nội dung kinh nghiệm làm việc"
            data={data?.experience}
            isModalAddExpOpen={state.isModalAddExpOpen}
            showModalAddExpOpen={() => toggleModal('isModalAddExpOpen')}
            isModalEditExpOpen={state.isModalEditExpOpen}
            showModalEditExpOpen={() => toggleModal('isModalEditExpOpen')}
            changeDelete={changeDelete}
          />
          <Project
            title="Dự Án Cá Nhân"
            content="Nội dung dự án cá nhân"
            data={data?.project}
            isModalAddPrjOpen={state.isModalAddPrjOpen}
            showModalAddPrjOpen={() => toggleModal('isModalAddPrjOpen')}
            isModalEditPrjOpen={state.isModalEditPrjOpen}
            showModalEditPrjOpen={() => toggleModal('isModalEditPrjOpen')}
            changeDelete={changeDelete}
          />
          <Certificate
            title="Chứng Chỉ"
            content="Nội dung chứng chỉ"
            data={data?.certificate}
            isModalAddCertiOpen={state.isModalAddCertiOpen}
            showModalAddCertiOpen={() => toggleModal('isModalAddCertiOpen')}
            isModalEditCertiOpen={state.isModalEditCertiOpen}
            showModalEditCertiOpen={() => toggleModal('isModalEditCertiOpen')}
            changeDelete={changeDelete}
          />
          <Skill
            title="Kỹ Năng"
            content="Nội dung kỹ năng"
            data={data?.skillsCandidates}
            isModalAddSkillOpen={state.isModalAddSkillOpen}
            showModalAddSkillOpen={() => toggleModal('isModalAddSkillOpen')}
            isModalEditSkillOpen={state.isModalEditSkillOpen}
            showModalEditSkillOpen={() => toggleModal('isModalEditSkillOpen')}
            changeDelete={changeDelete}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
