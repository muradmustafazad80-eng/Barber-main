'use server'

import { db } from '../../lib/db'

export async function createBooking(formData: {
  customerName: string
  customerPhone: string
  barberName: string
  serviceName: string
  dateTime: string
}) {
  if (!formData.customerName || !formData.customerPhone || !formData.dateTime || !formData.serviceName) {
    return { success: false, error: 'Bütün vacib xanaları doldurun!' }
  }

  const bookingDate = new Date(formData.dateTime)

  try {
    return await db.$transaction(async (tx: any) => {
      let service = await tx.service.findFirst({ where: { name: formData.serviceName } })
      if (!service) {
        service = await tx.service.create({
          data: { name: formData.serviceName, price: 20, duration: 30, category: 'Hair' }
        })
      }

      let barber = await tx.barber.findFirst({ where: { name: formData.barberName || 'Ustad Əli' } })
      if (!barber) {
        barber = await tx.barber.create({
          data: { name: formData.barberName || 'Ustad Əli', specialty: 'Stilist', image: '/images/barber-1.png' }
        })
      }

      const durationInMs = service.duration * 60 * 1000
      const bookingEnd = new Date(bookingDate.getTime() + durationInMs)

      const overlappingBooking = await tx.booking.findFirst({
        where: {
          barberId: barber.id,
          status: { in: ['pending', 'confirmed'] },
          dateTime: {
            gte: new Date(bookingDate.getTime() - 15 * 60 * 1000),
            lte: bookingEnd
          }
        }
      })

      if (overlappingBooking) {
        return { success: false, error: 'Seçdiyiniz bu saat və bərbər artıq doludur! Zəhmət olmasa başqa vaxt seçin.' }
      }

      let customer = await tx.customer.findUnique({ where: { phone: formData.customerPhone } })
      if (!customer) {
        customer = await tx.customer.create({ data: { name: formData.customerName, phone: formData.customerPhone } })
      }

      await tx.booking.create({
        data: {
          customerId: customer.id,
          barberId: barber.id,
          serviceId: service.id,
          dateTime: bookingDate,
          status: 'pending'
        }
      })

      return { success: true }
    })
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Sifariş qeyd edilərkən server xətası baş verdi!' }
  }
}
