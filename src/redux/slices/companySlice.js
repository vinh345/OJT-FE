import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getListCompanies, updateCompany } from "../../service/companyService";

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
      // Handle list companies actions
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
      })

      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (company) => company.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.loading = [SUCCESS];
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error.message;
      });
  },
});

export default companySlice.reducer;
