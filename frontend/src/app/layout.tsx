import type { Metadata } from 'next'
import './globals.css'
import TrialBanner from '@/components/TrialBanner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between">
        <div>
          <TrialBanner />
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
