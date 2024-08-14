import React, { useState } from "react";
import { Card, Collapse } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import FormAddProject from "./form/project/FormAddProject";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../service/candidateService";
import Swal from "sweetalert2";
import FormEditPrj from "./form/project/FromEditProject";
import TaskIcon from "@mui/icons-material/Task";
const { Panel } = Collapse;
export default function Education({
  title,
  data,
  isModalAddPrjOpen,
  showModalAddPrjOpen,
  changeDelete,
  isModalEditPrjOpen,
  showModalEditPrjOpen,
}) {
  const dispatch = useDispatch();
  const [editPrj, setEditPrj] = useState(null);
  const initEdit = (id) => {
    const prj = data?.filter((prj) => prj.id === id)[0];
    setEditPrj(prj);
    showModalEditPrjOpen();
  };
  const handleDelete = (id) => {
    if (confirm("Bạn có muốn xóa thông tin về dự án này không")) {
      dispatch(deleteProject(id)).then((res) => {
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
            text: "Xóa thông tin dự án thành công",
            icon: "success",
          });
          changeDelete();
        }
      });
    }
  };
  const initAdd = () => {};
  return (
    <>
      <FormAddProject
        isModalAddPrjOpen={isModalAddPrjOpen}
        showModalAddPrjOpen={showModalAddPrjOpen}
      />
      <FormEditPrj
        isModalEditPrjOpen={isModalEditPrjOpen}
        showModalEditPrjOpen={showModalEditPrjOpen}
        editPrj={editPrj}
      />
     <Card
  className="bg-card rounded-lg shadow-xl mb-4"
  bodyStyle={{ padding: "0" }}
>
  <div className="p-6">
    <div className="flex flex-col xl:flex-row justify-between border-b">
      <h4 className="text-2xl text-text font-bold text-red-500 mb-4 xl:mb-0">
        {title}
      </h4>
      <PlusCircleOutlined
        onClick={showModalAddPrjOpen}
        className="text-red-500 text-lg self-start xl:self-auto"
      />
    </div>

    <div>
      {data?.map((prj) => (
        <div key={prj.id} className="mt-5">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center">
            <p className="text-lg w-full xl:w-auto flex items-center">
              <TaskIcon />
              <b className="ml-2 mr-2">{prj.name}</b>
              (<a href={prj.link} className="underline ">Link dự án</a>)
            </p>
            <div className="flex flex-col xl:flex-row justify-between xl:justify-end gap-4 xl:gap-8 w-full xl:w-auto mt-4 xl:mt-0">
              <p className="text-lg text-center xl:text-right">
                {prj.startAt}-{prj.endAt}
              </p>
              <div className="flex justify-center xl:justify-end gap-4 xl:gap-2">
                <EditOutlined
                  onClick={() => initEdit(prj.id)}
                  className="text-lg cursor-pointer"
                />
                <DeleteOutlined
                  onClick={() => handleDelete(prj.id)}
                  className="text-lg text-red-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <span className="break-words text-lg">Chi tiết: {prj.info}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</Card>

    </>
  );
}
