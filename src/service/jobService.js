import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
export const getListJob = createAsyncThunk(
  "jobs/getListJob",
  async ({ title, nameCity, page }, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/job`, {
        params: {
          search: title,
          location: nameCity,
          size: 9,
          page: page,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getJobDetail = createAsyncThunk(
  "jobs/getJobDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/job/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching job details", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getJobsBySameType = createAsyncThunk(
  "jobs/getJobsBySameType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/job/${id}/same-type-jobs`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllJobsByCompany = createAsyncThunk(
  "jobs/getAllJobsByCompany",
  async ({ title, location, page, size }, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/company/job/company`, {
        params: { title, location, page, size },
        headers: {
          Authorization: `Bearer ` + cookie.get("accessToken"),
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk để thêm công việc mới
export const addJob = createAsyncThunk(
  "jobs/addJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[POST]("/company/job", jobData, {
        headers: {
          Authorization: `Bearer ` + cookie.get("accessToken"),
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in addJob thunk:", error);

      return rejectWithValue(
        error.response?.data || { message: "Unknown error occurred" }
      );
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (id, thunkAPI) => {
    try {
      const response = await BASE_URL[DELETE](`/company/job/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);
export const getJobDetailBusiness = createAsyncThunk(
  "jobs/getJobDetailBusiness",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`company/job/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching job details", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Cập nhật Job
export const updateJobDetailBusiness = createAsyncThunk(
  "jobs/updateJobDetailBusiness",
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[PUT](`company/job/${id}`, jobData, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating job details", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
