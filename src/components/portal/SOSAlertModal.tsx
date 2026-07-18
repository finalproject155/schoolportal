"use client";

import React, { useState } from "react";
import { X, MapPin, CheckCircle2, ShieldAlert, HeartPulse, Flame, MoreHorizontal } from "lucide-react";

const ALERT_TYPES = [
  { value: "Security Threat", icon: ShieldAlert },
  { value: "Medical Emergency", icon: HeartPulse },
  { value: "Fire", icon: Flame },
  { value: "Other", icon: MoreHorizontal },
] as const;

export type SOSAlertType = (typeof ALERT_TYPES)[number]["value"];

type Props = {
  onClose: () => void;
};

export default function SOSAlertModal({ onClose }: Props) {
  const [sent, setSent] = useState(false);
  const [selectedType, setSelectedType] = useState<SOSAlertType | null>(null);
  const [ref, setRef] = useState("");

  const handleSend = () => {
    if (!selectedType) return;
    setRef(`SOS-2026-${Math.floor(Math.random() * 90000 + 10000)}`);
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden">
        <div className="bg-linear-to-r from-[#D42C24] to-red-500 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
              {sent ? "Alert Sent" : "Emergency Alert"}
            </p>
            <h3 className="text-white font-bold text-base font-lex">
              {sent ? "Help is on the way" : "What's the emergency?"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          {!sent ? (
            <>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {ALERT_TYPES.map(({ value, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedType(value)}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border text-xs font-semibold transition-colors ${
                      selectedType === value
                        ? "bg-[#D42C24]/10 border-[#D42C24] text-[#D42C24]"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    {value}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-4">
                <MapPin size={12} />
                Your current location will be shared with campus security.
              </p>
              <button
                onClick={handleSend}
                disabled={!selectedType}
                className={`w-full py-3 rounded-lg text-sm font-bold transition-colors ${
                  selectedType
                    ? "bg-[#D42C24] hover:bg-red-700 text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Send SOS Alert
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-50 rounded-full p-4 mb-3">
                <CheckCircle2 size={36} className="text-[#D42C24]" />
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Campus Security has been notified of your{" "}
                <span className="font-semibold">{selectedType}</span> alert and is on the way.
              </p>
              <div className="bg-gray-50 rounded-xl px-4 py-3 w-full mb-4 text-left space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Reference</span>
                  <span className="font-mono font-semibold text-gray-700">{ref}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Responding Unit</span>
                  <span className="font-semibold text-gray-700">Campus Security</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
