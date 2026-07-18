import React from "react";
import { type LucideIcon } from "lucide-react";

export type TabOption<T extends string> = {
  value: T;
  label: string;
  icon?: LucideIcon;
};

type Props<T extends string> = {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export default function TabSwitcher<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: Props<T>) {
  return (
    <div
      className={`flex items-center gap-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1 self-start overflow-x-auto ${className}`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            value === opt.value
              ? "bg-[#BF9B63] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {opt.icon && <opt.icon size={15} />}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
