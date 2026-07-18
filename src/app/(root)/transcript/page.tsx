"use client";

import React, { useState } from "react";
import { FileStack } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import TranscriptRequestForm, { type TranscriptRequest } from "./components/TranscriptRequestForm";
import TranscriptHistory from "./components/TranscriptHistory";
import EligibilityCard from "./components/EligibilityCard";

const INITIAL_REQUESTS: TranscriptRequest[] = [
  {
    ref: "TRX-2025-88231",
    recipientType: "Institution",
    destination: "University of Ibadan, Postgraduate School",
    deliveryMethod: "Email",
    copies: 1,
    dateRequested: "Nov 12, 2025",
    status: "Delivered",
  },
];

export default function TranscriptPage() {
  const [requests, setRequests] = useState<TranscriptRequest[]>(INITIAL_REQUESTS);

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Academic Transcript Request"
        subtitle="Request an official transcript for yourself or another institution"
        badge="500 Level · Computer Science"
        badgeIcon={FileStack}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <TranscriptRequestForm onSubmit={(req) => setRequests((prev) => [req, ...prev])} />
          <TranscriptHistory requests={requests} />
        </div>
        <EligibilityCard />
      </div>
    </main>
  );
}
