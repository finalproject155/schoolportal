import { db } from '@/server/db'

export type CategoryCount = { label: string; count: number }
export type MonthlyCount = { month: string; label: string; count: number }

export type DashboardStats = {
  totalStudents: number
  totalLecturers: number
  totalDepartments: number
  totalFaculties: number
  studentsByDepartment: CategoryCount[]
  studentsByLevel: CategoryCount[]
  studentsByGender: CategoryCount[]
  lecturersByDepartment: CategoryCount[]
  registrationsByMonth: MonthlyCount[]
}

function countBy(rows: Record<string, unknown>[], key: string): CategoryCount[] {
  const counts = new Map<string, number>()

  for (const row of rows) {
    const raw = row[key]
    const label = typeof raw === 'string' && raw.trim() ? raw.trim() : 'Unspecified'
    counts.set(label, (counts.get(label) ?? 0) + 1)
  }

  return Array.from(counts, ([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count)
}

function lastTwelveMonths(rows: { created_at: string }[]): MonthlyCount[] {
  const now = new Date()
  const counts = new Map<string, number>()

  for (const row of rows) {
    const date = new Date(row.created_at)
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  const buckets: MonthlyCount[] = []
  for (let i = 11; i >= 0; i--) {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
    buckets.push({
      month: key,
      label: date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }),
      count: counts.get(key) ?? 0,
    })
  }

  return buckets
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!db.client) {
    throw new Error('Database is not configured. Add SUPABASE_* values to your environment.')
  }

  const [studentsResult, lecturersResult] = await Promise.all([
    db.client.from('students').select('department, faculty, level, gender, created_at'),
    db.client.from('lecturers').select('department, faculty'),
  ])

  if (studentsResult.error) {
    throw new Error(studentsResult.error.message)
  }
  if (lecturersResult.error) {
    throw new Error(lecturersResult.error.message)
  }

  const students = (studentsResult.data ?? []) as Record<string, unknown>[]
  const lecturers = (lecturersResult.data ?? []) as Record<string, unknown>[]

  const departments = new Set(
    [...students, ...lecturers]
      .map((row) => row.department)
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0),
  )

  const faculties = new Set(
    [...students, ...lecturers]
      .map((row) => row.faculty)
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0),
  )

  return {
    totalStudents: students.length,
    totalLecturers: lecturers.length,
    totalDepartments: departments.size,
    totalFaculties: faculties.size,
    studentsByDepartment: countBy(students, 'department'),
    studentsByLevel: countBy(students, 'level'),
    studentsByGender: countBy(students, 'gender'),
    lecturersByDepartment: countBy(lecturers, 'department'),
    registrationsByMonth: lastTwelveMonths(students as { created_at: string }[]),
  }
}
