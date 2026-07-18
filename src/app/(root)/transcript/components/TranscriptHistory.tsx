import React from "react";
import { FileText } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";
import EmptyState from "@/components/portal/EmptyState";
import { type TranscriptRequest } from "./TranscriptRequestForm";

const statusVariant: Record<TranscriptRequest["status"], StatusVariant> = {
  Processing: "warning",
  Ready: "info",
  Delivered: "success",
};

export default function TranscriptHistory({ requests }: { requests: TranscriptRequest[] }) {
  if (requests.length === 0) {
    return (
      <SectionCard title="Request History">
        <EmptyState
          icon={FileText}
          title="No transcript requests yet"
          description="Requests you submit will show up here with live status updates."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Request History" subtitle={`${requests.length} request${requests.length !== 1 ? "s" : ""}`}>
      <div className="divide-y divide-gray-100">
        {requests.map((req) => (
          <div key={req.ref} className="p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{req.destination}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {req.ref} · {req.copies} cop{req.copies !== 1 ? "ies" : "y"} · {req.deliveryMethod} · {req.dateRequested}
              </p>
            </div>
            <StatusBadge label={req.status} variant={statusVariant[req.status]} className="shrink-0" />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
