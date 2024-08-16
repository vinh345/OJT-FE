import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { GET } from "../../constants/httpMethod";

export const fetchTypeJobs = createAsyncThunk(
  "typeJobs/fetchTypeJobs",
  async (
    { page = 0, size = 3, sort = "id", direction = "ASC", search = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await BASE_URL[GET]("/type-job", {
        params: {
          page,
          size,
          sort,
          direction,
          search,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
