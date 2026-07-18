import React from "react";
import Link from "next/link";
import SectionCard from "@/components/portal/SectionCard";

const courses = [
  {
    code: "CSC 501",
    name: "Computer System Performance Evaluation",
    professor: "Prof. Ismaila",
  },
  {
    code: "CSC 503",
    name: "Optimization Techniques",
    professor: "Prof. Olabiyisi",
  },
  {
    code: "CSC 535",
    name: "Project Management",
    professor: "Prof. Olabiyisi",
  },
  {
    code: "CSC 505",
    name: "Computer Network and Communication",
    professor: "Prof. Adetunji",
  },
];

export default function CurrentCourses() {
  return (
    <SectionCard
      title="My Current Courses"
      subtitle="2024/2025 · 2nd Semester"
      headerAction={
        <Link href="/course" className="text-xs font-semibold text-[#BF9B63] hover:text-[#67683f]">
          Manage Courses →
        </Link>
      }
      bodyClassName="p-5 space-y-3"
    >
      {courses.map((course, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
        >
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {course.code}: {course.name}
            </p>
            <p className="text-sm text-gray-500">{course.professor}</p>
          </div>
          <Link
            href="/course"
            className="text-sm font-medium text-[#BF9B63] hover:text-[#67683f] shrink-0 ml-3"
          >
            View Details
          </Link>
        </div>
      ))}
    </SectionCard>
  );
}
