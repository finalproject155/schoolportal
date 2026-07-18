import React from "react";
import { Users, CheckCircle2 } from "lucide-react";
import StatusBadge from "@/components/portal/StatusBadge";
import { type Sport } from "../data";

type Props = {
  sport: Sport;
  isRegistered: boolean;
  onToggle: (id: string) => void;
};

export default function SportCard({ sport, isRegistered, onToggle }: Props) {
  const isFull = sport.registered >= sport.capacity && !isRegistered;
  const pct = Math.round((sport.registered / sport.capacity) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-gray-900">{sport.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{sport.coach}</p>
        </div>
        <StatusBadge label={sport.category} variant="info" />
      </div>

      <p className="text-xs text-gray-500">{sport.schedule}</p>

      <div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span className="flex items-center gap-1"><Users size={12} /> {sport.registered}/{sport.capacity} registered</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${isFull ? "bg-[#D42C24]" : "bg-[#BF9B63]"}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
      </div>

      <button
        disabled={isFull}
        onClick={() => onToggle(sport.id)}
        className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
          isRegistered
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
            : isFull
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-[#BF9B63] hover:bg-[#67683f] text-white"
        }`}
      >
        {isRegistered ? (
          <>
            <CheckCircle2 size={14} /> Registered — Withdraw
          </>
        ) : isFull ? (
          "Team Full"
        ) : (
          "Register"
        )}
      </button>
    </div>
  );
}
