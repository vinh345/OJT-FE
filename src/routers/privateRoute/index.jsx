import React from "react";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import CandidateProfilePage from "../../pages/admin/CandidateProfile";
import ChangePassword from "../../pages/auth/changePassword";
import LayoutIndex from "../../layouts";
import UserInfor from "../../pages/candidateinformation";
import CandidateCV from "../../pages/admin/CandidateCV";
import UserHome from "../../pages/home/UserHome";


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
            index: true,
            element: <PrivateRoute element={<UserHome/>} />,
          },
          {path: "infor",
            element: <PrivateRoute element={<UserInfor/>} />
          }
        ]
      }
    ],
  },
];

export default privateRoutes;
