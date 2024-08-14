import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addSkill, getLvJob } from "../../../../service/candidateService";
import Swal from "sweetalert2";

export default function FormAddSkill({
  isModalAddSkillOpen,
  showModalAddSkillOpen,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [levelJob, setLevelJob] = useState(null);
  const [formAddSkill, setFormAddSkill] = useState({
    name: null,
    levelJobId: null,
  });
  useEffect(() => {
    dispatch(getLvJob()).then((res) => {
      setLevelJob(res.payload.data.data);
    });
  }, []);
  const resetForm = () => {
    setFormAddSkill({
      name: null,
      levelJobId: null,
    });
    form.resetFields();
  };
  const handleOk = () => {
    form.submit();
    if (formAddSkill.name && formAddSkill.levelJobId) {
      dispatch(
        addSkill({
          name: formAddSkill.name,
          levelJobId: formAddSkill.levelJobId,
        })
      ).then((res) => {
        console.log(res);
        if (res.payload.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: Object.values(res.payload.error.details).join(""),
          });
        } else {
          if (res.payload.data.error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: Object.values(res.payload.data.message).join(", "),
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "Thêm kỹ năng thành công",
              icon: "success",
            });
            resetForm();
          }
        }
      });
    }
  };

  const handleCancel = () => {
    resetForm();
    showModalAddSkillOpen();
  };

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    resetForm();
    showModalAddSkillOpen();
  };
  const handleChange = (e) => {
    setFormAddSkill({ ...formAddSkill, [e.target.name]: e.target.value });
  };
  const handleChangeLv = (value) => {
    setFormAddSkill({...formAddSkill, levelJobId: JSON.parse(value) });
  };
  return (
    <>
      <Modal
        title={<h2 className="text-center text-xl font-semibold">Kỹ năng</h2>}
        open={isModalAddSkillOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy Bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            className="bg-red-600"
          >
            Thêm mới
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Tên kỹ năng" name="name">
            <Input onChange={handleChange} name="name" placeholder="Skill" />
          </Form.Item>

          <Form.Item label="Mức độ" name="levelJobId">
            <Select placeholder="Level" onChange={handleChangeLv}>
            {levelJob && levelJob.map(levelJob => (<Option value={levelJob.id}>{levelJob.name}</Option>))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
