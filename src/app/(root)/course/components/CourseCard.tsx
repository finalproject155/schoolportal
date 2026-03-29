import React from "react";
import { Clock, User, BookMarked } from "lucide-react";

export type Course = {
  code: string;
  title: string;
  units: number;
  lecturer: string;
  schedule: string;
  type: "Compulsory" | "Elective";
  registered?: boolean;
};

type Props = {
  course: Course;
  selected: boolean;
  onToggle: (code: string) => void;
  disabled?: boolean;
};

export default function CourseCard({ course, selected, onToggle, disabled }: Props) {
  return (
    <div
      onClick={() => !disabled && onToggle(course.code)}
      className={`relative rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer select-none ${
        disabled
          ? "opacity-60 cursor-not-allowed border-gray-100 bg-gray-50"
          : selected
          ? "border-[#BF9B63] bg-[#BF9B63]/5 shadow-sm"
          : "border-gray-100 bg-white hover:border-[#BF9B63]/40 hover:shadow-sm"
      }`}
    >
      {/* Status badge */}
      <div className="flex items-start justify-between mb-2">
        <span
          className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            course.type === "Compulsory"
              ? "bg-[#D42C24]/10 text-[#D42C24]"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          {course.type}
        </span>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            selected
              ? "border-[#BF9B63] bg-[#BF9B63]"
              : "border-gray-300 bg-white"
          }`}
        >
          {selected && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>

      <p className="text-xs font-bold text-[#BF9B63] mb-0.5">{course.code}</p>
      <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-3">{course.title}</h3>

      <div className="space-y-1.5 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <BookMarked size={12} className="shrink-0" />
          <span>{course.units} Unit{course.units !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User size={12} className="shrink-0" />
          <span className="truncate">{course.lecturer}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="shrink-0" />
          <span>{course.schedule}</span>
        </div>
      </div>
    </div>
  );
}
