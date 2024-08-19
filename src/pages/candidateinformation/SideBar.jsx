import React from "react";
import { Button, Collapse } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { PlusCircleOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export default function SideBar({
  showModalEditAboutMe,
  showModalAddEduOpen,
  showModalAddExpOpen,
  showModalAddPrjOpen,
  showModalAddCertiOpen,
  showModalAddSkillOpen,
}) {
  const navigate = useNavigate()
  return (
    <>
      <div className="bg-white rounded-lg shadow-xl p-4">
        <p className="font-bold text-xl mb-4">
          Nâng cấp hồ sơ xin việc của bạn bằng việc bổ sung các trường sau
        </p>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <PlusCircleOutlined rotate={isActive ? 90 : 0} />
          )}
          className="mb-4 flex gap-7 flex-col pl-8 py-6"
          collapsible="icon "
        >
          <div onClick={showModalEditAboutMe} className="cursor-pointer">
            <PlusCircleOutlined className="text-red-500 text-lg self-end mr-3" />
            Thêm giới thiệu bản thân
          </div>
          <div onClick={showModalAddEduOpen} className="cursor-pointer">
            <PlusCircleOutlined className="text-red-500 text-lg self-end mr-3" />
            Thêm học vấn
          </div>
          <div onClick={showModalAddExpOpen} className="cursor-pointer">
            <PlusCircleOutlined className="text-red-500 text-lg self-end mr-3" />
            Thêm kinh nghiệm làm việc
          </div>
          <div onClick={showModalAddPrjOpen} className="cursor-pointer">
            <PlusCircleOutlined className="text-red-500 text-lg self-end mr-3" />
            Thêm dự án cá nhân
          </div>
          <div onClick={showModalAddCertiOpen} className="cursor-pointer">
            <PlusCircleOutlined className="text-red-500 text-lg self-end mr-3" />
            Thêm chứng chỉ
          </div>
          <div onClick={showModalAddSkillOpen} className="cursor-pointer">
            <PlusCircleOutlined className="text-red-500 text-lg self-end mr-3" />
            Thêm kỹ năng
          </div>
        </Collapse>
        <div className="flex flex-col border-t pt-6 gap-8 ">
          <div className="flex items-center gap-6 ml-6">
            <img
              className="w-16 h-16"
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQTpYCTvazi0U8lNN8EcNnfLSVnF4slvwQvx_QeKRNREFGqsVnm"
              alt=""
            />
            <p className="font-bold text-xl">
              Xem và chỉnh sửa CV của bạn tại đây!
            </p>
          </div>
          <Button
            type="primary"
            className="w-60 h-14 bg-primary border-primary bg-red-600 hover:bg-red-400 self-center"
            onClick={() =>navigate("/user/cv")}
          >
            Xem Và Tải CV
          </Button>
        </div>
      </div>
    </>
  );
}
