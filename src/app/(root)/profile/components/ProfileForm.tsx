"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";

type Initial = {
  firstName: string;
  email: string;
  matric: string;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  howHeard: string;
};

const inputClasses =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]";
const labelClasses = "text-xs font-semibold text-gray-500 mb-1 block";

export default function ProfileForm({ initial }: { initial: Initial }) {
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof Initial, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <SectionCard title="Personal Information" subtitle="Keep your details up to date">
      <form onSubmit={handleSave} className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>First Name</label>
            <input
              className={inputClasses}
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Matric Number</label>
            <input className={`${inputClasses} bg-gray-50 text-gray-500`} value={form.matric} disabled />
          </div>
          <div>
            <label className={labelClasses}>Email Address</label>
            <input
              type="email"
              className={inputClasses}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Phone Number</label>
            <input
              className={inputClasses}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Date of Birth</label>
            <input
              type="date"
              className={inputClasses}
              value={form.dob}
              onChange={(e) => update("dob", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Gender</label>
            <select
              className={inputClasses}
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option>Female</option>
              <option>Male</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Country of Residence</label>
            <input
              className={inputClasses}
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>State / City of Residence</label>
            <input
              className={inputClasses}
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Profile updated successfully
            </span>
          ) : (
            <span />
          )}
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </SectionCard>
  );
}
