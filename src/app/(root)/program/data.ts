export type ModuleLesson = {
  title: string;
  meta: string;
  completed: boolean;
};

export type ProgramModule = {
  code: string;
  title: string;
  lessons: ModuleLesson[];
};

export const PROGRAM = {
  name: "BSc. Computer Science",
  school: "School of Computing",
  certificate: "Bachelor's Degree",
  status: "Active" as const,
  startDate: "Aug 21, 2022",
  endDate: "Aug 15, 2026",
  advisor: "Dr. Adesanya",
  completion: 75,
};

export const MODULES: ProgramModule[] = [
  {
    code: "CSC 401",
    title: "Operating Systems",
    lessons: [
      { title: "Process Management", meta: "1 Assignment · 2 Questions", completed: true },
      { title: "Memory Management", meta: "1 Quiz · 1 Question", completed: true },
      { title: "File Systems", meta: "1 Assignment", completed: true },
    ],
  },
  {
    code: "CSC 501",
    title: "Computer System Performance Evaluation",
    lessons: [
      { title: "Performance Metrics", meta: "1 Assignment · 2 Questions", completed: true },
      { title: "Simulation Techniques", meta: "1 Quiz", completed: false },
      { title: "Case Studies", meta: "1 Assignment", completed: false },
    ],
  },
  {
    code: "CSC 505",
    title: "Computer Network and Communication",
    lessons: [
      { title: "Network Protocols", meta: "1 Assignment", completed: false },
      { title: "Routing & Switching", meta: "1 Quiz · 1 Question", completed: false },
    ],
  },
];

export const KEY_DATES = [
  { label: "Program Started", date: "Aug 21, 2022" },
  { label: "Next Assignment Due", date: "Jan 5, 2026" },
  { label: "Next Virtual Class", date: "Jan 3, 2026, 11:18 AM" },
  { label: "Program Ends", date: "Aug 15, 2026" },
];
