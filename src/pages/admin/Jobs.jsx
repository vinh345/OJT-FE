import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/JobManagement.css"; // Import your CSS file
import { Pagination, Checkbox, message } from "antd"; // Import Ant Design components

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState(""); // State for search input
  const [sortOption, setSortOption] = useState(""); // State for sorting option
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [pageSize, setPageSize] = useState(10); // State for items per page
  const [totalJobs, setTotalJobs] = useState(0); // State for total number of jobs

 
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Get token from localStorage
        const response = await axios.get(
          `http://localhost:8080/api.myservice.com/v1/admin/jobs?page=${currentPage - 1}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to header
            },
          }
        );
      
console.log(response.data.content);

        setJobs(response.data.content);
        setTotalJobs(response.data.totalElements); // Set total number of jobs
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy danh sách công việc:", error);
      }
    };

    fetchJobs();
  }, [currentPage, pageSize]); // Re-fetch jobs when currentPage or pageSize changes

  useEffect(() => {
    let filtered = [...jobs];

    // Apply search filtering
    if (search) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "createdAt") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredJobs(filtered);
  }, [search, sortOption, jobs]); // Re-run filter and sort whenever these states change

  const handleChangeText = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleOutstandingChange = async (jobId, checked) => {
    try {
      const token = localStorage.getItem("accessToken");
      
      // Prepare the payload
      const updatedJob = { outstanding: checked ? 1 : 0 }; // Example toggle value
      
      await axios.patch(
        `http://localhost:8080/api.myservice.com/v1/admin/jobs/${jobId}`,
        updatedJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
          ? { ...job, outstanding: checked ? 1 : 0 } 
          : job
        )
      );
      message.success('Cập nhật thành công!');
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật trạng thái công việc:", error);
      message.error('Cập nhật thất bại!');
    }
  };

  return (
    <div className="job-management-container">
      <h1 className="job-management-title">QUẢN LÍ CÔNG VIỆC</h1>
      <input
        value={search}
        type="text"
        placeholder="Tìm kiếm công việc"
        onChange={handleChangeText}
        className="search-input"
      />
      <select value={sortOption} onChange={handleSortChange} className="sort-select">
        <option value="">Sắp xếp theo</option>
        <option value="title-asc">Tiêu đề: A-Z</option>
        <option value="title-desc">Tiêu đề: Z-A</option>
        <option value="createdAt">Ngày tạo</option>
      </select>
      <table className="job-management-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Công ty</th>
            <th>Mô tả</th>
            <th>Lương</th>
            <th>Yêu cầu</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày hết hạn</th>
            <th>Địa điểm</th> 
            <th>Nổi bật</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.title}</td>
              <td>{job.addressCompany.company.name}</td>
              <td>{job.description}</td>
              <td>{job.salary}</td>
              <td>{job.requirements}</td>
              <td>{new Date(job.createdAt).toLocaleDateString()}</td>
              <td>{new Date(job.expireAt).toLocaleDateString()}</td>
              <td>{job.addressCompany.location.nameCity}</td>
              <td>
                <Checkbox
                  checked={job.outstanding === 1}
                  onChange={(e) => handleOutstandingChange(job.id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalJobs}
        onChange={handlePageChange}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Tổng ${total} công việc`}
      />
    </div>
  );
}
