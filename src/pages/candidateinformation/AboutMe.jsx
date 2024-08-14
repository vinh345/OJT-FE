import React from "react";
import { Card, Collapse } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
export default function AboutMe({ title, data, showModalEditAboutMe }) {
  
  const handleEdit = (id) => {};
  const handleDelete = (id) => {};

  return (
    <>
      <Card
        className="bg-card rounded-lg shadow-xl mb-4"
        bodyStyle={{ padding: "0" }}
      >
        <div className="p-6">
          <div className="flex justify-between border-b">
            <h4 className="text-2xl text-text font-bold text-red-500">{title}</h4>
          </div>
          <div className="flex justify-between">
            <p className="text-lg break-words"> {data}</p>
            <div className="flex justify-end p-2  border-border">
              <EditOutlined onClick={showModalEditAboutMe} className="text-primary text-lg mr-4 cursor-pointer" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
