import React from "react";

export default function Announcements() {
  const announcements = [
    { date: "JAN 30, 2026", title: "Final Exam Timetable Released" },
    { date: "JAN 25, 2026", title: "Campus Library Hours Extended" },
    { date: "JAN 22, 2026", title: "Portal Closing Soon" },
  ];

  return (
    <div className="bg-white p-5 w-full rounded-lg shadow-sm border border-gray-100 mb-6 h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Announcements</h2>
      <div className="space-y-4">
        {announcements.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-100 last:border-0 pb-3 last:pb-0"
          >
            <p className="text-xs font-semibold text-gray-500 mb-1 uppercase">
              {item.date}
            </p>
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
