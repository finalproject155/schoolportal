import React from "react";
import Link from "next/link";
import { CalendarClock } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import { KEY_DATES } from "../data";

export default function KeyDatesList() {
  return (
    <SectionCard title="Key Dates" bodyClassName="p-5 space-y-3">
      {KEY_DATES.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="bg-[#BF9B63]/10 p-2 rounded-full shrink-0">
            <CalendarClock size={14} className="text-[#BF9B63]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{item.label}</p>
            <p className="text-xs text-gray-400">{item.date}</p>
          </div>
        </div>
      ))}
      <Link
        href="/timetable"
        className="block text-xs font-semibold text-[#BF9B63] hover:text-[#67683f] pt-1"
      >
        View full timetable →
      </Link>
    </SectionCard>
  );
}
