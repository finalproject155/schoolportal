export type Placement = {
  id: string;
  company: string;
  role: string;
  type: "Internship" | "Graduate Trainee" | "Volunteer";
  location: string;
  deadline: string;
  isOpen: boolean;
  requirements: string;
};

export const PLACEMENTS: Placement[] = [
  { id: "pl-1", company: "GTBank Plc", role: "Graduate Trainee Program", type: "Graduate Trainee", location: "Lagos, Nigeria", deadline: "Aug 30, 2026", isOpen: true, requirements: "Minimum Second Class Upper, strong analytical skills, NYSC discharge certificate." },
  { id: "pl-2", company: "Andela", role: "Software Engineering Intern", type: "Internship", location: "Remote", deadline: "Aug 10, 2026", isOpen: true, requirements: "Proficiency in JavaScript/Python, active GitHub portfolio, 300 level and above." },
  { id: "pl-3", company: "MTN Nigeria", role: "IT Support Intern", type: "Internship", location: "Abuja, Nigeria", deadline: "Jul 25, 2026", isOpen: true, requirements: "Networking fundamentals, CCNA a plus, good communication skills." },
  { id: "pl-4", company: "Flutterwave", role: "Product Design Intern", type: "Internship", location: "Lagos, Nigeria", deadline: "Jul 05, 2026", isOpen: false, requirements: "Portfolio required, Figma proficiency, understanding of design systems." },
  { id: "pl-5", company: "UNICEF Nigeria", role: "Community Outreach Volunteer", type: "Volunteer", location: "Multiple States", deadline: "Sep 15, 2026", isOpen: true, requirements: "Passion for community development, flexible schedule, own means of transport." },
];

export type PlacementApplication = {
  ref: string;
  role: string;
  company: string;
  dateApplied: string;
  status: "Submitted" | "Shortlisted" | "Rejected";
};
