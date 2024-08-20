import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  editExperience,
} from "../../../../service/candidateService";
import Swal from "sweetalert2";

export default function FormEditExp({
  isModalEditExpOpen,
  showModalEditExpOpen,
  editExp,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formEditExp, setFormEditExp] = useState({
    company: null,
    position: null,
    startAt: null,
    endAt: null,
    info: null,
  });
  useEffect(() => {
    if (editExp) {
      form.setFieldsValue({
        company: editExp.company,
        position: editExp.position,
        startAt: editExp.startAt ? dayjs(editExp.startAt) : null,
        info: editExp.info,
      });
    }
  }, [editExp, form]);

  const resetForm = () => {
    setFormEditExp({
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
    return current && (current <= startDate || current > dayjs().endOf("day"));
  };
  const handleOk = () => {
    form.submit();
    console.log(formEditExp);

    dispatch(
      editExperience({
        id: editExp?.id,
        company: formEditExp.company,
        position: formEditExp.position,
        startAt: formEditExp.startAt,
        endAt: formEditExp.endAt,
        info: formEditExp.info,
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
            text: "Sửa thông tin kinh nghiệm thành công",
            icon: "success",
          });
          resetForm();
        }
      }
    });
  };

  const handleCancel = () => {
    resetForm();
    showModalEditExpOpen();
  };

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    resetForm();
    showModalEditExpOpen();
  };
  const handleChange = (e) => {
    setFormEditExp({ ...formEditExp, [e.target.name]: e.target.value });
  };
  const handleChangStartDate = (date) => {
    setFormEditExp({
      ...formEditExp,
      startAt: dayjs(date).format("YYYY-MM-DD"),
    });
    setStartDate(date);
  };
  const handleChangEndDate = (date) => {
    setFormEditExp({ ...formEditExp, endAt: dayjs(date).format("YYYY-MM-DD") });
    setEndDate(date);
  };

  return (
    <>
      <Modal
        title={<h2 className="text-center text-xl font-semibold">Kinh nghiệm</h2>}
        open={isModalEditExpOpen}
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
            company: editExp?.company,
            position: editExp?.position,
            startAt: dayjs(editExp?.startAt),
            info: editExp?.info,
          }}
        >
          <Form.Item label="Công ty" name="company">
            <Input
              onChange={handleChange}
              name="company"
              placeholder="Company"
            />
          </Form.Item>

          <Form.Item label="Ngành Học" name="position">
            <Input onChange={handleChange} name="position" placeholder="position" />
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
