import React from "react";
import { type LucideIcon } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: LucideIcon;
  actions?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  badge,
  badgeIcon: BadgeIcon,
  actions,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold font-lex text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 self-start sm:self-auto">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
            {BadgeIcon && <BadgeIcon size={15} className="text-[#BF9B63]" />}
            {badge}
          </div>
        )}
        {actions}
      </div>
    </div>
  );
}
