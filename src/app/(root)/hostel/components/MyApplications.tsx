import React from "react";
import { Home } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";
import EmptyState from "@/components/portal/EmptyState";
import { type HostelApplication } from "../data";

const statusVariant: Record<HostelApplication["status"], StatusVariant> = {
  "Pending Review": "warning",
  Approved: "success",
  Denied: "danger",
};

export default function MyApplications({ applications }: { applications: HostelApplication[] }) {
  return (
    <SectionCard title="My Applications" subtitle="Track your hostel room applications">
      {applications.length === 0 ? (
        <EmptyState icon={Home} title="No applications yet" description="Apply for a hostel room to see its status here." />
      ) : (
        <div className="divide-y divide-gray-100">
          {applications.map((app) => (
            <div key={app.ref} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{app.block}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {app.ref} · {app.roomType} · {app.dateApplied}
                </p>
              </div>
              <StatusBadge label={app.status} variant={statusVariant[app.status]} className="shrink-0" />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
