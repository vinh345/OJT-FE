import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { updateCandidateInfo } from "../../../service/candidateService";

const { TextArea } = Input;

export default function FormEditAboutMe({
  isModalEditAboutMeOpen,
  showModalEditAboutMe,
  data,
}) {
  const [form] = Form.useForm();
  const [aboutme, setAboutme] = useState(data);
  const dispatch = useDispatch();
 useEffect(()=>{
  form.setFieldsValue({
    aboutMe: aboutme,
  });
 },[isModalEditAboutMeOpen])
  const handleOk = () => {
    form.submit();
    const editAboutMe = new FormData();
    editAboutMe.append("aboutMe", aboutme);
    dispatch(
      updateCandidateInfo(editAboutMe)).then((res) => {
        console.log(res);
      }
    );
  };

  const handleFinish = () => {
    showModalEditAboutMe();
    form.resetFields();
  };
  const handleChangeAboutMe = (e) => {
    setAboutme(e.target.value);
  };
  return (
    <Modal
      title={
        <h2 className="text-center text-xl font-semibold">
          Chỉnh sửa giới thiệu về bản thân
        </h2>
      }
      open={isModalEditAboutMeOpen}
      onOk={handleOk}
      onCancel={showModalEditAboutMe}
      footer={[
        <Button key="back" onClick={showModalEditAboutMe}>
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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          aboutme: data,
        }}
      >
        <Form.Item
          name="aboutme"
          label="Mô tả về bản thân, các kĩ năng của mình..."
        >
          <TextArea
            onChange={handleChangeAboutMe}
            placeholder="Hint text"
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
