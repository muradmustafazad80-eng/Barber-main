'use server'

import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function createBooking(formData: {
  customerName: string
  customerPhone: string
  barberId: string
  serviceId: string
  dateTime: string
}) {
  // 1. Server-side yüngül abuse və spam qoruması
  if (!formData.customerName || !formData.customerPhone || !formData.dateTime || !formData.barberId || !formData.serviceId) {
    return { success: false, error: 'Bütün vacib xanaları doldurun!' }
  }

  const bookingDate = new Date(formData.dateTime)
  
  // 2. Biznes saatları yoxlanışı (09:00 - 21:00)
  const bookingHour = bookingDate.getHours()
  if (bookingHour < 9 || bookingHour >= 21) {
    return { success: false, error: 'Sifariş yalnız iş saatları daxilində (09:00 - 21:00) mümkündür!' }
  }

  try {
    // 3. DATABASE TRANSACTION & CONFLICT PREVENTION (Kritik Blok)
    return await db.$transaction(async (tx: any) => {
      
      // Xidmətin müddətini bazadan real olaraq oxuyuruq (Müştərinin göndərdiyinə güvənmirik)
      const service = await tx.service.findUnique({ where: { id: formData.serviceId } })
      if (!service) return { success: false, error: 'Seçilmiş xidmət tapılmadı!' }

      const durationInMs = service.duration * 60 * 1000
      const bookingEnd = new Date(bookingDate.getTime() + durationInMs)

      // Bərbərin həmin vaxt aralığında başqa bir təsdiqli və ya gözləyən sifarişi varmı?
      const overlappingBooking = await tx.booking.findFirst({
        where: {
          barberId: formData.barberId,
          status: { in: ['pending', 'confirmed'] },
          AND: [
            { dateTime: { lt: bookingEnd } },
            {
              id: { isNot: undefined }, // Yeni qeyd üçün
              dateTime: { gt: new Date(bookingDate.getTime() - 60 * 60 * 1000) } // Son 1 saatlıq pəncərə
            }
          ]
        }
      })

      // Əgər toqquşma varsa, dərhal təhlükəsiz xəta qaytar və prosesi dayandır
      if (overlappingBooking) {
        return { success: false, error: 'Seçdiyiniz saat artıq doludur! Zəhmət olmasa başqa vaxt və ya bərbər seçin.' }
      }

      // 4. Duplicate Customer Prevention (Müştərini təkrarlamırıq)
      let customer = await tx.customer.findUnique({
        where: { phone: formData.customerPhone || formData.customerPhone }
      })

      if (!customer) {
        customer = await tx.customer.create({
          data: {
            name: formData.customerName,
            phone: formData.customerPhone
          }
        })
      }

      // 5. Sifarişin bazaya yazılması
      const booking = await tx.booking.create({
        data: {
          customerId: customer.id,
          barberId: formData.barberId,
          serviceId: formData.serviceId,
          dateTime: bookingDate,
          status: 'pending'
        }
      })

      return { success: true, bookingId: booking.id }
    })

  } catch (error) {
    console.error('Booking Engine Xətası:', error)
    return { success: false, error: 'Sifariş yaradılarkən server xətası baş verdi!' }
  }
}
