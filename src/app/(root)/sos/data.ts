import { ShieldAlert, HeartPulse, Flame, PhoneCall } from "lucide-react";

export type EmergencyContact = {
  name: string;
  description: string;
  phone: string;
  icon: typeof ShieldAlert;
};

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { name: "Campus Security", description: "24/7 rapid response unit", phone: "0800-555-0101", icon: ShieldAlert },
  { name: "Medical Center", description: "On-campus health emergencies", phone: "0800-555-0102", icon: HeartPulse },
  { name: "Fire Safety Unit", description: "Fire & hazard emergencies", phone: "0800-555-0103", icon: Flame },
  { name: "Student Support Line", description: "Harassment / welfare concerns", phone: "0800-555-0104", icon: PhoneCall },
];

export type AlertType = "Security Threat" | "Medical Emergency" | "Fire" | "Other";

export type SOSAlert = {
  ref: string;
  type: AlertType;
  location: string;
  time: string;
  status: "Dispatched" | "Resolved";
};

export const ALERT_HISTORY: SOSAlert[] = [
  { ref: "SOS-2026-00231", type: "Medical Emergency", location: "Amina Hall - Block A", time: "Jun 02, 2026 · 11:42PM", status: "Resolved" },
];
