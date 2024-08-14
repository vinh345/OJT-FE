import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

import { addExperience } from "../../../../service/candidateService";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

export default function FormAddExp({ isModalAddExpOpen, showModalAddExpOpen }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formAddExp, setFormAddExp] = useState({
    company: null,
    position: null,
    startAt: null,
    endAt: null,
    info: null,
  });
  const resetForm = () => {
    setFormAddExp({
      company: null,
      position: null,
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
    return (
      current &&
      ((startDate && current <= startDate) || current > dayjs().endOf("day"))
    );
  };
  const handleOk = () => {
    form.submit();
    console.log(formAddExp);
    if (
        formAddExp.company &&
        formAddExp.position &&
        formAddExp.info 
    ) {
      dispatch(
        addExperience({
          company: formAddExp.company,
          position: formAddExp.position,
          startAt: formAddExp.startAt,
          endAt: formAddExp.endAt,
          info: formAddExp.info,
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
              text: "Thêm kinh nghiệm thành công",
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
    showModalAddExpOpen();
  };

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    resetForm();
    showModalAddExpOpen();
  };
  const handleChange = (e) => {
    setFormAddExp({ ...formAddExp, [e.target.name]: e.target.value });
  };
  const handleChangStartDate = (date) => {
    setFormAddExp({ ...formAddExp, startAt: dayjs(date).format("YYYY-MM-DD") });
    setStartDate(date);
  };
  const handleChangEndDate = (date) => {
    setFormAddExp({ ...formAddExp, endAt: dayjs(date).format("YYYY-MM-DD") });
    setEndDate(date);
  };

  return (
    <>
      <Modal
        title={<h2 className="text-center text-xl font-semibold">Kinh nghiệm</h2>}
        open={isModalAddExpOpen}
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
          <Form.Item label="Công ty" name="company">
            <Input
              onChange={handleChange}
              name="company"
              placeholder="Company"
            />
          </Form.Item>

          <Form.Item label="Vị trí" name="position">
            <Input
              onChange={handleChange}
              name="position"
              placeholder="Position"
            />
          </Form.Item>

          <Form.Item label="Thời gian làm việc">
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
