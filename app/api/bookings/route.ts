import { NextResponse } from 'next/server'
import { createBooking } from '@/app/actions/bookings'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createBooking(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server xətası!' }, { status: 500 })
  }
}
