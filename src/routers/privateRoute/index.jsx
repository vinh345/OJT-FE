import React from "react";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import CandidateProfilePage from "../../pages/admin/CandidateProfile";
import ChangePassword from "../../pages/auth/changePassword";
import LayoutIndex from "../../layouts";
import UserInfor from "../../pages/candidateinformation";
import CandidateCV from "../../pages/admin/CandidateCV";
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
          {
            path: "infor",
            element: <PrivateRoute element={<UserInfor />} />,
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
  },
 
  {
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
