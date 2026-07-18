import React from "react";
import { BookText, Newspaper, FileQuestion, Download } from "lucide-react";
import { type LibraryResource, type ResourceFormat } from "../data";

const formatConfig: Record<ResourceFormat, { icon: typeof BookText; classes: string }> = {
  "E-Book": { icon: BookText, classes: "bg-[#BF9B63]/10 text-[#BF9B63]" },
  Journal: { icon: Newspaper, classes: "bg-[#6E7485]/10 text-[#6E7485]" },
  "Past Question": { icon: FileQuestion, classes: "bg-amber-50 text-amber-600" },
};

export default function ResourceCard({ resource }: { resource: LibraryResource }) {
  const { icon: Icon, classes } = formatConfig[resource.format];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className={`p-2.5 rounded-lg shrink-0 ${classes}`}>
          <Icon size={20} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
          {resource.size}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
          {resource.title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{resource.author}</p>
        <p className="text-[10px] text-gray-400 mt-1">{resource.category}</p>
      </div>
      <button className="mt-auto flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#BF9B63] hover:bg-[#67683f] text-white text-xs font-semibold transition-colors">
        <Download size={13} />
        {resource.format === "Journal" ? "Read Online" : "Borrow / Download"}
      </button>
    </div>
  );
}
