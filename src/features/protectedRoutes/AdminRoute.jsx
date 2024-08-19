import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function AdminRoute({ element }) {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const isLogin = localStorage.getItem('isLogin');

  useEffect(() => {
    if (!isLogin) {
      navigate("/user/login");
    } else{
        if(localStorage.getItem("role")!=="ROLE_ADMIN"){
            navigate("/403")
        }
    }
  }, [isLogin]);
  return element;
}