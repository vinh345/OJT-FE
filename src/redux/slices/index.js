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
import levelJobSlice from "./levelJobSlice";
import typeJobSlice from "./typeJobSlice";
import getAllJobsByCompanyUserSlice from "./getAllJobsByCompanyUserSlice";
import getCompanyDetailBusinessSlice from "./getCompanyDetailBusinessSlice";
import typeCompanySlice from "./typeCompanySlice";
import getJobDetailBusinessSlice from "./getJobDetailBusinessSlice";
import addressCompanySlice from "./addressCompanySlice";
import jobCandidateSlice from "./jobCandidateSlice";
import JobDetailAllSlice from "./JobDetailAllSlice";
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
  levelJobs: levelJobSlice,
  typeJobs: typeJobSlice,
  getAllJobsByCompanyUser: getAllJobsByCompanyUserSlice,
  getCompanyDetailBusiness: getCompanyDetailBusinessSlice,
  typeCompanys: typeCompanySlice,
  getJobDetailBusiness: getJobDetailBusinessSlice,
  addressCompanys: addressCompanySlice,
  jobCandidates: jobCandidateSlice,
  getJobDetail: JobDetailAllSlice,
});

export default reducers;
