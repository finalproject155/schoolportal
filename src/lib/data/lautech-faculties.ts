export type FacultyOption = {
  college?: string
  faculty: string
  departments: string[]
}

export const LAUTECH_FACULTIES: FacultyOption[] = [
  {
    faculty: "Faculty of Computing and Informatics",
    departments: ["Computer Science", "Cyber Security Science", "Information Systems"],
  },
  {
    faculty: "Faculty of Engineering and Technology",
    departments: [
      "Agricultural Engineering",
      "Chemical Engineering",
      "Civil Engineering",
      "Computer Engineering",
      "Electronic and Electrical Engineering",
      "Food Engineering",
      "Mechanical Engineering",
    ],
  },
  {
    faculty: "Faculty of Environmental Sciences",
    departments: [
      "Architecture",
      "Building",
      "Estate Management",
      "Fine and Applied Arts",
      "Surveying and Geoinformatics",
      "Urban and Regional Planning",
    ],
  },
  {
    faculty: "Faculty of Food and Consumer Sciences",
    departments: ["Food Science", "Nutrition and Dietetics", "Consumer and Home Economics", "Hospitality and Tourism"],
  },
  {
    faculty: "Faculty of Management Sciences",
    departments: ["Accounting", "Business Management", "Marketing", "Transport Management"],
  },
  {
    faculty: "Faculty of Pure and Applied Sciences",
    departments: [
      "Earth Sciences",
      "General Studies",
      "Pure and Applied Biology",
      "Pure and Applied Chemistry",
      "Pure and Applied Mathematics",
      "Pure and Applied Physics",
      "Science Laboratory Technology",
      "Biochemistry",
      "Statistics",
    ],
  },
  {
    faculty: "Faculty of Arts and Social Sciences",
    departments: [
      "English and Literary Studies",
      "History and International Studies",
      "Philosophy",
      "Political Science",
      "Psychology",
      "Sociology",
      "Library and Information Science",
      "Mass Communication",
      "Economics",
    ],
  },
  {
    college: "College of Health Sciences",
    faculty: "Faculty of Basic Medical Sciences",
    departments: ["Anatomy", "Medical Laboratory Science", "Physiology"],
  },
  {
    college: "College of Health Sciences",
    faculty: "Faculty of Basic Clinical Sciences",
    departments: [
      "Chemical Pathology",
      "Haematology and Blood Transfusion",
      "Medical Microbiology and Parasitology",
      "Morbid Anatomy & Histopathology",
      "Pharmacology & Therapeutics",
    ],
  },
  {
    college: "College of Health Sciences",
    faculty: "Faculty of Clinical Sciences",
    departments: [
      "Anaesthesia",
      "Community Medicine",
      "Ear, Nose and Throat",
      "Medicine",
      "Obstetrics and Gynaecology",
      "Ophthalmology",
      "Pediatrics and Child Health",
      "Psychiatry",
      "Radiology",
      "Surgery",
    ],
  },
  {
    college: "College of Health Sciences",
    faculty: "Faculty of Nursing Sciences",
    departments: [
      "Mental Health/Psychiatric Nursing",
      "Medical/Surgical Nursing",
      "Maternal and Child Health Nursing",
      "Public/Community Health Nursing",
    ],
  },
  {
    college: "College of Agricultural Sciences and Renewable Natural Resources, Iseyin Campus",
    faculty: "Faculty of Renewable Natural Resources",
    departments: ["Forest Resource Management", "Wildlife and Ecotourism Management", "Aquaculture and Fisheries Management"],
  },
  {
    college: "College of Agricultural Sciences and Renewable Natural Resources, Iseyin Campus",
    faculty: "Faculty of Agricultural Sciences",
    departments: [
      "Agricultural Extension and Rural Development",
      "Animal Nutrition and Biotechnology",
      "Animal Production and Health",
      "Crop and Environmental Protection",
      "Crop Production & Soil Science",
      "Agricultural Economics",
    ],
  },
]
