import React from "react";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import CandidateProfilePage from "../../pages/admin/CandidateProfile";
import ChangePassword from "../../pages/auth/changePassword";
import LayoutIndex from "../../layouts";
import UserInfor from "../../pages/candidateinformation";
import CandidateCV from "../../pages/admin/CandidateCV";

import ListCompany from "../../pages/company/listCompany/ListCompany";

import JobDetail from "../../pages/job/JobDetail";
import JobDetailBusiness from "../../pages/job/JobDetailBusiness";
import CompanyDetailBusiness from "../../pages/company/listCompany/CompanyDetailBusiness";
import AddJobBusiness from "../../pages/company/listCompany/AddJobBusiness";
import CompanyDetail from "../../pages/company/listCompany/CompanyDetailUser";

const privateRoutes = [
  {
    path: "",
    element: <LayoutIndex />,
    exact: true,
    children: [
      {
        path: "auth/changePassword",
        element: <PrivateRoute element={<ChangePassword />} />,
      },
      {
        path: "admin",
        children: [
          {
            path: "candidateInfo/:id",
            element: <PrivateRoute element={<CandidateProfilePage />} />,
          },
          {
            path: "candidateCV/:id",
            element: <PrivateRoute element={<CandidateCV />} />,
          },
        ],
      },
      {
        path: "/user",
        children: [
          {
            path: "infor",
            element: <PrivateRoute element={<UserInfor />} />,
          },
          {
            path: "listCompany",
            element: <PrivateRoute element={<ListCompany />} />,
          },
          {
            path: "company/detail/:id",
            element: <PrivateRoute element={<CompanyDetail />} />,
          },

          {
            path: "jobDetail/:id",
            element: <PrivateRoute element={<JobDetail />} />,
          },
        ],
      },
      {
        path: "/company",
        children: [
          {
            path: "addJob",
            element: <PrivateRoute element={<AddJobBusiness />} />,
          },
          {
            path: "jobDetail/:id",
            element: <PrivateRoute element={<JobDetailBusiness />} />,
          },
          {
            path: "detail",
            element: <PrivateRoute element={<CompanyDetailBusiness />} />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;
