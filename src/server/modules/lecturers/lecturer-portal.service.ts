import { compare, hash } from 'bcryptjs'
import { db } from '@/server/db'

function requireDb() {
  if (!db.client) {
    throw new Error('Database is not configured. Add SUPABASE_* values to your environment.')
  }
  return db.client
}

export async function getLecturerCourses(lecturerId: string) {
  const client = requireDb()

  const { data, error } = await client
    .from('course_lecturers')
    .select('course:courses(id, code, title, level, semester, course_type)')
    .eq('lecturer_id', lecturerId)

  if (error) throw new Error(error.message)

  const courseIds = (data ?? []).map((row) => (row.course as unknown as { id: string }).id)

  const { data: counts } = await client
    .from('enrollments')
    .select('course_id')
    .in('course_id', courseIds.length ? courseIds : ['00000000-0000-0000-0000-000000000000'])

  const countByCourse = new Map<string, number>()
  for (const row of counts ?? []) {
    countByCourse.set(row.course_id, (countByCourse.get(row.course_id) ?? 0) + 1)
  }

  return (data ?? []).map((row) => {
    const course = row.course as unknown as { id: string; code: string; title: string; level: string; semester: string; course_type: string }
    return {
      id: course.id,
      code: course.code,
      title: course.title,
      level: course.level,
      semester: course.semester,
      courseType: course.course_type,
      students: countByCourse.get(course.id) ?? 0,
    }
  })
}

export async function getLecturerStudents(lecturerId: string) {
  const client = requireDb()

  const { data: assigned, error: assignedError } = await client
    .from('course_lecturers')
    .select('course_id, course:courses(code)')
    .eq('lecturer_id', lecturerId)

  if (assignedError) throw new Error(assignedError.message)

  const courseIds = (assigned ?? []).map((row) => row.course_id)
  const codeByCourse = new Map<string, string>()
  for (const row of assigned ?? []) {
    codeByCourse.set(row.course_id, (row.course as unknown as { code: string }).code)
  }

  if (!courseIds.length) return []

  const { data, error } = await client
    .from('enrollments')
    .select('course_id, student:students(id, matric, first_name, surname)')
    .in('course_id', courseIds)

  if (error) throw new Error(error.message)

  return (data ?? []).map((row) => {
    const student = row.student as unknown as { id: string; matric: string; first_name: string; surname: string }
    return {
      studentId: student.id,
      matric: student.matric,
      name: `${student.first_name} ${student.surname}`,
      course: codeByCourse.get(row.course_id) ?? '',
      courseId: row.course_id,
    }
  })
}

export async function getCourseRoster(courseId: string) {
  const client = requireDb()

  const { data, error } = await client
    .from('enrollments')
    .select('student:students(id, matric, first_name, surname)')
    .eq('course_id', courseId)

  if (error) throw new Error(error.message)

  return (data ?? []).map((row) => {
    const student = row.student as unknown as { id: string; matric: string; first_name: string; surname: string }
    return { studentId: student.id, matric: student.matric, name: `${student.first_name} ${student.surname}` }
  })
}

export async function getAttendance(courseId: string, sessionDate: string) {
  const client = requireDb()
  const { data, error } = await client
    .from('attendance')
    .select('student_id, status')
    .eq('course_id', courseId)
    .eq('session_date', sessionDate)

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function saveAttendance(
  courseId: string,
  sessionDate: string,
  entries: { studentId: string; status: 'present' | 'absent' }[],
) {
  const client = requireDb()
  const rows = entries.map((e) => ({
    course_id: courseId,
    student_id: e.studentId,
    session_date: sessionDate,
    status: e.status,
  }))

  const { error } = await client
    .from('attendance')
    .upsert(rows, { onConflict: 'course_id,student_id,session_date' })

  if (error) throw new Error(error.message)
  return { saved: rows.length }
}

export async function getGrades(courseId: string) {
  const client = requireDb()

  const { data: roster, error: rosterError } = await client
    .from('enrollments')
    .select('student:students(id, matric, first_name, surname)')
    .eq('course_id', courseId)

  if (rosterError) throw new Error(rosterError.message)

  const { data: grades, error: gradesError } = await client
    .from('grades')
    .select('student_id, ca, exam')
    .eq('course_id', courseId)

  if (gradesError) throw new Error(gradesError.message)

  const gradeByStudent = new Map((grades ?? []).map((g) => [g.student_id, g]))

  return (roster ?? []).map((row) => {
    const student = row.student as unknown as { id: string; matric: string; first_name: string; surname: string }
    const grade = gradeByStudent.get(student.id)
    return {
      studentId: student.id,
      matric: student.matric,
      name: `${student.first_name} ${student.surname}`,
      ca: grade?.ca ?? 0,
      exam: grade?.exam ?? 0,
    }
  })
}

export async function saveGrades(courseId: string, entries: { studentId: string; ca: number; exam: number }[]) {
  const client = requireDb()
  const rows = entries.map((e) => ({
    course_id: courseId,
    student_id: e.studentId,
    ca: e.ca,
    exam: e.exam,
    updated_at: new Date().toISOString(),
  }))

  const { error } = await client.from('grades').upsert(rows, { onConflict: 'course_id,student_id' })
  if (error) throw new Error(error.message)
  return { saved: rows.length }
}

export async function getAnnouncements(lecturerId: string) {
  const client = requireDb()
  const { data, error } = await client
    .from('announcements')
    .select('id, title, body, created_at, course:courses(code)')
    .eq('lecturer_id', lecturerId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    createdAt: row.created_at,
    course: (row.course as unknown as { code: string } | null)?.code ?? null,
  }))
}

