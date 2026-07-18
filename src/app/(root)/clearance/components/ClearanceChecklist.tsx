import React from "react";
import { Mail } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";
import { CLEARANCE_ITEMS, type ClearanceStatus } from "../data";

const statusVariant: Record<ClearanceStatus, StatusVariant> = {
  Cleared: "success",
  Pending: "warning",
  "Not Started": "danger",
};

export default function ClearanceChecklist() {
  return (
    <SectionCard title="Clearance Checklist" subtitle="2024/2025 Academic Session">
      <div className="divide-y divide-gray-100">
        {CLEARANCE_ITEMS.map((item) => (
          <div key={item.department} className="p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="text-sm font-semibold text-gray-900">{item.department}</p>
                <StatusBadge label={item.status} variant={statusVariant[item.status]} />
              </div>
              <p className="text-xs text-gray-500">{item.remark}</p>
              {item.status !== "Cleared" && (
                <a
                  href={`mailto:${item.contact}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BF9B63] hover:text-[#67683f] mt-1.5"
                >
                  <Mail size={12} />
                  Contact office
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
