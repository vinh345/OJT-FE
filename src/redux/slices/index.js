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
import getAllJobsByCompanyUserSlice from "./getAllJobsByCompanyUserSlice";
import getCompanyDetailBusinessSlice from "./getCompanyDetailBusinessSlice";
import typeCompanySlice from "./typeCompanySlice";
import getJobDetailBusinessSlice from "./getJobDetailBusinessSlice";
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
  getAllJobsByCompanyUser: getAllJobsByCompanyUserSlice,
  getCompanyDetailBusiness: getCompanyDetailBusinessSlice,
  typeCompanys: typeCompanySlice,
  getJobDetailBusiness: getJobDetailBusinessSlice,
});

export default reducers;
