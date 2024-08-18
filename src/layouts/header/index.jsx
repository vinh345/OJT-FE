import React, { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Modal, Box } from "@mui/material";
import logo from "../../assets/logo.png";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const Header = () => {
  const cookie = new Cookies();
  const isLogin = cookie.get("isLogin");
  const name = cookie.get("name");
  const avatar = cookie.get("avatar");
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([
    "accessToken",
    "type",
    "isLogin",
    "avatar",
    "name",
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const logOut = () => {
    cookie.remove("accessToken", { path: "/" });
    cookie.remove("type", { path: "/" });
    cookie.remove("isLogin", { path: "/" });
    cookie.remove("avatar", { path: "/" });
    cookie.remove("name", { path: "/" });
    setModalOpen(false); // Close modal on logout
  };

  const handleLogIn = () => {
    navigate("/user/login");
  };

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <header id="header" className="bg-white">
      <div className="container mx-auto">
        {/* Top Navigation */}
        <nav className="flex items-center justify-between bg-gray-200 py-2 px-3">
          <div className="nav__menu hidden md:flex text-gray-800">
            <ul className="nav__list flex align-middle space-x-6">
              <li className="nav__item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " font-bold" : "text-gray-700"
                  }
                  to={`/`}
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " font-bold" : "text-gray-700"
                  }
                  to={`/jobs`}
                >
                  Việc làm
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to={`/user/cv`}
                  className={({ isActive }) =>
                    isActive ? " font-bold" : "text-gray-700"
                  }
                >
                  CV của bạn
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to={`/support`}
                  className={({ isActive }) =>
                    isActive ? " font-bold" : "text-gray-700"
                  }
                >
                  Customer Supports
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="nav__icons flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
                alt="US Flag"
                className="w-5 h-5"
              />
              <span className="text-sm">English</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">+1-202-555-0178</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex justify-between items-center mt-4 px-4 py-4 md:px-32">
          <img src={logo} alt="Rikkei Logo" className="w-48" />

          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full max-w-lg">
            <select className="border-none outline-none text-gray-600">
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            </select>
            <input
              type="text"
              placeholder="Job title, keyword, company"
              className="ml-4 outline-none flex-grow"
            />
            <button className="ml-4 text-red-500">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {isLogin ? (
            <div className="relative flex items-center space-x-2">
              <PermIdentityIcon
                onClick={handleModalToggle}
                className="cursor-pointer border-2 border-red-600 rounded-full text-red-400"
              />
              <h3
                onClick={handleModalToggle}
                className="cursor-pointer text-sm"
              >
                {name}
              </h3>
              {modalOpen && (
                <Box
                  className="absolute top-full mt-2 right-0 w-48 bg-gray-100 shadow-lg rounded-lg z-10"
                  p={2}
                >
                  <ul className="text-gray-800">
                    <li className="mb-2 p-1 bg-gray-200 hover:bg-gray-600 hover:cursor-pointer">
                      <Link
                        to={"/user/userdetail"}
                        onClick={handleModalToggle}
                        className=""
                      >
                        Thông tin cá nhân
                      </Link>
                    </li>
                    <li className="mb-2 p-1  bg-gray-200 hover:bg-gray-600 hover:cursor-pointer">
                      <Link
                        to={"/auth/changePassword"}
                        onClick={handleModalToggle}
                      >
                        Đổi mật khẩu
                      </Link>
                    </li>

                    <li
                      className="mt-2 p-1 bg-gray-200 hover:bg-gray-600 hover:cursor-pointer   "
                      onClick={logOut}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </Box>
              )}
            </div>
          ) : (
            <Button onClick={handleLogIn} variant="contained">
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
