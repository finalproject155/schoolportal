export type ResourceFormat = "E-Book" | "Journal" | "Past Question";

export type LibraryResource = {
  id: string;
  title: string;
  author: string;
  format: ResourceFormat;
  category: string;
  size: string;
};

export const LIBRARY_RESOURCES: LibraryResource[] = [
  { id: "lib-1", title: "Data Structures & Algorithms in Java", author: "R. Lafore", format: "E-Book", category: "Computer Science", size: "8.2 MB" },
  { id: "lib-2", title: "Introduction to Algorithms (CLRS)", author: "Cormen, Leiserson, Rivest", format: "E-Book", category: "Computer Science", size: "12.4 MB" },
  { id: "lib-3", title: "Journal of Software Engineering Research", author: "IEEE", format: "Journal", category: "Software Engineering", size: "3.1 MB" },
  { id: "lib-4", title: "CSC 501 Past Questions (2020–2024)", author: "Dept. of Computer Science", format: "Past Question", category: "Computer Science", size: "1.4 MB" },
  { id: "lib-5", title: "Database Systems: The Complete Book", author: "Garcia-Molina, Ullman", format: "E-Book", category: "Databases", size: "15.7 MB" },
  { id: "lib-6", title: "Journal of Artificial Intelligence Research", author: "AAAI", format: "Journal", category: "Artificial Intelligence", size: "4.6 MB" },
  { id: "lib-7", title: "CSC 513 Past Questions (2021–2024)", author: "Dept. of Computer Science", format: "Past Question", category: "Artificial Intelligence", size: "0.9 MB" },
  { id: "lib-8", title: "Computer Networking: A Top-Down Approach", author: "Kurose, Ross", format: "E-Book", category: "Networking", size: "10.3 MB" },
];

export type BorrowedItem = {
  title: string;
  borrowedOn: string;
  dueOn: string;
  status: "On Time" | "Due Soon" | "Overdue";
};

export const BORROWED_ITEMS: BorrowedItem[] = [
  { title: "Introduction to Algorithms (CLRS)", borrowedOn: "Jul 01, 2026", dueOn: "Jul 22, 2026", status: "Due Soon" },
  { title: "Data Structures & Algorithms in Java", borrowedOn: "Jun 10, 2026", dueOn: "Jul 01, 2026", status: "Overdue" },
];
