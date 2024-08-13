import React from "react";
import { Button, Collapse } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
// import { PlusCircleOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export default function SideBar() {
  return (
    <>
      <div className="bg-white rounded-lg shadow-xl p-4">
        <p className="font-bold text-text mb-4">
          Nâng cấp hồ sơ xin việc của bạn bằng việc bổ sung các trường sau
        </p>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <PlusCircleOutlined rotate={isActive ? 90 : 0} />
          )}
          className="mb-4"
        >
          <Panel
            header="Thêm giới thiệu bản thân"
            key="1"
            className="font-semibold text-primary"
          />
          <Panel
            header="Thêm giới thiệu bản thân"
            key="2"
            className="font-semibold text-primary"
          />
          <Panel
            header="Thêm giới thiệu bản thân"
            key="3"
            className="font-semibold text-primary"
          />
        </Collapse>
        <Button
          type="primary"
          className="w-full bg-primary border-primary hover:bg-red-700"
        >
          Xem Và Tải CV
        </Button>
      </div>
    </>
  );
}
