import React from "react";
import { History } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";
import EmptyState from "@/components/portal/EmptyState";
import { ALERT_HISTORY, type SOSAlert } from "../data";

const statusVariant: Record<SOSAlert["status"], StatusVariant> = {
  Dispatched: "warning",
  Resolved: "success",
};

export default function AlertHistory() {
  return (
    <SectionCard title="Your Alert History" subtitle="Past SOS alerts you've triggered">
      {ALERT_HISTORY.length === 0 ? (
        <EmptyState icon={History} title="No alerts triggered" description="Alerts you send will be logged here for your records." />
      ) : (
        <div className="divide-y divide-gray-100">
          {ALERT_HISTORY.map((alert) => (
            <div key={alert.ref} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{alert.type}</p>
                <p className="text-xs text-gray-500 mt-0.5">{alert.location} · {alert.time}</p>
              </div>
              <StatusBadge label={alert.status} variant={statusVariant[alert.status]} className="shrink-0" />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
