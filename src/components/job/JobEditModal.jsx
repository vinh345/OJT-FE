import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateJobDetailBusiness } from "../../service/jobService";

import "tailwindcss/tailwind.css";
import { formatDate } from "../../utils/formatData";
import { fetchTypeJobs } from "../../service/typeJob/typeJobService";
import { fetchLevelJobs } from "../../service/LevelJob/levelJobService";

const { TextArea } = Input;

const JobEditModal = ({ visible, onClose, job, onUpdate }) => {
  const dispatch = useDispatch();
  const { data: levelJobs } = useSelector((state) => state.levelJobs);
  const { data: typeJobs } = useSelector((state) => state.typeJobs);
  console.log(levelJobs);
  console.log(typeJobs);

  const [formData, setFormData] = useState({
    title: "",
    typeJobIds: [],
    salary: "",
    levelJobIds: [],
    description: "",
    requirements: "",
    expireAt: null,
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        typeJobIds: job.typeJobIds || [],
        salary: job.salary || "",
        levelJobIds: job.levelJobIds || [],
        description: job.description || "",
        requirements: job.requirements || "",
        expireAt: job.expireAt ? new Date(job.expireAt) : null,
      });
    }
  }, [job]);

  useEffect(() => {
    dispatch(fetchLevelJobs({}));
    dispatch(fetchTypeJobs({}));
  }, [dispatch]);

  const handleOk = () => {
    const jobData = {
      ...formData,
      expireAt: formData.expireAt
        ? formData.expireAt.toISOString().split("T")[0]
        : null,
    };

    dispatch(updateJobDetailBusiness({ id: job.id, jobData }))
      .unwrap()
      .then(() => {
        onUpdate();
        onClose();
      })
      .catch((error) => {
        console.error("Failed to update job:", error);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDateChange = (event) => {
    const value = event.target.value;

    // Check if the input has a value, and create a new Date object
    const date = value ? new Date(value) : null;

    // Validate the date before setting it in state
    if (date && !isNaN(date.getTime())) {
      setFormData({ ...formData, expireAt: date });
    } else {
      setFormData({ ...formData, expireAt: null });
    }
  };

  return (
    <Modal
      title="Cập nhật thông tin công việc"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy Bỏ
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Cập Nhật
        </Button>,
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Tên công việc</label>
          <Input
            placeholder="Technical Support"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Thời gian làm việc</label>
          <Select
            mode="multiple"
            value={formData.typeJobIds}
            className="w-full"
            onChange={(value) =>
              setFormData({ ...formData, typeJobIds: value })
            }
          >
            {typeJobs?.content?.map((typeJob) => (
              <Select.Option key={typeJob.id} value={typeJob.id}>
                {typeJob.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block font-bold mb-1">Mức lương</label>
          <Input
            placeholder="$200 - $1500"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Cấp độ chuyên môn</label>
          <Select
            mode="multiple"
            value={formData.levelJobIds}
            className="w-full"
            onChange={(value) =>
              setFormData({ ...formData, levelJobIds: value })
            }
          >
            {levelJobs?.content?.map((levelJob) => (
              <Select.Option key={levelJob.id} value={levelJob.id}>
                {levelJob.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block font-bold mb-1">Mô tả công việc</label>
          <TextArea
            rows={4}
            placeholder="Hint text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Thời gian hết hạn</label>
          <input
            type="date"
            value={
              formData.expireAt
                ? formData.expireAt
                : ""
            }
            onChange={handleDateChange}
            className="w-full border rounded p-2"
          />
          {formData.expireAt && !isNaN(formData.expireAt.getTime()) && (
            <div className="mt-2">
              <strong>Ngày hết hạn:</strong> {formatDate(formData.expireAt)}
            </div>
          )}
        </div>

        <div>
          <label className="block font-bold mb-1">Thời gian hết hạn</label>
          <input
            type="date"
            value={
              formData.expireAt
                ? formData.expireAt
                : ""
            }
            onChange={handleDateChange}
            className="w-full border rounded p-2"
          />
          {formData.expireAt && (
            <div className="mt-2">
              <strong>Ngày hết hạn:</strong> {formatDate(formData.expireAt)}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default JobEditModal;
