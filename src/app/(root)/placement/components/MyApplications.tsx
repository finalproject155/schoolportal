import React from "react";
import { Send } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";
import EmptyState from "@/components/portal/EmptyState";
import { type PlacementApplication } from "../data";

const statusVariant: Record<PlacementApplication["status"], StatusVariant> = {
  Submitted: "info",
  Shortlisted: "success",
  Rejected: "danger",
};

export default function MyApplications({ applications }: { applications: PlacementApplication[] }) {
  return (
    <SectionCard title="My Applications" subtitle="Track your internship & placement applications">
      {applications.length === 0 ? (
        <EmptyState icon={Send} title="No applications yet" description="Apply to an opportunity to track its status here." />
      ) : (
        <div className="divide-y divide-gray-100">
          {applications.map((app) => (
            <div key={app.ref} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{app.role}</p>
                <p className="text-xs text-gray-500 mt-0.5">{app.company} · {app.dateApplied}</p>
              </div>
              <StatusBadge label={app.status} variant={statusVariant[app.status]} className="shrink-0" />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
