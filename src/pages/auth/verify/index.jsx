import React, { useState } from "react";
import logo from "../../../assets/logo.png"; // Đảm bảo đường dẫn tới ảnh là chính xác
import Adminrafiki2 from "../../../assets/Admin-rafiki2.png"; // Đảm bảo đường dẫn tới ảnh là chính xác


import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyAccount } from "../../../service/authService";
import Swal from "sweetalert2";

export default function VerifyAccount() {
  const [verify, setVerify] = useState({
    email: "",
    otp: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setVerify({ ...verify, [e.target.name]: e.target.value });
    console.log(verify);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (verify.email !== "" && verify.otp !== "") {
      dispatch(verifyAccount({ email: verify.email, otp: verify.otp })).then(
        (res) => {
          if (res.payload.error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.payload.message,
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "Verify successfully",
              icon: "success",
            }).then(() => {
              navigate("/user/login");
            });
          }
        }
      );
    }
  };
  const handleSendOtp = () => {
    if (verify.email !== "") {
      dispatch(resendOtp(verify.email)).then((res) => {
        if (res.payload.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.payload.message,
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Verify successfully",
            icon: "success",
          });
        }
      });
    }
  };
  return (
    <div className="flex justify-center mb-40">
      <div className="flex justify-center w-[900px] mt-[120px] bg-white shadow-[0px_29px_52px_rgba(0,0,0,0.40),_0px_25px_16px_rgba(0,0,0,0.20)]">
        <div className="flex flex-col justify-center items-start w-[500px] h-[600px] pl-[80px]">
          <img src={logo} alt="RKEI Edu Logo" className="mb-[50px] h-[70px]" />
          <h1 className="text-xl font-bold mb-[30px] text-[#333]">
            Xác nhận tài khoản
          </h1>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-[40px] w-full">
              <label htmlFor="email" className="block mb-[5px] text-[#0e0101]">
                Email
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                id="email"
                placeholder="abc@gmail.com"
                className="w-[calc(100%-20px)] p-[10px] border border-[#ddd] rounded-[5px] w-[400px]"
              />
            </div>
            <div className="mb-[40px] w-full">
              <label htmlFor="otp" className="block mb-[5px] text-[#0e0101]">
                OTP
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="otp"
                id="otp"
                placeholder="OTP"
                className="w-[calc(100%-20px)] p-[10px] border border-[#ddd] rounded-[5px] w-[400px]"
              />
            </div>
            <div className="flex gap-[5%]">
              <button
                onClick={handleSendOtp}
                type="button"
                className="w-full p-[10px] bg-[#d9534f] text-white rounded-[5px] cursor-pointer text-[16px] mt-[20px]"
              >
                Gửi lại OTP
              </button>
              <button
                type="submit"
                className="w-full p-[10px] bg-[#d9534f] text-white rounded-[5px] cursor-pointer text-[16px] mt-[20px]"
              >
                Xác thực
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center w-[500px] h-[640px] p-[50px] border-l-0">
          <img src={Adminrafiki2} alt="Admin Illustration" />
        </div>
      </div>
    </div>
  );
}
