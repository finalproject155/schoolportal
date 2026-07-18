"use client";

import React, { useMemo, useState } from "react";
import { Trophy } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import TabSwitcher from "@/components/portal/TabSwitcher";
import SportCard from "./components/SportCard";
import MyRegistrations from "./components/MyRegistrations";
import { SPORTS, type SportCategory } from "./data";

type Filter = "All" | SportCategory;

export default function SportsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const filtered = useMemo(
    () => (filter === "All" ? SPORTS : SPORTS.filter((s) => s.category === filter)),
    [filter]
  );

  const toggle = (id: string) => {
    setRegisteredIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Sports Registration"
        subtitle="Register for a sports club or team for this session"
        badge="2024/2025 Session"
        badgeIcon={Trophy}
      />

      <TabSwitcher
        options={[
          { value: "All", label: "All" },
          { value: "Team Sport", label: "Team Sports" },
          { value: "Individual Sport", label: "Individual Sports" },
        ]}
        value={filter}
        onChange={setFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((sport) => (
            <SportCard
              key={sport.id}
              sport={sport}
              isRegistered={registeredIds.includes(sport.id)}
              onToggle={toggle}
            />
          ))}
        </div>

        <MyRegistrations registeredIds={registeredIds} />
      </div>
    </main>
  );
}
