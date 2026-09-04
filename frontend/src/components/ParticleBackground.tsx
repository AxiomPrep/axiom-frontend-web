'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  color: string
  glowColor: string
  pulseSpeed: number
  pulseOffset: number
}

interface ScienceNode {
  x: number
  y: number
  angle: number
  radius: number
  speed: number
  ringRadius: number
  label: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Particles setup
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75)
    const particles: Particle[] = []

    const colorPalette = [
      { fill: 'rgba(245, 158, 11, 0.85)', glow: 'rgba(245, 158, 11, 0.35)' }, // amber
      { fill: 'rgba(251, 146, 60, 0.75)', glow: 'rgba(251, 146, 60, 0.3)' },  // orange
      { fill: 'rgba(252, 211, 77, 0.85)', glow: 'rgba(252, 211, 77, 0.4)' },  // light amber
      { fill: 'rgba(217, 119, 6, 0.7)', glow: 'rgba(217, 119, 6, 0.25)' },   // amber strong
    ]

    for (let i = 0; i < particleCount; i++) {
      const pColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      const r = Math.random() * 2 + 1.2
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: r,
        baseRadius: r,
        color: pColor.fill,
        glowColor: pColor.glow,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }

    // Science orbit nodes (planetary/atomic style)
    const orbitNodes: ScienceNode[] = [
      { x: width * 0.2, y: height * 0.25, angle: 0, radius: 4, speed: 0.008, ringRadius: 65, label: 'e⁻' },
      { x: width * 0.82, y: height * 0.35, angle: Math.PI / 2, radius: 5, speed: 0.006, ringRadius: 85, label: 'hν' },
      { x: width * 0.15, y: height * 0.75, angle: Math.PI, radius: 4, speed: 0.007, ringRadius: 55, label: 'Ψ' },
      { x: width * 0.85, y: height * 0.72, angle: Math.PI * 1.5, radius: 4.5, speed: 0.009, ringRadius: 70, label: 'λ' },
    ]

    let time = 0

    // Render loop
    const render = () => {
      time += 0.03
      ctx.clearRect(0, 0, width, height)

      // 1. Draw glowing scientific orbit rings
      orbitNodes.forEach((node) => {
        ctx.save()
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.ringRadius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.06)'
        ctx.lineWidth = 1.2
        ctx.setLineDash([4, 6])
        ctx.stroke()

        // Center nucleus glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(251, 191, 36, 0.4)'
        ctx.shadowColor = 'rgba(245, 158, 11, 0.6)'
        ctx.shadowBlur = 10
        ctx.fill()

        // Orbiting particle
        node.angle += node.speed
        const orbX = node.x + Math.cos(node.angle) * node.ringRadius
        const orbY = node.y + Math.sin(node.angle) * (node.ringRadius * 0.6) // Elliptical

        ctx.beginPath()
        ctx.arc(orbX, orbY, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(251, 191, 36, 0.9)'
        ctx.shadowColor = 'rgba(245, 158, 11, 0.8)'
        ctx.shadowBlur = 14
        ctx.fill()

        // Label
        ctx.fillStyle = 'rgba(251, 191, 36, 0.5)'
        ctx.font = '9px monospace'
        ctx.fillText(node.label, orbX + 8, orbY - 4)
        ctx.restore()
      })

      // 2. Constellation connecting lines
      const maxDistance = 115
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // 3. Draw and update particles
      particles.forEach((p) => {
        // Position update
        p.x += p.vx
        p.y += p.vy

        // Wrap around boundaries with margin
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // Mouse interaction: gentle repulsion
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < mouse.radius && mDist > 0) {
          const force = (1 - mDist / mouse.radius) * 1.5
          p.x -= (mdx / mDist) * force
          p.y -= (mdy / mDist) * force
        }

        // Pulse radius
        const currentRadius = p.baseRadius + Math.sin(time * p.pulseSpeed * 10 + p.pulseOffset) * 0.8

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(currentRadius, 0.5), 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.glowColor
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-75 transition-opacity duration-1000"
      style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.2))' }}
      aria-hidden="true"
    />
  )
}
