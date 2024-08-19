import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useDispatch } from "react-redux";
import { getStat } from "../../service/permitAllService";

const StatsRow = () => {
    const dispatch = useDispatch()
    const [stats,setStats] = useState();
    useEffect(()=>{
        dispatch(getStat()).then((res)=>{
            console.log(res.payload.data)
            setStats([{
                imgSrc: "src\\assets\\73469edc96e732b96bf6.jpg",
                count: res.payload.data.liveJob,
                label: "Live Job",
                bgColor: "bg-blue-50",
              },
              {
                imgSrc: "src\\assets\\e37e89a7829c26c27f8d.jpg",
                count: res.payload.data.companies,
                label: "Companies",
                bgColor: "bg-white",
              },
              {
                imgSrc: "src\\assets\\cd47b2dcb8e71cb945f6.jpg",
                count: res.payload.data.candidates,
                label: "Candidates",
                bgColor: "bg-blue-50",
              },
              {
                imgSrc: "src\\assets\\73469edc96e732b96bf6.jpg",
                count: res.payload.data.newJobs,
                label: "New Jobs",
                bgColor: "bg-blue-50",
              }],)
        })
    },[])


  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.map((stat, index) => (
          <Card
            hoverable
            key={index}
            className=" items-center  shadow-md rounded-lg"
            style={{ backgroundColor: "rgb(240, 240, 240)" }}
          >
            {" "}
            <div className="flex">
              <img
                src={stat.imgSrc}
                alt={stat.label}
                className="w-20 h-20 inline"
              />
              <div className="ml-4 flex flex-col justify-center">
                <div className="text-4xl font-semibold text-gray-800">
                  {stat.count}
                </div>
                <div className="text-gray-500 text-xl">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsRow;
