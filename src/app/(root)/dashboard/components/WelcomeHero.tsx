import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  firstName: string;
  program: string;
  level: string;
};

export default function WelcomeHero({ firstName, program, level }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#BF9B63] to-[#67683f] px-6 py-7 sm:px-8 sm:py-8 text-white shadow-sm">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-16 right-24 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-white/80">Welcome back,</p>
          <h1 className="text-2xl sm:text-3xl font-bold font-lex mt-0.5">{firstName}</h1>
          <p className="text-sm text-white/85 mt-2">
            {program} · {level}
          </p>
        </div>

        <Link
          href="/program"
          className="inline-flex items-center gap-2 self-start sm:self-auto bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          View My Program
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}
