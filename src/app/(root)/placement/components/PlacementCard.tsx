import React from "react";
import { MapPin, CalendarClock } from "lucide-react";
import StatusBadge from "@/components/portal/StatusBadge";
import { type Placement } from "../data";

type Props = {
  placement: Placement;
  onApply: (placement: Placement) => void;
};

export default function PlacementCard({ placement, onApply }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-gray-900">{placement.role}</p>
          <p className="text-xs text-gray-500 mt-0.5">{placement.company}</p>
        </div>
        <StatusBadge label={placement.isOpen ? "Open" : "Closed"} variant={placement.isOpen ? "success" : "neutral"} />
      </div>

      <p className="text-xs text-gray-500 line-clamp-2">{placement.requirements}</p>

      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1"><MapPin size={12} /> {placement.location}</span>
        <span className="flex items-center gap-1"><CalendarClock size={12} /> Closes {placement.deadline}</span>
      </div>

      <button
        disabled={!placement.isOpen}
        onClick={() => onApply(placement)}
        className={`mt-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
          placement.isOpen
            ? "bg-[#BF9B63] hover:bg-[#67683f] text-white"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {placement.isOpen ? "Apply Now" : "Applications Closed"}
      </button>
    </div>
  );
}
