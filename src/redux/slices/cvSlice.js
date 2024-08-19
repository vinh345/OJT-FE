import { createSlice } from "@reduxjs/toolkit";
import { uploadCV, deleteCV, fetchAllCVs, editCVName, updateCVStatus } from "../../service/candidateService";

const initialState = {
  cvList: [],
  isLoading: false,
  error: null,
  uploadSuccess: false,
  deleteSuccess: false,
  hasActiveCV: false,
  cv: {
    id: "",
    name: "",
  },
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.uploadSuccess = false;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload CV
      .addCase(uploadCV.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.uploadSuccess = false;
      })
      .addCase(uploadCV.fulfilled, (state) => {
        state.isLoading = false;
        state.uploadSuccess = true;
      })
      .addCase(uploadCV.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete CV
      .addCase(deleteCV.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteCV.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cvList = state.cvList.filter(cv => cv.id !== action.meta.arg);
        state.hasActiveCV = state.cvList.some((cv) => cv.status === true);
        state.deleteSuccess = true;
      })
      .addCase(deleteCV.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch All CVs
      .addCase(fetchAllCVs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCVs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cvList = action.payload.data;
        state.hasActiveCV = state.cvList.some((cv) => cv.status === true);
      })
      .addCase(fetchAllCVs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //   Sửa tên CV
      .addCase(editCVName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editCVName.fulfilled, (state, action) => {
        state.status = "succeeded";
        const id = action.meta.arg.id;
        const name = action.meta.arg.name;
        const updatedCV = state.cvList.find((cv) => cv.id === id);
        if (updatedCV) {
          updatedCV.fileName = name;
        }

      })
      .addCase(editCVName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Toggle CV
      .addCase(updateCVStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCVStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.meta.arg;
      
        if (id === 0) {
          // Special case: If id is 0, set all CV statuses to false
          state.cvList = state.cvList.map(cv => ({
            ...cv,
            status: false
          }));
          state.hasActiveCV = false; // Since all statuses are false, hasActiveCV should also be false
        } else {
          // Regular case: Toggle the status of the specific CV
          const updatedCV = state.cvList.find((cv) => cv.id === id);
      
          if (updatedCV) {
            const newStatus = !updatedCV.status;
            state.cvList = state.cvList.map(cv =>
              cv.id === id ? { ...cv, status: newStatus } : { ...cv, status: false }
            );
            // Update hasActiveCV based on the updated cvList
            state.hasActiveCV = state.cvList.some((cv) => cv.status === true);
          }
        }
      })
      



      .addCase(updateCVStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
},
);

export const { clearStatus } = cvSlice.actions;

export default cvSlice.reducer;
