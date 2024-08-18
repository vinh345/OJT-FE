import { createSlice } from "@reduxjs/toolkit";
import { IDLE, PENDING, SUCCESS, FAILED } from "../../constants/status";
import {
  getJobDetailBusiness,
  getListJob,
  updateJobDetailBusiness,
} from "../../service/jobService";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    loading: IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Trạng thái pending khi lấy chi tiết công việc
      .addCase(getListJob.pending, (state) => {
        state.loading = PENDING;
        state.error = null;
      })
      // Trạng thái fulfilled khi lấy thành công chi tiết công việc
      .addCase(getListJob.fulfilled, (state, action) => {
        state.loading = SUCCESS;
        state.data = action.payload;
      })
      // Trạng thái rejected khi có lỗi trong quá trình lấy chi tiết công việc
      .addCase(getListJob.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.payload;
      })
      // Trạng thái fulfilled khi cập nhật công việc thành công
      .addCase(updateJobDetailBusiness.fulfilled, (state, action) => {
        state.loading = SUCCESS;
        state.data = action.payload; // Cập nhật dữ liệu công việc với dữ liệu mới
        state.error = null;
      });
  },
});

export default jobSlice.reducer;
