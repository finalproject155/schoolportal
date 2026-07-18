import React from "react";
import { CalendarDays, UserRound } from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/portal/StatusBadge";
import { PROGRAM } from "../data";

export default function ProgramOverviewCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center gap-5">
      <div className="h-16 w-16 rounded-xl bg-linear-to-br from-[#BF9B63] to-[#67683f] flex items-center justify-center shrink-0">
        <span className="text-white font-bold text-lg font-lex">CS</span>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h2 className="text-lg font-bold font-lex text-gray-900">{PROGRAM.name}</h2>
          <StatusBadge label={PROGRAM.status} variant="success" />
        </div>
        <p className="text-sm text-gray-500">{PROGRAM.school} · {PROGRAM.certificate}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} />
            {PROGRAM.startDate} – {PROGRAM.endDate}
          </span>
          <span className="flex items-center gap-1.5">
            <UserRound size={13} />
            Advisor: {PROGRAM.advisor}
          </span>
        </div>
      </div>

      <Link
        href="/course"
        className="px-5 py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors text-center shrink-0"
      >
        Enter Classroom
      </Link>
    </div>
  );
}
