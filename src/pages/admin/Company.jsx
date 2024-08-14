import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/CompanyManagement.css"; // Import CSS file for styling
import { Button, message, Popconfirm, Checkbox } from "antd"; // Import Ant Design components for notifications and confirmation
import { Pagination } from "antd"; // Import Ant Design Pagination component

export default function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]); // State for filtered companies
  const [search, setSearch] = useState(""); // State for search input
  const [sortOption, setSortOption] = useState(""); // State for sorting option
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [pageSize, setPageSize] = useState(10); // State for items per page
  const [totalCompanies, setTotalCompanies] = useState(0); // State for total number of companies

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Get token from localStorage
        const response = await axios.get(
          `http://localhost:8080/api.myservice.com/v1/admin/companies?page=${
            currentPage - 1
          }&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to header
            },
          }
        );

        setCompanies(response.data.content);
        setFilteredCompanies(response.data.content); // Initialize filtered companies
        setTotalCompanies(response.data.totalElements); // Set total number of companies
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy danh sách công ty:", error);
      }
    };

    fetchCompanies();
  }, [currentPage, pageSize]); // Re-fetch companies when currentPage or pageSize changes

  const handleChangeText = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    setFilteredCompanies(
      companies.filter((company) =>
        company.name.toLowerCase().includes(keyword)
      )
    );
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedCompanies = [...filteredCompanies];
    if (option === "name-asc") {
      sortedCompanies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "name-desc") {
      sortedCompanies.sort((a, b) => b.name.localeCompare(a.name));
    } else if (option === "established-date") {
      sortedCompanies.sort(
        (a, b) => new Date(a.establishedDate) - new Date(b.establishedDate)
      );
    }
    setFilteredCompanies(sortedCompanies);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken"); // Get token from localStorage
      await axios.delete(
        `http://localhost:8080/api.myservice.com/v1/admin/companies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to header
          },
        }
      );
      // Update the UI after successful deletion
      setFilteredCompanies(
        filteredCompanies.filter((company) => company.id !== id)
      );
      setCompanies(companies.filter((company) => company.id !== id));
      message.success("Xóa công ty thành công!"); // Show success message
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa công ty:", error);
      message.error("Xóa công ty thất bại!"); // Show error message
    }
  };


  const handleOutstandingChange = async (companyId, isOutstanding) => {
    try {
      const token = localStorage.getItem("accessToken"); // Get token from localStorage
      await axios.patch(
        `http://localhost:8080/api.myservice.com/v1/admin/companies/${companyId}`, // Assuming this is the endpoint for updating outstanding status
        { outstanding: isOutstanding },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to header
          },
        }
      );
  
      // Update the state to reflect the change
      setCompanies(companies.map(company => 
        company.id === companyId ? { ...company, outstanding: isOutstanding } : company
      ));
      setFilteredCompanies(filteredCompanies.map(company => 
        company.id === companyId ? { ...company, outstanding: isOutstanding } : company
      ));
  
      message.success("Cập nhật trạng thái nổi bật thành công!"); // Show success message
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật trạng thái nổi bật:", error);
      message.error("Cập nhật trạng thái nổi bật thất bại!"); // Show error message
    }
  };
  

  return (
    <div className="company-management-container">
      <h1 className="company-management-title">QUẢN LÍ CÔNG TY</h1>
      <input
        value={search}
        type="text"
        placeholder="Tìm kiếm công ty"
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
        <option value="established-date">Ngày thành lập</option>
      </select>
      <table className="company-management-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            {/* <th>logo</th> */}
            <th>Website</th>
            <th>Ngày thành lập</th>
            <th>linkFacebook</th>
            {/* <th>linkLinkedin</th> */}
            <th>emailCompany</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>typeCompany</th>
            <th>Nổi bật</th>
            <th colSpan={2}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              {/* <td>{company.logo}</td> */}
              <td>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </td>
              <td>{new Date(company.establishedDate).toLocaleDateString()}</td>
              <td>{company.linkFacebook}</td>
              {/* <td>{company.linkLinkedin}</td> */}
              <td>{company.emailCompany}</td>
              <td> adresss</td>
              <td>{company.phone}</td>
              <td>{company.typeCompany.name}</td>
              <td>
                <Checkbox
                  checked={company.outstanding} // Bind checkbox to the company's outstanding status
                  onChange={(e) =>
                    handleOutstandingChange(company.id, e.target.checked)
                  } // Handle change event
                />
              </td>

              <td className="btn-delete">
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa công ty này?"
                  onConfirm={() => handleDelete(company.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className="ant-btn-details-delete">xóa</Button>
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalCompanies}
        onChange={handlePageChange}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
      />
    </div>
  );
}
