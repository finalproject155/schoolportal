"use client";

import React, { useState } from "react";
import Modal from "@/components/portal/Modal";
import { Paperclip } from "lucide-react";
import { type Placement, type PlacementApplication } from "../data";

type Props = {
  placement: Placement;
  onClose: () => void;
  onSubmit: (application: PlacementApplication) => void;
};

export default function ApplyModal({ placement, onClose, onSubmit }: Props) {
  const [coverNote, setCoverNote] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ref: `APP-2026-${Math.floor(Math.random() * 90000 + 10000)}`,
      role: placement.role,
      company: placement.company,
      dateApplied: "Jul 18, 2026",
      status: "Submitted",
    });
  };

  return (
    <Modal eyebrow={placement.company} title={`Apply · ${placement.role}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Resume / CV</label>
          <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors">
            <Paperclip size={14} />
            {fileName || "Upload your resume (PDF)"}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Cover Note (optional)</label>
          <textarea
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]"
            placeholder="Briefly explain why you're a good fit..."
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
