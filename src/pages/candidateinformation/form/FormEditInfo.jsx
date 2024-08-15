import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { updateCandidateInfo } from "../../../service/candidateService";
import Swal from "sweetalert2/dist/sweetalert2.js";
const { Option } = Select;

export default function FormEditInfo({
  isModalEditInfoOpen,
  showModalEditInfo,
  info,
}) {
  const [form] = Form.useForm();
  const [formEdit, setFormEdit] = useState({
    name: info?.name,
    position: info?.position,
    address: info?.address,
    phone: info?.phone,
    birthday: info?.birthday,
    gender: info?.gender,
    linkLinkedin: info?.linkLinkedin,
    avatar: info?.avatar,
  });
  const [showAvatar, setShowAvatar] = React.useState(null);
  const dispatch = useDispatch();

  const handleOk = () => {
    form.submit();
    const formEditData = new FormData();
    formEditData.append("id", info?.id);
    if (formEdit.name) {
      formEditData.append("name", formEdit.name);
    }

    if (formEdit.position) {
      formEditData.append("position", formEdit.position);
    }

    if (formEdit.address) {
      formEditData.append("address", formEdit.address);
    }

    if (formEdit.phone) {
      formEditData.append("phone", formEdit.phone);
    }

    if (formEdit.birthday) {
      formEditData.append("birthday", formEdit.birthday);
    }

    if (formEdit.gender) {
      formEditData.append("gender", formEdit.gender);
    }

    if (formEdit.linkLinkedin) {
      formEditData.append("linkLinkedin", formEdit.linkLinkedin);
    }
    if (formEdit.avatar) {
      formEditData.append("avatar", formEdit.avatar);
    }
    dispatch(updateCandidateInfo(formEditData)).then((res) => {
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
          text: "Update information successfully",
          icon: "success",
      }).then(()=> showModalEditInfo())
      }
    });
  };

  const resetForm = () => {
    setFormEdit({
      name: null,
      position: null,
      address: null,
      phone: null,
      birthday: null,
      gender: null,
      linkLinkedin: null,
      avatar: null,
    });
    setShowAvatar(null);
  };

  const handleCancel = () => {
    resetForm();
    showModalEditInfo();
  };

  const handleFinish = () => {
    resetForm();
    showModalEditInfo();
  };

  const disabledDate = (current) => {
    return current && current > dayjs().startOf("day");
  };

  const handleChange = (e) => {
    if (e.$isDayjsObject) {
      setFormEdit({ ...formEdit, birthday: e.format("YYYY-MM-DD") });
    } else {
      setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
    }
  };

  const handleChangeGender = (e) => {
    setFormEdit({ ...formEdit, gender: JSON.parse(e) });
  };
  const handleChangeAvatar = (e) => {
    setFormEdit({ ...formEdit, avatar: e.target.files[0] });
    encodeImageFileAsURL(e.target.files[0]);
  };

  function encodeImageFileAsURL(file) {
    var reader = new FileReader();
    reader.onloadend = function () {
      setShowAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Modal
      title="Cập nhật thông tin cá nhân"
      open={isModalEditInfoOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={showModalEditInfo}>
          Hủy Bỏ
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          className="bg-red-600"
        >
          Cập Nhật
        </Button>,
      ]}
    >
      <div className="text-center mb-6">
        <Avatar
          size={100}
          src={showAvatar ? showAvatar : info?.avatar}
          className="mr-4"
        />
        <div className="flex justify-center space-x-4">
          <EditOutlined className="text-2xl cursor-pointer" />
          <Input onChange={handleChangeAvatar} type="file" />
          <DeleteOutlined className="text-2xl text-red-600 cursor-pointer" />
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: info?.name,
          position: info?.position,
          address: info?.address,
          phone: info?.phone,
          birthday: dayjs(info?.birthday),
          gender: info?.gender ? "Nam" : "Nữ",
          linkLinkedin: info?.linkLinkedin,
        }}
      >
        <Form.Item label="Họ và tên" name="name">
          <Input
            name="name"
            onChange={handleChange}
            placeholder="Nhập họ tên"
          />
        </Form.Item>
        <Form.Item label="Chức danh" name="position">
          <Input
            name="position"
            onChange={handleChange}
            placeholder="Nhập chức danh"
          />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input
            name="address"
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
          />
        </Form.Item>
        <Form.Item label="SDT" name="phone">
          <Input
            name="phone"
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
        </Form.Item>
        <Form.Item label="Ngày sinh" name="birthday">
          <DatePicker
            name="birthday"
            format="YYYY-MM-DD"
            onChange={handleChange}
            disabledDate={disabledDate}
            style={{ width: "100%" }}
            placeholder="Chọn ngày sinh"
          />
        </Form.Item>
        <Form.Item label="Giới tính" name="gender">
          <Select onChange={handleChangeGender}>
            <Option value="true">Nam</Option>
            <Option value="false">Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Trạng cá nhân" name="linkLinkedin">
          <Input
            name="linkLinkedin"
            onChange={handleChange}
            placeholder="Nhập trạng cá nhân"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
