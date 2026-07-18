import React from "react";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import EmptyState from "@/components/portal/EmptyState";
import { TIMETABLE, DAY_INDEX_MAP } from "../../timetable/data";

export default function TodayScheduleCard() {
  const today = DAY_INDEX_MAP[new Date().getDay()];
  const classes = today
    ? TIMETABLE.filter((entry) => entry.day === today).sort((a, b) => a.start.localeCompare(b.start))
    : [];

  return (
    <SectionCard
      title="Today's Classes"
      subtitle={today ? "Live schedule for today" : "No classes on weekends"}
      headerAction={
        <Link href="/timetable" className="text-xs font-semibold text-[#BF9B63] hover:text-[#67683f]">
          Full Timetable →
        </Link>
      }
    >
      {classes.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No classes today"
          description="Enjoy your day off — check the full timetable for what's ahead."
        />
      ) : (
        <div className="divide-y divide-gray-100">
          {classes.map((entry, i) => (
            <div key={i} className="p-4 flex items-start gap-3">
              <div className="flex flex-col items-center justify-center w-14 shrink-0 text-[#BF9B63]">
                <Clock size={14} />
                <span className="text-[11px] font-semibold mt-1">{entry.start}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {entry.code}: {entry.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {entry.lecturer} · {entry.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
