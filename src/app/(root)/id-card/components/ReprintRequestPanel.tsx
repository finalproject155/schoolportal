"use client";

import React, { useState } from "react";
import { Download, RefreshCw, CheckCircle2 } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import StatusBadge, { type StatusVariant } from "@/components/portal/StatusBadge";
import EmptyState from "@/components/portal/EmptyState";
import Modal from "@/components/portal/Modal";

type ReprintStatus = "Processing" | "Ready for Pickup" | "Collected";

type ReprintRequest = {
  ref: string;
  reason: string;
  date: string;
  status: ReprintStatus;
};

const statusVariant: Record<ReprintStatus, StatusVariant> = {
  Processing: "warning",
  "Ready for Pickup": "info",
  Collected: "success",
};

const REASONS = ["Lost card", "Damaged card", "Name/photo update", "Card expired"];

export default function ReprintRequestPanel() {
  const [requests, setRequests] = useState<ReprintRequest[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);
  const [notes, setNotes] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequests((prev) => [
      {
        ref: `IDC-2026-${Math.floor(Math.random() * 90000 + 10000)}`,
        reason,
        date: "Jul 18, 2026",
        status: "Processing",
      },
      ...prev,
    ]);
    setShowModal(false);
    setNotes("");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors"
        >
          <Download size={15} />
          Download ID Card (PDF)
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-colors"
        >
          <RefreshCw size={15} />
          Request Reprint
        </button>
      </div>

      {downloaded && (
        <p className="text-xs font-medium text-emerald-600 flex items-center gap-1.5 justify-center">
          <CheckCircle2 size={14} /> ID card downloaded successfully
        </p>
      )}

      <SectionCard title="Reprint Requests" subtitle="History of your ID card reprint requests">
        {requests.length === 0 ? (
          <EmptyState
            icon={RefreshCw}
            title="No reprint requests"
            description="If your card is lost or damaged, request a reprint above."
          />
        ) : (
          <div className="divide-y divide-gray-100">
            {requests.map((req) => (
              <div key={req.ref} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{req.reason}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{req.ref} · {req.date}</p>
                </div>
                <StatusBadge label={req.status} variant={statusVariant[req.status]} />
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {showModal && (
        <Modal eyebrow="ID Card Services" title="Request a Reprint" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Reason</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                {REASONS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Additional Notes (optional)</label>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
