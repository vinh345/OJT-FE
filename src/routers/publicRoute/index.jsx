import CompanyLoginForm from "../../components/CompanyLoginForm";
import CompanyRegisterForm from "../../components/CompanyRegisterForm";
import FormLoginAdmin from "../../components/FormLoginAdmin";
import LoginUserForm from "../../components/LoginUserForm";
import RegisterUserForm from "../../components/RegisterUserForm";
import LoginPage from "../../pages/auth/login/Login";
import RecoverPassword from "../../pages/auth/recoverPassword";
import Home from "../../pages/Home";

const publicRoutes = [
  {
    path: "/auth",
    children: [
      
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
];

export default publicRoutes;