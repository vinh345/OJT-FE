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



export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[POST]("auth/sign-in", formData);
      if (response.data.error) {
        return rejectWithValue(response.data.message);
      }

      const cookie = new Cookies();
      cookie.set("accessToken", response.data.data.accessToken, {
        path: "/",
        maxAge: 60 * 1000, 
      });
      cookie.set("type", "Bearer", { path: "/", maxAge: 60 * 1000 });
      cookie.set("isLogin", true, { path: "/", maxAge: 60 * 1000 });
      cookie.set("avatar",response.data.data.avatar, { path: "/", maxAge: 60 * 1000 })
      cookie.set("name",response.data.data.name, { path: "/", maxAge: 60 * 1000 })

      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error.details
        : { message: "An unknown error occurred. Please try again." };

      return rejectWithValue(errorMessage);
    }
  }
);


export const changePassword = createAsyncThunk("auth/changePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[POST](`auth/changePassword`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.error) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error.details
        : { message: "An unknown error occurred. Please try again." };

      return rejectWithValue(errorMessage);
    }
  }
);

export const recoverPassword = createAsyncThunk("auth/recoverPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await BASE_URL[POST](`auth/recoverPassword`, formData);
      if (response.data.error) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error.details
        : { message: "An unknown error occurred. Please try again." };

      return rejectWithValue(errorMessage);
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
