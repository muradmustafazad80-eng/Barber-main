'use server'

import { db } from '@/lib/db'

export async function createBooking(formData: {
  customerName: string
  customerPhone: string
  barberId: string
  serviceId: string
  dateTime: string
}) {
  if (!formData.customerName || !formData.customerPhone || !formData.dateTime) {
    return { success: false, error: 'Bütün vacib xanaları doldurun!' }
  }

  try {
    let customer = await db.customer.findUnique({
      where: { phone: formData.customerPhone }
    })

    if (!customer) {
      customer = await db.customer.create({
        data: {
          name: formData.customerName,
          phone: formData.customerPhone
        }
      })
    }

    const booking = await db.booking.create({
      data: {
        customerId: customer.id,
        barberId: formData.barberId,
        serviceId: formData.serviceId,
        dateTime: new Date(formData.dateTime),
        status: 'pending'
      }
    })

    return { success: true, bookingId: booking.id }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Sistem xətası baş verdi!' }
  }
}
