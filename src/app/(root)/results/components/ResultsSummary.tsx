import React from "react";
import { GraduationCap, TrendingUp, BookMarked, Award } from "lucide-react";
import SummaryCard from "@/components/portal/SummaryCard";
import { classOfDegree } from "../data";

type Props = {
  cgpa: number;
  semesterGpa: number;
  totalUnits: number;
};

export default function ResultsSummary({ cgpa, semesterGpa, totalUnits }: Props) {
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
        label="Semester GPA"
        value={semesterGpa.toFixed(2)}
        sub="Selected semester"
        icon={TrendingUp}
        tone="info"
      />
      <SummaryCard
        label="Total Units Earned"
        value={String(totalUnits)}
        sub="Across all semesters"
        icon={BookMarked}
        tone="success"
      />
      <SummaryCard
        label="Academic Standing"
        value={classOfDegree(cgpa)}
        sub="Projected class of degree"
        icon={Award}
        tone="warning"
      />
    </div>
  );
}
