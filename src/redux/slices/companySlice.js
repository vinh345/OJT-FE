import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getListCompanies } from "../../service/companyService";

const companySlice = createSlice({
  name: "companies",
  initialState: {
    loading: [IDLE],
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListCompanies.pending, (state) => {
        state.loading = [PENDING];
      })
      .addCase(getListCompanies.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = [SUCCESS];
      })
      .addCase(getListCompanies.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error.message;
      });
  },
});

export default companySlice.reducer;
