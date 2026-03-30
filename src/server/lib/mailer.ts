import nodemailer from 'nodemailer'

const smtpHost = process.env.SMTP_HOST ?? ''
const smtpPort = Number(process.env.SMTP_PORT ?? '587')
const smtpUser = process.env.SMTP_USER ?? ''
const smtpPass = (process.env.SMTP_PASS ?? '').replace(/\s+/g, '')
const smtpFrom = process.env.SMTP_FROM ?? 'no-reply@schoolportal.local'
const hasSmtpConfig = Boolean(smtpHost && smtpPort && smtpUser && smtpPass)

type StudentCredentialMailParams = {
  email: string
  fullName: string
  matric: string
  password: string
}

export async function sendStudentCredentialMail({
  email,
  fullName,
  matric,
  password,
}: StudentCredentialMailParams) {
  if (!hasSmtpConfig) {
    return {
      sent: false,
      error: 'SMTP is not configured. Add SMTP_* values to your environment.',
    }
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    requireTLS: smtpPort === 587,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: 'Your School Portal Login Details',
      text: `Hello ${fullName},\n\nYour account has been created successfully.\n\nMatric Number: ${matric}\nPassword: ${password}\n\nPlease log in and change your password immediately after first login.\n\nRegards,\nSchool Portal Admin`,
      html: `
        <p>Hello <strong>${fullName}</strong>,</p>
        <p>Your account has been created successfully.</p>
        <p><strong>Matric Number:</strong> ${matric}<br/><strong>Password:</strong> ${password}</p>
        <p>Please log in and change your password immediately after first login.</p>
        <p>Regards,<br/>School Portal Admin</p>
      `,
    })

    return { sent: true as const }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email.'
    return {
      sent: false,
      error: message,
    }
  }
}