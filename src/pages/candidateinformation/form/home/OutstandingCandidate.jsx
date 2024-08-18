import React, { useEffect, useState } from "react";
import "../../../../style/OutstandingCandidate.scss";
import { Button } from "antd";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function OutstandingCandidate() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Hàm async để fetch dữ liệu
    const fetchCandidate = async () => {
      try {
        const token = getCookie("accessToken"); // Lấy token từ cookie
        console.log(token); // In token ra console để kiểm tra

        const response = await axios.get(
          `http://localhost:8080/api.myservice.com/v1/company/outstanding`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        // Cập nhật state với dữ liệu nhận được
        setCandidates(response.data);
      } catch (error) {
        console.error(
          "There was an error fetching the outstanding candidates!",
          error
        );
      }
    };

    // Gọi hàm fetchCandidate
    fetchCandidate();
  }, []);

  return (
    <>
      <div className="can-container">
        <div className="can-container-1">
          <div className="title-can-1">
            <h1 className="title-can">Ứng Viên Nổi Bật</h1>
            <h3
              style={{
                marginRight: "30px",
                marginTop: "50px",
                cursor: "pointer",
              }}
            >
              {" "}
              xem thêm .......{" "}
            </h3>
          </div>

          <div className="out-card-1">
            <div className="out-1">
              {candidates.map((candidates) => (
                <div className="card1" key={candidates.id}>
                  <div className="can-img1">
                    <img
                      className="img-can"
                      src={candidates.avatar}
                      alt=""
                    />
                    <div className="tt-can">
                      <h4 style={{ marginLeft: "10px" }}>{candidates.name}</h4>
                      <div className="btn-can">
                        <button className="front">Frontend</button>
                        <button className="fre">Fresher</button>
                      </div>
                    </div>
                  </div>
                  <div className="can-body">
                    <div className="body-1">
                      Technical in use : <button>node JS</button>{" "}
                      <button>React Js</button>
                    </div>
                    <div className="body-1">
                      Foreign Language : <button> N2</button>
                    </div>
                    <div className="body-1">{candidates.address }</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      
      </div>
    </>
  );
}
