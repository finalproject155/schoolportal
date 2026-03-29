"use client";

import React from "react";
import { Printer, X } from "lucide-react";
import type { Course } from "./CourseCard";

type Props = {
  courses: Course[];
  onClose: () => void;
};

export default function PrintableForm({ courses, onClose }: Props) {
  const totalUnits = courses.reduce((sum, c) => sum + c.units, 0);

  const handlePrint = () => window.print();

  return (
    <>
      {/* Print stylesheet injected inline */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #print-form { display: block !important; position: fixed; inset: 0; background: white; z-index: 9999; padding: 32px; }
          #print-form .no-print { display: none !important; }
        }
        @media screen {
          #print-form { display: flex; }
        }
      `}</style>

      {/* Overlay */}
      <div
        id="print-form"
        className="fixed inset-0 z-50 items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

          {/* Screen Header */}
          <div className="no-print sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <h2 className="text-base font-bold text-gray-900 font-lex">Course Registration Form</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <Printer size={15} />
                Print / Save PDF
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Printable Content */}
          <div className="px-8 py-6">
            {/* University Header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-gray-900">
              <h1 className="text-lg font-bold uppercase tracking-wide text-gray-900">
                Ladoke Akintola University of Technology
              </h1>
              <p className="text-sm text-gray-600 font-medium">Ogbomoso, Oyo State, Nigeria</p>
              <p className="text-xs text-gray-500 mt-0.5">Faculty of Science &amp; Engineering · Department of Computer Science</p>
              <h2 className="mt-3 text-base font-bold border border-gray-900 inline-block px-6 py-1 rounded uppercase tracking-widest">
                Course Registration Form
              </h2>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-6 text-sm">
              {[
                { label: "Student Name", value: "Goodness Olawale" },
                { label: "Matric Number", value: "2021001710" },
                { label: "Programme", value: "B.Sc. Computer Science" },
                { label: "Level", value: "500 Level" },
                { label: "Academic Session", value: "2024/2025" },
                { label: "Semester", value: "2nd Semester" },
              ].map((field) => (
                <div key={field.label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{field.label}</span>
                  <span className="font-semibold text-gray-900 border-b border-dashed border-gray-300 pb-0.5">{field.value}</span>
                </div>
              ))}
            </div>

            {/* Courses Table */}
            <table className="w-full border border-gray-900 text-sm mb-4" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="border border-gray-600 px-3 py-2 text-left text-xs font-semibold">S/N</th>
                  <th className="border border-gray-600 px-3 py-2 text-left text-xs font-semibold">Course Code</th>
                  <th className="border border-gray-600 px-3 py-2 text-left text-xs font-semibold">Course Title</th>
                  <th className="border border-gray-600 px-3 py-2 text-center text-xs font-semibold">Units</th>
                  <th className="border border-gray-600 px-3 py-2 text-center text-xs font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={course.code} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600 text-center">{idx + 1}</td>
                    <td className="border border-gray-300 px-3 py-2 font-mono font-bold text-gray-900">{course.code}</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-900">{course.title}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-900">{course.units}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-xs">{course.type}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={3} className="border border-gray-900 px-3 py-2 text-right text-sm">Total Units</td>
                  <td className="border border-gray-900 px-3 py-2 text-center text-sm">{totalUnits}</td>
                  <td className="border border-gray-900 px-3 py-2"></td>
                </tr>
              </tbody>
            </table>

            <p className="text-xs text-gray-500 mb-8">
              * Maximum credit load per semester: <strong>24 units</strong>. Minimum: <strong>15 units</strong>.
              This form must be submitted to your HOD's office within 2 weeks of semester commencement.
            </p>

            {/* Signatures */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {["Student Signature & Date", "Adviser's Signature & Date", "HOD's Signature & Stamp"].map((sig) => (
                <div key={sig} className="flex flex-col items-center gap-2">
                  <div className="w-full border-b-2 border-gray-900 h-10" />
                  <p className="text-[10px] text-center text-gray-600 font-medium">{sig}</p>
                </div>
              ))}
            </div>

            {/* Print footer */}
            <div className="mt-6 pt-3 border-t border-gray-200 flex justify-between text-[10px] text-gray-400">
              <span>Generated: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</span>
              <span>LAUTECH Student Portal · portal.lautech.edu.ng</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
