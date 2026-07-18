import React from "react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";

type AnnouncementType = "Academic" | "Event" | "Urgent";

const typeVariant: Record<AnnouncementType, StatusVariant> = {
  Academic: "info",
  Event: "success",
  Urgent: "danger",
};

const announcements: { date: string; title: string; type: AnnouncementType }[] = [
  { date: "Jan 30, 2026", title: "Final Exam Timetable Released", type: "Academic" },
  { date: "Jan 25, 2026", title: "Campus Library Hours Extended", type: "Event" },
  { date: "Jan 22, 2026", title: "Portal Closing Soon for Maintenance", type: "Urgent" },
];

export default function Announcements() {
  return (
    <SectionCard title="Announcements" subtitle="Latest updates from the university">
      <div className="divide-y divide-gray-100">
        {announcements.map((item, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <StatusBadge label={item.type} variant={typeVariant[item.type]} />
              <span className="text-[11px] text-gray-400">{item.date}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
