import React from "react";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import CandidateProfilePage from "../../pages/company/CandidateProfile";
import ChangePassword from "../../pages/auth/changePassword";
import UserInfor from "../../pages/candidateinformation";

const privateRoutes = [
  {
    path: "auth/changePassword",
    element: <PrivateRoute element={<ChangePassword/>} />,
  },
  {
    path: "company",
    children: [
      {
        path: "candidateInfo/:id",
        element: <PrivateRoute element={<CandidateProfilePage/>} />,
      },
    ],
  },
  {
    path: "/user",
    children: [
      {path: "infor",
        element: <PrivateRoute element={<UserInfor/>} />
      }
    ]
  }
];

export default privateRoutes;
