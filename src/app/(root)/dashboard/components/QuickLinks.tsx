import React from "react";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  PenTool,
  CalendarDays,
  Library,
  IdCard,
} from "lucide-react";

const links = [
  { name: "View Results", icon: FileText, url: "/results", tone: "bg-[#BF9B63]/10 text-[#BF9B63]" },
  { name: "Make a Payment", icon: CreditCard, url: "/fees", tone: "bg-[#D42C24]/10 text-[#D42C24]" },
  { name: "Register Courses", icon: PenTool, url: "/course", tone: "bg-[#6E7485]/10 text-[#6E7485]" },
  { name: "Timetable", icon: CalendarDays, url: "/timetable", tone: "bg-emerald-50 text-emerald-600" },
  { name: "E-Library", icon: Library, url: "/library", tone: "bg-amber-50 text-amber-600" },
  { name: "ID Card", icon: IdCard, url: "/id-card", tone: "bg-gray-100 text-gray-600" },
];

export default function QuickLinks() {
  return (
    <div>
      <h2 className="text-lg font-bold font-lex text-gray-900 mb-4">Quick Links</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {links.map((link, index) => (
          <Link
            href={link.url}
            key={index}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className={`p-3 rounded-full ${link.tone}`}>
              <link.icon size={24} />
            </div>
            <span className="text-sm font-semibold text-gray-700 text-center">
              {link.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
