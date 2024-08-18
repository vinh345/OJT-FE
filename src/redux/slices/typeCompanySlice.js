import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { fetchTypeCompanys } from "../../service/typeCompany/typeCompanyService";

const typeCompanySlice = createSlice({
  name: "typeCompanys",
  initialState: {
    loading: IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypeCompanys.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(fetchTypeCompanys.fulfilled, (state, action) => {
        state.loading = SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchTypeCompanys.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload;
      });
  },
});

export default typeCompanySlice.reducer;
