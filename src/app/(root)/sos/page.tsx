"use client";

import React, { useState } from "react";
import { Siren, ShieldAlert } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import SOSAlertModal from "@/components/portal/SOSAlertModal";
import EmergencyContacts from "./components/EmergencyContacts";
import AlertHistory from "./components/AlertHistory";
import SafetyTips from "./components/SafetyTips";

export default function SOSPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Security & SOS Alert"
        subtitle="Emergency contacts and instant campus security alerts"
        badge="Available 24/7"
        badgeIcon={ShieldAlert}
      />

      <div className="bg-linear-to-r from-[#D42C24] to-red-500 rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        <div>
          <h2 className="text-lg font-bold font-lex">In immediate danger?</h2>
          <p className="text-sm text-white/85 mt-0.5">
            Send an instant alert to Campus Security with your location.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#D42C24] font-bold text-sm rounded-xl shadow-sm hover:bg-red-50 transition-colors shrink-0"
        >
          <Siren size={16} />
          Send SOS Alert Now
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <EmergencyContacts />
          <AlertHistory />
        </div>
        <SafetyTips />
      </div>

      {showModal && <SOSAlertModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
