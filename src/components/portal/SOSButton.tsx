"use client";

import React, { useState } from "react";
import { Siren } from "lucide-react";
import SOSAlertModal from "./SOSAlertModal";

export default function SOSButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Send SOS security alert"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#D42C24] hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg transition-colors"
      >
        <span className="absolute inset-0 rounded-full bg-[#D42C24] animate-ping opacity-40" />
        <Siren size={18} className="relative" />
        <span className="relative text-sm font-bold hidden sm:inline">SOS</span>
      </button>

      {open && <SOSAlertModal onClose={() => setOpen(false)} />}
    </>
  );
}
