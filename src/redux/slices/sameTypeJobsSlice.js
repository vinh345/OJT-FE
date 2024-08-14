import { createSlice } from "@reduxjs/toolkit";
import { getJobsBySameType } from "../../service/jobService";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";

const sameTypeJobsSlice = createSlice({
  name: "sameTypeJobs",
  initialState: {
    loading: IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobsBySameType.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(getJobsBySameType.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(getJobsBySameType.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload;
      });
  },
});

export default sameTypeJobsSlice.reducer;
