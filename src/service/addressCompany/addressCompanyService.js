import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { GET } from "../../constants/httpMethod";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
export const fetchAddressCompanys = createAsyncThunk(
  "addressCompany/fetchAddressCompanys",
  async ({ rejectWithValue }) => {
    try {
      const response = await BASE_URL[GET](
        "/company/address-company/current-company",
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
