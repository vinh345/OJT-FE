import React from "react";
import { Container, Grid } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-8">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div>
              <img
                src="https://static.ybox.vn/2020/1/1/1578276819686-1576157616611-1574132277731-1562117357982-1561186638622-1.jpg"
                alt="Rikkei Edu"
                className="mb-4 h-7 w-7"
              />
              <p>
                Tầng 7 tháp A toà Sông Đà, đường Phạm Hùng, quận Nam Từ Liêm, Hà
                Nội
              </p>
              <p>0862 069 233</p>
              <p>academy@rikkeisoft.com</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" aria-label="Facebook">
                  <FacebookIcon fontSize="large" />
                </a>
                <a href="#" aria-label="YouTube">
                  <YouTubeIcon fontSize="large" />
                </a>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <h3 className="mb-4">Khóa học</h3>
            <ul>
              <li>
                <a href="#">Làm quen với Code</a>
              </li>
              <li>
                <a href="#">Bootcamp Fulltime</a>
              </li>
              <li>
                <a href="#">Bootcamp Parttime</a>
              </li>
              <li>
                <a href="#">Kỹ sư CNTT - PTIT</a>
              </li>
              <li>
                <a href="#">Bổ trợ cho nghề</a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={2}>
            <h3 className="mb-4">Tài nguyên học tập</h3>
            <ul>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Ebook - Report</a>
              </li>
              <li>
                <a href="#">Khóa học miễn phí</a>
              </li>
              <li>
                <a href="#">Sự kiện - Webinar</a>
              </li>
              <li>
                <a href="#">Cộng đồng</a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={4}>
            <h3 className="mb-4">Vì sao chọn Rikkei Academy</h3>
            <ul>
              <li>
                <a href="#">Về Rikkei Academy</a>
              </li>
              <li>
                <a href="#">Hệ sinh thái Rikkei</a>
              </li>
              <li>
                <a href="#">Cơ hội nghề nghiệp</a>
              </li>
              <li>
                <a href="#">Tấm gương sáng</a>
              </li>
              <li>
                <a href="#">Liên hệ</a>
              </li>
            </ul>
          </Grid>
        </Grid>
        <div className="text-center mt-8">
          <p>Copyright 2023 © Rikkei Education. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
