import { compare, hash } from 'bcryptjs'
import { randomBytes } from 'crypto'
import { db } from '@/server/db'
import { sendStudentCredentialMail } from '@/server/lib/mailer'

type CreateStudentInput = {
  surname: string
  first_name: string
  middle_name?: string
  gender: string
  date_of_birth: string
  country: string
  nationality_type: string
  state_of_origin: string
  lga: string
  ward?: string
  marital_status: string
  military_personnel: string
  phone: string
  email: string
  permanent_address: string
  matric: string
  programme: string
  department: string
  faculty: string
  level: string
  nok_full_name: string
  nok_relationship: string
  nok_phone: string
  nok_email: string
  nok_address: string
}

type StudentLoginInput = {
  matric: string
  password: string
}

function generateTemporaryPassword() {
  return randomBytes(8).toString('base64url')
}

export async function createStudent(input: CreateStudentInput) {
  if (!db.client) {
    throw new Error('Database is not configured. Add SUPABASE_* values to your environment.')
  }

  const temporaryPassword = generateTemporaryPassword()
  const password_hash = await hash(temporaryPassword, 10)

  const { data, error } = await db.client
    .from('students')
    .insert({
      ...input,
      password_hash,
      email: input.email.toLowerCase(),
      matric: input.matric.toUpperCase(),
    })
    .select('id, matric, email, first_name, surname')
    .single()

  if (error) {
    if (error.message.toLowerCase().includes('duplicate')) {
      throw new Error('A student with this matric number or email already exists.')
    }
    throw new Error(error.message)
  }

  const fullName = `${data.first_name} ${data.surname}`

  const mailResult = await sendStudentCredentialMail({
    email: data.email,
    fullName,
    matric: data.matric,
    password: temporaryPassword,
  })

  if (!mailResult.sent) {
    return {
      id: data.id,
      matric: data.matric,
      email: data.email,
      mailSent: false,
      emailError: mailResult.error,
      temporaryPassword,
      message:
        'Student created, but email could not be delivered. Share temporary password manually.',
    }
  }

  return {
    id: data.id,
    matric: data.matric,
    email: data.email,
    mailSent: true,
    message: 'Student created successfully and login credentials sent via email.',
  }
}

export async function loginStudent({ matric, password }: StudentLoginInput) {
  if (!db.client) {
    throw new Error('Database is not configured. Add SUPABASE_* values to your environment.')
  }

  const normalizedMatric = matric.trim().toUpperCase()

  const { data, error } = await db.client
    .from('students')
    .select('id, matric, first_name, surname, email, department, level, password_hash')
    .eq('matric', normalizedMatric)
    .single()

  if (error || !data) {
    throw new Error('Invalid matric number or password.')
  }

  const isValidPassword = await compare(password, data.password_hash)

  if (!isValidPassword) {
    throw new Error('Invalid matric number or password.')
  }

  return {
    user: {
      id: data.id,
      matric: data.matric,
      first_name: data.first_name,
      full_name: `${data.first_name} ${data.surname}`,
      email: data.email,
      department: data.department,
      level: data.level,
    },
    message: 'Login successful.',
  }
}