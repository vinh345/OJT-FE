import CompanyLoginForm from "../../components/CompanyLoginForm";
import CompanyRegisterForm from "../../components/CompanyRegisterForm";
import FormLoginAdmin from "../../components/FormLoginAdmin";
import LoginForm from "../../components/login/LoginForm";
import LoginUserForm from "../../components/LoginUserForm";
import RegisterUserForm from "../../components/RegisterUserForm";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import ChangePassword from "../../pages/auth/changePassword";
import RecoverPassword from "../../pages/auth/recoverPassword";
import Home from "../../pages/Home";

const publicRoutes = [
  {
    path: "/auth",
    children: [
      { path: "login", element: <LoginForm /> },
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
  {
    path: "/",
    element: <Home />,
  },
  { path: "/", element: <FormLoginAdmin /> },
  {
    path: "/user",
    children: [
      { path: "register", element: <RegisterUserForm /> },
      { path: "login", element: <LoginUserForm /> },
    ],
  },
  {
    path: "/company",
    children: [
      { path: "register", element: <CompanyRegisterForm /> },
      { path: "login", element: <CompanyLoginForm /> },
      { path: "verify", element: <CompanyLoginForm /> },
    ],
  },
];

export default publicRoutes;
