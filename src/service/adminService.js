import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { GET } from "../constants/httpMethod";

import { token } from "../constants/token";

export const fetchProfile = async (id) => {

  try {
    const response = await BASE_URL[GET](`admin/viewCandidateInfo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data", error);
    return null;
  }
};

export const fetchCandidateCV = async (id) => {

  try {
    const response = await BASE_URL[GET](
      `admin/viewCandidateCV/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching candidate CV", error);
    throw error;
  }
};