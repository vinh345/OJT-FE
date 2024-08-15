import React, { useState } from "react";
import { Card, Collapse } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import FormAddSkill from "./form/Skill/FormAddSkill";
import { useDispatch } from "react-redux";
import { deleteSkill } from "../../service/candidateService";
import Swal from "sweetalert2";
import FormEditSkill from "./form/Skill/FormEditSkill";
import CheckIcon from '@mui/icons-material/Check';
const { Panel } = Collapse;
export default function Skill({
  title,
  data,
  isModalAddSkillOpen,
  showModalAddSkillOpen,
  changeDelete,
  isModalEditSkillOpen,
  showModalEditSkillOpen,
}) {
  const dispatch = useDispatch();
  const [editSkill, setEditSkill] = useState(null);
  const initEdit = (id) => {
    const skill = data?.filter((skill) => skill.id === id)[0];
    setEditSkill(skill);
    showModalEditSkillOpen();
  };
  const handleDelete = (id) => {
    if (confirm("Bạn có muốn xóa kỹ năng này không")) {
      dispatch(deleteSkill(id)).then((res) => {
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
            text: "Xóa thông tin kỹ năng thành công",
            icon: "success",
          });
          changeDelete();
        }
      });
    }
  };
  return (
    <>
      <FormAddSkill
        isModalAddSkillOpen={isModalAddSkillOpen}
        showModalAddSkillOpen={showModalAddSkillOpen}
      />
      <FormEditSkill
        isModalEditSkillOpen={isModalEditSkillOpen}
        showModalEditSkillOpen={showModalEditSkillOpen}
        editSkill={editSkill}
      />
      <Card
        className="bg-card rounded-lg shadow-xl mb-4"
        bodyStyle={{ padding: "0" }}
      >
        <div className="p-6">
          <div className="flex justify-between border-b ">
            <h4 className="text-2xl text-text font-bold text-red-500">
              {title}
            </h4>
            <PlusCircleOutlined
              onClick={showModalAddSkillOpen}
              className="text-red-500 text-lg"
            />
          </div>

          <div className="">
            {data?.map((skill) => (
              <>
                <div>
                  <div className="flex justify-between h-9 mt-5">
                    <p className="text-lg text-center"><CheckIcon/> <b className="ml-2 mr-2">{skill.levelJob.name} - {skill.name}</b>  </p>
                    <div className="flex justify-end p-2  border-border gap-8">
                      <div>
                        <EditOutlined
                          onClick={() => initEdit(skill.id)}
                          className="text-center text-lg mr-4 cursor-pointer"
                        />
                        <DeleteOutlined
                          onClick={() => handleDelete(skill.id)}
                          className="text-center text-lg text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
