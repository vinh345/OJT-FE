import {token} from "../constants/token.js"
import axios from "axios";

export const response = await axios.get(
  "http://localhost:8080/api.myservice.com/v1/admin/candidates",
  {
    headers: {
      Authorization: `Bearer ${token}`, // Đính kèm token vào header
    }, 
    
  }
); 

