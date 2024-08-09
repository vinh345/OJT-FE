import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserHeader from "./layouts/UserHeader";
import Home from "./pages/Home";
import FormLoginAdmin from "./components/FormLoginAdmin";
import RegisterUserForm from "./components/RegisterUserForm";
import LoginUserForm from "./components/LoginUserForm";
import CompanyRegisterForm from "./components/CompanyRegisterForm";
import CompanyLoginForm from "./components/CompanyLoginForm";

function App() {

  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route> 
        <Route path="/admin" element={<FormLoginAdmin></FormLoginAdmin>}> </Route> 
        <Route path="/user/register" element={<RegisterUserForm></RegisterUserForm>}></Route>
        <Route path="/user/login" element={<LoginUserForm></LoginUserForm>}></Route>
        <Route path="/company/register" element={<CompanyRegisterForm></CompanyRegisterForm>}></Route>
        <Route path="/company/login" element={<CompanyLoginForm></CompanyLoginForm>}></Route>
      </Routes>
    </>
  );  
}

export default App;
