import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getCompanyDetail } from "../../service/companyService";
import { Pending } from "@mui/icons-material";

const companyDetailSlice = createSlice({
  name: "companyDetail",
  initialState: {
    data: null,
    loading: IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyDetail.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(getCompanyDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(getCompanyDetail.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload || action.error.message;
      });
  },
});

export default companyDetailSlice.reducer;
