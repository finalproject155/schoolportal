import React from "react";
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  CalendarClock,
} from "lucide-react";

const cards = [
  {
    label: "Total Semester Fees",
    value: "₦450,000",
    sub: "2024/2025 Session",
    icon: CreditCard,
    iconBg: "bg-[#BF9B63]/10",
    iconColor: "text-[#BF9B63]",
    border: "border-l-[#BF9B63]",
  },
  {
    label: "Amount Paid",
    value: "₦300,000",
    sub: "2 payments made",
    icon: CheckCircle2,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    border: "border-l-green-500",
  },
  {
    label: "Outstanding Balance",
    value: "₦150,000",
    sub: "Remaining this semester",
    icon: AlertCircle,
    iconBg: "bg-[#D42C24]/10",
    iconColor: "text-[#D42C24]",
    border: "border-l-[#D42C24]",
  },
  {
    label: "Next Due Date",
    value: "Apr 15, 2025",
    sub: "15 days remaining",
    icon: CalendarClock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    border: "border-l-amber-500",
  },
];

export default function FeesSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`bg-white rounded shadow-sm border border-gray-100 border-l-4 ${card.border} p-5 flex items-center gap-4`}
        >
          <div className={`${card.iconBg} p-3 rounded-full shrink-0`}>
            <card.icon size={22} className={card.iconColor} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">
              {card.label}
            </p>
            <p className="text-xl font-bold font-lex text-gray-900">
              {card.value}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
