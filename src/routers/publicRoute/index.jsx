import CompanyLoginForm from "../../components/CompanyLoginForm";
import CompanyRegisterForm from "../../components/CompanyRegisterForm";
import FormLoginAdmin from "../../components/FormLoginAdmin";
import LoginUserForm from "../../components/LoginUserForm";
import RegisterUserForm from "../../components/RegisterUserForm";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import ChangePassword from "../../pages/auth/changePassword";
import LoginPage from "../../pages/auth/login/Login";
import RecoverPassword from "../../pages/auth/recoverPassword";
import Home from "../../pages/Home";
import AdminLayout from "../../pages/admin/AdminLayout";
import Dashboard from "../../pages/admin/Dashboard";
import Users from "../../pages/admin/Users";
import Company from "../../pages/admin/Company";

const publicRoutes = [
  {
    path: "/auth",
    children: [
      { path: "login" ,
        element: <LoginPage /> },
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
  { path: "/admin",
    element: <FormLoginAdmin /> 
  },
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
    path: "/admin",
    element: <AdminLayout />, 
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "candidate", element: <Users /> },
      { path: "company", element: <Company /> },
    ],
  },
];

export default publicRoutes;
