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
import AdminLayout from "../../pages/admin/AdminLayout";
import Dashboard from "../../pages/admin/Dashboard";
import Users from "../../pages/admin/Users";
import CompanyManagement from "../../pages/admin/Company";
import Jobs from "../../pages/admin/Jobs";
import UserHome from "../../pages/home/UserHome";
import ListCandidate from "../../pages/home/list/ListCandidate";
import ProfilePage from "../../pages/company/CandidateInfo";
import AdminRoute from "../../features/protectedRoutes/AdminRoute";
import CompanyRoute from "../../features/protectedRoutes/CompanyRoute";
import UserRoute from "../../features/protectedRoutes/UserRoute";


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
        path: "/user",
        children: [
          {
            index: true,
            element: <UserRoute element={<UserHome/>} />,
          },
          { path: "info", element: <PrivateRoute element={<UserInfor />} /> },

          {
            path: "listCompany",
            element: <UserRoute element={<ListCompany />} />,
          },
          {
            path: "company/detail/:id",
            element: <UserRoute element={<CompanyDetail />} />,
          },

          {
            path: "jobDetail/:id",
            element: <UserRoute element={<JobDetail />} />,
          },
          {
            path: "cv",
            children: [
              {
                path: "",
                element: <UserRoute element={<CVManagement />} />,
              },
              {
                path: "default",
                exact: true,
                element: <UserRoute element={<DefaultCV />} />,
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
            element: <CompanyRoute element={<AddJobBusiness />} />,
          },
          {
            path: "jobDetail/:id",
            element: <CompanyRoute element={<JobDetailBusiness />} />,
          },
          {
            path: "detail",
            element: <CompanyRoute element={<CompanyDetailBusiness />} />,
          },
          {
            path: "candidate/detail/:id",
            element: <CompanyRoute element={<ProfilePage />} />,
          },
          {
            path: "candidate/cv/:id",
            element: <CompanyRoute element={<CandidateCV />} />,
          },
          {
            path: "list-candidate",
            element: <CompanyRoute element={<ListCandidate/>}/>,
          }
        ],
      },

    ],
  },
  {
    path: "/admin",
    element: <AdminRoute element={<AdminLayout />} />, // Protects the admin layout
    children: [
      { path: "dashboard", element: <AdminRoute element={<Dashboard />} /> },
      { path: "candidate", element: <AdminRoute element={<Users />} /> },
      { path: "company", element: <AdminRoute element={<CompanyManagement />} /> },
      { path: "jobs", element: <AdminRoute element={<Jobs />} /> },
      {
        path: "candidateInfo/:id",
        element: <AdminRoute element={<CandidateProfilePage />} />,
      },
      {
        path: "candidateCV/:id",
        element: <AdminRoute element={<CandidateCV />} />,
      },
    ],
  }
];

export default privateRoutes;
