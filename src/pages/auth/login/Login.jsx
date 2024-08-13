import React, { useState } from "react";
import LoginForm from "../../../components/login/LoginForm";
import logo from "../../../assets/logo.png";
import Investmentdatarafiki1 from "../../../assets/Investmentdatarafiki1.png";
import dg from "../../../assets/dg.png";

const LoginPage = ({ boolean }) => {
  const [isCompany, setIsCompany] = useState(boolean);

  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-col justify-start p-8">
        <img src={logo} alt="RKEI Edu Logo" className="mb-6 w-40" />
      </div>
      <div className="container grid grid-cols-2 h-screen justify-center">
        <div className="flex flex-col justify-center align-middle h-full">
          <div className="flex flex-col justify-start p-8">
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
        <div className="flex items-start justify-start p-8">
          <img
            src={isCompany ? dg : Investmentdatarafiki1}
            alt="Background"
            className="h-100 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
