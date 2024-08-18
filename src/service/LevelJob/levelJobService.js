import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET } from "../../constants/httpMethod";
import BASE_URL from "../../api";

export const fetchLevelJobs = createAsyncThunk(
  "levelJobs/fetchLevelJobs",
  async (
    { page = 0, size = 3, sort = "id", direction = "ASC", search = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await BASE_URL[GET]("/level-job", {
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
