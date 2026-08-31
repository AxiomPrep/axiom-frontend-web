import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Axiom — Master Science with Precision & Speed',
  description: 'One intelligent platform for JEE, NEET, & Olympiad aspirants. Solve 50,000+ curated PYQs with instant AI doubt clearance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
