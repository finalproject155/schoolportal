import React from "react";
import SectionCard from "@/components/portal/SectionCard";
import { SEMESTER_RESULTS, semesterGpa } from "../data";

export default function CgpaTrend() {
  return (
    <SectionCard title="GPA Trend" subtitle="Performance across semesters" bodyClassName="p-5 space-y-4">
      {SEMESTER_RESULTS.map((semester) => {
        const gpa = semesterGpa(semester);
        const percent = (gpa / 5) * 100;
        return (
          <div key={semester.id}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-600">
                {semester.session} · {semester.semester}
              </span>
              <span className="text-xs font-bold text-gray-900">{gpa.toFixed(2)}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#BF9B63] transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </SectionCard>
  );
}
