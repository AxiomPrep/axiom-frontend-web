import React from 'react'
import TrialBanner from './components/TrialBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const App = () => {
  return (
    <div className="min-h-screen bg-neutral-950">
      <TrialBanner />
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
