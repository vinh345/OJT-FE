import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addCertificate } from "../../../../service/candidateService";
import Swal from "sweetalert2";

export default function FormAddCerti({
  isModalAddCertiOpen,
  showModalAddCertiOpen,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formAddCerti, setFormAddCerti] = useState({
    name: null,
    organization: null,
    startAt: null,
    endAt: null,
    info: null,
  });
  const resetForm = () => {
    setFormAddCerti({
      name: null,
      organization: null,
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
    if (
      formAddCerti.name && 
      formAddCerti.organization && 
      formAddCerti.info
    ) {
      dispatch(
        addCertificate({
          name: formAddCerti.name,
          organization: formAddCerti.organization,
          startAt: formAddCerti.startAt,
          endAt: formAddCerti.endAt,
          info: formAddCerti.info,
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
            text: "Thêm thông tin học vấn thành công",
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
    showModalAddCertiOpen();
  };

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    resetForm();
    showModalAddCertiOpen();
  };
  const handleChange = (e) => {
    setFormAddCerti({ ...formAddCerti, [e.target.name]: e.target.value });
  };
  const handleChangStartDate = (date) => {
    // debugger
    setFormAddCerti({ ...formAddCerti, startAt: dayjs(date).format("YYYY-MM-DD") });
    setStartDate(date);
  };
  const handleChangEndDate = (date) => {
    setFormAddCerti({ ...formAddCerti, endAt: dayjs(date).format("YYYY-MM-DD") });
    setEndDate(date);
  };

  return (
    <>
      <Modal
        title={<h2 className="text-center text-xl font-semibold">Chứng chỉ</h2>}
        open={isModalAddCertiOpen}
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
          <Form.Item label="Chứng chỉ" name="name">
            <Input
              onChange={handleChange}
              name="name"
              placeholder="Certificate"
            />
          </Form.Item>

          <Form.Item label="Tổ chức" name="organization">
            <Input onChange={handleChange} name="organization" placeholder="Organization" />
          </Form.Item>

          <Form.Item label="Thời gian">
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
