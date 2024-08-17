import { createSlice } from "@reduxjs/toolkit";
import { fetchLevelJobs } from "../../service/LevelJob/levelJobService";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";

const levelJobSlice = createSlice({
  name: "levelJobs",
  initialState: {
    loading: IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLevelJobs.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(fetchLevelJobs.fulfilled, (state, action) => {
        state.loading = SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchLevelJobs.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload;
      });
  },
});

export default levelJobSlice.reducer;
