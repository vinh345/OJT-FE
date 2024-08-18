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
import ListCompany from "../../pages/company/listCompany/ListCompany";
import ListJob from "../../pages/job/ListJob";
import JobDetail from "../../pages/job/JobDetail";
import VerifyAccount from "../../pages/auth/verify";
import LayoutIndex from "../../layouts";
import CompanyDetail from "../../pages/company/listCompany/CompanyDetailUser";
import PrivateRoute from "../../features/protectedRoutes/PrivateRoute";
import ChangePassword from "../../pages/auth/changePassword";

import Jobs from "../../pages/admin/Jobs";
import OutstandingCandidate from "../../pages/candidateinformation/form/home/OutstandingCandidate";

const publicRoutes = [
  {
    path: "",
    element: <LayoutIndex />,
    exact: true,
    children: [
      {
        path: "changePassword",
        element: <PrivateRoute element={<ChangePassword/>} />,
      },
      {
        path: "/",
        element: <Home />,
      },
      { path: "/auth/recoverPassword", element: <RecoverPassword /> },
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
          { path: "listCompany", element: <ListCompany /> },
          { path: "job", element: <ListJob /> },
          { path: "jobDetail/:id", element: <JobDetail /> },
          { path: "detail/:id", element: <CompanyDetail /> }, // Tuyến đường chi tiết công ty
          {path :"outstanding", element :<OutstandingCandidate />}
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
