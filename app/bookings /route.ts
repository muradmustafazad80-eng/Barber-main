import { NextResponse } from 'next/server'
import { createBooking } from '../../../actions/bookings'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createBooking(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server daxili xətası!' }, { status: 500 })
  }
}
