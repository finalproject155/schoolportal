import { ShieldCheck } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import ClearanceSummary from "./components/ClearanceSummary";
import ClearanceChecklist from "./components/ClearanceChecklist";

export default function ClearancePage() {
  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Clearance Status"
        subtitle="Track your departmental and institutional clearance progress"
        badge="2024/2025 Session"
        badgeIcon={ShieldCheck}
      />

      <ClearanceSummary />
      <ClearanceChecklist />
    </main>
  );
}
