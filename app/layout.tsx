import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter } from 'next/font/google'
import { CartProvider } from '@/components/cart/cart-context'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Football Lovers — Engineered for the Indian Game',
  description:
    'Premium football accessories built for Indian turf culture. Anti-slip grip socks, custom shin guards, studs, match balls and more. Free express shipping across India on orders above ₹999. UPI & COD available.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0b0f1a',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${anton.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
