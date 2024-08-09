import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { POST } from "../constants/httpMethod";
import { accessToken } from "../constants/accessToken";
import { Cookies } from "react-cookie";

export const getDataFromCookie = createAsyncThunk(
  "auth/getDataFromCookie",
  (userData) => {
    return userData;
  }
);

export const login = createAsyncThunk("auth/login", async (formData) => {
  const response = await BASE_URL[POST]("auth/sign-in", formData);
  if (response.data.error) {
    return response;
  }

  // Lưu cookie
  const cookie = new Cookies();
  cookie.set("accessToken", response.data.data.accessToken, {
    path: "/",
    maxAge: 1 * 60 * 1000,
  });
  cookie.set("type", "Bearer", { path: "/", maxAge: 1 * 60 * 1000 });
  cookie.set("isLogin", true, { path: "/", maxAge: 1 * 60 * 1000 });
  return response;
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (formData) => {
    try {
      const response = await BASE_URL[POST](`auth/changePassword`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const recoverPassword = createAsyncThunk(
  "auth/recoverPassword",
  async (formData) => {
    try {
      const response = await BASE_URL[POST](`/auth/recoverPassword`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const registerCompany = createAsyncThunk(
  "auth/registerCompany",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[POST]("auth/company/sign-up", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
