import React from "react";
import SectionCard from "@/components/portal/SectionCard";

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
    color: "bg-amber-50 text-amber-600",
  },
  {
    month: "JAN",
    day: "31",
    title: "Course Registration Closes",
    subtitle: "Registrar's Office",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function UpcomingDeadlines() {
  return (
    <SectionCard title="Upcoming Deadlines" subtitle="Don't miss these dates">
      <div className="divide-y divide-gray-100">
        {deadlines.map((item, index) => (
          <div key={index} className="p-4 flex items-start gap-4">
            <div
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg ${item.color} shrink-0`}
            >
              <span className="text-xs font-bold uppercase">{item.month}</span>
              <span className="text-lg font-bold leading-none">{item.day}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
