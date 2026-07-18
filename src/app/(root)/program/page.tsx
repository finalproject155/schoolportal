import Link from "next/link";
import { GraduationCap } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import SectionCard from "@/components/portal/SectionCard";
import { ProgressChart } from "@/components/portal/ProgressChart";
import ProgramOverviewCard from "./components/ProgramOverviewCard";
import ProgramModules from "./components/ProgramModules";
import KeyDatesList from "./components/KeyDatesList";
import { PROGRAM } from "./data";

export default function ProgramPage() {
  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="My Program"
        subtitle="Overview of your enrolled program and progress"
        badge={PROGRAM.certificate}
        badgeIcon={GraduationCap}
      />

      <ProgramOverviewCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <ProgramModules />
        </div>

        <div className="flex flex-col gap-5">
          <SectionCard title="Program Completion" bodyClassName="p-5 flex flex-col items-center">
            <ProgressChart value={PROGRAM.completion} size={130} />
            <Link
              href="/results"
              className="mt-3 text-xs font-semibold text-[#BF9B63] hover:text-[#67683f]"
            >
              View Results & GPA →
            </Link>
          </SectionCard>

          <KeyDatesList />
        </div>
      </div>
    </main>
  );
}
