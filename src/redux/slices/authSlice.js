import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getDataFromCookie, login,changePassword,recoverPassword } from "../../service/authService";

const authSlice = createSlice({
    name: "auth",
    initialState: {
      loading: [IDLE],
      data: null,
      error: null,
    },
    reducers: {
      logout: (state) => {
        state.data = null;
        // Xóa cookie
        Cookies.remove("token");
        Cookies.remove("userInfo");
      },
    },
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
        state.loading = [PENDING];
      });
  
      builder.addCase(login.fulfilled, (state, action) => {
        state.data = action.payload.data;
        
        state.loading =[SUCCESS];
      });

      builder.addCase(getDataFromCookie.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  
      builder.addCase(login.rejected, (state, action) => {
        state.error = action.payload.data;
        
        state.loading = [FAILED];
        
      });
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;