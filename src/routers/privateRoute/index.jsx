import React from "react";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import CandidateProfilePage from "../../pages/admin/CandidateProfile";
import ChangePassword from "../../pages/auth/changePassword";
import LayoutIndex from "../../layouts";
import UserInfor from "../../pages/candidateinformation";
import CandidateCV from "../../pages/admin/CandidateCV";
import CVManagement from "../../pages/candidateinformation/CV/CVManagement";
import CVPage from "../../pages/candidateinformation/CV/CVPage";
import DefaultCV from "../../pages/candidateinformation/CV/DefaultCV";

import ListCompany from "../../pages/company/listCompany/ListCompany";

import JobDetail from "../../pages/job/JobDetail";
import JobDetailBusiness from "../../pages/job/JobDetailBusiness";
import CompanyDetailBusiness from "../../pages/company/listCompany/CompanyDetailBusiness";
import AddJobBusiness from "../../pages/company/listCompany/AddJobBusiness";
import CompanyDetail from "../../pages/company/listCompany/CompanyDetailUser";
import FormLoginAdmin from "../../components/FormLoginAdmin";
import AdminLayout from "../../pages/admin/AdminLayout";
import Dashboard from "../../pages/admin/Dashboard";
import Users from "../../pages/admin/Users";
import CompanyManagement from "../../pages/admin/Company";
import Jobs from "../../pages/admin/Jobs";

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
          { path: "infor", element: <PrivateRoute element={<UserInfor />} /> },

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
          {
            path: "cv",
            children: [
              {
                path: "",
                element: <PrivateRoute element={<CVManagement />} />,
              },
              {
                path: "default",
                exact: true,
                element: <PrivateRoute element={<DefaultCV />} />,
              },
              {
                path: ":id",
                element: <PrivateRoute element={<CVPage />} />,
              },
            ],
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
          {
            path: "candidate/detail/:id",
            element: <PrivateRoute element={<CompanyDetailBusiness />} />,
          },
        ],
      },
         
        
      
      {
        path: "/admin/login",
        element: <FormLoginAdmin />, // Login route for admin
        children : [
          
        ]
      },
    ],
  
 
  
    path: "/admin",
    element: <PrivateRoute element={<AdminLayout />} />, // Protects the admin layout
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "candidate", element: <Users /> },
      { path: "company", element: <CompanyManagement /> },
      { path: "jobs", element: <Jobs /> },
    ],
  },
];

export default privateRoutes;
