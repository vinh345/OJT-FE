import React, { useState } from "react";
import LoginForm from "../../../components/login/LoginForm";
import logo from "../../../assets/logo.png"; // Đảm bảo đường dẫn tới ảnh là chính xác

import Investmentdatarafiki1 from "../../../assets/Investmentdatarafiki1.png";
import dg from "../../../assets/dg.png";


// import '../../../style/FormLoginAdmin.scss'; // Import file CSS

const LoginPage = ({ boolean }) => {
  const [isCompany, setIsCompany] = useState(boolean);

  return (
    <div className="container  ">
      <div className="container1">
        <div className="w-1/2 flex items-center justify-center bg-gray-100">
          {isCompany ? (
            <div>
              <img
                src={logo}
                alt="RKEI Edu Logo"
                height={"70px"}
                className="lgo"
              />
              <h2>
                Cùng Rikkei Education tiếp cận nguồn <br /> nhân lực chất lượng
                cao{" "}
              </h2>
            </div>
          ) : (
            <div>
              <img
                src={logo}
                alt="RKEI Edu Logo"
                height={"70px"}
                className="lgo"
              />{" "}
              {/* Thêm thuộc tính chiều cao ở đây */}
              <h2>
                Cùng Rikkei Education xây dựng hồ <br />
                sơ nổi bật và nhận được các cơ hội <br /> sự nghiệp lý tưởng
              </h2>
            </div>
          )}
        </div>
        <div className="w-1/2 bg-white flex items-center justify-center">
          <LoginForm isCompany={isCompany} />
        </div>
      </div>
      <div>
        {isCompany ? (
          <img
            src={dg}
            alt="Company Background"
            className="max-w-full h-auto"
          />
        ) : (
          <img
            src={Investmentdatarafiki1}
            alt="Candidate Background"
            className="max-w-full h-auto"
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
