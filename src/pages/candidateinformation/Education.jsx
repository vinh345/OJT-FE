import React, { useState } from "react";
import { Card, Collapse } from "antd";
import SchoolIcon from "@mui/icons-material/School";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import FormAddEducation from "./form/education/FormAddEducation";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../service/candidateService";
import Swal from "sweetalert2";
import FormEditEducation from "./form/education/FormEditEducation";

const { Panel } = Collapse;
export default function Education({
  title,
  data,
  isModalAddEduOpen,
  showModalAddEduOpen,
  changeDelete,
  isModalEditEduOpen,
  showModalEditEduOpen,
}) {
  const dispatch = useDispatch();
  const [editEdu, setEditEdu] = useState(null);
  const initEdit = (id) => {
    const edu = data?.filter((edu) => edu.id === id)[0];
    setEditEdu(edu);
    showModalEditEduOpen();
  };
  const handleDelete = (id) => {
    if (confirm("Bạn có muốn xóa thông tin về học vấn này không")) {
      dispatch(deleteEducation(id)).then((res) => {
        console.log(res);
        if (res.payload.data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: Object.values(res.payload.data.message).join(", "),
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Xóa thông tin học vấn thành công",
            icon: "success",
          });
          changeDelete();
        }
      });
    }
  };
  return (
    <>
      <FormAddEducation
        isModalAddEduOpen={isModalAddEduOpen}
        showModalAddEduOpen={showModalAddEduOpen}
      />
      <FormEditEducation
        isModalEditEduOpen={isModalEditEduOpen}
        showModalEditEduOpen={showModalEditEduOpen}
        editEdu={editEdu}
      />
      <Card
        className="bg-card rounded-lg shadow-xl mb-4"
        bodyStyle={{ padding: "0" }}
      >
        <div className="p-6">
          <div className="flex justify-between border-b flex-col xl:flex-row">
            <h4 className="text-2xl text-text font-bold mb-4 xl:mb-0 text-red-500">
              {title}
            </h4>
            <PlusCircleOutlined
              onClick={showModalAddEduOpen}
              className="text-red-500 text-lg self-end xl:self-auto"
            />
          </div>

          <div>
            {data?.map((edu) => (
              <div key={edu.id} className="mt-5">
                <div className="flex justify-between h-auto xl:h-9 flex-col xl:flex-row">
                  <p className="text-lg text-left w-full xl:w-80 mb-4 xl:mb-0 flex items-center">
                    <SchoolIcon />
                    <b className="ml-2 mr-2">{edu.nameEducation}</b>(Chuyên
                    ngành: {edu.major})
                  </p>
                  <div className="flex flex-col xl:flex-row justify-end p-2 border-border gap-4 xl:gap-8">
                    <p className="text-lg text-center xl:text-right">
                      {edu.startAt} - {edu.endAt}
                    </p>
                    <div className="flex justify-center xl:justify-end gap-4 xl:gap-2 mt-4 xl:mt-0">
                      <EditOutlined
                        onClick={() => initEdit(edu.id)}
                        className="text-lg cursor-pointer"
                      />
                      <DeleteOutlined
                        onClick={() => handleDelete(edu.id)}
                        className="text-lg text-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="break-words text-lg">
                    Chi tiết: {edu.info}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
