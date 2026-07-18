"use client";

import React, { useState } from "react";
import { Briefcase } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import ITRegistrationForm, { type ITRegistration } from "./components/ITRegistrationForm";
import ITRegistrationHistory from "./components/ITRegistrationHistory";

export default function ITRegistrationPage() {
  const [registrations, setRegistrations] = useState<ITRegistration[]>([]);

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Industrial Training (IT) Registration"
        subtitle="Register your SIWES / industrial attachment placement"
        badge="400 Level · Computer Science"
        badgeIcon={Briefcase}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ITRegistrationForm onSubmit={(reg) => setRegistrations((prev) => [reg, ...prev])} />
        </div>
        <ITRegistrationHistory registrations={registrations} />
      </div>
    </main>
  );
}
