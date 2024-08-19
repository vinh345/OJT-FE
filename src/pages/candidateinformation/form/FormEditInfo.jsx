import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { updateCandidateInfo } from "../../../service/candidateService";
import Swal from "sweetalert2/dist/sweetalert2.js";
const { Option } = Select;
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
    birthDay: info?.birthDay,
    gender: info?.gender,
    linkLinkedin: info?.linkLinkedin,
    avatar: info?.avatar,
  });
  const [showAvatar, setShowAvatar] = React.useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue({
      name: info?.name,
      position: info?.position,
      address: info?.address,
      phone: info?.phone,
      birthDay: dayjs(info?.birthDay),
      gender: info?.gender,
      linkLinkedin: info?.linkLinkedin,
      avatar: info?.avatar,
    });
  },[isModalEditInfoOpen])
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

    if (formEdit.birthDay) {
      formEditData.append("birthDay", formEdit.birthDay);
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
    console.log(formEdit)
    console.log(formEditData)
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
      })
      }
    });
    resetForm();
    setTimeout(()=>{ showModalEditInfo()},1500)
  };

  const resetForm = () => {
    setFormEdit({
      name: null,
      position: null,
      address: null,
      phone: null,
      birthDay: null,
      gender: null,
      linkLinkedin: null,
      avatar: null,
    });
    setShowAvatar(null);
    form.resetFields();
  };

  const handleCancel = () => {
    resetForm();
    showModalEditInfo();
  };

  const handleFinish = () => {
    resetForm();
    
  };

  const disabledDate = (current) => {
    return current && current > dayjs().startOf("day");
  };

  const handleChange = (e) => {
    if (e.$isDayjsObject) {
      console.log( e.format("YYYY-MM-DD"))
      setFormEdit({ ...formEdit, birthDay: e.format("YYYY-MM-DD") });
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
          <AccountCircleIcon className="text-2xl cursor-pointer" />
          <Input onChange={handleChangeAvatar} type="file" />
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
          birthDay: info?.birthDay && dayjs(info?.birthDay),
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
        <Form.Item label="Ngày sinh" name="birthDay">
          <DatePicker
            name="birthDay"
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
