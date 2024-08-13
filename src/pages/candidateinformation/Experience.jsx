import React from "react";
import { Card, Collapse } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
export default function Experience({ title, data }) {
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
          <div className="flex justify-between">
            <h4 className="text-2xl text-text font-bold ">{title}</h4>
            <PlusCircleOutlined
              onclick={initAdd}
              className="text-red-500 text-lg"
            />
          </div>

          <div className="">
            {data?.map((exp) => (
              <>
                <div>
                  <div className="flex justify-between">
                    <p className="text-lg text-center">+ {exp.company}</p>
                    <div className="flex justify-end p-2  border-border gap-8">
                      <p className="text-lg">
                        {exp.startAt}-{exp.endAt}
                      </p>
                      <div>
                        <EditOutlined
                          onClick={() => handleEdit(exp.id)}
                          className="text-center text-lg mr-4 cursor-pointer"
                        />
                        <DeleteOutlined
                          onClick={() => handleDelete(exp.id)}
                          className="text-center text-lg text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="break-words text-base">{exp.info}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
