import React from "react";
import logo from "../../assets/logo.png";
import { Facebook, YouTube } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <img
            src={logo} 
            alt="Rikkei Edu Logo"
            className="mb-4 h-20"
          />
          <p>
            Tầng 7 tháp A tòa Sông Đà, đường Phạm Hùng,
            <br />
            quận Nam Từ Liêm, Hà Nội
          </p>
          <p>0862 069 233</p>
          <p>academy@rikkeisoft.com</p>
          <div className="flex mt-4 space-x-4">
            <Facebook/>
            <YouTube/>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">Khóa học</h3>
          <ul>
            <li><a href="#" className="hover:underline">Làm quen với Code</a></li>
            <li><a href="#" className="hover:underline">Bootcamp Fulltime</a></li>
            <li><a href="#" className="hover:underline">Bootcamp Parttime</a></li>
            <li><a href="#" className="hover:underline">Kỹ sư CNTT - PTIT</a></li>
            <li><a href="#" className="hover:underline">Bổ trợ cho nghề</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Tài nguyên học tập</h3>
          <ul>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Ebook - Report</a></li>
            <li><a href="#" className="hover:underline">Khóa học miễn phí</a></li>
            <li><a href="#" className="hover:underline">Sự kiện - Webinar</a></li>
            <li><a href="#" className="hover:underline">Cộng đồng</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Vì sao chọn Rikkei Academy</h3>
          <ul>
            <li><a href="#" className="hover:underline">Về Rikkei Academy</a></li>
            <li><a href="#" className="hover:underline">Hệ sinh thái Rikkei</a></li>
            <li><a href="#" className="hover:underline">Cơ hội nghề nghiệp</a></li>
            <li><a href="#" className="hover:underline">Tấm gương sáng</a></li>
            <li><a href="#" className="hover:underline">Liên hệ</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>Copyright 2024 © Rikkei Education. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
