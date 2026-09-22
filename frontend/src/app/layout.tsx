import type { Metadata } from 'next'
import './globals.css'
import TrialBanner from '@/components/TrialBanner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Axiom — Master Science with Precision & Speed',
  description: 'One intelligent platform for JEE, NEET, & Olympiad aspirants. Solve 50,000+ curated PYQs with step-by-step master solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between transition-colors duration-300">
        <ThemeProvider>
          <div>
            <TrialBanner />
            <Navbar />
            <main>{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
