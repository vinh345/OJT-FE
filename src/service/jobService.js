import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { GET } from "../constants/httpMethod";
import { accessToken } from "../constants/accessToken";

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

export const getJobsBySameType = createAsyncThunk(
  "jobs/getJobsBySameType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/company/job/${id}/same-type-jobs`);
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
      const response = await BASE_URL({
        method: GET,
        url: `/company/job/company`,
        params: { title, location, page, size },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);
