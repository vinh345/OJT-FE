import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { GET, POST } from "../constants/httpMethod";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
export const getListJob = createAsyncThunk(
  "jobs/getListJob",
  async ({ title, nameCity }, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/company/job`, {
        params: {
          search: title,
          location: nameCity,
        },
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"), // Thêm accessToken vào header
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
      const response = await BASE_URL[GET](`/company/job/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"), // Thêm accessToken vào header
        },
      });
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
      const response = await BASE_URL[GET](
        `/company/job/${id}/same-type-jobs`,
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"), // Thêm accessToken vào header
          },
        }
      );
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
