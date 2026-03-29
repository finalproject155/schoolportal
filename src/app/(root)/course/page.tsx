"use client";

import React, { useState } from "react";
import CourseCard, { type Course } from "./components/CourseCard";
import PrintableForm from "./components/PrintableForm";
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Printer,
  RotateCcw,
  GraduationCap,
} from "lucide-react";

// ─── Course Catalogue ─────────────────────────────────────────────────────────
const AVAILABLE_COURSES: Course[] = [
  // Compulsory
  {
    code: "CSC 501",
    title: "Computer System Performance Evaluation",
    units: 3,
    lecturer: "Prof. Ismaila",
    schedule: "Mon/Wed · 8:00–9:30am",
    type: "Compulsory",
  },
  {
    code: "CSC 503",
    title: "Optimization Techniques",
    units: 3,
    lecturer: "Prof. Olabiyisi",
    schedule: "Tue/Thu · 10:00–11:30am",
    type: "Compulsory",
  },
  {
    code: "CSC 535",
    title: "Project Management",
    units: 2,
    lecturer: "Prof. Olabiyisi",
    schedule: "Fri · 8:00–10:00am",
    type: "Compulsory",
  },
  {
    code: "CSC 505",
    title: "Computer Network and Communication",
    units: 3,
    lecturer: "Prof. Adetunji",
    schedule: "Mon/Wed · 12:00–1:30pm",
    type: "Compulsory",
  },
  {
    code: "CSC 511",
    title: "Software Engineering II",
    units: 3,
    lecturer: "Dr. Adesanya",
    schedule: "Tue/Thu · 2:00–3:30pm",
    type: "Compulsory",
  },
  {
    code: "CSC 599",
    title: "Final Year Project",
    units: 6,
    lecturer: "Dept. Supervisor",
    schedule: "By appointment",
    type: "Compulsory",
  },
  // Electives
  {
    code: "CSC 513",
    title: "Artificial Intelligence",
    units: 3,
    lecturer: "Dr. Adeleke",
    schedule: "Mon/Wed · 2:00–3:30pm",
    type: "Elective",
  },
  {
    code: "CSC 517",
    title: "Information Security",
    units: 3,
    lecturer: "Dr. Ogunleye",
    schedule: "Tue/Thu · 8:00–9:30am",
    type: "Elective",
  },
  {
    code: "CSC 521",
    title: "Mobile Application Development",
    units: 2,
    lecturer: "Mr. Adebayo",
    schedule: "Fri · 10:00am–12:00pm",
    type: "Elective",
  },
  {
    code: "CSC 523",
    title: "Database Administration",
    units: 2,
    lecturer: "Dr. Fasanya",
    schedule: "Mon · 4:00–6:00pm",
    type: "Elective",
  },
];

const UNIT_MIN = 15;
const UNIT_MAX = 24;

type Phase = "select" | "submitted";

