import React from "react";
import { GraduationCap, BookMarked, ReceiptText, CalendarClock } from "lucide-react";
import SummaryCard from "@/components/portal/SummaryCard";
import { cumulativeStats } from "../../results/data";

export default function DashboardStats() {
  const { cgpa, totalUnits } = cumulativeStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <SummaryCard
        label="Cumulative CGPA"
        value={cgpa.toFixed(2)}
        sub="Out of 5.00"
        icon={GraduationCap}
        tone="primary"
      />
      <SummaryCard
        label="Total Units Earned"
        value={String(totalUnits)}
        sub="Across all semesters"
        icon={BookMarked}
        tone="success"
      />
      <SummaryCard
        label="Outstanding Fees"
        value="₦150,000"
        sub="Due Apr 15, 2025"
        icon={ReceiptText}
        tone="danger"
      />
      <SummaryCard
        label="Next Deadline"
        value="Jan 22"
        sub="Tuition Fee Payment"
        icon={CalendarClock}
        tone="warning"
      />
    </div>
  );
}
