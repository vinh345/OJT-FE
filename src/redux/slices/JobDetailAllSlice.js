import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getJobDetail, getJobDetailBusiness } from "../../service/jobService";

const JobDetailAllSlice = createSlice({
  name: "getJobDetail",
  initialState: {
    data: null,
    loading: IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobDetail.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(getJobDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(getJobDetail.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload || action.error.message;
      });
  },
});

export default JobDetailAllSlice.reducer;
