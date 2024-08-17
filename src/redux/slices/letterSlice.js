import { createSlice } from '@reduxjs/toolkit';
import { getCurrentLetter,editLetter,addLetter } from '../../service/candidateService';

const initialState = {
  currentLetter: null,
  isLoading: false,
  error: null,
};

const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {
    // You can define synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentLetter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentLetter = action.payload;
      })
      .addCase(getCurrentLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch letter';
      })
      .addCase(editLetter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentLetter = action.payload;
      })
      .addCase(editLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to edit letter';
      })
      .addCase(addLetter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentLetter = action.payload;
      })
      .addCase(addLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to add letter';
      });
  },
});

export default letterSlice.reducer;
