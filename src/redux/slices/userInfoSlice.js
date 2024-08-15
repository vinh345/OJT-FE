import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getCandidateInfo } from "../../service/candidateService";

const userInforSlice = createSlice({
  name: "userInfo",
  initialState: {
    loading: [IDLE],
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCandidateInfo.pending, (state) => {
        state.loading = [PENDING];
      })
      .addCase(getCandidateInfo.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.loading = [SUCCESS];
      })
      .addCase(getCandidateInfo.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error.message;
      });
  },
});

export default userInforSlice.reducer;
