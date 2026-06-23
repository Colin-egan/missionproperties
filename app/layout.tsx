import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mission Properties — Bespoke Multifamily Development',
  description:
    'Mission Properties, LLC is a Charlotte-based real estate development firm specializing in bespoke multifamily development across the Southeastern United States. Nearly 14,000 units and over $2 billion in projects completed.',
  keywords: [
    'multifamily development',
    'Charlotte NC real estate',
    'apartment development',
    'Southeast real estate',
    'Mission Properties',
  ],
  openGraph: {
    title: 'Mission Properties — Bespoke Multifamily Development',
    description:
      'Nearly 14,000 units and over $2 billion in projects completed and under construction across the Southeast.',
    siteName: 'Mission Properties',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
