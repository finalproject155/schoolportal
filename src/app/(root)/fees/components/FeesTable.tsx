"use client";

import React, { useState } from "react";
import {
  X,
  ChevronRight,
  CheckCircle2,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type FeeItem = {
  name: string;
  amount: string;
  amountRaw: number;
  status: "PAID" | "UNPAID" | "PARTIAL";
  session: string;
};

const currentFees: FeeItem[] = [
  {
    name: "Tuition Fee",
    amount: "₦300,000",
    amountRaw: 300000,
    status: "PARTIAL",
    session: "2024/2025",
  },
  {
    name: "Accommodation Fee",
    amount: "₦100,000",
    amountRaw: 100000,
    status: "PAID",
    session: "2024/2025",
  },
  {
    name: "Library Levy",
    amount: "₦15,000",
    amountRaw: 15000,
    status: "UNPAID",
    session: "2024/2025",
  },
  {
    name: "Technology Fee",
    amount: "₦20,000",
    amountRaw: 20000,
    status: "UNPAID",
    session: "2024/2025",
  },
  {
    name: "Medical/Health Fee",
    amount: "₦15,000",
    amountRaw: 15000,
    status: "PAID",
    session: "2024/2025",
  },
];

const previousFees: FeeItem[] = [
  {
    name: "Full Tuition Fee",
    amount: "₦380,000",
    amountRaw: 380000,
    status: "PAID",
    session: "2023/2024",
  },
  {
    name: "Accommodation Fee",
    amount: "₦95,000",
    amountRaw: 95000,
    status: "PAID",
    session: "2023/2024",
  },
  {
    name: "Library & Tech Levy",
    amount: "₦25,000",
    amountRaw: 25000,
    status: "PAID",
    session: "2023/2024",
  },
];

const statusConfig = {
  PAID: {
    label: "Paid",
    classes: "bg-green-50 text-green-700 border border-green-200",
  },
  UNPAID: {
    label: "Unpaid",
    classes: "bg-red-50 text-[#D42C24] border border-red-200",
  },
  PARTIAL: {
    label: "Partial",
    classes: "bg-amber-50 text-amber-700 border border-amber-200",
  },
};

type PaymentModalProps = {
  fee: FeeItem;
  onClose: () => void;
};

function PaymentModal({ fee, onClose }: PaymentModalProps) {
  const [step, setStep] = useState(1);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const formatCard = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/");

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-[#BF9B63] to-[#d4b07a] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
              {step === 3 ? "Payment Successful" : `Step ${step} of 2`}
            </p>
            <h3 className="text-white font-bold text-base font-lex">
              {step === 1 && "Review Payment"}
              {step === 2 && "Card Details"}
              {step === 3 && "You're all set! 🎉"}
            </h3>
          </div>
          {step < 3 && (
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Progress bar (steps 1–2) */}
        {step < 3 && (
          <div className="h-1 bg-gray-100">
            <div
              className="h-full bg-[#BF9B63] transition-all duration-500"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">
          {/* STEP 1 – Review */}
          {step === 1 && (
            <div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Fee Type</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {fee.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Session</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {fee.session}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status</span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusConfig[fee.status].classes}`}
                  >
                    {statusConfig[fee.status].label}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">
                    Amount Due
                  </span>
                  <span className="text-lg font-bold text-[#BF9B63]">
                    {fee.amount}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  Continue <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 – Card Details */}
          {step === 2 && (
            <div>
              {/* <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-xl p-4 mb-5 relative overflow-hidden">
                <div className="absolute right-4 top-4 opacity-20">
                  <CreditCard size={48} className="text-white" />
                </div>
                <p className="text-white/50 text-xs mb-1">Card Number</p>
                <p className="text-white font-mono text-lg tracking-widest">
                  {cardData.number || "•••• •••• •••• ••••"}
                </p>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-white/50 text-[10px] uppercase">
                      Cardholder
                    </p>
                    <p className="text-white text-sm font-medium">
                      {cardData.name || "YOUR NAME"}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] uppercase">
                      Expires
                    </p>
                    <p className="text-white text-sm font-medium">
                      {cardData.expiry || "MM/YY"}
                    </p>
                  </div>
                </div>
              </div> */}

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        number: formatCard(e.target.value),
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name on card"
                    value={cardData.name}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        name: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          expiry: formatExpiry(e.target.value),
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleBack}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-2.5 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-sm font-semibold transition-colors"
                >
                  Pay {fee.amount}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 – Success */}
          {step === 3 && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="bg-green-50 rounded-full p-5 mb-4 animate-[scale-in_0.4s_ease-out]">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 font-lex mb-1">
                Payment Successful!
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                Your payment for{" "}
                <span className="font-semibold text-gray-700">{fee.name}</span>{" "}
                has been processed.
              </p>
              <div className="bg-gray-50 rounded-xl px-5 py-4 w-full mb-5 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Amount Paid</span>
                  <span className="text-sm font-bold text-green-600">
                    {fee.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Reference</span>
                  <span className="text-xs font-mono text-gray-700">
                    RCP-2025-{Math.floor(Math.random() * 90000 + 10000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Date</span>
                  <span className="text-xs text-gray-700">Mar 29, 2025</span>
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

export default function FeesTable() {
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);
  const [previousExpanded, setPreviousExpanded] = useState(false);

  return (
    <>
      {selectedFee && (
        <PaymentModal fee={selectedFee} onClose={() => setSelectedFee(null)} />
      )}

      {/* Current Semester */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Current Semester Fees
            </h2>
            <p className="text-sm text-gray-500">2024/2025 Academic Session</p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Fee Description
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Session
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentFees.map((fee, i) => (
                <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {fee.name}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{fee.session}</td>
                  <td className="px-5 py-4 font-bold text-gray-900">
                    {fee.amount}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusConfig[fee.status].classes}`}
                    >
                      {statusConfig[fee.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {fee.status !== "PAID" ? (
                      <button
                        onClick={() => setSelectedFee(fee)}
                        className="text-xs font-semibold text-white bg-[#BF9B63] hover:bg-[#67683f] px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {currentFees.map((fee, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm">{fee.name}</p>
                <p className="font-bold text-gray-900 text-base mt-0.5">
                  {fee.amount}
                </p>
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${statusConfig[fee.status].classes}`}
                >
                  {statusConfig[fee.status].label}
                </span>
              </div>
              {fee.status !== "PAID" && (
                <button
                  onClick={() => setSelectedFee(fee)}
                  className="text-xs font-semibold text-white bg-[#BF9B63] hover:bg-[#67683f] px-3 py-1.5 rounded-lg transition-colors"
                >
                  Pay Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Previous Semesters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => setPreviousExpanded((v) => !v)}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50/60 transition-colors"
        >
          <div className="text-left">
            <h2 className="text-base font-bold text-gray-900">
              Previous Payments
            </h2>
            <p className="text-sm text-gray-500">2023/2024 Academic Session</p>
          </div>
          {previousExpanded ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </button>

        {previousExpanded && (
          <div>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto border-t border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Fee Description
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Session
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {previousFees.map((fee, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {fee.name}
                      </td>
                      <td className="px-5 py-4 text-gray-500">{fee.session}</td>
                      <td className="px-5 py-4 font-bold text-gray-900">
                        {fee.amount}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusConfig[fee.status].classes}`}
                        >
                          {statusConfig[fee.status].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile */}
            <div className="md:hidden divide-y divide-gray-100 border-t border-gray-100">
              {previousFees.map((fee, i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {fee.name}
                    </p>
                    <p className="font-bold text-gray-900 text-base mt-0.5">
                      {fee.amount}
                    </p>
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${statusConfig[fee.status].classes}`}
                    >
                      {statusConfig[fee.status].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
