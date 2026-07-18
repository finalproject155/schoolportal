export type SportCategory = "Team Sport" | "Individual Sport";

export type Sport = {
  id: string;
  name: string;
  category: SportCategory;
  coach: string;
  schedule: string;
  capacity: number;
  registered: number;
};

export const SPORTS: Sport[] = [
  { id: "sp-1", name: "Football (Men's)", category: "Team Sport", coach: "Coach Bello Adamu", schedule: "Mon/Wed/Fri · 5:00–7:00pm", capacity: 30, registered: 24 },
  { id: "sp-2", name: "Basketball", category: "Team Sport", coach: "Coach Grace Okon", schedule: "Tue/Thu · 4:00–6:00pm", capacity: 20, registered: 20 },
  { id: "sp-3", name: "Volleyball", category: "Team Sport", coach: "Coach Femi Alade", schedule: "Wed/Fri · 3:00–5:00pm", capacity: 24, registered: 11 },
  { id: "sp-4", name: "Athletics (Track & Field)", category: "Individual Sport", coach: "Coach Rita Nnamdi", schedule: "Daily · 6:00–7:30am", capacity: 50, registered: 33 },
  { id: "sp-5", name: "Table Tennis", category: "Individual Sport", coach: "Coach John Eze", schedule: "Mon/Thu · 5:00–6:30pm", capacity: 16, registered: 6 },
  { id: "sp-6", name: "Swimming", category: "Individual Sport", coach: "Coach Amara Chukwu", schedule: "Tue/Sat · 7:00–9:00am", capacity: 20, registered: 14 },
];
