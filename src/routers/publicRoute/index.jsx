import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import ChangePassword from "../../pages/auth/changePassword";
import LoginPage from "../../pages/auth/login/Login";
import RecoverPassword from "../../pages/auth/recoverPassword";

const publicRoutes = [
  {
    path: "/auth",
    children: [
      { path: "login", element: <LoginPage /> },
      {
        path: "changePassword",
        element: <PrivateRoute element={ChangePassword} />,
      },
      {
        path: "recoverPassword",
        element: <RecoverPassword />,
      },
    ],
  },
];

export default publicRoutes;
