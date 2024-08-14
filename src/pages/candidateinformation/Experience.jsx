import React, { useState } from "react";
import { Card, Collapse } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import FormAddExp from "./form/experience/FormAddExp";
import { deleteExperience } from "../../service/candidateService";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import FormEditExp from "./form/experience/FormEditExp";
import WorkIcon from "@mui/icons-material/Work";
const { Panel } = Collapse;
export default function Experience({
  title,
  data,
  isModalAddExpOpen,
  showModalAddExpOpen,
  changeDelete,
  isModalEditExpOpen,
  showModalEditExpOpen,
}) {
  const dispatch = useDispatch();
  const [editExp, setEditExp] = useState(null);
  const initEdit = (id) => {
    const exp = data?.filter((exp) => exp.id === id)[0];
    setEditExp(exp);
    showModalEditExpOpen();
  };
  const handleDelete = (id) => {
    if (confirm("Bạn có muốn xóa thông tin về kinh nghiệm này không")) {
      dispatch(deleteExperience(id)).then((res) => {
        console.log(res);
        if (res.payload.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: Object.values(res.payload.message).join(""),
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Xóa thông tin kinh nghiệm thành công",
            icon: "success",
          });
          changeDelete();
        }
      });
    }
  };
  return (
    <>
      <FormAddExp
        isModalAddExpOpen={isModalAddExpOpen}
        showModalAddExpOpen={showModalAddExpOpen}
      />
      <FormEditExp
        showModalEditExpOpen={showModalEditExpOpen}
        isModalEditExpOpen={isModalEditExpOpen}
        editExp={editExp}
      />
  <Card
  className="bg-card rounded-lg shadow-xl mb-4"
  bodyStyle={{ padding: "0" }}
>
  <div className="p-6">
    <div className="flex flex-col xl:flex-row justify-between border-b">
      <h4 className="text-2xl text-text font-bold mb-4 xl:mb-0 text-red-500">
        {title}
      </h4>
      <PlusCircleOutlined
        onClick={showModalAddExpOpen}
        className="text-red-500 text-lg self-start xl:self-auto"
      />
    </div>

    <div className="mt-4">
      {data?.map((exp) => (
        <div key={exp.id} className="mt-5">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center">
            <p className="text-lg flex items-center w-full xl:w-auto mb-4 xl:mb-0">
              <WorkIcon />
              <b className="ml-2 mr-2">{exp.company}</b> (Vị trí: {exp.position})
            </p>
            <div className="flex flex-col xl:flex-row justify-between xl:justify-end p-2 border-border gap-4 xl:gap-8 w-full xl:w-auto mt-4 xl:mt-0">
              <p className="text-lg text-center xl:text-right">
                {exp.startAt}-{exp.endAt}
              </p>
              <div className="flex justify-center xl:justify-end gap-4 xl:gap-2">
                <EditOutlined
                  onClick={() => initEdit(exp.id)}
                  className="text-lg cursor-pointer"
                />
                <DeleteOutlined
                  onClick={() => handleDelete(exp.id)}
                  className="text-lg text-red-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <span className="break-words text-lg">Chi tiết: {exp.info}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</Card>


    </>
  );
}
