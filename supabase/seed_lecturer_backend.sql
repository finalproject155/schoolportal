-- ============================================================
-- Lecturer portal backend: course assignment, students, attendance,
-- grades, announcements, materials, timetable.
-- Run AFTER schema.sql and seed_cs_lecturers_courses.sql.
-- ============================================================

create table if not exists public.course_lecturers (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  lecturer_id uuid not null references public.lecturers(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (course_id, lecturer_id)
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (course_id, student_id)
);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  session_date date not null default current_date,
  status text not null default 'present',
  created_at timestamptz not null default now(),
  unique (course_id, student_id, session_date)
);

create table if not exists public.grades (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  ca integer not null default 0,
  exam integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (course_id, student_id)
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  lecturer_id uuid not null references public.lecturers(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.course_materials (
  id uuid primary key default gen_random_uuid(),
  lecturer_id uuid not null references public.lecturers(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  file_url text,
  material_type text not null default 'PDF',
  created_at timestamptz not null default now()
);

create table if not exists public.timetable_slots (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  day text not null,
  start_time text not null,
  end_time text not null,
  venue text not null
);

create index if not exists course_lecturers_lecturer_idx on public.course_lecturers(lecturer_id);
create index if not exists enrollments_course_idx on public.enrollments(course_id);
create index if not exists attendance_course_idx on public.attendance(course_id);
create index if not exists grades_course_idx on public.grades(course_id);
create index if not exists announcements_lecturer_idx on public.announcements(lecturer_id);
create index if not exists course_materials_lecturer_idx on public.course_materials(lecturer_id);
create index if not exists timetable_slots_course_idx on public.timetable_slots(course_id);

alter table public.course_lecturers enable row level security;
alter table public.enrollments enable row level security;
alter table public.attendance enable row level security;
alter table public.grades enable row level security;
alter table public.announcements enable row level security;
alter table public.course_materials enable row level security;
alter table public.timetable_slots enable row level security;

-- Assign all 5 CS lecturers across the CS course catalog (round-robin)
insert into public.course_lecturers (course_id, lecturer_id)
select c.id, l.id from (
  select id, code, row_number() over (order by code) as rn
  from public.courses where department = 'Computer Science'
) c
join (
  select id, staff_id, row_number() over (order by staff_id) as rn
  from public.lecturers where department = 'Computer Science'
) l on l.rn = ((c.rn - 1) % 5) + 1
on conflict (course_id, lecturer_id) do nothing;

-- A few sample Computer Science students so rosters aren't empty
insert into public.students (
  surname, first_name, gender, date_of_birth, country, nationality_type, state_of_origin, lga, marital_status, military_personnel,
  phone, email, permanent_address, matric, programme, department, faculty, level,
  nok_full_name, nok_relationship, nok_phone, nok_email, nok_address, password_hash
) values
  ('Ade', 'John', 'Male', '2001-03-14', 'Nigeria', 'Nigerian', 'Oyo', 'Ogbomoso North', 'Single', 'No', '+2348011110001', 'john.ade@student.lautech.edu.ng', '12 Adekunle Street, Ogbomoso', 'LCU/2021/CSC/001', 'Computer Science', 'Computer Science', 'Faculty of Computing and Informatics', '400', 'Mrs Ade', 'Mother', '+2348011110099', 'mrs.ade@example.com', '12 Adekunle Street, Ogbomoso', crypt('Student@2025', gen_salt('bf'))),
  ('Ola', 'Grace', 'Female', '2001-06-02', 'Nigeria', 'Nigerian', 'Ogun', 'Abeokuta South', 'Single', 'No', '+2348011110002', 'grace.ola@student.lautech.edu.ng', '5 Oke Ilewo, Abeokuta', 'LCU/2021/CSC/002', 'Computer Science', 'Computer Science', 'Faculty of Computing and Informatics', '400', 'Mr Ola', 'Father', '+2348011110098', 'mr.ola@example.com', '5 Oke Ilewo, Abeokuta', crypt('Student@2025', gen_salt('bf'))),
  ('Sam', 'Mike', 'Male', '2000-11-20', 'Nigeria', 'Nigerian', 'Lagos', 'Ikeja', 'Single', 'No', '+2348011110003', 'mike.sam@student.lautech.edu.ng', '9 Allen Avenue, Ikeja', 'LCU/2021/CSC/003', 'Computer Science', 'Computer Science', 'Faculty of Computing and Informatics', '300', 'Mrs Sam', 'Mother', '+2348011110097', 'mrs.sam@example.com', '9 Allen Avenue, Ikeja', crypt('Student@2025', gen_salt('bf'))),
  ('Chukwu', 'Ada', 'Female', '2001-01-09', 'Nigeria', 'Nigerian', 'Anambra', 'Awka South', 'Single', 'No', '+2348011110004', 'ada.chukwu@student.lautech.edu.ng', '3 Zik Avenue, Awka', 'LCU/2021/CSC/004', 'Computer Science', 'Computer Science', 'Faculty of Computing and Informatics', '300', 'Mr Chukwu', 'Father', '+2348011110096', 'mr.chukwu@example.com', '3 Zik Avenue, Awka', crypt('Student@2025', gen_salt('bf'))),
  ('Bello', 'Femi', 'Male', '2002-09-17', 'Nigeria', 'Nigerian', 'Oyo', 'Ogbomoso South', 'Single', 'No', '+2348011110005', 'femi.bello@student.lautech.edu.ng', '21 Takie Road, Ogbomoso', 'LCU/2021/CSC/005', 'Computer Science', 'Computer Science', 'Faculty of Computing and Informatics', '200', 'Mrs Bello', 'Mother', '+2348011110095', 'mrs.bello@example.com', '21 Takie Road, Ogbomoso', crypt('Student@2025', gen_salt('bf')))
on conflict (matric) do nothing;

-- Enroll those students into every CS course at their level
insert into public.enrollments (course_id, student_id)
select c.id, s.id
from public.students s
join public.courses c on c.department = s.department and c.level = s.level
where s.department = 'Computer Science'
on conflict (course_id, student_id) do nothing;

-- Sample timetable for CS core 400L courses
insert into public.timetable_slots (course_id, day, start_time, end_time, venue)
select id, day, start_time, end_time, venue from (
  select c.id, v.day, v.start_time, v.end_time, v.venue
  from public.courses c
  join (values
    ('CSC401', 'Monday', '09:00', '11:00', 'LT1'),
    ('CSC403', 'Tuesday', '11:00', '13:00', 'LT2'),
    ('CSC405', 'Wednesday', '14:00', '16:00', 'LT1'),
    ('CSC501', 'Thursday', '09:00', '11:00', 'LT3'),
    ('CSC303', 'Friday', '10:00', '12:00', 'LT1')
  ) as v(code, day, start_time, end_time, venue) on v.code = c.code
) x;
