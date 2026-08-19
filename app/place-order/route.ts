import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Your active Google Apps Script Web App URL
    const googleSheetUrl = 'https://script.google.com/macros/s/AKfycbzztgg6HZWQ7jh7yg1UROpe9eKGtxQ9nQN8OegN0VE3MIe2d-Kv8X7UWjvgZPoIaHzB/exec'

    const response = await fetch(googleSheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_number: body.order_number,
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        shipping_address: `${body.street_address}, ${body.city}, ${body.state} - ${body.pincode}`,
        total_amount: body.total_amount,
        items_summary: body.items.map((i: any) => `${i.name} (x${i.quantity || 1})`).join(', '),
        payment_method: body.payment_method || 'COD',
      }),
    })

    return NextResponse.json({ success: true, message: 'Order sent to seller Google Sheet successfully!' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
