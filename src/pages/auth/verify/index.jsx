import React, { useState } from "react";
import logo from "../../../assets/logo.png"; // Đảm bảo đường dẫn tới ảnh là chính xác
import Adminrafiki2 from "../../../assets/Admin-rafiki2.png"; // Đảm bảo đường dẫn tới ảnh là chính xác

import "../../../style/Verify.scss"; // Import file CSS
import { Email } from "@mui/icons-material";
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
              navigate("/login");
            });
          }
        }
      );
    }
  };
  const handleSendOtp = () => {
    if(verify.email!==""){
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
  }
  return (
    <div>
      <div className="container">
        <div className="container1">
          <img src={logo} alt="RKEI Edu Logo" height={"70px"} className="lgo" />{" "}
          {/* Thêm thuộc tính chiều cao ở đây */}
          <h1>Xác nhận tài khoản </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                id="email"
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">OTP</label>
              <input
                onChange={handleChange}
                type="text"
                name="otp"
                id="otp"
                placeholder="OTP"
              />
            </div>
            <div style={{display: "flex", gap: "5%"}}>
              <button onClick={handleSendOtp} type="click">Gửi lại OTP</button>
              <button type="submit">Xác thực</button>
            </div>
          </form>
        </div>
        <div className="container2 border-none">
          {/* Bạn có thể thêm nội dung hoặc hình ảnh khác vào đây */}
          <img src={Adminrafiki2} alt="Admin Illustration" />
        </div>
      </div>
    </div>
  );
}
