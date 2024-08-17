import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you want to use navigation
import LoginForm from "../../../components/login/LoginForm";
import logo from "../../../assets/logo.png";
import Investmentdatarafiki1 from "../../../assets/Investmentdatarafiki1.png";
import dg from "../../../assets/dg.png";
import { ArrowForward } from "@mui/icons-material"; // MUI icon for arrow, or you can use your own

const LoginPage = ({ boolean }) => {
  const [isCompany, setIsCompany] = useState(boolean);
  const navigate = useNavigate();

  const handleArrowClick = () => {
    setIsCompany ( !boolean);
    navigate(isCompany ? "/user/login" : "/company/login");
  };

  return (
  <div className="flex align-middle mx-20">

    <div className="shadow-2xl container mx-40 my-4 relative">
      <div className="flex flex-col gap-0">
        <div className="flex flex-col justify-start p-8 pb-0">
          <img src={logo} alt="RKEI Edu Logo" className="mb-6 w-40" />
        </div>
        <div className="grid grid-cols-2 ">
          <div className="flex h-2/3 w-full">
            <div className="flex flex-col align-middle h-full w-full">
              <div className="flex flex-col justify-start p-8 pt-0">
                {isCompany ? (
                  <h2 className="text-xl text-left font-bold">
                    Cùng Rikkei Education tiếp cận nguồn <br />
                    nhân lực chất lượng cao
                  </h2>
                ) : (
                  <h2 className="text-xl text-left font-bold">
                    Cùng Rikkei Education xây dựng hồ <br />
                    sơ nổi bật và nhận được các cơ hội <br />
                    sự nghiệp lý tưởng
                  </h2>
                )}
                <div className="flex items-start justify-start mt-8">
                  <LoginForm isCompany={isCompany} />
                </div>
              </div>
            </div>
            {/* Gradient line separator */}
            <div className="h-full w-px bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300"></div>
          </div>

          <div className="hidden lg:flex items-center justify-center p-2 h-full w-full">
            <img
              src={isCompany ? dg : Investmentdatarafiki1}
              alt="Background"
              className="max-h-96 object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer border bg-gray-500 rounded-full"
        onClick={handleArrowClick}
      >
        <ArrowForward style={{ fontSize: 60, color: "white" }} />
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
