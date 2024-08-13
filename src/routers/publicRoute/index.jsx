import CompanyLoginForm from "../../components/CompanyLoginForm";
import CompanyRegisterForm from "../../components/CompanyRegisterForm";
import FormLoginAdmin from "../../components/FormLoginAdmin";

import LoginForm from "../../components/login/LoginForm";
import RegisterUserForm from "../../components/RegisterUserForm";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import ChangePassword from "../../pages/auth/changePassword";

import LoginUserForm from "../../components/LoginUserForm";
import LoginPage from "../../pages/auth/login/Login";

import RecoverPassword from "../../pages/auth/recoverPassword";
import Home from "../../pages/Home";
import VerifyAccount from "../../pages/auth/verify";

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "/", element: <FormLoginAdmin /> },
  {
    path: "/user",
    children: [
      { path: "register", element: <RegisterUserForm /> },

      { path: "login", element: <LoginPage boolean={false} /> },
    ],
  },
  {
    path: "/company",
    children: [
      { path: "register", element: <CompanyRegisterForm /> },
      { path: "login", element: <LoginPage boolean={true} /> },
    ],
  },
  {
    path: "/verify",
    element: <VerifyAccount/>
  }
];

export default publicRoutes;
