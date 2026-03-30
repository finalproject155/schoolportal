import { SignJWT, jwtVerify } from 'jose'

export const SESSION_COOKIE_NAME = 'schoolportal_session'

type SessionPayload = {
  id: string
  firstName: string
  email: string
  matric: string
}

function getJwtSecret() {
  const secret = process.env.AUTH_JWT_SECRET

  if (!secret) {
    if (process.env.NODE_ENV === 'development') {
      return new TextEncoder().encode('dev-only-auth-jwt-secret-change-me')
    }

    throw new Error('AUTH_JWT_SECRET is not configured.')
  }

  return new TextEncoder().encode(secret)
}

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getJwtSecret())
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret())

    return {
      id: String(payload.id ?? ''),
      firstName: String(payload.firstName ?? ''),
      email: String(payload.email ?? ''),
      matric: String(payload.matric ?? ''),
    }
  } catch {
    return null
  }
}