"use client";

import React from "react";
import { MapPin, User } from "lucide-react";
import { DAYS, DAY_LABELS, TIMETABLE, type TimetableEntry } from "../data";

const typeStyles: Record<TimetableEntry["type"], string> = {
  Lecture: "border-l-[#BF9B63] bg-[#BF9B63]/5",
  Lab: "border-l-[#6E7485] bg-[#6E7485]/5",
  Tutorial: "border-l-amber-500 bg-amber-50/60",
};

export default function WeeklyGrid({ today }: { today: TimetableEntry["day"] | null }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {DAYS.map((day) => {
        const entries = TIMETABLE.filter((e) => e.day === day).sort((a, b) =>
          a.start.localeCompare(b.start)
        );
        const isToday = day === today;

        return (
          <div
            key={day}
            className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
              isToday ? "border-[#BF9B63]" : "border-gray-100"
            }`}
          >
            <div
              className={`px-4 py-3 border-b ${
                isToday ? "bg-[#BF9B63] text-white border-[#BF9B63]" : "bg-gray-50 border-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm font-bold">{DAY_LABELS[day]}</p>
              {isToday && <p className="text-[10px] uppercase tracking-wide text-white/80">Today</p>}
            </div>

            <div className="p-3 space-y-2 min-h-[120px]">
              {entries.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-6">No classes scheduled</p>
              )}
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className={`rounded-lg border-l-4 p-3 ${typeStyles[entry.type]}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                      {entry.type}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {entry.start}–{entry.end}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#BF9B63]">{entry.code}</p>
                  <p className="text-sm font-semibold text-gray-900 leading-snug mb-1.5">
                    {entry.title}
                  </p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <User size={11} />
                      <span className="truncate">{entry.lecturer}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      <span>{entry.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
