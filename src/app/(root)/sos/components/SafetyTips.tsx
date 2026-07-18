import React from "react";
import { Info } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";

const TIPS = [
  "Use the SOS button (bottom-right on every page) for immediate emergencies.",
  "Share your live location with a trusted contact when walking campus at night.",
  "Save the Campus Security number to your phone's speed dial.",
  "Report suspicious activity early — don't wait for it to escalate.",
];

export default function SafetyTips() {
  return (
    <SectionCard title="Safety Tips" bodyClassName="p-5 space-y-3">
      {TIPS.map((tip) => (
        <div key={tip} className="flex items-start gap-2.5">
          <Info size={15} className="text-[#BF9B63] shrink-0 mt-0.5" />
          <span className="text-sm text-gray-600">{tip}</span>
        </div>
      ))}
    </SectionCard>
  );
}
