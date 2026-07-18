"use client";

import React, { useState } from "react";
import { CalendarDays, LayoutGrid, ListTodo } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import TabSwitcher, { type TabOption } from "@/components/portal/TabSwitcher";
import SectionCard from "@/components/portal/SectionCard";
import WeeklyGrid from "./components/WeeklyGrid";
import TodayClasses from "./components/TodayClasses";
import { DAY_INDEX_MAP, type TimetableEntry } from "./data";

type View = "weekly" | "today";

const VIEW_OPTIONS: TabOption<View>[] = [
  { value: "weekly", label: "Weekly Timetable", icon: LayoutGrid },
  { value: "today", label: "Today's Classes", icon: ListTodo },
];

export default function TimetablePage() {
  const [view, setView] = useState<View>("weekly");
  const [today] = useState<TimetableEntry["day"] | null>(
    () => DAY_INDEX_MAP[new Date().getDay()]
  );

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Timetable & Class Updates"
        subtitle="See your weekly class schedule and which lecturer is taking each class"
        badge="2024/2025 · 2nd Semester"
        badgeIcon={CalendarDays}
      />

      <TabSwitcher options={VIEW_OPTIONS} value={view} onChange={setView} />

      {view === "weekly" ? (
        <WeeklyGrid today={today} />
      ) : (
        <SectionCard
          title="Today's Classes"
          subtitle={today ? "Live status updates as your classes start and end" : "Weekend — no classes scheduled"}
        >
          <TodayClasses today={today} />
        </SectionCard>
      )}
    </main>
  );
}
