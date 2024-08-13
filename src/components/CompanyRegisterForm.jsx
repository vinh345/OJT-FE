import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../assets/logo.png";
import "../style/CompanyRegister.scss";
import { Link, useNavigate } from "react-router-dom";
import { getListLocation } from "../service/Location/locationService";
import { registerCompany } from "../service/authService";
import { FAILED, PENDING } from "../constants/status";

export default function CompanyRegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: locations,
    loading,
    error,
  } = useSelector((state) => state.locations);

  useEffect(() => {
    dispatch(getListLocation());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên công ty là bắt buộc"),
    emailCompany: Yup.string()
      .email("Email không hợp lệ")
      .required("Email công ty là bắt buộc"),
    phone: Yup.string()
      .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại là bắt buộc"),
    locationId: Yup.string().required("Địa điểm làm việc là bắt buộc"),
    password: Yup.string()
      .min(4, "Mật khẩu phải có ít nhất 4 ký tự")
      .max(12, "Mật khẩu không được quá 12 ký tự")
      .required("Mật khẩu là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });

  const handleSubmit = async (values) => {
    try {
      const result = await dispatch(registerCompany(values)).unwrap();
      notification.success({
        message: "Đăng ký thành công",
        description: "Vui lòng xác minh tài khoản của bạn.",
      });
      navigate("");
    } catch (err) {
      if (err.errors) {
        err.errors.forEach((error) => {
          notification.error({
            message: "Đăng ký thất bại",
            description: error.defaultMessage,
          });
        });
      } else {
        notification.error({
          message: "Đăng ký thất bại",
          description: "Lỗi: " + err.message,
        });
      }
    }
  };

  return (
    <div className="containercompany">
      <img src={logo} alt="RKEI Edu Logo" height="70px" />
      <h2>
        Đăng kí để có thể tiếp cận nguồn <br />
        nhân lực chất lượng cao
      </h2>
      <div className="containerform">
        <div className="containerform1">
          <h3>Thông tin công ty</h3>
          <Formik
            initialValues={{
              name: "",
              emailCompany: "",
              phone: "",
              locationId: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="name">Tên công ty</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tên công ty"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error text-red-500"
                />

                <label htmlFor="emailCompany">Email công ty</label>
                <Field
                  type="email"
                  id="emailCompany"
                  name="emailCompany"
                  placeholder="abc@company.com"
                />
                <ErrorMessage
                  name="emailCompany"
                  component="div"
                  className="error text-red-500"
                />

                <label htmlFor="phone">Số điện thoại</label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="0123456789"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error text-red-500"
                />

                <label htmlFor="locationId">Địa điểm làm việc</label>
                <Field as="select" id="locationId" name="locationId">
                  <option value="">Chọn tỉnh/thành phố</option>
                  {loading === PENDING && <option>Loading...</option>}
                  {loading === FAILED && <option>Error: {error}</option>}
                  {locations?.content?.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.nameCity}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="locationId"
                  component="div"
                  className="error text-red-500"
                />

                <label htmlFor="password">Mật khẩu</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error text-red-500"
                />

                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="********"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error text-red-500"
                />

                <button
                  type="submit"
                  className="register-button"
                  disabled={isSubmitting}
                >
                  Đăng kí
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="btn">
        Đã có tài khoản? <Link to="/company/login">Đăng nhập ngay</Link>
      </div>
    </div>
  );
}
