import React, { useState } from "react";
import { Card } from "@mui/material";
import { EnvironmentOutlined } from "@ant-design/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Badge, notification } from "antd";
import DeleteModalJob from "../../components/job/DeleteJobCompany";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { deleteJob } from "../../service/jobService";

const JobCardItemBusiness = ({ job, onJobDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!job) {
    return null;
  }

  const companyLogo =
    job.companyLogo ||
    "https://sohanews.sohacdn.com/160588918557773824/2024/3/29/photo-7-17116917864761999588629-1711694813016-1711694813242419126640.jpg";
  const companyName = job.companyName || "No company name specified";
  const cityName = job.city || "No location specified";

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const resultAction = await dispatch(deleteJob(job.id));

      if (deleteJob.fulfilled.match(resultAction)) {
        notification.success({
          message: "Xóa thành công",
          description: "Công việc đã được xóa thành công.",
        });
        onJobDelete(job.id);
        setIsDeleteModalOpen(false);
      } else {
        throw new Error(resultAction.payload || "Xóa thất bại");
      }
    } catch (error) {
      notification.error({
        message: "Xóa thất bại",
        description: error.message || "Đã xảy ra lỗi khi xóa công việc.",
      });
    }
  };

  const handleNavigateToDetail = () => {
    navigate(`/company/jobDetail/${job.id}`);
  };

  return (
    <>
      <Card className="border rounded-lg shadow-sm p-4">
        <div className="flex justify-between">
          <div>
            <h6 className="font-semibold">
              {job.title || "No title available"}
            </h6>
            <div className="flex items-center mb-2">
              {job.typeJob && job.typeJob.length > 0 ? (
                job.typeJob.map((type, index) => (
                  <Badge
                    key={index}
                    count={type}
                    style={{ backgroundColor: "#52c41a", marginRight: "8px" }}
                  />
                ))
              ) : (
                <Badge
                  count="Full-Time"
                  style={{ backgroundColor: "#52c41a", marginRight: "8px" }}
                />
              )}
              <p className="text-gray-500">
                Salary: {job.salary || "No salary specified"}
              </p>
            </div>
          </div>
          <DeleteIcon
            className="text-gray-500 hover:text-red-500"
            onClick={handleOpenDeleteModal}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <img
              src={companyLogo}
              alt="company logo"
              className="w-10 h-10 mr-2"
              onError={(e) => {
                e.target.src =
                  "https://cafefcdn.com/203337114487263232/2023/3/13/photo-7-167869696182725217650.jpg";
              }}
            />
            <div>
              <p className="font-semibold">{companyName}</p>
              <div className="flex items-center">
                <EnvironmentOutlined className="text-gray-500 mr-2" />
                <span className="text-gray-500">{cityName}</span>
              </div>
            </div>
          </div>

          <BorderColorIcon
            className="text-gray-500 hover:text-red-500"
            onClick={handleNavigateToDetail}
          />
        </div>
      </Card>

      <DeleteModalJob
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default JobCardItemBusiness;
