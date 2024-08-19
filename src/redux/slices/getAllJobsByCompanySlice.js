import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getAllJobsByCompany } from "../../service/jobService";

const getAllJobsByCompanySlice = createSlice({
  name: "getAllJobsByCompanys",
  initialState: {
    data: null,
    loading: IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobsByCompany.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(getAllJobsByCompany.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(getAllJobsByCompany.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload || action.error.message;
      });
  },
});

export default getAllJobsByCompanySlice.reducer;
