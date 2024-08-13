import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getJobDetail, getListJob } from "../../service/jobService";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    loading: [IDLE],
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListJob.pending, (state) => {
        state.loading = [PENDING];
      })
      .addCase(getListJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = [SUCCESS];
      })
      .addCase(getListJob.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error.message;
      })
      .addCase(getJobDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getJobDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
