"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function ProgressChart() {
  const [progress, setProgress] = React.useState(1);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  const size = 150;
  const strokeWidth = 15;
  const innerStroke = 8;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        className="transform -rotate-90 transition-all duration-500 ease-in-out"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth={innerStroke}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        {/* Progress circle */}
        <circle
          className="text-accent stroke-current transition-all duration-1000 ease-in-out"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {/* Percentage Text in Center */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gray-900">{progress}%</span>
      </div>
    </div>
  );
}
