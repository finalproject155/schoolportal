"use client";

import React, { useMemo, useState } from "react";
import { BedDouble } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import TabSwitcher from "@/components/portal/TabSwitcher";
import HostelCard from "./components/HostelCard";
import ApplyModal from "./components/ApplyModal";
import MyApplications from "./components/MyApplications";
import { HOSTELS, type Hostel, type HostelApplication, type HostelGender } from "./data";

type Filter = "All" | HostelGender;

export default function HostelPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [applying, setApplying] = useState<Hostel | null>(null);
  const [applications, setApplications] = useState<HostelApplication[]>([]);

  const filtered = useMemo(
    () => (filter === "All" ? HOSTELS : HOSTELS.filter((h) => h.gender === filter)),
    [filter]
  );

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Hostel Search"
        subtitle="Find and apply for available hostel accommodation"
        badge="2024/2025 Session"
        badgeIcon={BedDouble}
      />

      <TabSwitcher
        options={[
          { value: "All", label: "All Blocks" },
          { value: "Female", label: "Female" },
          { value: "Male", label: "Male" },
          { value: "Mixed", label: "Mixed" },
        ]}
        value={filter}
        onChange={setFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} onApply={setApplying} />
          ))}
        </div>

        <MyApplications applications={applications} />
      </div>

      {applying && (
        <ApplyModal
          hostel={applying}
          onClose={() => setApplying(null)}
          onSubmit={(app) => {
            setApplications((prev) => [app, ...prev]);
            setApplying(null);
          }}
        />
      )}
    </main>
  );
}
