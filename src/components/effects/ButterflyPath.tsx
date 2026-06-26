import React, { memo, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

interface ButterflyConfig {
  id: number
  initialXRatio: number
  initialYRatio: number
  normalColor: string
  clickColor: string
  wingSpeed: number
}

const BUTTERFLY_CONFIGS: ButterflyConfig[] = [
  {
    id: 0,
    initialXRatio: 0.2,
    initialYRatio: 0.3,
    normalColor: '#FFB7C5',
    clickColor: '#FF4D6D',
    wingSpeed: 0.4,
  },
  {
    id: 1,
    initialXRatio: 0.55,
    initialYRatio: 0.18,
    normalColor: '#B5C8FF',
    clickColor: '#4D79FF',
    wingSpeed: 0.35,
  },
  {
    id: 2,
    initialXRatio: 0.75,
    initialYRatio: 0.42,
    normalColor: '#B5FFD4',
    clickColor: '#2ECC71',
    wingSpeed: 0.45,
  },
]

interface ButterflyProps {
  config: ButterflyConfig
}

const SingleButterfly: React.FC<ButterflyProps> = memo(({ config }) => {
  const [accelerated, setAccelerated] = useState(false)
  const [color, setColor] = useState(config.normalColor)

  const x = useMotionValue(
    typeof window !== 'undefined' ? config.initialXRatio * window.innerWidth : 0
  )
  const y = useMotionValue(
    typeof window !== 'undefined' ? config.initialYRatio * window.innerHeight : 0
  )

  useEffect(() => {
    let active = true

    const loop = async () => {
      while (active) {
        const w = window.innerWidth
        const h = window.innerHeight
        const nextX = w * 0.08 + Math.random() * w * 0.84
        const nextY = h * 0.05 + Math.random() * h * 0.6
        const duration = accelerated
          ? 0.6 + Math.random() * 0.8
          : 3.5 + Math.random() * 4

        const ctrl1 = animate(x, nextX, { duration, ease: [0.25, 0.46, 0.45, 0.94] })
        const ctrl2 = animate(y, nextY, { duration, ease: [0.25, 0.46, 0.45, 0.94] })

        await Promise.all([ctrl1, ctrl2])

        if (!active) break

        // Small pause between moves to mimic butterfly rest
        if (!accelerated) {
          await new Promise<void>((r) => setTimeout(r, 300 + Math.random() * 900))
        }
      }
    }

    loop()
    return () => {
      active = false
    }
  }, [accelerated, x, y])

  const handleClick = useCallback(() => {
    setAccelerated((prev) => {
      const next = !prev
      setColor(next ? config.clickColor : config.normalColor)
      return next
    })
  }, [config.normalColor, config.clickColor])

  return (
    <motion.div
      style={{ x, y, position: 'fixed', zIndex: 20, cursor: 'pointer' }}
      onClick={handleClick}
      title="蝴蝶带去我的思念"
      whileHover={{ scale: 1.35 }}
    >
      <motion.svg
        width="44"
        height="32"
        viewBox="-32 -16 64 32"
        animate={{ scaleX: [1, -1, 1] }}
        transition={{
          duration: accelerated ? 0.18 : config.wingSpeed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Upper wings */}
        <ellipse cx="17" cy="-3" rx="17" ry="11" fill={color} opacity="0.88" />
        <ellipse cx="-17" cy="-3" rx="17" ry="11" fill={color} opacity="0.88" />
        {/* Lower wings */}
        <ellipse cx="11" cy="6" rx="10" ry="7" fill={color} opacity="0.65" />
        <ellipse cx="-11" cy="6" rx="10" ry="7" fill={color} opacity="0.65" />
        {/* Body */}
        <ellipse cx="0" cy="0" rx="2" ry="10" fill="#5a3e4b" opacity="0.82" />
        {/* Antennae */}
        <line x1="-1" y1="-10" x2="-8" y2="-18" stroke="#5a3e4b" strokeWidth="1" opacity="0.7" />
        <line x1="1" y1="-10" x2="8" y2="-18" stroke="#5a3e4b" strokeWidth="1" opacity="0.7" />
        <circle cx="-8" cy="-18" r="1.8" fill="#5a3e4b" opacity="0.7" />
        <circle cx="8" cy="-18" r="1.8" fill="#5a3e4b" opacity="0.7" />
      </motion.svg>
    </motion.div>
  )
})
SingleButterfly.displayName = 'SingleButterfly'

const ButterflyPath: React.FC = memo(() => (
  <>
    {BUTTERFLY_CONFIGS.map((config) => (
      <SingleButterfly key={config.id} config={config} />
    ))}
  </>
))
ButterflyPath.displayName = 'ButterflyPath'

export default ButterflyPath