export async function createAnnouncement(lecturerId: string, courseId: string | null, title: string, body: string) {
  const client = requireDb()
  const { data, error } = await client
    .from('announcements')
    .insert({ lecturer_id: lecturerId, course_id: courseId, title, body })
    .select('id')
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function getMaterials(lecturerId: string) {
  const client = requireDb()
  const { data, error } = await client
    .from('course_materials')
    .select('id, title, material_type, file_url, created_at, course:courses(code)')
    .eq('lecturer_id', lecturerId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    type: row.material_type,
    fileUrl: row.file_url,
    createdAt: row.created_at,
    course: (row.course as unknown as { code: string } | null)?.code ?? null,
  }))
}

export async function addMaterial(
  lecturerId: string,
  courseId: string,
  title: string,
  materialType: string,
  fileUrl?: string,
) {
  const client = requireDb()
  const { data, error } = await client
    .from('course_materials')
    .insert({ lecturer_id: lecturerId, course_id: courseId, title, material_type: materialType, file_url: fileUrl })
    .select('id')
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function removeMaterial(id: string, lecturerId: string) {
  const client = requireDb()
  const { error } = await client.from('course_materials').delete().eq('id', id).eq('lecturer_id', lecturerId)
  if (error) throw new Error(error.message)
  return { removed: true }
}

export async function getTimetable(lecturerId: string) {
  const client = requireDb()

  const { data: assigned, error: assignedError } = await client
    .from('course_lecturers')
    .select('course_id')
    .eq('lecturer_id', lecturerId)

  if (assignedError) throw new Error(assignedError.message)
  const courseIds = (assigned ?? []).map((row) => row.course_id)
  if (!courseIds.length) return []

  const { data, error } = await client
    .from('timetable_slots')
    .select('day, start_time, end_time, venue, course:courses(code)')
    .in('course_id', courseIds)

  if (error) throw new Error(error.message)

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (data ?? [])
    .map((row) => ({
      day: row.day,
      startTime: row.start_time,
      endTime: row.end_time,
      venue: row.venue,
      course: (row.course as unknown as { code: string } | null)?.code ?? '',
    }))
    .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day) || a.startTime.localeCompare(b.startTime))
}

export async function updateLecturerProfile(lecturerId: string, officeHours: string) {
  const client = requireDb()
  const { error } = await client.from('lecturers').update({ office_hours: officeHours }).eq('id', lecturerId)
  if (error) throw new Error(error.message)
  return { updated: true }
}

export async function changeLecturerPassword(lecturerId: string, currentPassword: string, newPassword: string) {
  const client = requireDb()
  const { data, error } = await client
    .from('lecturers')
    .select('password_hash')
    .eq('id', lecturerId)
    .single()

  if (error || !data) throw new Error('Lecturer not found.')

  const isValid = await compare(currentPassword, data.password_hash)
  if (!isValid) throw new Error('Current password is incorrect.')

  const password_hash = await hash(newPassword, 10)
  const { error: updateError } = await client.from('lecturers').update({ password_hash }).eq('id', lecturerId)
  if (updateError) throw new Error(updateError.message)

  return { updated: true }
}
