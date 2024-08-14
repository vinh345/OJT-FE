import React from "react";
import { Card, Collapse } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
export default function Skill({ title, data }) {
  const handleEdit = (id) => {};
  const handleDelete = (id) => {};
  const initAdd = () => {};
  return (
    <>
      <Card
        className="bg-card rounded-lg shadow-xl mb-4"
        bodyStyle={{ padding: "0" }}
      >
        <div className="p-6">
          <div className="flex justify-between border-b ">
            <h4 className="text-2xl text-text font-bold text-red-500">{title}</h4>
            <PlusCircleOutlined onclick={initAdd} className="text-red-500 text-lg" />
          </div>

          <div className="">
            {data?.map((skill) => (
              <>
                <div>
                  <div className="flex justify-between h-9 mt-5">
                    <p className="text-lg text-center">
                      + {skill.name}{" "}
                    </p>
                    <div className="flex justify-end p-2  border-border gap-8">
                      <div>
                        <EditOutlined
                          onClick={() => handleEdit(skill.id)}
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
