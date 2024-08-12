import CompanyLoginForm from "../../components/CompanyLoginForm";
import CompanyRegisterForm from "../../components/CompanyRegisterForm";
import FormLoginAdmin from "../../components/FormLoginAdmin";
import LoginUserForm from "../../components/LoginUserForm";
import RegisterUserForm from "../../components/RegisterUserForm";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import ChangePassword from "../../pages/auth/changePassword";
import LoginPage from "../../pages/auth/login/Login";
import RecoverPassword from "../../pages/auth/recoverPassword";
import VerifyAccount from "../../pages/auth/verify";
import Home from "../../pages/Home";

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
    ],
  },
  {
    path: "/verify",
    element: <VerifyAccount/>
  }
];

export default publicRoutes;


