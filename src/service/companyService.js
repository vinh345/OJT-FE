import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL, { formAxios } from "../api";
import { GET, PUT } from "../constants/httpMethod";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
// Cập nhật hàm fetchCompanyList để nhận tham số tìm kiếm và gửi kèm accessToken
export const getListCompanies = createAsyncThunk(
  "companies/getListCompanies",
  async ({ name, location, page }, thunkAPI) => {
    const query = new URLSearchParams({
      name: name || "",
      location: location || "",
      size: 9,
      page: page,
    }).toString();

    try {
      const response = await BASE_URL[GET](`/candidate/company?${query}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"), // Thêm accessToken vào header
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching companies", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message); // Sử dụng rejectWithValue để trả về lỗi
    }
  }
);
// Cập nhật hàm getCompanyDetail để gửi kèm accessToken
export const getCompanyDetail = createAsyncThunk(
  "companies/getCompanyDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/candidate/company/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"), // Thêm accessToken vào header
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching company detail", error);
      return rejectWithValue(error.response?.data || error.message); // Sử dụng rejectWithValue để trả về lỗi
    }
  }
);

// Cập nhật hàm getCompanyDetail để gửi kèm accessToken
export const getCompanyDetailBusiness = createAsyncThunk(
  "companies/getCompanyDetailBusiness",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/company/detail`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"), // Thêm accessToken vào header
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching company detail", error);
      return rejectWithValue(error.response?.data || error.message); // Sử dụng rejectWithValue để trả về lỗi
    }
  }
);

// Hàm gọi API để lấy danh sách công ty có cùng typeCompany
export const getRelatedCompanies = createAsyncThunk(
  "companies/getRelatedCompanies",
  async (companyId, { rejectWithValue }) => {
    try {
      // Gọi API với companyId và gửi kèm accessToken
      const response = await BASE_URL[GET](
        `/candidate/company/${companyId}/related-companies`,
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"), // Thêm accessToken vào header
          },
        }
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


export const getCandidateInfo = createAsyncThunk("company/getCandidateInfo", async (id,thunkAPI) => {
  try {
    const response = await BASE_URL[GET](
      `/company/candidate/info/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
})

// Hàm gọi API để lấy danh sách job của một công ty
export const getAllJobsByCompanyUser = createAsyncThunk(
  "jobs/getAllJobsByCompanyUser",
  async (
    {
      companyId,
      title,
      location,
      page = 0,
      size = 10,
      sort = "id",
      direction = "ASC",
    },
    { rejectWithValue }
  ) => {
    try {
      // Xây dựng URL với các tham số phân trang và sắp xếp
      const query = new URLSearchParams({
        title,
        location,
        page,
        size,
        sort,
        direction,
      }).toString();

      const response = await BASE_URL[GET](
        `/candidate/company/${companyId}/jobs?${query}`,
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"), // Thêm accessToken vào header
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs by company", error);
      return rejectWithValue(error.response?.data || error.message); // Sử dụng rejectWithValue để trả về lỗi
    }
  }
);

// Hàm gọi API để cập nhật thông tin công ty
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (companyRequest, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      if (companyRequest.name) formData.append("name", companyRequest.name);
      if (companyRequest.logo) formData.append("logo", companyRequest.logo);
      if (companyRequest.website)
        formData.append("website", companyRequest.website);
      if (companyRequest.linkFacebook)
        formData.append("linkFacebook", companyRequest.linkFacebook);
      if (companyRequest.linkLinkedin)
        formData.append("linkLinkedin", companyRequest.linkLinkedin);
      if (companyRequest.size) formData.append("size", companyRequest.size);
      if (companyRequest.description)
        formData.append("description", companyRequest.description);
      if (companyRequest.phone) formData.append("phone", companyRequest.phone);
      if (companyRequest.policy)
        formData.append("policy", companyRequest.policy);
      if (companyRequest.typeCompany)
        formData.append("typeCompany", companyRequest.typeCompany);
      if (companyRequest.address)
        formData.append("address", companyRequest.address);
      if (companyRequest.mapUrl)
        formData.append("mapUrl", companyRequest.mapUrl);
      if (companyRequest.locationId)
        formData.append("locationId", companyRequest.locationId);

      // Gọi API để cập nhật thông tin công ty
      const response = await formAxios[PUT]("/company/update", formData, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"), // Thêm accessToken vào header
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating company", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

