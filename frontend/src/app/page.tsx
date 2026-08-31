import TrialBanner from '@/components/TrialBanner'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <TrialBanner />
      <Navbar />
      <Hero />
    </div>
  )
}
