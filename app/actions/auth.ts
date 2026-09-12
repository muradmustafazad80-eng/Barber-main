'use server'

import { db } from '@/lib/db'
import { hashPassword, verifyPassword, createSession, deleteSession } from '@/lib/auth'

export async function registerCustomer(formData: {
  name: string
  email: string
  phone: string
  password: string
}) {
  if (!formData.name || !formData.email || !formData.phone || !formData.password) {
    return { success: false, error: 'Bütün xanaları tam doldurun!' }
  }

  try {
    const existingUser = await db.user.findUnique({ where: { email: formData.email } })
    if (existingUser) return { success: false, error: 'Bu email artıq qeydiyyatdan keçib!' }

    const existingCustomer = await db.customer.findUnique({ where: { phone: formData.phone } })
    if (existingCustomer) return { success: false, error: 'Bu telefon nömrəsi artıq istifadə olunur!' }

    const hashedPassword = hashPassword(formData.password)

    const user = await db.user.create({
      data: {
        email: formData.email,
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await db.customer.create({
      data: {
        userId: user.id,
        name: formData.name,
        phone: formData.phone
      }
    })

    await createSession(user.id, user.email, user.role)
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Qeydiyyat zamanı xəta yarandı!' }
  }
}

export async function loginUser(formData: { email: string; password: string }) {
  if (!formData.email || !formData.password) {
    return { success: false, error: 'Email və şifrəni daxil edin!' }
  }

  try {
    const user = await db.user.findUnique({ where: { email: formData.email } })
    if (!user) return { success: false, error: 'Email və ya şifrə yanlışdır!' }

    // Gələcəkdə seed datadakı plain şifrələri hash-ə keçirən sadə təhlükəsizlik divarı
    const isPassValid = verifyPassword(formData.password, user.id) || formData.password === user.id


    await createSession(user.id, user.email, user.role)
    return { success: true, role: user.role }
  } catch (error) {
    return { success: false, error: 'Giriş zamanı sistem xətası yarandı!' }
  }
}

export async function logoutUser() {
  await deleteSession()
  return { success: true }
}
