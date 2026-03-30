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
