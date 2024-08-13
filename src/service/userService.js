import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { GET } from "../constants/httpMethod";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
export const getCandidateInfo = createAsyncThunk("user/info", async () => {
  try {
    const response = BASE_URL[GET]("/candidate/info", {
      headers: {
        Authorization: `Bearer ${cookie.get("accessToken")}`,
      },
    });
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
