import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { GET } from "../../constants/httpMethod";

export const getListLocation = createAsyncThunk(
  "locations/getListLocation",
  async () => {
    const response = await BASE_URL[GET]("/locations");
    return response.data;
  }
);
