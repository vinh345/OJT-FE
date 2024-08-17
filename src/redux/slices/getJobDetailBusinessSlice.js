import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getJobDetailBusiness } from "../../service/jobService";

const getJobDetailBusinessSlice = createSlice({
  name: "getJobDetailBusiness",
  initialState: {
    data: null,
    loading: IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobDetailBusiness.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(getJobDetailBusiness.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(getJobDetailBusiness.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload || action.error.message;
      });
  },
});

export default getJobDetailBusinessSlice.reducer;
