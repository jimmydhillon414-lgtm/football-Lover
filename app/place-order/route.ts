import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Active Google Apps Script Web App URL
    const googleSheetUrl = 'https://script.google.com/macros/s/AKfycbzztgg6HZWQ7jh7yg1UROpe9eKGtxQ9nQN8OegN0VE3MIe2d-Kv8X7UWjvgZPoIaHzB/exec'

    // Address construction with safety fallback
    const addressParts = [body.street_address, body.city, body.state].filter(Boolean).join(', ')
    const fullAddress = body.pincode ? `${addressParts} - ${body.pincode}` : addressParts

    // Safe items summary check
    const itemsSummary = Array.isArray(body.items) 
      ? body.items.map((i: any) => `${i.name || 'Item'} (x${i.quantity || 1})`).join(', ') 
      : ''

    const response = await fetch(googleSheetUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      redirect: 'follow', // 1. CRITICAL: Redirect follow karna zaroori hai
      body: JSON.stringify({
        order_number: body.order_number || '',
        customer_name: body.customer_name || '',
        customer_email: body.customer_email || '',
        customer_phone: body.customer_phone || '',
        shipping_address: fullAddress,
        total_amount: body.total_amount || 0,
        items_summary: itemsSummary,
        payment_method: body.payment_method || 'COD',
      }),
    })

    const result = await response.json().catch(() => null)

    return NextResponse.json({ 
      success: true, 
      message: 'Order sent to seller Google Sheet successfully!',
      appsScriptResult: result 
    })
  } catch (error: any) {
    console.error('Google Sheet API Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
