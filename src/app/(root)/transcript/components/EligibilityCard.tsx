import React from "react";
import { CheckCircle2 } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";

const CHECKS = [
  "No outstanding tuition balance",
  "Departmental clearance completed",
  "No pending library holds",
];

export default function EligibilityCard() {
  return (
    <SectionCard title="Eligibility Check" bodyClassName="p-5 space-y-3">
      {CHECKS.map((check) => (
        <div key={check} className="flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          <span className="text-sm text-gray-700">{check}</span>
        </div>
      ))}
      <p className="text-xs text-gray-400 pt-1">
        You are eligible to request an official academic transcript.
      </p>
    </SectionCard>
  );
}
