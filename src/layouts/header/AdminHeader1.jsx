import React from "react";
import "../../style/AdminTemplate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleDelete = async () => {
   
    
      // Clear the token from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.setItem("isLogin" , false)

      // Redirect to the login page 
      navigate("/");
    
  };

  return (
    <div>
      <div className="adm-head">
        <div className="head-title">
          <FontAwesomeIcon icon={faUserShield} /> Admin
        </div>
        <div className="head-body">
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Signout 
          </button>
        </div>
      </div>
    </div>
  );
}
