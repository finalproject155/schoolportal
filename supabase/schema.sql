-- Run this in Supabase SQL editor

create extension if not exists pgcrypto;

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),

  surname text not null,
  first_name text not null,
  middle_name text,
  gender text not null,
  date_of_birth date not null,
  country text not null,
  nationality_type text not null,
  state_of_origin text not null,
  lga text not null,
  ward text,
  marital_status text not null,
  military_personnel text not null,

  phone text not null,
  email text not null unique,
  permanent_address text not null,

  matric text not null unique,
  programme text not null,
  department text not null,
  faculty text not null,
  level text not null,

  nok_full_name text not null,
  nok_relationship text not null,
  nok_phone text not null,
  nok_email text not null,
  nok_address text not null,

  password_hash text not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists students_matric_idx on public.students(matric);
create index if not exists students_email_idx on public.students(email);
create index if not exists students_department_idx on public.students(department);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_students_updated_at on public.students;
create trigger trg_students_updated_at
before update on public.students
for each row
execute function public.set_updated_at();

alter table public.students enable row level security;

-- Backend currently uses service-role key, so policies are optional for now.
-- Keep all direct client access blocked by default (no public select/insert policy).

create table if not exists public.lecturers (
  id uuid primary key default gen_random_uuid(),

  surname text not null,
  first_name text not null,
  staff_id text not null unique,
  email text not null unique,
  phone text not null,
  department text not null,
  faculty text not null,
  office_hours text,

  password_hash text not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lecturers_staff_id_idx on public.lecturers(staff_id);
create index if not exists lecturers_email_idx on public.lecturers(email);
create index if not exists lecturers_department_idx on public.lecturers(department);

drop trigger if exists trg_lecturers_updated_at on public.lecturers;
create trigger trg_lecturers_updated_at
before update on public.lecturers
for each row
execute function public.set_updated_at();

alter table public.lecturers enable row level security;

-- Backend currently uses service-role key, so policies are optional for now.
-- Keep all direct client access blocked by default (no public select/insert policy).

create table if not exists public.faculties (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  college text,
  created_at timestamptz not null default now()
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  faculty_id uuid not null references public.faculties(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (faculty_id, name)
);

create index if not exists departments_faculty_id_idx on public.departments(faculty_id);

alter table public.faculties enable row level security;
alter table public.departments enable row level security;

-- Reference data: LAUTECH faculties/departments. Keep in sync with src/lib/data/lautech-faculties.ts
insert into public.faculties (name, college) values
  ('Faculty of Computing and Informatics', null),
  ('Faculty of Engineering and Technology', null),
  ('Faculty of Environmental Sciences', null),
  ('Faculty of Food and Consumer Sciences', null),
  ('Faculty of Management Sciences', null),
  ('Faculty of Pure and Applied Sciences', null),
  ('Faculty of Arts and Social Sciences', null),
  ('Faculty of Basic Medical Sciences', 'College of Health Sciences'),
  ('Faculty of Basic Clinical Sciences', 'College of Health Sciences'),
  ('Faculty of Clinical Sciences', 'College of Health Sciences'),
  ('Faculty of Nursing Sciences', 'College of Health Sciences'),
  ('Faculty of Renewable Natural Resources', 'College of Agricultural Sciences and Renewable Natural Resources, Iseyin Campus'),
  ('Faculty of Agricultural Sciences', 'College of Agricultural Sciences and Renewable Natural Resources, Iseyin Campus')
on conflict (name) do update set college = excluded.college;

insert into public.departments (faculty_id, name)
select f.id, d.name
from public.faculties f
join (values
  ('Faculty of Computing and Informatics', 'Computer Science'),
  ('Faculty of Computing and Informatics', 'Cyber Security Science'),
  ('Faculty of Computing and Informatics', 'Information Systems'),

  ('Faculty of Engineering and Technology', 'Agricultural Engineering'),
  ('Faculty of Engineering and Technology', 'Chemical Engineering'),
  ('Faculty of Engineering and Technology', 'Civil Engineering'),
  ('Faculty of Engineering and Technology', 'Computer Engineering'),
  ('Faculty of Engineering and Technology', 'Electronic and Electrical Engineering'),
  ('Faculty of Engineering and Technology', 'Food Engineering'),
  ('Faculty of Engineering and Technology', 'Mechanical Engineering'),

  ('Faculty of Environmental Sciences', 'Architecture'),
  ('Faculty of Environmental Sciences', 'Building'),
  ('Faculty of Environmental Sciences', 'Estate Management'),
  ('Faculty of Environmental Sciences', 'Fine and Applied Arts'),
  ('Faculty of Environmental Sciences', 'Surveying and Geoinformatics'),
  ('Faculty of Environmental Sciences', 'Urban and Regional Planning'),

  ('Faculty of Food and Consumer Sciences', 'Food Science'),
  ('Faculty of Food and Consumer Sciences', 'Nutrition and Dietetics'),
  ('Faculty of Food and Consumer Sciences', 'Consumer and Home Economics'),
  ('Faculty of Food and Consumer Sciences', 'Hospitality and Tourism'),

  ('Faculty of Management Sciences', 'Accounting'),
  ('Faculty of Management Sciences', 'Business Management'),
  ('Faculty of Management Sciences', 'Marketing'),
  ('Faculty of Management Sciences', 'Transport Management'),

  ('Faculty of Pure and Applied Sciences', 'Earth Sciences'),
  ('Faculty of Pure and Applied Sciences', 'General Studies'),
  ('Faculty of Pure and Applied Sciences', 'Pure and Applied Biology'),
  ('Faculty of Pure and Applied Sciences', 'Pure and Applied Chemistry'),
  ('Faculty of Pure and Applied Sciences', 'Pure and Applied Mathematics'),
  ('Faculty of Pure and Applied Sciences', 'Pure and Applied Physics'),
  ('Faculty of Pure and Applied Sciences', 'Science Laboratory Technology'),
  ('Faculty of Pure and Applied Sciences', 'Biochemistry'),
  ('Faculty of Pure and Applied Sciences', 'Statistics'),

  ('Faculty of Arts and Social Sciences', 'English and Literary Studies'),
  ('Faculty of Arts and Social Sciences', 'History and International Studies'),
  ('Faculty of Arts and Social Sciences', 'Philosophy'),
  ('Faculty of Arts and Social Sciences', 'Political Science'),
  ('Faculty of Arts and Social Sciences', 'Psychology'),
  ('Faculty of Arts and Social Sciences', 'Sociology'),
  ('Faculty of Arts and Social Sciences', 'Library and Information Science'),
  ('Faculty of Arts and Social Sciences', 'Mass Communication'),
  ('Faculty of Arts and Social Sciences', 'Economics'),

  ('Faculty of Basic Medical Sciences', 'Anatomy'),
  ('Faculty of Basic Medical Sciences', 'Medical Laboratory Science'),
  ('Faculty of Basic Medical Sciences', 'Physiology'),

  ('Faculty of Basic Clinical Sciences', 'Chemical Pathology'),
  ('Faculty of Basic Clinical Sciences', 'Haematology and Blood Transfusion'),
  ('Faculty of Basic Clinical Sciences', 'Medical Microbiology and Parasitology'),
  ('Faculty of Basic Clinical Sciences', 'Morbid Anatomy & Histopathology'),
  ('Faculty of Basic Clinical Sciences', 'Pharmacology & Therapeutics'),

  ('Faculty of Clinical Sciences', 'Anaesthesia'),
  ('Faculty of Clinical Sciences', 'Community Medicine'),
  ('Faculty of Clinical Sciences', 'Ear, Nose and Throat'),
  ('Faculty of Clinical Sciences', 'Medicine'),
  ('Faculty of Clinical Sciences', 'Obstetrics and Gynaecology'),
  ('Faculty of Clinical Sciences', 'Ophthalmology'),
  ('Faculty of Clinical Sciences', 'Pediatrics and Child Health'),
  ('Faculty of Clinical Sciences', 'Psychiatry'),
  ('Faculty of Clinical Sciences', 'Radiology'),
  ('Faculty of Clinical Sciences', 'Surgery'),

  ('Faculty of Nursing Sciences', 'Mental Health/Psychiatric Nursing'),
  ('Faculty of Nursing Sciences', 'Medical/Surgical Nursing'),
  ('Faculty of Nursing Sciences', 'Maternal and Child Health Nursing'),
  ('Faculty of Nursing Sciences', 'Public/Community Health Nursing'),

  ('Faculty of Renewable Natural Resources', 'Forest Resource Management'),
  ('Faculty of Renewable Natural Resources', 'Wildlife and Ecotourism Management'),
  ('Faculty of Renewable Natural Resources', 'Aquaculture and Fisheries Management'),

  ('Faculty of Agricultural Sciences', 'Agricultural Extension and Rural Development'),
  ('Faculty of Agricultural Sciences', 'Animal Nutrition and Biotechnology'),
  ('Faculty of Agricultural Sciences', 'Animal Production and Health'),
  ('Faculty of Agricultural Sciences', 'Crop and Environmental Protection'),
  ('Faculty of Agricultural Sciences', 'Crop Production & Soil Science'),
  ('Faculty of Agricultural Sciences', 'Agricultural Economics')
) as d(faculty_name, name) on d.faculty_name = f.name
on conflict (faculty_id, name) do nothing;
