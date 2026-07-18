export type CourseResult = {
  code: string;
  title: string;
  units: number;
  score: number;
  grade: "A" | "B" | "C" | "D" | "E" | "F";
};

export type SemesterResult = {
  id: string;
  session: string;
  semester: "1st Semester" | "2nd Semester";
  courses: CourseResult[];
};

const gradePoint: Record<CourseResult["grade"], number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

export const SEMESTER_RESULTS: SemesterResult[] = [
  {
    id: "2023-1",
    session: "2023/2024",
    semester: "1st Semester",
    courses: [
      { code: "CSC 401", title: "Operating Systems", units: 3, score: 78, grade: "A" },
      { code: "CSC 403", title: "Compiler Construction", units: 3, score: 65, grade: "B" },
      { code: "CSC 405", title: "Human Computer Interaction", units: 2, score: 58, grade: "C" },
      { code: "CSC 407", title: "Numerical Analysis", units: 3, score: 70, grade: "B" },
      { code: "GST 401", title: "Entrepreneurship Studies", units: 2, score: 82, grade: "A" },
    ],
  },
  {
    id: "2023-2",
    session: "2023/2024",
    semester: "2nd Semester",
    courses: [
      { code: "CSC 402", title: "Software Engineering I", units: 3, score: 74, grade: "A" },
      { code: "CSC 404", title: "Computer Graphics", units: 3, score: 60, grade: "B" },
      { code: "CSC 406", title: "Data Communication", units: 2, score: 55, grade: "C" },
      { code: "CSC 408", title: "Industrial Training I", units: 4, score: 68, grade: "B" },
    ],
  },
  {
    id: "2024-1",
    session: "2024/2025",
    semester: "1st Semester",
    courses: [
      { code: "CSC 501", title: "Computer System Performance Evaluation", units: 3, score: 72, grade: "B" },
      { code: "CSC 503", title: "Optimization Techniques", units: 3, score: 63, grade: "B" },
      { code: "CSC 505", title: "Computer Network and Communication", units: 3, score: 80, grade: "A" },
      { code: "CSC 511", title: "Software Engineering II", units: 3, score: 48, grade: "D" },
    ],
  },
];

export function semesterGpa(semester: SemesterResult) {
  const totalUnits = semester.courses.reduce((sum, c) => sum + c.units, 0);
  const totalPoints = semester.courses.reduce(
    (sum, c) => sum + c.units * gradePoint[c.grade],
    0
  );
  return totalUnits === 0 ? 0 : totalPoints / totalUnits;
}

export function cumulativeStats(upToId?: string) {
  const idx = upToId
    ? SEMESTER_RESULTS.findIndex((s) => s.id === upToId)
    : SEMESTER_RESULTS.length - 1;
  const semesters = SEMESTER_RESULTS.slice(0, idx + 1);

  const totalUnits = semesters.reduce(
    (sum, s) => sum + s.courses.reduce((u, c) => u + c.units, 0),
    0
  );
  const totalPoints = semesters.reduce(
    (sum, s) =>
      sum + s.courses.reduce((p, c) => p + c.units * gradePoint[c.grade], 0),
    0
  );
  const cgpa = totalUnits === 0 ? 0 : totalPoints / totalUnits;

  return { totalUnits, cgpa };
}

export function classOfDegree(cgpa: number) {
  if (cgpa >= 4.5) return "First Class";
  if (cgpa >= 3.5) return "Second Class Upper";
  if (cgpa >= 2.4) return "Second Class Lower";
  if (cgpa >= 1.5) return "Third Class";
  return "Pass";
}

export { gradePoint };
