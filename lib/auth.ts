import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

// Ekrana və ya müştəriyə heç vaxt sızmayan gizli açar
const JWT_SECRET = process.env.JWT_SECRET || 'kral-barber-secret-key-2026-luxury-salon'

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

export async function createSession(userId: string, email: string, role: string) {
  const token = jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: '7d' })
  
  const cookieStore = await cookies()
  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 gün
    path: '/'
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value
  
  if (!token) return null
  
  try {
    return jwt.verify(token, JWT_SECRET) as {
      userId: string
      email: string
      role: string
    }
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session_token')
}
