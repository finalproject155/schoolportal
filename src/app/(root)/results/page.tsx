"use client";

import React, { useState } from "react";
import { GraduationCap, Download } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import TabSwitcher from "@/components/portal/TabSwitcher";
import ResultsSummary from "./components/ResultsSummary";
import SemesterResultsTable from "./components/SemesterResultsTable";
import CgpaTrend from "./components/CgpaTrend";
import { SEMESTER_RESULTS, cumulativeStats, semesterGpa } from "./data";

export default function ResultsPage() {
  const [activeId, setActiveId] = useState(SEMESTER_RESULTS[SEMESTER_RESULTS.length - 1].id);
  const activeSemester = SEMESTER_RESULTS.find((s) => s.id === activeId)!;
  const { cgpa, totalUnits } = cumulativeStats();

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Results & GPA/CGPA"
        subtitle="Track your academic performance across semesters"
        badge="500 Level · Computer Science"
        badgeIcon={GraduationCap}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold rounded-lg transition-colors">
            <Download size={14} />
            Download Result
          </button>
        }
      />

      <ResultsSummary
        cgpa={cgpa}
        semesterGpa={semesterGpa(activeSemester)}
        totalUnits={totalUnits}
      />

      <TabSwitcher
        options={SEMESTER_RESULTS.map((s) => ({
          value: s.id,
          label: `${s.session} · ${s.semester}`,
        }))}
        value={activeId}
        onChange={setActiveId}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <SemesterResultsTable semester={activeSemester} />
        </div>
        <CgpaTrend />
      </div>
    </main>
  );
}
