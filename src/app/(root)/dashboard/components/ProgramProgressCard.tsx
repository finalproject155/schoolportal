import React from "react";
import Link from "next/link";
import SectionCard from "@/components/portal/SectionCard";
import { ProgressChart } from "@/components/portal/ProgressChart";
import { PROGRAM } from "../../program/data";

export default function ProgramProgressCard() {
  return (
    <SectionCard title="Program Completion" subtitle={PROGRAM.name} bodyClassName="p-5 flex flex-col items-center">
      <ProgressChart value={PROGRAM.completion} size={130} />
      <Link
        href="/results"
        className="mt-3 text-xs font-semibold text-[#BF9B63] hover:text-[#67683f]"
      >
        View Results & GPA →
      </Link>
    </SectionCard>
  );
}
