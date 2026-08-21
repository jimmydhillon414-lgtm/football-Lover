import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { orderId, email, amount, items, status } = body

    const privateKey = process.env.GOOGLE_PRIVATE_KEY
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const itemsFormatted = Array.isArray(items)
      ? items.map((item: any) => `${item.name} (x${item.quantity || 1})`).join(', ')
      : items

    const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[orderId, email, amount, itemsFormatted, status || 'Paid', date]],
      },
    })

    return NextResponse.json({ success: true, message: 'Order saved to Google Sheet' })
  } catch (error: any) {
    console.error('Google Sheet Sync Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
