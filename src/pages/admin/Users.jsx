import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/CandidateManagement.css";
import { Button, message, Checkbox, Pagination, Spin } from "antd";
import { Link } from "react-router-dom";

export default function Users() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:8080/api.myservice.com/v1/admin/candidates?page=${
            currentPage - 1
          }&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCandidates(response.data.content);
        setFilteredCandidates(response.data.content);
        setTotalCandidates(response.data.totalElements);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy danh sách ứng viên:", error);
        message.error("Không thể lấy danh sách ứng viên.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [currentPage, pageSize]);

  const handleStatusChange = async (candidateId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:8080/api.myservice.com/v1/admin/candidates/${candidateId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // Cập nhật trạng thái của ứng viên trong filteredCandidates
        setFilteredCandidates((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate.id === candidateId
              ? { ...candidate, status: candidate.status === 1 ? 0 : 1 }
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
  
  const handleOutstandingStatusChange = async (candidateId, isOutstanding) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `http://localhost:8080/api.myservice.com/v1/admin/candidates/${candidateId}`,
{ outstanding: isOutstanding },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFilteredCandidates((prevFilteredCandidates) =>
        prevFilteredCandidates.map((candidate) =>
          candidate.id === candidateId
            ? { ...candidate, outstanding: isOutstanding }
            : candidate
        )
      );

      message.success("Cập nhật trạng thái nổi bật thành công!");
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật trạng thái nổi bật:", error);
      message.error("Cập nhật trạng thái nổi bật thất bại!");
    }
  };

  const handleChangeText = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    setFilteredCandidates(
      candidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(keyword) ||
          candidate.address.toLowerCase().includes(keyword)
      )
    );
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedCandidates = [...filteredCandidates];
    if (option === "name-asc") {
      sortedCandidates.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "name-desc") {
      sortedCandidates.sort((a, b) => b.name.localeCompare(a.name));
    } else if (option === "birthday") {
      sortedCandidates.sort(
        (a, b) => new Date(b.birthday) - new Date(a.birthday)
      );
    } else if (option === "status") {
      sortedCandidates.sort((a, b) => a.status - b.status);
    } else if (option === "outstanding") {
      sortedCandidates.sort((a, b) => b.outstanding - a.outstanding);
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
        placeholder="Tìm kiếm ứng viên"
        onChange={handleChangeText}
        className="search-input"
      />
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="sort-select"
      >
        <option value="">Sắp xếp theo</option>
        <option value="name-asc">Tên: A-Z</option>
        <option value="name-desc">Tên: Z-A</option>
        <option value="birthday">Ngày sinh</option>
        <option value="status">Trạng thái hoạt động</option>
        <option value="outstanding">Nổi bật</option>
      </select>
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
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
                <th>Vị trí</th>
                <th>Nổi bật</th>
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
                    className={
                      candidate.status ? "status-active" : "status-locked"
                    }
                  >
                    {candidate.status ? "Hoạt động" : "Bị khóa"}
                  </td>
                  <td>{candidate.position}</td>
                  <td>
                    <Checkbox
                      checked={candidate.outstanding === 1}
                      onChange={(e) =>
                        handleOutstandingStatusChange(
                          candidate.id,
                          e.target.checked ? 1 : 0
                        )
                      }
                    />
                  </td>
                  <td className="flex gap-2">
                    <Link to={`/admin/candidateinfo/${candidate.id}`}>
                      <Button className="bg-green-500">Xem</Button>
                    </Link>
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
            className="candidate-pagination"
          />
        </>
      )}
    </div>
  );
}
