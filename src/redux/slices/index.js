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
import cvSlice from "./cvSlice";
import letterSlice from "./letterSlice";
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
  cv: cvSlice,
  letter:letterSlice,
});

export default reducers;
