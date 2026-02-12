import React from "react";
import { ProgressChart } from "./ProgressChart";

const DegreeProgress = () => {
  return (
    <div className="bg-white p-5 rounded-lg w-full shadow-sm border border-gray-100 h-full flex gap-10 justify-between items-center">
      <div className="flex flex-col gap-2 items-start w-full">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Progress Statistics
        </h2>

        <div>
          <h4 className="text-sm text-gray-500">Credits Earned</h4>
          <p className="text-base font-bold">120</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-500">Credits Remaining</h4>
          <p className="text-base font-bold">160</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-500">Degree Progress</h4>
          <p className="text-base font-bold">75%</p>
        </div>
      </div>

      <div className="w-full">
        <ProgressChart />
      </div>
    </div>
  );
};

export default DegreeProgress;
