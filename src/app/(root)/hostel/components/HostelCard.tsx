import React from "react";
import { Wifi, Users } from "lucide-react";
import StatusBadge from "@/components/portal/StatusBadge";
import { type Hostel } from "../data";

const genderVariant = {
  Male: "info",
  Female: "danger",
  Mixed: "neutral",
} as const;

type Props = {
  hostel: Hostel;
  onApply: (hostel: Hostel) => void;
};

export default function HostelCard({ hostel, onApply }: Props) {
  const isFull = hostel.availableSlots === 0;
  const pctFull = Math.round(((hostel.totalSlots - hostel.availableSlots) / hostel.totalSlots) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-gray-900">{hostel.block}</p>
          <p className="text-xs text-gray-500 mt-0.5">{hostel.roomType}</p>
        </div>
        <StatusBadge label={hostel.gender} variant={genderVariant[hostel.gender]} />
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {hostel.amenities.map((a) => (
          <span key={a} className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">
            <Wifi size={10} />
            {a}
          </span>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span className="flex items-center gap-1"><Users size={12} /> {hostel.availableSlots} of {hostel.totalSlots} slots left</span>
          <span>{pctFull}% full</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${isFull ? "bg-[#D42C24]" : "bg-[#BF9B63]"}`}
            style={{ width: `${pctFull}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-base font-bold font-lex text-gray-900">{hostel.pricePerSession}</span>
        <button
          disabled={isFull}
          onClick={() => onApply(hostel)}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            isFull
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#BF9B63] hover:bg-[#67683f] text-white"
          }`}
        >
          {isFull ? "Fully Booked" : "Apply for Room"}
        </button>
      </div>
    </div>
  );
}
