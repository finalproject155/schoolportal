import React from "react";
import { BookMarked } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";
import EmptyState from "@/components/portal/EmptyState";
import { BORROWED_ITEMS, type BorrowedItem } from "../data";

const statusVariant: Record<BorrowedItem["status"], StatusVariant> = {
  "On Time": "success",
  "Due Soon": "warning",
  Overdue: "danger",
};

export default function MyBorrowedList() {
  return (
    <SectionCard title="My Borrowed Items" subtitle={`${BORROWED_ITEMS.length} item${BORROWED_ITEMS.length !== 1 ? "s" : ""} on loan`}>
      {BORROWED_ITEMS.length === 0 ? (
        <EmptyState icon={BookMarked} title="No borrowed items" description="Items you borrow from the e-library will appear here." />
      ) : (
        <div className="divide-y divide-gray-100">
          {BORROWED_ITEMS.map((item) => (
            <div key={item.title} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Borrowed {item.borrowedOn} · Due {item.dueOn}
                </p>
              </div>
              <StatusBadge label={item.status} variant={statusVariant[item.status]} className="shrink-0" />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
