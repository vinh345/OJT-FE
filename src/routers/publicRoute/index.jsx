import CompanyRegisterForm from "../../components/CompanyRegisterForm";
import FormLoginAdmin from "../../components/FormLoginAdmin";

import RegisterUserForm from "../../components/RegisterUserForm";
import LoginPage from "../../pages/auth/login/Login";

import Home from "../../pages/Home";
import Footer from "../../layouts/Footer";
import ListCompany from "../../pages/company/listCompany/ListCompany";
import ListJob from "../../pages/job/ListJob";
import JobDetail from "../../pages/job/JobDetail";
import CompanyDetail from "../../pages/company/listCompany/CompanyDetailUser";
import CompanyDetailBusiness from "../../pages/company/listCompany/CompanyDetailBusiness";

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
      { path: "listCompany", element: <ListCompany /> },
      { path: "job", element: <ListJob /> },
      { path: "jobDetail/:id", element: <JobDetail /> },
      // { path: "detail/:id", element: <CompanyDetail /> },
      { path: "detail/:id", element: <CompanyDetailBusiness /> },
    ],
  },

  // {
  //   path: "/listCompany",
  //   element: <Footer />,
  // },
];

export default publicRoutes;
