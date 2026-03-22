import React from "react";

export default function UpcomingDeadlines() {
  const deadlines = [
    {
      month: "JAN",
      day: "22",
      title: "Tuition Fee Payment",
      subtitle: "Finance Office",
      color: "bg-red-50 text-red-600",
    },
    {
      month: "JAN",
      day: "24",
      title: "CS-201 Project Proposal",
      subtitle: "Due by 11:59 PM",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      month: "JAN",
      day: "31",
      title: "Course Registration Closes",
      subtitle: "Registrar's Office",
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-lg w-full shadow-sm border border-gray-100 h-full">
      <h2 className="text-lg font-bold text-accent mb-4">
        Upcoming Deadlines
      </h2>
      <div className="space-y-4">
        {deadlines.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg ${item.color} shrink-0`}
            >
              <span className="text-xs font-bold uppercase">{item.month}</span>
              <span className="text-lg font-bold leading-none">{item.day}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
