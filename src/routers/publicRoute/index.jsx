import CompanyRegisterForm from "../../components/CompanyRegisterForm";
import FormLoginAdmin from "../../components/FormLoginAdmin";
import RegisterUserForm from "../../components/RegisterUserForm";
import LoginPage from "../../pages/auth/login/Login";
import RecoverPassword from "../../pages/auth/recoverPassword";
import Home from "../../pages/Home";
import AdminLayout from "../../pages/admin/AdminLayout";
import Dashboard from "../../pages/admin/Dashboard";
import Users from "../../pages/admin/Users";
import Company from "../../pages/admin/Company";
import VerifyAccount from "../../pages/auth/verify";
import LayoutIndex from "../../layouts";

import ListJob from "../../pages/job/ListJob";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import ChangePassword from "../../pages/auth/changePassword";
import JobDetail from "../../pages/job/JobDetail";

import Jobs from "../../pages/admin/Jobs";
import ListCompany from "../../pages/company/listCompany/ListCompany";

const publicRoutes = [
  {
    path: "",
    element: <LayoutIndex />,
    exact: true,
    children: [
      {
        path: "changePassword",
        element: <PrivateRoute element={<ChangePassword />} />,
      },
      {
        path: "/",
        element: <Home />,
      },
      { path: "job", element: <ListJob /> },
      { path: "jobDetail/:id", element: <JobDetail /> },
      { path: "/admin", element: <FormLoginAdmin /> },

      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "candidate", element: <Users /> },
          { path: "company", element: <Company /> },
          { path: "login", element: <FormLoginAdmin /> },
          { path: "jobs", element: <Jobs /> },
        ],
      },
      { path: "/auth/recoverPassword", element: <RecoverPassword /> },
      {
        path: "/user",
        children: [
          { path: "register", element: <RegisterUserForm /> },
          { path: "listCompany", element: <ListCompany /> },

          // { path: "listCompany", element: <ListCompany userType="user" /> },
          // { path: "company/detail/:id", element: <CompanyDetail /> },
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

      // {
      //   path: "/listCompany",
      //   element: <Footer />,
      // },
      {
        path: "/verify",
        element: <VerifyAccount />,
      },
    ],
  },
];

export default publicRoutes;
