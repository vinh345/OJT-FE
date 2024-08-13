import CompanyRegisterForm from "../../components/CompanyRegisterForm";
import FormLoginAdmin from "../../components/FormLoginAdmin";
import RegisterUserForm from "../../components/RegisterUserForm";
import RegisterUserForm from "../../components/RegisterUserForm";
import LayoutIndex from "../../layouts";
import LoginPage from "../../pages/auth/login/Login";

import RecoverPassword from "../../pages/auth/recoverPassword";
import Home from "../../pages/Home";

const publicRoutes = [
  
  {
    path: "",
    element: <LayoutIndex />,
    exact: true,
    children: [
  { path: "/auth/recoverPassword", element: <RecoverPassword /> },
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
]
  }
];

export default publicRoutes;
