import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { fetchTypeJobs } from "../../service/typeJob/typeJobService";

const typeJobSlice = createSlice({
  name: "typeJobs",
  initialState: {
    loading: IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypeJobs.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(fetchTypeJobs.fulfilled, (state, action) => {
        state.loading = SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchTypeJobs.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload;
      });
  },
});

export default typeJobSlice.reducer;
