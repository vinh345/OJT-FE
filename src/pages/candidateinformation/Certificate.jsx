import React, { useState } from "react";
import { Card, Collapse } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import FormAddCerti from "./form/certificate/FormAddCerti";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteCertificate } from "../../service/candidateService";
import FormEditCerti from "./form/certificate/FormEditCerti";
import VerifiedIcon from "@mui/icons-material/Verified";
const { Panel } = Collapse;
export default function Certificate({
  title,
  data,
  isModalAddCertiOpen,
  showModalAddCertiOpen,
  changeDelete,
  isModalEditCertiOpen,
  showModalEditCertiOpen,
}) {
  const dispatch = useDispatch();
  const [editCerti, setEditCerti] = useState(null);
  const initEdit = (id) => {
    const certi = data?.filter((certi) => certi.id === id)[0];
    setEditCerti(certi);
    showModalEditCertiOpen();
  };
  const handleDelete = (id) => {
    if (confirm("Bạn có muốn xóa thông tin về chứng chỉ này không")) {
      dispatch(deleteCertificate(id)).then((res) => {
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
            text: "Xóa thông tin chứng chỉ thành công",
            icon: "success",
          });
          changeDelete();
        }
      });
    }
  };
  return (
    <>
      <FormAddCerti
        isModalAddCertiOpen={isModalAddCertiOpen}
        showModalAddCertiOpen={showModalAddCertiOpen}
      />
      <FormEditCerti
        isModalEditCertiOpen={isModalEditCertiOpen}
        showModalEditCertiOpen={showModalEditCertiOpen}
        editCerti={editCerti}
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
              onClick={showModalAddCertiOpen}
              className="text-red-500 text-lg self-start xl:self-auto"
            />
          </div>

          <div>
            {data?.map((certi) => (
              <div key={certi.id} className="mt-5">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center">
                  <p className="text-lg w-full xl:w-auto flex items-center">
                    <VerifiedIcon />
                    <b className="ml-2 mr-2">{certi.name}</b>
                    (Tổ chức: {certi.organization})
                  </p>
                  <div className="flex flex-col xl:flex-row justify-between xl:justify-end gap-4 xl:gap-8 w-full xl:w-auto mt-4 xl:mt-0">
                    <p className="text-lg text-center xl:text-right">
                      {certi.startAt}-{certi.endAt}
                    </p>
                    <div className="flex justify-center xl:justify-end gap-4 xl:gap-2">
                      <EditOutlined
                        onClick={() => initEdit(certi.id)}
                        className="text-lg cursor-pointer"
                      />
                      <DeleteOutlined
                        onClick={() => handleDelete(certi.id)}
                        className="text-lg text-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="break-words text-lg">{certi.info}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
