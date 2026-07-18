import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
};

export default function SectionCard({
  title,
  subtitle,
  headerAction,
  className = "",
  bodyClassName = "",
  children,
}: Props) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {(title || headerAction) && (
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div>
            {title && <h2 className="text-base font-bold text-gray-900">{title}</h2>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {headerAction}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
