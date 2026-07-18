import React from "react";
import { QrCode } from "lucide-react";

type Props = {
  name: string;
  matric: string;
  program: string;
  level: string;
  validThru: string;
};

export default function IdCardPreview({ name, matric, program, level, validThru }: Props) {
  const initials = name ? name.slice(0, 2).toUpperCase() : "ST";

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg bg-linear-to-br from-[#BF9B63] to-[#67683f] p-5 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/70">Wale University</p>
          <p className="text-sm font-bold font-lex">Student Identity Card</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center text-xs font-bold">
          WU
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="h-16 w-16 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <span className="text-lg font-bold">{initials}</span>
        </div>
        <div className="min-w-0">
          <p className="text-base font-bold truncate">{name}</p>
          <p className="text-xs text-white/80 font-mono">{matric}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs mb-5">
        <div>
          <p className="text-white/60 text-[10px] uppercase">Program</p>
          <p className="font-medium">{program}</p>
        </div>
        <div>
          <p className="text-white/60 text-[10px] uppercase">Level</p>
          <p className="font-medium">{level}</p>
        </div>
        <div>
          <p className="text-white/60 text-[10px] uppercase">Valid Through</p>
          <p className="font-medium">{validThru}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/20">
        <span className="text-[10px] text-white/60">Property of Wale University</span>
        <QrCode size={28} className="text-white/80" />
      </div>
    </div>
  );
}
