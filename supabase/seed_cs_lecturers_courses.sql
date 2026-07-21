-- ============================================================
-- Seed: Computer Science lecturers + course catalog (100-500L)
-- Generated for department 'Computer Science' / faculty
-- 'Faculty of Computing and Informatics'. Run in Supabase SQL editor
-- AFTER schema.sql (needs the new public.courses table below).
-- ============================================================

-- 1. Courses table (add to schema once; safe to re-run)
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  department text not null,
  faculty text not null,
  level text not null,
  units integer not null default 3,
  course_type text not null default 'core',
  semester text not null default 'first',
  created_at timestamptz not null default now()
);

create index if not exists courses_department_idx on public.courses(department);
create index if not exists courses_level_idx on public.courses(level);
alter table public.courses enable row level security;

-- 2. Lecturers (Computer Science) - passwords are bcrypt-hashed (10 rounds),
--    matching src/server/modules/lecturers/lecturers.service.ts
-- Plaintext credentials to hand to lecturers (NOT stored in DB):
--   oluwaseun.adeyemi@lautech.edu.ng  /  Adeyemi@CSC25!
--   fatima.bello@lautech.edu.ng  /  Bello#Csc2025
--   chukwuemeka.okafor@lautech.edu.ng  /  Okafor!Csc2025
--   aisha.balogun@lautech.edu.ng  /  Balogun$Csc25
--   ifeanyi.nwachukwu@lautech.edu.ng  /  Nwachukwu@25Csc
insert into public.lecturers (surname, first_name, staff_id, email, phone, department, faculty, office_hours, password_hash) values
  ('Adeyemi', 'Oluwaseun', 'LAUTECH/CSC/001', 'oluwaseun.adeyemi@lautech.edu.ng', '+2348031234501', 'Computer Science', 'Faculty of Computing and Informatics', 'Mon & Wed, 10:00am - 12:00pm', '$2b$10$ZIflgHWqSO1mu64IWMOgju0hUQoHV619sgytIBacToPv7gJaGnjXi'),
  ('Bello', 'Fatima', 'LAUTECH/CSC/002', 'fatima.bello@lautech.edu.ng', '+2348052234502', 'Computer Science', 'Faculty of Computing and Informatics', 'Tue & Thu, 1:00pm - 3:00pm', '$2b$10$7F3Lztmp1hM1FqZbjNNlPOuUCYDR.XAApeIUCev7.sleyWC3OBRia'),
  ('Okafor', 'Chukwuemeka', 'LAUTECH/CSC/003', 'chukwuemeka.okafor@lautech.edu.ng', '+2348073234503', 'Computer Science', 'Faculty of Computing and Informatics', 'Mon & Fri, 9:00am - 11:00am', '$2b$10$BTpb8L8Bntgh3UapzgWNruVF0vP.TV0VK.xq.aHO7.pdMxiumycY6'),
  ('Balogun', 'Aisha', 'LAUTECH/CSC/004', 'aisha.balogun@lautech.edu.ng', '+2348094234504', 'Computer Science', 'Faculty of Computing and Informatics', 'Wed & Thu, 2:00pm - 4:00pm', '$2b$10$kxQMRrrxG1oysvly/pvg6OvhoBIQFrd5A9hRyLmQEDU3Ow3Tf8gIW'),
  ('Nwachukwu', 'Ifeanyi', 'LAUTECH/CSC/005', 'ifeanyi.nwachukwu@lautech.edu.ng', '+2348105234505', 'Computer Science', 'Faculty of Computing and Informatics', 'Tue & Fri, 10:00am - 12:00pm', '$2b$10$vohjdc9Elt2TXkZp.mSRr.lWuk1y0RSqKHA66LQYXtZUV2WSlr56a')
on conflict (staff_id) do nothing;

