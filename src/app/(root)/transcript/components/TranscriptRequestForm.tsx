"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";

export type TranscriptRequest = {
  ref: string;
  recipientType: "Self" | "Institution";
  destination: string;
  deliveryMethod: "Email" | "Postal" | "Pickup";
  copies: number;
  dateRequested: string;
  status: "Processing" | "Ready" | "Delivered";
};

const inputClasses =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]";
const labelClasses = "text-xs font-semibold text-gray-500 mb-1 block";

type Props = {
  onSubmit: (request: TranscriptRequest) => void;
};

export default function TranscriptRequestForm({ onSubmit }: Props) {
  const [recipientType, setRecipientType] = useState<"Self" | "Institution">("Institution");
  const [destination, setDestination] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"Email" | "Postal" | "Pickup">("Email");
  const [copies, setCopies] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ref: `TRX-2026-${Math.floor(Math.random() * 90000 + 10000)}`,
      recipientType,
      destination: destination || (recipientType === "Self" ? "Myself" : "Unspecified Institution"),
      deliveryMethod,
      copies,
      dateRequested: "Jul 18, 2026",
      status: "Processing",
    });
    setSubmitted(true);
    setDestination("");
    setPurpose("");
    setCopies(1);
  };

  return (
    <SectionCard title="Request a Transcript" subtitle="Submit a new academic transcript request">
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div>
          <label className={labelClasses}>Recipient</label>
          <div className="flex gap-2">
            {(["Self", "Institution"] as const).map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setRecipientType(opt)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                  recipientType === opt
                    ? "bg-[#BF9B63] text-white border-[#BF9B63]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {opt === "Self" ? "Myself" : "Another Institution"}
              </button>
            ))}
          </div>
        </div>

        {recipientType === "Institution" && (
          <div>
            <label className={labelClasses}>Institution Name & Address</label>
            <input
              className={inputClasses}
              placeholder="e.g. University of Lagos, Admissions Office"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Delivery Method</label>
            <select
              className={inputClasses}
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value as typeof deliveryMethod)}
            >
              <option>Email</option>
              <option>Postal</option>
              <option>Pickup</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Number of Copies</label>
            <input
              type="number"
              min={1}
              max={10}
              className={inputClasses}
              value={copies}
              onChange={(e) => setCopies(Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Purpose (optional)</label>
          <textarea
            className={`${inputClasses} min-h-20 resize-none`}
            placeholder="e.g. Postgraduate admission application"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        {submitted && (
          <p className="text-xs font-medium text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Request submitted — track its status below.
          </p>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors"
        >
          <Send size={14} />
          Submit Request
        </button>
      </form>
    </SectionCard>
  );
}
