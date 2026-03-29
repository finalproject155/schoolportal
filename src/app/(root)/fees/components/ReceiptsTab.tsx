"use client";

import React from "react";
import { Download, CreditCard, Building2, Smartphone } from "lucide-react";

const receipts = [
  {
    ref: "RCP-2025-001843",
    date: "Mar 01, 2025",
    description: "First Installment – 2024/2025 Tuition",
    amount: "₦200,000",
    method: "Card",
    methodIcon: CreditCard,
    session: "2024/2025",
  },
  {
    ref: "RCP-2025-000971",
    date: "Jan 15, 2025",
    description: "Accommodation Fee – 2024/2025",
    amount: "₦100,000",
    method: "Bank Transfer",
    methodIcon: Building2,
    session: "2024/2025",
  },
  {
    ref: "RCP-2024-004512",
    date: "Sep 10, 2024",
    description: "Full Tuition – 2023/2024 Session",
    amount: "₦380,000",
    method: "Card",
    methodIcon: CreditCard,
    session: "2023/2024",
  },
  {
    ref: "RCP-2024-002301",
    date: "Aug 22, 2024",
    description: "Library & Tech Levy – 2023/2024",
    amount: "₦25,000",
    method: "Mobile",
    methodIcon: Smartphone,
    session: "2023/2024",
  },
  {
    ref: "RCP-2024-001100",
    date: "Jul 04, 2024",
    description: "Accommodation Fee – 2023/2024",
    amount: "₦95,000",
    method: "Bank Transfer",
    methodIcon: Building2,
    session: "2023/2024",
  },
];

export default function ReceiptsTab() {
  const handleDownload = (ref: string) => {
    console.log(`Downloading receipt: ${ref}`);
    // In a real app this would trigger a PDF download
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">Payment Receipts</h2>
        <p className="text-sm text-gray-500 mt-0.5">Download or view your payment receipts</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Reference</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Method</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {receipts.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-gray-600">{r.ref}</td>
                <td className="px-5 py-4 text-gray-900 font-medium">{r.description}</td>
                <td className="px-5 py-4 text-gray-500">{r.date}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                    <r.methodIcon size={12} />
                    {r.method}
                  </span>
                </td>
                <td className="px-5 py-4 font-bold text-gray-900">{r.amount}</td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => handleDownload(r.ref)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#BF9B63] hover:text-[#67683f] transition-colors"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {receipts.map((r, i) => (
          <div key={i} className="p-4">
            <div className="flex items-start justify-between mb-1">
              <p className="font-medium text-gray-900 text-sm">{r.description}</p>
              <p className="font-bold text-gray-900 text-sm ml-2 shrink-0">{r.amount}</p>
            </div>
            <p className="font-mono text-xs text-gray-400 mb-2">{r.ref}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{r.date}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                  <r.methodIcon size={10} />
                  {r.method}
                </span>
              </div>
              <button
                onClick={() => handleDownload(r.ref)}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#BF9B63]"
              >
                <Download size={13} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
