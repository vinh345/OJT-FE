import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { accessToken } from "../constants/accessToken";
import { GET } from "../constants/httpMethod";

export const fetchProfile = async (id) => {
  try {
    const response = await BASE_URL[GET](`admin/viewCandidateInfo/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
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
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching candidate CV", error);
    throw error;
  }
};