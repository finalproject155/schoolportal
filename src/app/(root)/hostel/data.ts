export type HostelGender = "Male" | "Female" | "Mixed";

export type Hostel = {
  id: string;
  block: string;
  gender: HostelGender;
  roomType: string;
  pricePerSession: string;
  totalSlots: number;
  availableSlots: number;
  amenities: string[];
};

export const HOSTELS: Hostel[] = [
  { id: "h-1", block: "Amina Hall - Block A", gender: "Female", roomType: "4-in-a-room", pricePerSession: "₦85,000", totalSlots: 120, availableSlots: 18, amenities: ["Wi-Fi", "Water Heater", "Reading Room"] },
  { id: "h-2", block: "Amina Hall - Block B", gender: "Female", roomType: "2-in-a-room", pricePerSession: "₦140,000", totalSlots: 60, availableSlots: 4, amenities: ["Wi-Fi", "Private Bathroom", "AC"] },
  { id: "h-3", block: "Kuti Hall - Block A", gender: "Male", roomType: "4-in-a-room", pricePerSession: "₦85,000", totalSlots: 120, availableSlots: 0, amenities: ["Wi-Fi", "Water Heater"] },
  { id: "h-4", block: "Kuti Hall - Block C", gender: "Male", roomType: "6-in-a-room", pricePerSession: "₦60,000", totalSlots: 180, availableSlots: 42, amenities: ["Wi-Fi", "Common Kitchen"] },
  { id: "h-5", block: "Postgraduate Lodge", gender: "Mixed", roomType: "Self-Contained", pricePerSession: "₦220,000", totalSlots: 40, availableSlots: 7, amenities: ["Wi-Fi", "AC", "Kitchenette", "Private Bathroom"] },
];

export type HostelApplication = {
  ref: string;
  block: string;
  roomType: string;
  dateApplied: string;
  status: "Pending Review" | "Approved" | "Denied";
};
