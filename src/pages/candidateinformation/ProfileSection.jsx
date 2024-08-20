import React from "react";
import { Card, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function ProfileSection({ showModalEditInfo,info }) {
  console.log(info)
  return (
    <>
      <Card
        className="bg-card rounded-lg shadow-xl mb-6"
        bodyStyle={{ padding: "20px" }}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-7">
            <Avatar size={100} src={info?.avatar} className="mr-4" />
            <div>
              <h3 className="font-bold text-2xl text-text">{info?.name}</h3>
              <p className="text-text text-lg">{info?.position}</p>
              <div className="flex ml-4 flex-col xl:flex-row justify-between gap-6 xl:gap-28">
                <div>
                  <p className="text-text text-lg">
                    Email: {info?.account?.email}
                  </p>
                  <p className="text-text text-lg">
                    Ngày sinh: {info?.birthday}
                  </p>
                  <p className="text-text text-lg">Địa chỉ: {info?.address}</p>
                </div>
                <div>
                  <p className="text-text text-lg">Phone: {info?.phone}</p>
                  <p className="text-text text-lg">
                    Giới tính:
                    {info?.gender ? "Nam" : "Nữ"}
                  </p>
                  <p className="text-text text-lg">
                    <a href={info?.linkLinkedin}>Trang cá nhân </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <EditOutlined onClick={showModalEditInfo} className="text-primary text-xl" />
        </div>
      </Card>
    </>
  );
}
