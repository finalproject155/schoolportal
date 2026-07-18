"use client";

import React, { useState } from "react";
import { Handshake } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import PlacementCard from "./components/PlacementCard";
import ApplyModal from "./components/ApplyModal";
import MyApplications from "./components/MyApplications";
import { PLACEMENTS, type Placement, type PlacementApplication } from "./data";

export default function PlacementPage() {
  const [applying, setApplying] = useState<Placement | null>(null);
  const [applications, setApplications] = useState<PlacementApplication[]>([]);

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Placement & Internship Finder"
        subtitle="Discover internships, graduate trainee programs and volunteer roles"
        badge={`${PLACEMENTS.filter((p) => p.isOpen).length} Open Opportunities`}
        badgeIcon={Handshake}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PLACEMENTS.map((placement) => (
            <PlacementCard key={placement.id} placement={placement} onApply={setApplying} />
          ))}
        </div>

        <MyApplications applications={applications} />
      </div>

      {applying && (
        <ApplyModal
          placement={applying}
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
