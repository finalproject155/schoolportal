import React from "react";

export default function CurrentCourses() {
  const courses = [
    {
      code: "CSC 501",
      name: "Computer System Performance Evaluation",
      professor: "Prof. Ismaila",
    },
    {
      code: "CSC 503",
      name: "Optimization Techiques",
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        My Current Courses
      </h2>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-semibold text-gray-900 truncate w-[150px] sm:w-full">
                {course.code}: {course.name}
              </p>
              <p className="text-sm text-gray-500">{course.professor}</p>
            </div>
            <button className="text-sm font-medium text-accent hover:text-primary-hover cursor-pointer">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
