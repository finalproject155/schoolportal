import React from "react";

export type StatusVariant =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

const variantClasses: Record<StatusVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  danger: "bg-red-50 text-[#D42C24] border border-red-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  info: "bg-[#6E7485]/10 text-[#6E7485] border border-[#6E7485]/25",
  neutral: "bg-gray-100 text-gray-600 border border-gray-200",
};

type Props = {
  label: string;
  variant: StatusVariant;
  className?: string;
};

export default function StatusBadge({ label, variant, className = "" }: Props) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${variantClasses[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
