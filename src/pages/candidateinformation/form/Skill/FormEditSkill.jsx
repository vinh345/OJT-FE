import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input,Select } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import { getLvJob, updateSkill } from "../../../../service/candidateService";

export default function FormEditSkill({
  isModalEditSkillOpen,
  showModalEditSkillOpen,
  editSkill,
}) {
    console.log(editSkill)
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [levelJob, setLevelJob] = useState(null);
  const [formEditSkill, setFormEditSkill] = useState({
    name: null,
    levelJobId: null,
  });
  useEffect(() => {
    if (editSkill) {
      form.setFieldsValue({
        name: editSkill.name,
        levelJobId: editSkill.levelJobId,
      });
    }
  }, [editSkill, form]);
  useEffect(() => {
    dispatch(getLvJob()).then((res) => {
      setLevelJob(res.payload.data.data);
    });
  }, []);
  const resetForm = () => {
    setFormEditSkill({
      name: null,
      levelJobId: null,
    });
    form.resetFields();
  };
  const handleOk = () => {
    form.submit();
    console.log(formEditSkill);

    dispatch(
      updateSkill({
        id: editSkill?.id,
        name: formEditSkill.name,
        levelJobId: formEditSkill.levelJobId,
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
            text: "Sửa thông tin học vấn thành công",
            icon: "success",
          });
          resetForm();
        }
      }
    });
  };

  const handleCancel = () => {
    resetForm();
    showModalEditSkillOpen();
  };

  const handleFinish = (values) => {
    resetForm();
    showModalEditSkillOpen();
  };
  const handleChange = (e) => {
    setFormEditSkill({ ...formEditSkill, [e.target.name]: e.target.value });
  };
  const handleChangeLv = (value) => {
    setFormEditSkill({...formEditSkill, levelJobId: JSON.parse(value) });
  };
  return (
    <>
      <Modal
        title={<h2 className="text-center text-xl font-semibold">Kỹ năng</h2>}
        open={isModalEditSkillOpen}
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
            Chỉnh sửa
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{name: editSkill?.name}}>
          <Form.Item label="Tên kỹ năng" name="name">
            <Input onChange={handleChange} name="name" placeholder="Skill" />
          </Form.Item>

          <Form.Item label="Mức độ" name="levelJobId">
            <Select defaultValue={editSkill?.levelJob.id}  placeholder="Level" onChange={handleChangeLv}>
            {levelJob && levelJob.map(levelJob => (<Option value={levelJob.id}>{levelJob.name}</Option>))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
