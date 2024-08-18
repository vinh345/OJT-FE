import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { GET } from "../../constants/httpMethod";

export const fetchTypeCompanys = createAsyncThunk(
  "typeCompanys/fetchType",
  async (
    { page = 0, size = 10, sort = "id", direction = "ASC", search = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await BASE_URL[GET]("/type-company", {
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
