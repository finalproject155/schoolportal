import React from "react";
import { type LucideIcon } from "lucide-react";

export type SummaryCardTone = "primary" | "success" | "danger" | "warning" | "info";

const toneClasses: Record<SummaryCardTone, { border: string; iconBg: string; iconColor: string }> = {
  primary: { border: "border-l-[#BF9B63]", iconBg: "bg-[#BF9B63]/10", iconColor: "text-[#BF9B63]" },
  success: { border: "border-l-emerald-500", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  danger: { border: "border-l-[#D42C24]", iconBg: "bg-[#D42C24]/10", iconColor: "text-[#D42C24]" },
  warning: { border: "border-l-amber-500", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  info: { border: "border-l-[#6E7485]", iconBg: "bg-[#6E7485]/10", iconColor: "text-[#6E7485]" },
};

type Props = {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  tone?: SummaryCardTone;
};

export default function SummaryCard({ label, value, sub, icon: Icon, tone = "primary" }: Props) {
  const t = toneClasses[tone];
  return (
    <div
      className={`bg-white rounded shadow-sm border border-gray-100 border-l-4 ${t.border} p-5 flex items-center gap-4`}
    >
      <div className={`${t.iconBg} p-3 rounded-full shrink-0`}>
        <Icon size={22} className={t.iconColor} />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 mb-0.5">{label}</p>
        <p className="text-xl font-bold font-lex text-gray-900">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
