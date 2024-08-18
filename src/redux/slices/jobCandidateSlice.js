import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getCandidatesByJob } from "../../service/jobCandidate/jobCandidateService";

const jobCandidateSlice = createSlice({
  name: "jobCandidates",
  initialState: {
    loading: IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCandidatesByJob.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(getCandidatesByJob.fulfilled, (state, action) => {
        state.loading = SUCCESS;
        state.data = action.payload;
      })
      .addCase(getCandidatesByJob.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload;
      });
  },
});

export default jobCandidateSlice.reducer;
