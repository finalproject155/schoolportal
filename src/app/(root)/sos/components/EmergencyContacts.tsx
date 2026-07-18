import React from "react";
import { PhoneCall } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";
import { EMERGENCY_CONTACTS } from "../data";

export default function EmergencyContacts() {
  return (
    <SectionCard title="Emergency Contacts" subtitle="Available 24/7 across campus">
      <div className="divide-y divide-gray-100">
        {EMERGENCY_CONTACTS.map((contact) => (
          <div key={contact.name} className="p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-[#D42C24]/10 p-2.5 rounded-full shrink-0">
                <contact.icon size={18} className="text-[#D42C24]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.description}</p>
              </div>
            </div>
            <a
              href={`tel:${contact.phone.replace(/-/g, "")}`}
              className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-white bg-[#D42C24] hover:bg-red-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <PhoneCall size={12} />
              Call
            </a>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
