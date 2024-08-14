import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ element }) {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const isLogin = cookie.get('isLogin');

  useEffect(() => {
    if (!true) {
      navigate("/auth/login");
    }
  }, [isLogin]);
  return element;
}