import React from "react";

const DegreeProgress = () => {
  return (
    <div className="bg-white p-5 rounded-lg w-full shadow-sm border border-gray-100 h-full">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-lg font-bold text-accent mb-4">
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
    </div>
  );
};

export default DegreeProgress;
