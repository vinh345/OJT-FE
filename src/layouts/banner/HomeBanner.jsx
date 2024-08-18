import React from "react";
import { Button } from "antd";
import StatsRow from "./CountCard";

export default function Banner() {
  return (
    <>
    <div className="bg-white">
        <div className=" py-20 px-16 flex justify-center gap-80 items-center mt-20">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Tìm kiếm công việc phù hợp với năng lực của bạn cùng chúng tôi
          </h1>
          <p className="text-gray-600 mb-10 text-xl">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
            in scelerisque leo, eget sollicitudin velit vestibulum.
          </p>
          <p className="text-gray-500 mt-6 text-lg">
            Suggestion:{" "}
            <span className="text-red-500">
              Designer, Programing, Digital Marketing, Video, Animation.
            </span>
          </p>
        </div>
        <div className="lg:block flex-shrink-0">
          <img
            src="src/assets/Software code testing-pana 1.png"
            alt="Software Code Testing"
            className="w-[36rem] h-auto"
          />
        </div>
      </div>
      <StatsRow/>
    </div>
    
    </>
  );
}
