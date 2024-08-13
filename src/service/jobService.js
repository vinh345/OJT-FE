import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { GET } from "../constants/httpMethod";

// Async thunk to get a list of jobs
export const getListJob = createAsyncThunk(
  "jobs/getListJob",
  async ({ title, nameCity }, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/company/job`, {
        params: {
          search: title,
          location: nameCity,
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
      const response = await BASE_URL[GET](`/company/job/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
