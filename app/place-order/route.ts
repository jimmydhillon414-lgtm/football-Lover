import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 1. Google Web App URL with fallback
    const GOOGLE_SCRIPT_URL =
      process.env.GOOGLE_SHEETS_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbyqRRg9ORN0Rz_XMVsF7xC3kpz31RdiiVfSCb6g_2thzw2cu8kIv7UT5wgZ5LSe-Nfd/exec'

    // 2. Formatting items as summary string
    const itemsSummary = Array.isArray(body.items)
      ? body.items.map((i: any) => `${i.name} (x${i.qty || 1})`).join(', ')
      : 'N/A'

    // 3. Forward request to Google Apps Script
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_number: body.order_number,
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        shipping_address: `${body.street_address}, ${body.city} - ${body.pincode}`,
        total_amount: body.total_amount,
        items_summary: itemsSummary,
        payment_method: body.payment_method,
      }),
    })

    const textResult = await res.text()
    console.log('Google Apps Script Response:', textResult)

    return NextResponse.json({ success: true, scriptResponse: textResult })
  } catch (error: any) {
    console.error('Error forwarding to Google Sheet:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to sync with Google Sheet' },
      { status: 500 }
    )
  }
}
