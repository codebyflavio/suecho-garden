import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  rotation: number
  rotationSpeed: number
  sineOffset: number
  sineAmplitude: number
  sineFrequency: number
  color: string
  type: 'petal' | 'sparkle'
  life: number
  maxLife: number
}

interface ParticleSystemConfig {
  petalCount?: number
  sparkleCount?: number
  enabled?: boolean
}

const PETAL_COLORS = [
  '#FFB7C5',
  '#FFCCD5',
  '#FFD6E0',
  '#FFC0CB',
  '#FFB6C1',
  '#FF91A4',
  '#FFDDE6',
  '#E8B4BE',
]

const SPARKLE_COLORS = ['#FFE4B5', '#FFDAB9', '#FFD700', '#FFF8DC', '#FFFACD']

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function resetPetal(p: Particle, canvas: HTMLCanvasElement): void {
  p.x = Math.random() * canvas.width
  p.y = -20
  p.vx = (Math.random() - 0.5) * 0.4
  p.vy = Math.random() * 1.2 + 0.5
  p.size = Math.random() * 9 + 4
  p.opacity = Math.random() * 0.55 + 0.35
  p.rotation = Math.random() * Math.PI * 2
  p.rotationSpeed = (Math.random() - 0.5) * 0.04
  p.sineOffset = Math.random() * Math.PI * 2
  p.sineAmplitude = Math.random() * 25 + 10
  p.sineFrequency = Math.random() * 0.012 + 0.004
  p.color = randomFrom(PETAL_COLORS)
  p.type = 'petal'
  p.life = 0
  p.maxLife = Math.random() * 320 + 180
}

function resetSparkle(p: Particle, canvas: HTMLCanvasElement): void {
  const centerX = canvas.width / 2
  p.x = centerX + (Math.random() - 0.5) * canvas.width * 0.55
  p.y = canvas.height * 0.08 + Math.random() * canvas.height * 0.35
  p.vx = (Math.random() - 0.5) * 0.25
  p.vy = (Math.random() - 0.5) * 0.2 - 0.15
  p.size = Math.random() * 3 + 1
  p.opacity = Math.random() * 0.7 + 0.2
  p.rotation = 0
  p.rotationSpeed = 0
  p.sineOffset = 0
  p.sineAmplitude = 0
  p.sineFrequency = 0
  p.color = randomFrom(SPARKLE_COLORS)
  p.type = 'sparkle'
  p.life = 0
  p.maxLife = Math.random() * 90 + 40
}

function createParticle(type: 'petal' | 'sparkle', canvas: HTMLCanvasElement): Particle {
  const p: Particle = {
    x: 0, y: 0, vx: 0, vy: 0, size: 0, opacity: 0,
    rotation: 0, rotationSpeed: 0, sineOffset: 0,
    sineAmplitude: 0, sineFrequency: 0, color: '',
    type, life: 0, maxLife: 0,
  }
  if (type === 'petal') resetPetal(p, canvas)
  else resetSparkle(p, canvas)
  return p
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Particle): void {
  ctx.save()
  ctx.globalAlpha = p.opacity
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.fillStyle = p.color
  ctx.beginPath()
  // Ellipse petal shape
  ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawSparkle(ctx: CanvasRenderingContext2D, p: Particle): void {
  const progress = p.life / p.maxLife
  const alpha = p.opacity * (1 - progress)
  if (alpha <= 0) return

  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = p.color
  ctx.shadowBlur = 8
  ctx.shadowColor = p.color
  ctx.translate(p.x, p.y)
  ctx.beginPath()
  const r = p.size
  const inner = r * 0.38
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4
    const dist = i % 2 === 0 ? r : inner
    if (i === 0) ctx.moveTo(Math.cos(angle) * dist, Math.sin(angle) * dist)
    else ctx.lineTo(Math.cos(angle) * dist, Math.sin(angle) * dist)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function useParticleSystem(config: ParticleSystemConfig = {}) {
  const { petalCount = 60, sparkleCount = 25, enabled = true } = config

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const particles: Particle[] = []
      for (let i = 0; i < petalCount; i++) {
        const p = createParticle('petal', canvas)
        // Spread initial y so they don't all start at top
        p.y = Math.random() * canvas.height
        p.life = Math.random() * p.maxLife
        particles.push(p)
      }
      for (let i = 0; i < sparkleCount; i++) {
        const p = createParticle('sparkle', canvas)
        p.life = Math.random() * p.maxLife
        particles.push(p)
      }
      particlesRef.current = particles
    },
    [petalCount, sparkleCount]
  )

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.life += 1

      if (p.type === 'petal') {
        p.x += p.vx + Math.sin(p.sineOffset + p.life * p.sineFrequency) * 0.45
        p.y += p.vy
        p.rotation += p.rotationSpeed

        if (p.life >= p.maxLife || p.y > canvas.height + 30) {
          resetPetal(p, canvas)
        } else {
          drawPetal(ctx, p)
        }
      } else {
        p.x += p.vx
        p.y += p.vy

        if (p.life >= p.maxLife) {
          resetSparkle(p, canvas)
        } else {
          drawSparkle(ctx, p)
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }, [])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas)
  }, [initParticles])

  const setCanvasRef = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas) {
        canvasRef.current = canvas
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initParticles(canvas)
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        cancelAnimationFrame(animFrameRef.current)
        canvasRef.current = null
      }
    },
    [initParticles, animate]
  )

  useEffect(() => {
    if (!enabled) return
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [enabled, handleResize])

  return { setCanvasRef }
}
