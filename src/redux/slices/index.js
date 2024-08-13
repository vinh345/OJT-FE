import { combineReducers } from "redux";
import authSlice from "./authSlice";
import locationSlice from "./locationSlice";
import userInfoSlice from "./userInfoSlice";
const reducers = combineReducers({
  auth: authSlice,
  locations: locationSlice,
  userInfor: userInfoSlice,
});

export default reducers;
