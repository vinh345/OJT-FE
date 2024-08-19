import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getListLocation } from "../service/Location/locationService";
import { registerCompany } from "../service/authService";
import { FAILED, PENDING } from "../constants/status";

export default function CompanyRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      navigate("/verify");
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
    <div className="w-full max-w-4xl mx-auto my-12 bg-gray-100 p-8 shadow-lg text-left">
      <img src={logo} alt="RKEI Edu Logo" className="mb-8 h-16" />
      <h2 className="text-2xl font-bold mb-8">
        Đăng kí để có thể tiếp cận nguồn <br />
        nhân lực chất lượng cao
      </h2>
      <div className="flex justify-between bg-white p-8">
        <div className="w-full p-4 relative">
<h3 className="text-xl font-semibold text-gray-800 mb-4 relative before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 before:w-2 before:h-10 before:bg-red-700">
            Thông tin công ty
          </h3>
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
              <Form className="flex flex-col">
                <label
                  htmlFor="name"
                  className="mb-6 text-lg font-medium text-gray-700"
                >
                  Tên công ty
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tên công ty"
                  className="p-2 mb-3 w-4/5 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 mb-3"
                />

                <label
                  htmlFor="emailCompany"
                  className="mb-6 text-lg font-medium text-gray-700"
                >
                  Email công ty
                </label>
                <Field
                  type="email"
                  id="emailCompany"
                  name="emailCompany"
                  placeholder="abc@company.com"
                  className="p-2 mb-3 w-4/5 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="emailCompany"
                  component="div"
                  className="text-red-500 mb-3"
                />

                <label
                  htmlFor="phone"
                  className="mb-6 text-lg font-medium text-gray-700"
                >
                  Số điện thoại
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="0123456789"
                  className="p-2 mb-3 w-4/5 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 mb-3"
                />

                <label
                  htmlFor="locationId"
                  className="mb-6 text-lg font-medium text-gray-700"
                >
                  Địa điểm làm việc
                </label>
                <Field
                  as="select"
                  id="locationId"
                  name="locationId"
                  className="p-2 mb-3 w-4/5 border border-gray-300 rounded"
style={{ maxHeight: "200px", overflowY: "auto" }}
                >
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
                  className="text-red-500 mb-3"
                />

                <label
                  htmlFor="password"
                  className="mb-6 text-lg font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <div className="relative w-4/5 mb-3">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="********"
                    className="p-2 w-full border border-gray-300 rounded"
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mb-3"
                />

                <label
                  htmlFor="confirmPassword"
                  className="mb-6 text-lg font-medium text-gray-700"
                >
                  Xác nhận mật khẩu
                </label>
                <div className="relative w-4/5 mb-3">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="********"
                    className="p-2 w-full border border-gray-300 rounded"
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeTwoTone />
                    ) : (
                      <EyeInvisibleOutlined />
                    )}
                  </span>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 mb-3"
                />

                <button
                  type="submit"
className="w-1/3 py-2 bg-red-700 text-white rounded font-semibold text-sm mt-4"
                  disabled={isSubmitting}
                >
                  Đăng kí
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="text-center mb-8">
        Đã có tài khoản?{" "}
        <Link to="/company/login" className="text-blue-500">
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
}