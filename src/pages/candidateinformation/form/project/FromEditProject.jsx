import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  editProject,
} from "../../../../service/candidateService";
import Swal from "sweetalert2";

export default function FormEditPrj({
  isModalEditPrjOpen,
  showModalEditPrjOpen,
  editPrj,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formEditPrj, setFormEditPrj] = useState({
    name: null,
    link: null,
    startAt: null,
    endAt: null,
    info: null,
  });
  useEffect(() => {
    if (editPrj) {
      form.setFieldsValue({
        name: editPrj.name,
        link: editPrj.link,
        startAt: editPrj.startAt ? dayjs(editPrj.startAt) : null,
        info: editPrj.info,
      });
    }
  }, [editPrj, form]);

  const resetForm = () => {
    setFormEditPrj({
      name: null,
      link: null,
      startAt: null,
      endAt: null,
      info: null,
    });
    setStartDate(null);
    setEndDate(null);
    form.resetFields();
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // Disable dates for Start Date Picker
  const disableStartDate = (current) => {
    if (endDate) {
      return current && (current > dayjs().endOf("day") || current >= endDate);
    }
    return current && current > dayjs().endOf("day");
  };
  // Disable dates for End Date Picker
  const disableEndDate = (current) => {
    return current && (current <= startDate || current > dayjs().endOf("day"));
  };
  const handleOk = () => {
    form.submit();
    console.log(formEditPrj);
    dispatch(
      editProject({
        id: editPrj?.id,
        name: formEditPrj.name,
        link: formEditPrj.link,
        startAt: formEditPrj.startAt,
        endAt: formEditPrj.endAt,
        info: formEditPrj.info,
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
            text: "Sửa thông tin dự án thành công",
            icon: "success",
          });
          resetForm();
        }
      }
    });
  };

  const handleCancel = () => {
    resetForm();
    showModalEditPrjOpen();
  };

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    resetForm();
    showModalEditPrjOpen();
  };
  const handleChange = (e) => {
    setFormEditPrj({ ...formEditPrj, [e.target.name]: e.target.value });
  };
  const handleChangStartDate = (date) => {
    setFormEditPrj({
      ...formEditPrj,
      startAt: dayjs(date).format("YYYY-MM-DD"),
    });
    setStartDate(date);
  };
  const handleChangEndDate = (date) => {
    setFormEditPrj({ ...formEditPrj, endAt: dayjs(date).format("YYYY-MM-DD") });
    setEndDate(date);
  };

  return (
    <>
      <Modal
        title={<h2 className="text-center text-xl font-semibold">Dự án</h2>}
        open={isModalEditPrjOpen}
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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            name: editPrj?.name,
            link: editPrj?.link,
            startAt: dayjs(editPrj?.startAt),
            info: editPrj?.info,
          }}
        >
          <Form.Item label="Tên dự án" name="name">
            <Input
              onChange={handleChange}
              name="name"
              placeholder="Project name"
            />
          </Form.Item>

          <Form.Item label="Link dự án" name="link">
            <Input onChange={handleChange} name="link" placeholder="Link project" />
          </Form.Item>

          <Form.Item label="Thời gian thực hiện">
            <div className="flex justify-between items-center">
              <Form.Item name="startAt" className="mr-2">
                <DatePicker
                  onChange={handleChangStartDate}
                  disabledDate={disableStartDate}
                  name="startAt"
                  placeholder="Start Date"
                />
              </Form.Item>
              <span>to</span>
              <Form.Item name="endAt" className="ml-2">
                <DatePicker
                  onChange={handleChangEndDate}
                  disabledDate={disableEndDate}
                  name="endAt"
                  placeholder="End Date"
                />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item label="Thông tin thêm" name="info">
            <Input.TextArea
              name="info"
              onChange={handleChange}
              placeholder="Hint text"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