-- 3. Courses (Computer Science) - 34 total: 7 per level 100-400, 4 + 2 projects at 500
insert into public.courses (code, title, department, faculty, level, units, course_type, semester) values
  ('CSC101', 'Introduction to Computer Science', 'Computer Science', 'Faculty of Computing and Informatics', '100', 3, 'core', 'first'),
  ('CSC102', 'Introduction to Problem Solving', 'Computer Science', 'Faculty of Computing and Informatics', '100', 3, 'core', 'first'),
  ('CSC103', 'Introduction to Computer Hardware', 'Computer Science', 'Faculty of Computing and Informatics', '100', 2, 'core', 'second'),
  ('MTH101', 'Elementary Mathematics I', 'Computer Science', 'Faculty of Computing and Informatics', '100', 3, 'core', 'first'),
  ('PHY101', 'General Physics I', 'Computer Science', 'Faculty of Computing and Informatics', '100', 3, 'core', 'first'),
  ('GST101', 'Use of English I', 'Computer Science', 'Faculty of Computing and Informatics', '100', 2, 'core', 'first'),
  ('GST103', 'Nigerian Peoples and Culture', 'Computer Science', 'Faculty of Computing and Informatics', '100', 2, 'core', 'second'),
  ('CSC201', 'Computer Programming I', 'Computer Science', 'Faculty of Computing and Informatics', '200', 3, 'core', 'first'),
  ('CSC202', 'Discrete Structures', 'Computer Science', 'Faculty of Computing and Informatics', '200', 3, 'core', 'first'),
  ('CSC203', 'Data Structures and Algorithms', 'Computer Science', 'Faculty of Computing and Informatics', '200', 3, 'core', 'second'),
  ('CSC204', 'Computer Architecture and Organization', 'Computer Science', 'Faculty of Computing and Informatics', '200', 3, 'core', 'second'),
  ('MTH201', 'Mathematical Methods I', 'Computer Science', 'Faculty of Computing and Informatics', '200', 3, 'core', 'first'),
  ('STA201', 'Statistics for Physical Sciences', 'Computer Science', 'Faculty of Computing and Informatics', '200', 2, 'core', 'first'),
  ('GST201', 'Philosophy, Logic and Human Existence', 'Computer Science', 'Faculty of Computing and Informatics', '200', 2, 'core', 'second'),
  ('CSC301', 'Data Communication and Networking', 'Computer Science', 'Faculty of Computing and Informatics', '300', 3, 'core', 'first'),
  ('CSC302', 'Operating Systems I', 'Computer Science', 'Faculty of Computing and Informatics', '300', 3, 'core', 'first'),
  ('CSC303', 'Database Management Systems', 'Computer Science', 'Faculty of Computing and Informatics', '300', 3, 'core', 'second'),
  ('CSC304', 'Software Engineering I', 'Computer Science', 'Faculty of Computing and Informatics', '300', 3, 'core', 'second'),
  ('CSC305', 'Theory of Computation', 'Computer Science', 'Faculty of Computing and Informatics', '300', 2, 'core', 'first'),
  ('CSC306', 'Web Technologies', 'Computer Science', 'Faculty of Computing and Informatics', '300', 3, 'elective', 'second'),
  ('CSC399', 'Student Industrial Work Experience Scheme (SIWES)', 'Computer Science', 'Faculty of Computing and Informatics', '300', 6, 'core', 'second'),
  ('CSC401', 'Artificial Intelligence', 'Computer Science', 'Faculty of Computing and Informatics', '400', 3, 'core', 'first'),
  ('CSC402', 'Computer Graphics', 'Computer Science', 'Faculty of Computing and Informatics', '400', 3, 'elective', 'first'),
  ('CSC403', 'Software Engineering II', 'Computer Science', 'Faculty of Computing and Informatics', '400', 3, 'core', 'second'),
  ('CSC404', 'Compiler Construction', 'Computer Science', 'Faculty of Computing and Informatics', '400', 3, 'core', 'first'),
  ('CSC405', 'Computer Networks and Security', 'Computer Science', 'Faculty of Computing and Informatics', '400', 3, 'core', 'second'),
  ('CSC406', 'Human-Computer Interaction', 'Computer Science', 'Faculty of Computing and Informatics', '400', 2, 'elective', 'first'),
  ('CSC407', 'Mobile Application Development', 'Computer Science', 'Faculty of Computing and Informatics', '400', 3, 'elective', 'second'),
  ('CSC501', 'Distributed Systems', 'Computer Science', 'Faculty of Computing and Informatics', '500', 3, 'core', 'first'),
  ('CSC502', 'Advanced Database Systems', 'Computer Science', 'Faculty of Computing and Informatics', '500', 3, 'core', 'first'),
  ('CSC503', 'Machine Learning', 'Computer Science', 'Faculty of Computing and Informatics', '500', 3, 'core', 'second'),
  ('CSC504', 'Information Technology Project Management', 'Computer Science', 'Faculty of Computing and Informatics', '500', 2, 'core', 'second'),
  ('CSC505', 'Project I', 'Computer Science', 'Faculty of Computing and Informatics', '500', 3, 'project', 'first'),
  ('CSC506', 'Project II', 'Computer Science', 'Faculty of Computing and Informatics', '500', 6, 'project', 'second')
on conflict (code) do nothing;
