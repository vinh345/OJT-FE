import React from "react";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import CandidateProfilePage from "../../pages/company/CandidateProfile";
import ChangePassword from "../../pages/auth/changePassword";
import LayoutIndex from "../../layouts";

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
        path: "company",
        children: [
          {
            path: "candidateInfo/:id",
            element: <PrivateRoute element={<CandidateProfilePage />} />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;
