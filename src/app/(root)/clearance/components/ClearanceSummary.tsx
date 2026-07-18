import React from "react";
import { ShieldCheck, ClipboardList, Hourglass } from "lucide-react";
import SummaryCard from "@/components/portal/SummaryCard";
import { CLEARANCE_ITEMS } from "../data";

export default function ClearanceSummary() {
  const cleared = CLEARANCE_ITEMS.filter((i) => i.status === "Cleared").length;
  const pending = CLEARANCE_ITEMS.filter((i) => i.status !== "Cleared").length;
  const percent = Math.round((cleared / CLEARANCE_ITEMS.length) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard
        label="Overall Clearance"
        value={`${percent}%`}
        sub={`${cleared} of ${CLEARANCE_ITEMS.length} departments`}
        icon={ShieldCheck}
        tone="primary"
      />
      <SummaryCard
        label="Cleared Departments"
        value={String(cleared)}
        sub="No further action needed"
        icon={ClipboardList}
        tone="success"
      />
      <SummaryCard
        label="Pending Items"
        value={String(pending)}
        sub="Requires your attention"
        icon={Hourglass}
        tone="warning"
      />
    </div>
  );
}
