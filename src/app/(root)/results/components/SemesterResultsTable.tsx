import React from "react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";
import { type SemesterResult, gradePoint, semesterGpa } from "../data";

const gradeVariant: Record<string, StatusVariant> = {
  A: "success",
  B: "info",
  C: "warning",
  D: "warning",
  E: "danger",
  F: "danger",
};

export default function SemesterResultsTable({ semester }: { semester: SemesterResult }) {
  const gpa = semesterGpa(semester);
  const totalUnits = semester.courses.reduce((sum, c) => sum + c.units, 0);

  return (
    <SectionCard
      title={`${semester.semester} Results`}
      subtitle={`${semester.session} Academic Session`}
      headerAction={
        <div className="text-right">
          <p className="text-xs text-gray-500">Semester GPA</p>
          <p className="text-lg font-bold font-lex text-[#BF9B63]">{gpa.toFixed(2)}</p>
        </div>
      }
    >
      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Code</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Course Title</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Units</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Grade</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Grade Point</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {semester.courses.map((course) => (
              <tr key={course.code} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 font-mono font-bold text-[#BF9B63]">{course.code}</td>
                <td className="px-5 py-4 font-medium text-gray-900">{course.title}</td>
                <td className="px-5 py-4 text-center text-gray-500">{course.units}</td>
                <td className="px-5 py-4 text-center text-gray-500">{course.score}</td>
                <td className="px-5 py-4 text-center">
                  <StatusBadge label={course.grade} variant={gradeVariant[course.grade]} />
                </td>
                <td className="px-5 py-4 text-center font-semibold text-gray-900">
                  {(gradePoint[course.grade] * course.units).toFixed(0)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-bold">
              <td colSpan={2} className="px-5 py-3 text-right text-sm text-gray-700">Total</td>
              <td className="px-5 py-3 text-center text-sm text-gray-900">{totalUnits}</td>
              <td colSpan={2} />
              <td className="px-5 py-3 text-center text-[#BF9B63]">{gpa.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden divide-y divide-gray-100">
        {semester.courses.map((course) => (
          <div key={course.code} className="p-4 flex items-start justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-[#BF9B63]">{course.code}</p>
              <p className="font-semibold text-gray-900 text-sm">{course.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{course.units} units · Score {course.score}</p>
            </div>
            <StatusBadge label={course.grade} variant={gradeVariant[course.grade]} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
