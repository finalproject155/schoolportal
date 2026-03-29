"use client";

import React, { useState } from "react";
import FeesSummaryCards from "./components/FeesSummaryCards";
import FeesTable from "./components/FeesTable";
import ReceiptsTab from "./components/ReceiptsTab";
import { LayoutGrid, Receipt } from "lucide-react";

type Tab = "overview" | "receipts";

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <main className="flex flex-col gap-5 my-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-lex text-gray-900">
            Fees & Payments
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your school fees, payments, and download receipts
          </p>
        </div>
        {/* Session Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm self-start sm:self-auto">
          {/* <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> */}
          2024/2025 Session
        </div>
      </div>

      {/* Summary Cards */}
      <FeesSummaryCards />

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1 self-start">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "overview"
              ? "bg-[#BF9B63] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <LayoutGrid size={15} />
          Fee Overview
        </button>
        <button
          onClick={() => setActiveTab("receipts")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "receipts"
              ? "bg-[#BF9B63] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Receipt size={15} />
          Receipts
        </button>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-200">
        {activeTab === "overview" ? <FeesTable /> : <ReceiptsTab />}
      </div>
    </main>
  );
}
