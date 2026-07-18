"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, Paperclip } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";

export type ITRegistration = {
  ref: string;
  company: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  dateSubmitted: string;
  status: "Under Review" | "Approved" | "Rejected";
};

const inputClasses =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]";
const labelClasses = "text-xs font-semibold text-gray-500 mb-1 block";

type Props = {
  onSubmit: (registration: ITRegistration) => void;
};

export default function ITRegistrationForm({ onSubmit }: Props) {
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [supervisorContact, setSupervisorContact] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !supervisor || !startDate || !endDate) return;

    onSubmit({
      ref: `IT-2026-${Math.floor(Math.random() * 90000 + 10000)}`,
      company,
      supervisor,
      startDate,
      endDate,
      dateSubmitted: "Jul 18, 2026",
      status: "Under Review",
    });

    setSubmitted(true);
    setCompany("");
    setAddress("");
    setSupervisor("");
    setSupervisorContact("");
    setStartDate("");
    setEndDate("");
    setFileName(null);
  };

  return (
    <SectionCard title="Register IT Placement" subtitle="Submit your Industrial Training (SIWES) placement details">
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div>
          <label className={labelClasses}>Company / Organization Name</label>
          <input
            className={inputClasses}
            placeholder="e.g. GTBank Plc"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Company Address</label>
          <input
            className={inputClasses}
            placeholder="e.g. 15 Marina Road, Lagos"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Industry Supervisor</label>
            <input
              className={inputClasses}
              placeholder="Supervisor's full name"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Supervisor Email / Phone</label>
            <input
              className={inputClasses}
              placeholder="email@company.com"
              value={supervisorContact}
              onChange={(e) => setSupervisorContact(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Start Date</label>
            <input
              type="date"
              className={inputClasses}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>End Date</label>
            <input
              type="date"
              className={inputClasses}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Acceptance Letter</label>
          <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors">
            <Paperclip size={14} />
            {fileName || "Upload letter of acceptance (PDF)"}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </div>

        {submitted && (
          <p className="text-xs font-medium text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Placement submitted for review.
          </p>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors"
        >
          <Send size={14} />
          Submit Registration
        </button>
      </form>
    </SectionCard>
  );
}
