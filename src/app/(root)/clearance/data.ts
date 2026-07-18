export type ClearanceStatus = "Cleared" | "Pending" | "Not Started";

export type ClearanceItem = {
  department: string;
  status: ClearanceStatus;
  remark: string;
  contact: string;
};

export const CLEARANCE_ITEMS: ClearanceItem[] = [
  { department: "Bursary / Finance Office", status: "Cleared", remark: "All fees fully paid for this session", contact: "bursary@waleuniversity.edu" },
  { department: "Library", status: "Pending", remark: "1 overdue book: 'Data Structures & Algorithms'", contact: "library@waleuniversity.edu" },
  { department: "Hostel / Accommodation", status: "Cleared", remark: "Room inspection completed, no damages", contact: "hostel@waleuniversity.edu" },
  { department: "Department / HOD", status: "Cleared", remark: "Course advisor sign-off completed", contact: "csc-dept@waleuniversity.edu" },
  { department: "Health Center", status: "Not Started", remark: "Medical clearance form not yet submitted", contact: "healthcenter@waleuniversity.edu" },
  { department: "Security Unit", status: "Cleared", remark: "No pending disciplinary reports", contact: "security@waleuniversity.edu" },
];
