import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getAllJobsByCompanyUser } from "../../service/companyService";

const getAllJobsByCompanyUserSlice = createSlice({
  name: "getAllJobsByCompanyUser",
  initialState: {
    data: null,
    loading: IDLE,
    error: null,
  },
  reducers: {
    resetJobs: (state) => {
      state.data = null;
      state.loading = IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobsByCompanyUser.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(getAllJobsByCompanyUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(getAllJobsByCompanyUser.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetJobs } = getAllJobsByCompanyUserSlice.actions;
export default getAllJobsByCompanyUserSlice.reducer;
