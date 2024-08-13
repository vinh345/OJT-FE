import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getListLocation } from "../../service/Location/locationService";

const locationSlice = createSlice({
  name: "locations",
  initialState: {
    loading: [IDLE],
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListLocation.pending, (state) => {
        state.loading = [PENDING];
      })
      .addCase(getListLocation.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = [SUCCESS];
      })
      .addCase(getListLocation.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
