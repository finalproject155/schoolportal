import React from "react";
import { Briefcase } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";
import EmptyState from "@/components/portal/EmptyState";
import { type ITRegistration } from "./ITRegistrationForm";

const statusVariant: Record<ITRegistration["status"], StatusVariant> = {
  "Under Review": "warning",
  Approved: "success",
  Rejected: "danger",
};

export default function ITRegistrationHistory({ registrations }: { registrations: ITRegistration[] }) {
  return (
    <SectionCard title="Placement History" subtitle="Your submitted IT placements">
      {registrations.length === 0 ? (
        <EmptyState icon={Briefcase} title="No placements submitted" description="Register your IT placement to see its status here." />
      ) : (
        <div className="divide-y divide-gray-100">
          {registrations.map((reg) => (
            <div key={reg.ref} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{reg.company}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {reg.ref} · {reg.startDate} – {reg.endDate}
                </p>
              </div>
              <StatusBadge label={reg.status} variant={statusVariant[reg.status]} className="shrink-0" />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
