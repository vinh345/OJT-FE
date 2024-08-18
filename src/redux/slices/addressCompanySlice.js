import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { fetchAddressCompanys } from "../../service/addressCompany/addressCompanyService";

const addressCompanySlice = createSlice({
  name: "addressCompanys",
  initialState: {
    loading: [IDLE],
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressCompanys.pending, (state) => {
        state.loading = [PENDING];
      })
      .addCase(fetchAddressCompanys.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = [SUCCESS];
      })
      .addCase(fetchAddressCompanys.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error.message;
      });
  },
});

export default addressCompanySlice.reducer;
