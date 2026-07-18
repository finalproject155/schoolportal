"use client";

import React, { useState } from "react";
import Modal from "@/components/portal/Modal";
import { type Hostel, type HostelApplication } from "../data";

type Props = {
  hostel: Hostel;
  onClose: () => void;
  onSubmit: (application: HostelApplication) => void;
};

export default function ApplyModal({ hostel, onClose, onSubmit }: Props) {
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ref: `HST-2026-${Math.floor(Math.random() * 90000 + 10000)}`,
      block: hostel.block,
      roomType: hostel.roomType,
      dateApplied: "Jul 18, 2026",
      status: "Pending Review",
    });
  };

  return (
    <Modal eyebrow="Hostel Accommodation" title={`Apply · ${hostel.block}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Room Type</span>
            <span className="font-semibold text-gray-900">{hostel.roomType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Session Fee</span>
            <span className="font-semibold text-[#BF9B63]">{hostel.pricePerSession}</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Roommate Preference / Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]"
            placeholder="e.g. Prefer a quiet room, roommate from same department..."
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors"
          >
            Submit Application
          </button>
        </div>
      </form>
    </Modal>
  );
}
