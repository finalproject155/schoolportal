"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";

const inputClasses =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]";
const labelClasses = "text-xs font-semibold text-gray-500 mb-1 block";

export default function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!current || !next || !confirm) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }
    if (next.length < 8) {
      setMessage({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }
    if (next !== confirm) {
      setMessage({ type: "error", text: "New password and confirmation do not match." });
      return;
    }
    setMessage({ type: "success", text: "Password changed successfully." });
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  return (
    <SectionCard title="Change Password">
      <form onSubmit={handleSubmit} className="p-5 space-y-3">
        <div>
          <label className={labelClasses}>Current Password</label>
          <input
            type="password"
            placeholder="enter password"
            className={inputClasses}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClasses}>New Password</label>
          <input
            type="password"
            placeholder="enter password"
            className={inputClasses}
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClasses}>Confirm Password</label>
          <input
            type="password"
            placeholder="enter password"
            className={inputClasses}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {message && (
          <p
            className={`text-xs font-medium flex items-center gap-1.5 ${
              message.type === "error" ? "text-[#D42C24]" : "text-emerald-600"
            }`}
          >
            {message.type === "error" ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
            {message.text}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors"
        >
          Change Password
        </button>
      </form>
    </SectionCard>
  );
}
