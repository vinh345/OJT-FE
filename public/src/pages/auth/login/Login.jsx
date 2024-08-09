import React, { useState } from "react";
import LoginForm from "../../../components/login/LoginForm";
import CompanyLoginBackground from "../../../components/login/CompanyLoginBackground";
import CandidateLoginBackground from "../../../components/login/CandidateLoginBackground";

const LoginPage = () => {
  const [isCompany, setIsCompany] = useState(true);
 
  return (
    <div className="flex  ">
      <div className="flex h-screen">
        <div className="w-1/2 flex items-center justify-center bg-gray-100">
          {isCompany ? (
            <CompanyLoginBackground />
          ) : (
            <CandidateLoginBackground />
          )}
        </div>
        <div className="w-1/2 bg-white flex items-center justify-center">
          <LoginForm isCompany={isCompany} />
        </div>
      </div>
      <div>
        {isCompany ? (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTErM0l9PaxajQCEPypESRXJUhaI_ryd-OkQA&s"
            alt="Company Background"
            className="max-w-full h-auto"
          />
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU5hsX-OLXWZQtZR0VJ0V4gdxqn4A_hzkNlQ&s"
            alt="Candidate Background"
            className="max-w-full h-auto"
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
