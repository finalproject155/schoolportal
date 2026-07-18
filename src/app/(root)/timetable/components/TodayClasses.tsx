"use client";

import React, { useEffect, useState } from "react";
import { Bell, MapPin, User, Video } from "lucide-react";
import EmptyState from "@/components/portal/EmptyState";
import { TIMETABLE, type TimetableEntry } from "../data";

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

type LiveStatus = "live" | "upcoming" | "ended";

function getStatus(entry: TimetableEntry, nowMinutes: number): LiveStatus {
  const start = toMinutes(entry.start);
  const end = toMinutes(entry.end);
  if (nowMinutes >= start && nowMinutes <= end) return "live";
  if (nowMinutes > end) return "ended";
  return "upcoming";
}

const statusStyles: Record<LiveStatus, string> = {
  live: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  upcoming: "bg-[#6E7485]/10 text-[#6E7485] border border-[#6E7485]/25",
  ended: "bg-gray-100 text-gray-500 border border-gray-200",
};

const statusLabel: Record<LiveStatus, string> = {
  live: "Live Now",
  upcoming: "Upcoming",
  ended: "Ended",
};

export default function TodayClasses({ today }: { today: TimetableEntry["day"] | null }) {
  const [nowMinutes, setNowMinutes] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setNowMinutes(now.getHours() * 60 + now.getMinutes());
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!today) {
    return (
      <EmptyState
        icon={Bell}
        title="No classes today"
        description="Enjoy your day off — check the weekly timetable for your next class."
      />
    );
  }

  const entries = TIMETABLE.filter((e) => e.day === today).sort((a, b) =>
    a.start.localeCompare(b.start)
  );

  if (entries.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title="No classes today"
        description="You have no scheduled classes for today."
      />
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {entries.map((entry, i) => {
        const status = nowMinutes !== null ? getStatus(entry, nowMinutes) : "upcoming";
        return (
          <div key={i} className="p-4 flex items-center gap-4">
            <div className="bg-[#BF9B63]/10 p-2.5 rounded-full shrink-0">
              <Bell size={16} className="text-[#BF9B63]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {entry.code}: {entry.title}
                </p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusStyles[status]}`}>
                  {statusLabel[status]}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                <span>{entry.start}–{entry.end}</span>
                <span className="flex items-center gap-1"><User size={12} />{entry.lecturer}</span>
                <span className="flex items-center gap-1"><MapPin size={12} />{entry.venue}</span>
              </div>
            </div>
            {status === "live" ? (
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-xs font-semibold shrink-0 transition-colors">
                <Video size={13} />
                Join
              </button>
            ) : (
              <span className="text-xs text-gray-400 shrink-0">—</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
