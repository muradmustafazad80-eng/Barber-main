import { NextResponse } from 'next/server'
import { createBooking } from '../../actions/bookings'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Gələn form məlumatlarını birbaşa bizim Mərhələ 2 mühərrikinə ötürürük
    const result = await createBooking({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      barberName: body.barberName || 'Ustad Əli',
      serviceName: body.serviceName,
      dateTime: body.dateTime
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ success: false, error: 'Baza qoşulma xətası!' }, { status: 500 })
  }
}
