import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addEducation } from "../../../../service/candidateService";
import Swal from "sweetalert2";

export default function FormAddEducation({
  isModalAddEduOpen,
  showModalAddEduOpen,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formAddEdu, setFormAddEdu] = useState({
    nameEducation: null,
    major: null,
    startAt: null,
    endAt: null,
    info: null,
  });
  const resetForm = () => {
    setFormAddEdu({
      nameEducation: null,
      major: null,
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
      formAddEdu.nameEducation && 
      formAddEdu.major && 
      formAddEdu.info
    ) {
      dispatch(
        addEducation({
          nameEducation: formAddEdu.nameEducation,
          major: formAddEdu.major,
          startAt: formAddEdu.startAt,
          endAt: formAddEdu.endAt,
          info: formAddEdu.info,
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
    showModalAddEduOpen();
  };

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    resetForm();
    showModalAddEduOpen();
  };
  const handleChange = (e) => {
    setFormAddEdu({ ...formAddEdu, [e.target.name]: e.target.value });
  };
  const handleChangStartDate = (date) => {
    // debugger
    setFormAddEdu({ ...formAddEdu, startAt: dayjs(date).format("YYYY-MM-DD") });
    setStartDate(date);
  };
  const handleChangEndDate = (date) => {
    setFormAddEdu({ ...formAddEdu, endAt: dayjs(date).format("YYYY-MM-DD") });
    setEndDate(date);
  };

  return (
    <>
      <Modal
        title={<h2 className="text-center text-xl font-semibold">Học vấn</h2>}
        open={isModalAddEduOpen}
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
          <Form.Item label="Trường" name="nameEducation">
            <Input
              onChange={handleChange}
              name="nameEducation"
              placeholder="School"
            />
          </Form.Item>

          <Form.Item label="Ngành Học" name="major">
            <Input onChange={handleChange} name="major" placeholder="Major" />
          </Form.Item>

          <Form.Item label="Thời gian học tập">
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
