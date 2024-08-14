import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { accessToken } from "../constants/accessToken";
import { GET } from "../constants/httpMethod";

export const fetchProfile = async (id) => {
  try {
    const response = await BASE_URL[GET](`/viewCandidateInfo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data", error);
    return null;
  }
};

// Cập nhật hàm fetchCompanyList để nhận tham số tìm kiếm
export const getListCompanies = createAsyncThunk(
  "companies/getListCompanies",
  async ({ name, location }) => {
    // Tạo URL với query parameters cho tìm kiếm
    const query = new URLSearchParams({
      name: name || "",
      location: location || "",
    }).toString();

    try {
      const response = await BASE_URL[GET](`/company?${query}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching companies", error);
      return null;
    }
  }
);

export const getCompanyDetail = createAsyncThunk(
  "companies/getCompanyDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/company/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Hàm gọi API để lấy danh sách công ty có cùng typeCompany
export const getRelatedCompanies = createAsyncThunk(
  "companies/getRelatedCompanies",
  async (companyId, { rejectWithValue }) => {
    try {
      // Gọi API với companyId
      const response = await BASE_URL[GET](
        `/company/${companyId}/related-companies`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching related companies", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
