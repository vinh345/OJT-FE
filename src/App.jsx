import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserHeader from "./layouts/UserHeader";
import Home from "./pages/Home";
import Register from "./pages/admin/Register";

function App() {

  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route> 
        <Route path="/admin/register" element={<Register></Register>}> </Route> 
      </Routes>
    </>
  );  
}

export default App;
