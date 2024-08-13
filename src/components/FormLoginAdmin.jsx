import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';
import Adminrafiki2 from '../assets/Admin-rafiki2.png';
import '../style/FormLoginAdmin.scss';

export default function FormLoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api.myservice.com/v1/auth/admin/sign-in', {
        email,
        password,
      });

      // Xử lý kết quả đăng nhập thành công
      console.log('Đăng nhập thành công:', response.data);
      // Lưu token vào localStorage hoặc state để sử dụng sau
      localStorage.setItem('accessToken', response.data.accessToken);

      // Chuyển hướng đến trang quản lý ứng viên hoặc trang chính của admin
      window.location.href = '/admin/dashboard';
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      setError('Email hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="container">
      <div className="container1">
        <img src={logo} alt="RKEI Edu Logo" height={"70px"} className='lgo' />
        <h2>Admin CV Management</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="***************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Đăng nhập</button>
        </form>
        <a href="/">Quên mật khẩu?</a> <br />
      </div>
      <div className="container2">
        <img src={Adminrafiki2} alt="Admin Illustration" />
      </div>
    </div>
  );
}
