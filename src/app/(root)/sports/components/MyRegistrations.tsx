import React from "react";
import { Trophy } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import EmptyState from "@/components/portal/EmptyState";
import { SPORTS } from "../data";

export default function MyRegistrations({ registeredIds }: { registeredIds: string[] }) {
  const registered = SPORTS.filter((s) => registeredIds.includes(s.id));

  return (
    <SectionCard title="My Registrations" subtitle="Sports you're currently signed up for">
      {registered.length === 0 ? (
        <EmptyState icon={Trophy} title="No sports registered" description="Register for a sport to see it listed here." />
      ) : (
        <div className="divide-y divide-gray-100">
          {registered.map((sport) => (
            <div key={sport.id} className="p-4">
              <p className="text-sm font-semibold text-gray-900">{sport.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{sport.schedule}</p>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
