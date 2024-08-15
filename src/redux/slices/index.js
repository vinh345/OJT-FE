import { combineReducers } from "redux";
import authSlice from "./authSlice";
import locationSlice from "./locationSlice";
import companySlice from "./companySlice";
import jobSlice from "./jobSlice";
import companyDetailSlice from "./companyDetailSlice";
import userInfoSlice from "./userInfoSlice";
import sameTypeJobsSlice from "./sameTypeJobsSlice";
import relatedCompaniesSlice from "./relatedCompaniesSlice";
import getAllJobsByCompanySlice from "./getAllJobsByCompanySlice";
import levelJobSlice from "./levelJobSlice";
import typeJobSlice from "./typeJobSlice";
const reducers = combineReducers({
  auth: authSlice,
  locations: locationSlice,
  companies: companySlice,
  companyDetail: companyDetailSlice,
  jobs: jobSlice,
  userInfor: userInfoSlice,
  sameTypeJobs: sameTypeJobsSlice,
  relatedCompanies: relatedCompaniesSlice,
  getAllJobsByCompanys: getAllJobsByCompanySlice,
  levelJobs: levelJobSlice,
  typeJobs: typeJobSlice,
});

export default reducers;
