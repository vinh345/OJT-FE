import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getAllJobsByCompany } from "../../service/jobService";
import { getCompanyDetailBusiness } from "../../service/companyService";

const getCompanyDetailBusinessSlice = createSlice({
  name: "getCompanyDetailBusiness",
  initialState: {
    data: null,
    loading: IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyDetailBusiness.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(getCompanyDetailBusiness.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(getCompanyDetailBusiness.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload || action.error.message;
      });
  },
});

export default getCompanyDetailBusinessSlice.reducer;
