import { compare, hash } from 'bcryptjs'
import { randomBytes } from 'crypto'
import { db } from '@/server/db'
import { sendLecturerCredentialMail } from '@/server/lib/mailer'

type CreateLecturerInput = {
  surname: string
  first_name: string
  staff_id: string
  email: string
  phone: string
  department: string
  faculty: string
  office_hours?: string
}

type LecturerLoginInput = {
  staff_id: string
  password: string
}

function generateTemporaryPassword() {
  return randomBytes(8).toString('base64url')
}

export async function createLecturer(input: CreateLecturerInput) {
  if (!db.client) {
    throw new Error('Database is not configured. Add SUPABASE_* values to your environment.')
  }

  const temporaryPassword = generateTemporaryPassword()
  const password_hash = await hash(temporaryPassword, 10)

  const { data, error } = await db.client
    .from('lecturers')
    .insert({
      ...input,
      password_hash,
      email: input.email.toLowerCase(),
      staff_id: input.staff_id.toUpperCase(),
    })
    .select('id, staff_id, email, first_name, surname')
    .single()

  if (error) {
    if (error.message.toLowerCase().includes('duplicate')) {
      throw new Error('A lecturer with this staff ID or email already exists.')
    }
    throw new Error(error.message)
  }

  const fullName = `${data.first_name} ${data.surname}`

  const mailResult = await sendLecturerCredentialMail({
    email: data.email,
    fullName,
    staffId: data.staff_id,
    password: temporaryPassword,
  })

  if (!mailResult.sent) {
    return {
      id: data.id,
      staffId: data.staff_id,
      email: data.email,
      mailSent: false,
      emailError: mailResult.error,
      temporaryPassword,
      message:
        'Lecturer created, but email could not be delivered. Share temporary password manually.',
    }
  }

  return {
    id: data.id,
    staffId: data.staff_id,
    email: data.email,
    mailSent: true,
    message: 'Lecturer created successfully and login credentials sent via email.',
  }
}

export async function loginLecturer({ staff_id, password }: LecturerLoginInput) {
  if (!db.client) {
    throw new Error('Database is not configured. Add SUPABASE_* values to your environment.')
  }

  const normalizedStaffId = staff_id.trim().toUpperCase()

  const { data, error } = await db.client
    .from('lecturers')
    .select('id, staff_id, first_name, surname, email, department, faculty, password_hash')
    .eq('staff_id', normalizedStaffId)
    .single()

  if (error || !data) {
    throw new Error('Invalid staff ID or password.')
  }

  const isValidPassword = await compare(password, data.password_hash)

  if (!isValidPassword) {
    throw new Error('Invalid staff ID or password.')
  }

  return {
    user: {
      id: data.id,
      staff_id: data.staff_id,
      first_name: data.first_name,
      full_name: `${data.first_name} ${data.surname}`,
      email: data.email,
      department: data.department,
      faculty: data.faculty,
    },
    message: 'Login successful.',
  }
}
