import React, { useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addJob } from "../../../service/jobService";
import { getListLocation } from "../../../service/Location/locationService";
import { fetchLevelJobs } from "../../../service/LevelJob/levelJobService";
import { fetchTypeJobs } from "../../../service/typeJob/typeJobService";
import { fetchAddressCompanys } from "../../../service/addressCompany/addressCompanyService";
import dayjs from "dayjs"
const { Option } = Select;

export default function AddJobBusiness() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch data from Redux store
  const { data: locations } = useSelector((state) => state.addressCompanys);
  const { data: levelJobs } = useSelector((state) => state.levelJobs);
  const { data: typeJobs } = useSelector((state) => state.typeJobs);
  console.log(locations);

  useEffect(() => {
    dispatch(fetchAddressCompanys({}));
    dispatch(fetchLevelJobs({}));
    dispatch(fetchTypeJobs({}));
  }, []);

  const onFinish = (values) => {
    const jobData = {
      title: values.title,
      description: values.description,
      requirements: values.requirements || "", // Mặc định chuỗi trống nếu không được cung cấp
      salary: values.salary,
      expireAt: values.expireAt.format("YYYY-MM-DD"), //Đảm bảo định dạng ngày phù hợp với yêu cầu phụ trợ
      locationId: values.location,
      levelJobIds: values.levelJobIds || [], // Mặc định là mảng rỗng nếu ko đc cung cấp
      typeJobIds: values.typeJobIds || [],
    };

    dispatch(addJob(jobData))
      .unwrap()
      .then(() => {
        message.success("Job added successfully!");
        navigate("/company/detail");
      })
      .catch((error) => {
        message.error("Failed to add job: " + error.message);
      });
  };
  const disableStartDate = (current) => {
  
    return current && current <= dayjs().endOf("day");
  };
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-900 font-bold">
          Trang chủ
        </a>
        /
        <a
          href="/thong-tin-doanh-nghiep"
          className="hover:text-gray-900 ml-2 font-bold"
        >
          Thông tin doanh nghiệp
        </a>
        /
        <a
          href="/doanh-nghiep-cua-toi"
          className="hover:text-gray-900 ml-2 font-bold"
        >
          Doanh nghiệp của tôi
        </a>
        <span className="text-gray-900 ml-2 font-bold">
          / Thêm việc làm mới
        </span>
      </div>

      <div className="bg-white p-10 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Thêm việc làm mới</h2>
        <Form layout="vertical" className="space-y-4" onFinish={onFinish}>
          {/* Job Title */}
          <Form.Item
            label="Tên công việc"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Nhập tên công việc" />
          </Form.Item>

          {/* Location and Job Time */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Địa điểm"
              name="location"
              rules={[{ required: true, message: "Location is required" }]}
            >
              <Select placeholder="Chọn địa điểm">
                {locations?.map((loc) => (
                  <Option key={loc.id} value={loc.id}>
                    {loc.cityName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Thể loại công việc"
              name="typeJobIds"
              rules={[{ required: true, message: "Type Job is required" }]}
            >
              <Select placeholder="Chọn thể loại công việc" mode="multiple">
                {typeJobs?.content?.map((typeJob) => (
                  <Option key={typeJob.id} value={typeJob.id}>
                    {typeJob.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Advanced Information */}
          <div className="bg-gray-100 p-4 rounded-md space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                label="Mức lương"
                name="salary"
                rules={[{ required: true, message: "Salary is required" }]}
              >
                <Input placeholder="$200 - $1500" />
              </Form.Item>
              <Form.Item
                label="Thời hạn ứng tuyển"
                name="expireAt"
                rules={[{ required: true, message: "Expire date is required" }]}
              >
                <DatePicker  placeholder="Chọn ngày" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Cấp độ"
                name="levelJobIds"
                rules={[{ required: true, message: "Level is required" }]}
              >
                <Select placeholder="Chọn cấp độ" mode="multiple">
                  {levelJobs?.content?.map((levelJob) => (
                    <Option key={levelJob.id} value={levelJob.id}>
                      {levelJob.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* Job Description */}
          <Form.Item
            label="Mô tả công việc"
            name="description"
            rules={[{ required: true, message: "Job Description is required" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả công việc" />
          </Form.Item>

          {/* Job Requirements */}
          <Form.Item
            label="Yêu cầu công việc"
            name="requirements"
            rules={[
              { required: true, message: "Job Requirements are required" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Nhập yêu cầu công việc" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-red-600 hover:bg-red-700"
            >
              Thêm Mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
