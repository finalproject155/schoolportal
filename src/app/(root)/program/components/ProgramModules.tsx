"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import { MODULES } from "../data";

export default function ProgramModules() {
  const [openCode, setOpenCode] = useState<string | null>(MODULES[1]?.code ?? null);

  return (
    <SectionCard title="Program Modules" subtitle="Track your progress lesson by lesson">
      <div className="divide-y divide-gray-100">
        {MODULES.map((module) => {
          const isOpen = openCode === module.code;
          const completedCount = module.lessons.filter((l) => l.completed).length;

          return (
            <div key={module.code}>
              <button
                onClick={() => setOpenCode(isOpen ? null : module.code)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50/60 transition-colors text-left"
              >
                <div>
                  <p className="text-xs font-bold text-[#BF9B63]">{module.code}</p>
                  <p className="text-sm font-semibold text-gray-900">{module.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {completedCount}/{module.lessons.length} lessons completed
                  </p>
                </div>
                {isOpen ? (
                  <ChevronUp size={18} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-4 space-y-2">
                  {module.lessons.map((lesson, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2.5"
                    >
                      {lesson.completed ? (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      ) : (
                        <Circle size={16} className="text-gray-300 shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800">{lesson.title}</p>
                        <p className="text-xs text-gray-400">{lesson.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