export default function CoursePage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"All" | "Compulsory" | "Elective">("All");

  const totalUnits = AVAILABLE_COURSES.filter((c) =>
    selectedCodes.has(c.code)
  ).reduce((sum, c) => sum + c.units, 0);

  const selectedCourses = AVAILABLE_COURSES.filter((c) =>
    selectedCodes.has(c.code)
  );

  const isValid = totalUnits >= UNIT_MIN && totalUnits <= UNIT_MAX;

  const toggle = (code: string) => {
    const course = AVAILABLE_COURSES.find((c) => c.code === code)!;
    const next = new Set(selectedCodes);
    if (next.has(code)) {
      next.delete(code);
    } else {
      // Prevent going over max
      const projectedUnits = totalUnits + course.units;
      if (projectedUnits > UNIT_MAX) return;
      next.add(code);
    }
    setSelectedCodes(next);
  };

  const handleSubmit = () => {
    if (!isValid) return;
    setPhase("submitted");
  };

  const handleReset = () => {
    setPhase("select");
    setSelectedCodes(new Set());
  };

  const displayedCourses =
    filter === "All"
      ? AVAILABLE_COURSES
      : AVAILABLE_COURSES.filter((c) => c.type === filter);

  // ─── Unit bar colour ─────────────────────────────────────────────────────
  const barPercent = Math.min((totalUnits / UNIT_MAX) * 100, 100);
  const barColor =
    totalUnits < UNIT_MIN
      ? "bg-amber-400"
      : totalUnits <= UNIT_MAX
      ? "bg-[#BF9B63]"
      : "bg-[#D42C24]";

  return (
    <>
      {showForm && (
        <PrintableForm courses={selectedCourses} onClose={() => setShowForm(false)} />
      )}

      <main className="flex flex-col gap-5 my-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold font-lex text-gray-900">Course Registration</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              2024/2025 Academic Session · 2nd Semester
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm self-start sm:self-auto">
            <GraduationCap size={15} className="text-[#BF9B63]" />
            500 Level · Computer Science
          </div>
        </div>

        {/* ──── PHASE: SELECT ────────────────────────────────────────────────── */}
        {phase === "select" && (
          <>
            {/* Sticky unit counter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={14} className="text-[#BF9B63]" />
                    <span className="text-gray-500">Selected:</span>
                    <span className="font-bold text-gray-900">{selectedCodes.size} course{selectedCodes.size !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="h-4 w-px bg-gray-200" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500">Total Units:</span>
                    <span
                      className={`font-bold text-base ${
                        totalUnits < UNIT_MIN
                          ? "text-amber-500"
                          : totalUnits <= UNIT_MAX
                          ? "text-[#BF9B63]"
                          : "text-[#D42C24]"
                      }`}
                    >
                      {totalUnits} / {UNIT_MAX}
                    </span>
                  </div>
                  {totalUnits < UNIT_MIN && totalUnits > 0 && (
                    <span className="text-xs text-amber-600 flex items-center gap-1">
                      <AlertTriangle size={12} /> Need {UNIT_MIN - totalUnits} more
                    </span>
                  )}
                  {totalUnits >= UNIT_MIN && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Valid load
                    </span>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isValid
                      ? "bg-[#BF9B63] hover:bg-[#67683f] text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Register Courses
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                  style={{ width: `${barPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Min: {UNIT_MIN} units</span>
                <span>Max: {UNIT_MAX} units</span>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1 self-start">
              {(["All", "Compulsory", "Elective"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === f
                      ? "bg-[#BF9B63] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {displayedCourses.map((course) => (
                <CourseCard
                  key={course.code}
                  course={course}
                  selected={selectedCodes.has(course.code)}
                  onToggle={toggle}
                />
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center pb-4">
              Click a course card to select or deselect it. You must register between {UNIT_MIN}–{UNIT_MAX} units.
            </p>
          </>
        )}

        {/* ──── PHASE: SUBMITTED ─────────────────────────────────────────────── */}
        {phase === "submitted" && (
          <>
            {/* Success Banner */}
            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex items-start gap-4">
              <div className="bg-green-100 rounded-full p-2 shrink-0 mt-0.5">
                <CheckCircle2 size={20} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-green-800">Registration Successful!</h3>
                <p className="text-sm text-green-700 mt-0.5">
                  You have successfully registered <strong>{selectedCourses.length} courses</strong> totalling{" "}
                  <strong>{totalUnits} units</strong> for the 2024/2025 2nd Semester.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <Printer size={14} />
                  Print Form
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-lg transition-colors"
                >
                  <RotateCcw size={14} />
                  Re-register
                </button>
              </div>
            </div>

            {/* Registered courses table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-base font-bold text-gray-900">Registered Courses</h2>
                <p className="text-sm text-gray-500">2024/2025 · 2nd Semester</p>
              </div>

              {/* Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">S/N</th>
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Code</th>
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Course Title</th>
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Lecturer</th>
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Schedule</th>
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Units</th>
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {selectedCourses.map((course, idx) => (
                      <tr key={course.code} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-5 py-4 text-gray-400 text-xs">{idx + 1}</td>
                        <td className="px-5 py-4 font-mono font-bold text-[#BF9B63]">{course.code}</td>
                        <td className="px-5 py-4 font-medium text-gray-900">{course.title}</td>
                        <td className="px-5 py-4 text-gray-500">{course.lecturer}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{course.schedule}</td>
                        <td className="px-5 py-4 text-center font-bold text-gray-900">{course.units}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              course.type === "Compulsory"
                                ? "bg-[#D42C24]/10 text-[#D42C24]"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            {course.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-bold">
                      <td colSpan={5} className="px-5 py-3 text-right text-sm text-gray-700">Total Units</td>
                      <td className="px-5 py-3 text-center text-base font-bold text-[#BF9B63]">{totalUnits}</td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="md:hidden divide-y divide-gray-100">
                {selectedCourses.map((course, idx) => (
                  <div key={course.code} className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="font-mono text-xs font-bold text-[#BF9B63]">{course.code}</p>
                        <p className="font-semibold text-gray-900 text-sm">{course.title}</p>
                      </div>
                      <span className="font-bold text-gray-900 text-sm ml-2">{course.units}u</span>
                    </div>
                    <p className="text-xs text-gray-500">{course.lecturer} · {course.schedule}</p>
                  </div>
                ))}
                <div className="px-4 py-3 bg-gray-50 flex justify-between items-center font-bold text-sm">
                  <span>Total</span>
                  <span className="text-[#BF9B63]">{totalUnits} Units</span>
                </div>
              </div>
            </div>

            {/* Print prompt */}
            <div className="flex items-center justify-center gap-3 pb-4">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                <Printer size={16} />
                View &amp; Print Registration Form
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
