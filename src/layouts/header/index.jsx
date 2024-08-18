import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { GET } from "../../constants/httpMethod";
import BASE_URL from "../../api";

const Header = () => {
  const cookie = new Cookies();
  const isLogin = cookie.get("isLogin");
  const name = cookie.get("name");
  
  const avatar=cookie.get("avatar");
  const navigate = useNavigate();

  
  const handleLogOut = () => {
    cookie.remove("type");
    cookie.remove("accessToken");
    cookie.remove("isLogin");
    cookie.remove("role");
    navigate("/");
  };

  const handleLogIn = () => {
    navigate("/user/login");
  };

  return (
    <header id="header" className="bg-white pl-4 pr-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <div>
            <img
              className="w-32"
              src="https://static.vecteezy.com/system/resources/previews/010/074/323/non_2x/electricity-logo-electric-logo-design-template-vector.jpg"
              alt="Logo"
            />
          </div>

          <div className="nav__menu hidden md:flex text-gray-800">
            <ul className="nav__list flex space-x-6">
              <li className="nav__item">
                <Link to={`/home`}>
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link to={`/user/product`}> Products</Link>
              </li>
              <li className="nav__item">
                <Link to={"/contact"}> Contact</Link>
              </li>
            </ul>
          </div>

          <div className="nav__icons flex align-middle space-x-4">
            
            {isLogin ? (
              <>
              <Link to={"/user/userdetail"}>
              <Avatar  src={avatar}/>
              </Link>
              <h3>{name}</h3>
              <Button onClick={handleLogOut} variant="contained">
                Log Out
              </Button>
              </>
              
            ) : (
              <Button onClick={handleLogIn} variant="contained">
                Log In
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;