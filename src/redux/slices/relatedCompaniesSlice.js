import { createSlice } from "@reduxjs/toolkit";
import { getJobsBySameType } from "../../service/jobService";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getRelatedCompanies } from "../../service/companyService";

const relatedCompaniesSlice = createSlice({
  name: "relatedCompanies",
  initialState: {
    loading: IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRelatedCompanies.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(getRelatedCompanies.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(getRelatedCompanies.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload;
      });
  },
});

export default relatedCompaniesSlice.reducer;
