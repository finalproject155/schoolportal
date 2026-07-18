export type TimetableEntry = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  start: string;
  end: string;
  code: string;
  title: string;
  lecturer: string;
  venue: string;
  type: "Lecture" | "Lab" | "Tutorial";
};

export const DAYS: TimetableEntry["day"][] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const DAY_LABELS: Record<TimetableEntry["day"], string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
};

export const TIMETABLE: TimetableEntry[] = [
  { day: "Mon", start: "08:00", end: "09:30", code: "CSC 501", title: "Computer System Performance Evaluation", lecturer: "Prof. Ismaila", venue: "LT 1", type: "Lecture" },
  { day: "Mon", start: "12:00", end: "13:30", code: "CSC 505", title: "Computer Network and Communication", lecturer: "Prof. Adetunji", venue: "LT 3", type: "Lecture" },
  { day: "Mon", start: "16:00", end: "18:00", code: "CSC 523", title: "Database Administration", lecturer: "Dr. Fasanya", venue: "Lab 2", type: "Lab" },
  { day: "Tue", start: "10:00", end: "11:30", code: "CSC 503", title: "Optimization Techniques", lecturer: "Prof. Olabiyisi", venue: "LT 2", type: "Lecture" },
  { day: "Tue", start: "14:00", end: "15:30", code: "CSC 511", title: "Software Engineering II", lecturer: "Dr. Adesanya", venue: "LT 1", type: "Lecture" },
  { day: "Wed", start: "08:00", end: "09:30", code: "CSC 501", title: "Computer System Performance Evaluation", lecturer: "Prof. Ismaila", venue: "LT 1", type: "Tutorial" },
  { day: "Wed", start: "12:00", end: "13:30", code: "CSC 505", title: "Computer Network and Communication", lecturer: "Prof. Adetunji", venue: "LT 3", type: "Lecture" },
  { day: "Wed", start: "14:00", end: "15:30", code: "CSC 513", title: "Artificial Intelligence", lecturer: "Dr. Adeleke", venue: "LT 2", type: "Lecture" },
  { day: "Thu", start: "10:00", end: "11:30", code: "CSC 503", title: "Optimization Techniques", lecturer: "Prof. Olabiyisi", venue: "LT 2", type: "Tutorial" },
  { day: "Thu", start: "14:00", end: "15:30", code: "CSC 511", title: "Software Engineering II", lecturer: "Dr. Adesanya", venue: "Lab 1", type: "Lab" },
  { day: "Fri", start: "08:00", end: "10:00", code: "CSC 535", title: "Project Management", lecturer: "Prof. Olabiyisi", venue: "LT 3", type: "Lecture" },
  { day: "Fri", start: "10:00", end: "12:00", code: "CSC 521", title: "Mobile Application Development", lecturer: "Mr. Adebayo", venue: "Lab 2", type: "Lab" },
];

export const DAY_INDEX_MAP: Record<number, TimetableEntry["day"] | null> = {
  0: null,
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: null,
};
