'use server'

import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

// 1. Müştərinin öz sifarişlərini təhlükəsiz oxuması
export async function getCustomerBookings() {
  const session = await getSession()
  if (!session || session.role !== 'customer') {
    return { success: false, error: 'İcazəniz yoxdur!' }
  }

  try {
    const customer = await db.customer.findUnique({
      where: { userId: session.userId }
    })

    if (!customer) return { success: false, bookings: [] }

    const bookings = await db.booking.findMany({
      where: { customerId: customer.id },
      include: {
        service: true,
        barberRel: true
      },
      orderBy: { dateTime: 'desc' }
    })

    return { success: true, bookings }
  } catch (error) {
    return { success: false, error: 'Sifarişlər oxunarkən xəta baş verdi!' }
  }
}

// 2. Təhlükəsiz Sifariş Ləğvi (Cancellation)
export async function cancelBooking(bookingId: string) {
  const session = await getSession()
  if (!session) return { success: false, error: 'Sistemə daxil olun!' }

  try {
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: { customer: true }
    })

    if (!booking) return { success: false, error: 'Sifariş tapılmadı!' }

    // Müştəri yalnız öz sifarişini ləğv edə bilər (Ownership Check)
    if (session.role === 'customer' && booking.customer.userId !== session.userId) {
      return { success: false, error: 'Bu əməliyyata icazəniz yoxdur!' }
    }

    await db.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Ləğv etmə zamanı xəta baş verdi!' }
  }
}
