import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { POST, PUT } from "../constants/httpMethod";
import { accessToken } from "../constants/accessToken";
import { Cookies } from "react-cookie";
import axios from "axios";

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
      const response = await BASE_URL[POST](`auth/recoverPassword`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const candidateRegist = createAsyncThunk(
  "auth/candidateRegist",
  async ({ name, email, password, confirmPassword }, thunkAPI) => {
    try {
      const response = await BASE_URL[POST](`/auth/candidate/sign-up`, {
        name,
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "auth/verifyaccount",
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8080/api.myservice.com/v1/auth/verify?email=${email}&otp=${otp}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resendOtp = createAsyncThunk("auth/resendOtp", async (email, thunkAPI)=>{
  try {
    const response = await axios.put(`http://localhost:8080/api.myservice.com/v1/auth/resendotp?email=${email}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
