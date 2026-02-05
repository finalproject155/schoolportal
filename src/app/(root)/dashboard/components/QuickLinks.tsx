import React from "react";
import { FileText, CreditCard, PenTool } from "lucide-react";
import Link from "next/link";

export default function QuickLinks() {
  const links = [
    { name: "View Results", icon: FileText, url: "/grades" },
    { name: "Make a Payment", icon: CreditCard, url: "/fees" },
    { name: "Register Courses", icon: PenTool, url: "/course" }, // Using PenTool as a placeholder for registration
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <Link
            href={link.url}
            key={index}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="bg-accent p-3 rounded-full mb-3 text-white">
              <link.icon size={32} />
            </div>
            <span className="text-base font-semibold text-gray-700">
              {link.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
