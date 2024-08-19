import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function UserRoute({ element }) {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const isLogin = cookie.get('isLogin');

  useEffect(() => {
    if (!isLogin) {
      navigate("/user/login");
    } else{
        if(cookie.get("role")!=="ROLE_CANDIDATE"){
            navigate("/403")
        }
    }
  }, [isLogin]);
  return element;
}