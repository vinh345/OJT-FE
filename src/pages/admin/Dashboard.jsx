import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../../style/Dashboard.scss";

const pieDataCandidates = [
  { name: "Active", value: 400 },
  { name: "Inactive", value: 300 },
];

const pieDataCompanies = [
  { name: "Subscribed", value: 200 },
  { name: "Unsubscribed", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [areaChartData, setAreaChartData] = useState([]);
  const [candidateCount, setCandidateCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0); // State for company count

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8080/api.myservice.com/v1/admin/candidates/by-month",
          {
            params: { year: new Date().getFullYear() },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAreaChartData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCandidateCount() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8080/api.myservice.com/v1/admin/candidates/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCandidateCount(response.data);
      } catch (error) {
        console.error("Error fetching candidate count", error);
      }
    }
    fetchCandidateCount();
  }, []);

  useEffect(() => {
    async function fetchCompanyCount() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8080/api.myservice.com/v1/admin/companies/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompanyCount(response.data); // Update company count state
      } catch (error) {
        console.error("Error fetching company count", error);
      }
    }
    fetchCompanyCount();
  }, []);

  return (
    <>
      <div className="dashboard">
        <div className="control">
          <div className="title-ad">Dashboard </div>
          <div className="title-ad1">Control Panel</div>
        </div>

        <div className="chart">
          <div className="db2">
            <p>Thống kê ứng viên</p>
            <p>{candidateCount} ứng viên</p>{" "}
            {/* Display the actual candidate count */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieDataCandidates}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieDataCandidates.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="db3">
            <p>Thống kê công ty</p>
            <p>{companyCount} công ty</p>{" "}
            {/* Display the actual company count */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieDataCompanies}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#82ca9d"
                  dataKey="value"
                >
                  {pieDataCompanies.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="db1">
          <p>Số lượng ứng viên</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={areaChartData}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="number"
                stroke="rgb(6, 250, 18)"
                fill="rgb(6, 250, 18)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
