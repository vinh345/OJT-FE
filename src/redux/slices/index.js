import { combineReducers } from "redux";
import authSlice from "./authSlice";
import locationSlice from "./locationSlice";
const reducers = combineReducers({
  auth: authSlice,
  locations: locationSlice,
});

export default reducers;
