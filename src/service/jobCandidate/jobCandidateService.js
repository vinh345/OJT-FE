import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import BASE_URL from "../../api";
import { GET } from "../../constants/httpMethod";
const cookie = new Cookies();

export const getCandidatesByJob = createAsyncThunk(
  "jobs/getCandidatesByJob",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](`/company/job/${id}/candidates`, {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching candidates by job", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
