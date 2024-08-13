import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/CandidateManagement.css"; // Import file CSS
import { Button, message } from "antd"; // Import Ant Design message component for notifications
import { Pagination } from 'antd'; // Import Ant Design Pagination component

export default function Users() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]); // State for filtered candidates
  const [search, setSearch] = useState(""); // State for search input
  const [sortOption, setSortOption] = useState(""); // State for sorting option
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [pageSize, setPageSize] = useState(10); // State for items per page
  const [totalCandidates, setTotalCandidates] = useState(0); // State for total number of candidates

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Get token from localStorage
        const response = await axios.get(
          `http://localhost:8080/api.myservice.com/v1/admin/candidates?page=${currentPage - 1}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to header
            },
          }
        );
        
        setCandidates(response.data.content);
        setFilteredCandidates(response.data.content); // Initialize filtered candidates
        setTotalCandidates(response.data.totalElements); // Set total number of candidates
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy danh sách ứng viên:", error);
      }
    };

    fetchCandidates();
  }, [currentPage, pageSize]); // Re-fetch candidates when currentPage or pageSize changes

  const handleStatusChange = async (candidateId) => {
    try {
      const token = localStorage.getItem("accessToken"); // Get token from localStorage

      const response = await axios.put(
        `http://localhost:8080/api.myservice.com/v1/admin/candidates/${candidateId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to header
          },
        }
      );

      if (response.status === 200) {
        setFilteredCandidates((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate.id === candidateId
              ? { ...candidate, status: response.data }
              : candidate
          )
        );
        message.success("Trạng thái ứng viên đã được cập nhật thành công!");
      } else {
        message.error("Cập nhật trạng thái thất bại!");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi thay đổi trạng thái:", error);
      message.error("Có lỗi xảy ra khi thay đổi trạng thái!");
    }
  };

  const handleChangeText = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    setFilteredCandidates(
      candidates.filter((candidate) =>
        candidate.name.toLowerCase().includes(keyword)
      )
    );
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedCandidates = [...filteredCandidates];
    if (option === "name-asc") {
      sortedCandidates.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (option === "name-desc") {
      sortedCandidates.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else if (option === "birthday") {
      sortedCandidates.sort((a, b) =>
        new Date(a.birthday) - new Date(b.birthday)
      );
    } else if (option === "status") {
      sortedCandidates.sort((b, a) =>
        a.status === b.status ? 0 : a.status ? -1 : 1
      );
    }
    setFilteredCandidates(sortedCandidates);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="candidate-management-container">
      <h1 className="candidate-management-title">QUẢN LÍ ỨNG VIÊN</h1>
      <input
        value={search}
        type="text"
        placeholder="Tìm kiếm ứng viên "
        onChange={handleChangeText}
        className="search-input"
      />
      <select value={sortOption} onChange={handleSortChange} className="sort-select">
        <option value="">Sắp xếp theo</option>
        <option value="name-asc">Tên: A-Z</option>
        <option value="name-desc">Tên: Z-A</option>
        <option value="birthday">Ngày sinh</option>
        <option value="status">Trạng thái hoạt động</option>
      </select>
      <table className="candidate-management-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày sinh</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Giới tính</th>
            <th>Trạng thái</th>
            <th>LinkedIn</th>
            <th>GitHub</th>
            <th>Vị trí</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.accountEmail}</td>
              <td>{new Date(candidate.birthday).toLocaleDateString()}</td>
              <td>{candidate.address}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.gender ? "Nam" : "Nữ"}</td>
              <td
                className={candidate.status ? "status-active" : "status-locked"}
              >
                {candidate.status ? "Hoạt động" : "Bị khóa"}
              </td>
              <td>
                <a
                  href={candidate.linkLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </td>
              <td>
                <a
                  href={candidate.linkGit}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </td>
              <td>{candidate.position}</td>
              <td>
                <Button
                  className={
                    candidate.status ? "ant-btn-lock" : "ant-btn-unlock"
                  }
                  onClick={() => handleStatusChange(candidate.id)}
                >
                  {candidate.status ? "Khóa" : "Mở khóa"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalCandidates}
        onChange={handlePageChange}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
      />
    </div>
  );
}
