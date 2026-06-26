import React, { memo } from 'react'
import { motion } from 'framer-motion'

const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.8,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}))

const WISHES = [
  '愿你永远被温柔以待',
  '愿每一个清晨都有阳光等你',
  '愿你想笑的时候，身边总有人懂你',
  '愿这一生，你不缺爱，不缺春天',
]

const ClosingSection: React.FC = memo(() => (
  <section
    className="relative z-30 min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 py-16"
    style={{ background: 'rgba(18,8,20,0.90)', backdropFilter: 'blur(8px)' }}
  >
    {/* Stars */}
    {STARS.map((star) => (
      <motion.div
        key={star.id}
        className="absolute rounded-full bg-white"
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: star.size,
          height: star.size,
        }}
        animate={{ opacity: [0.15, 0.9, 0.15] }}
        transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}

    {/* Moon glow — fixed right-16 (was invalid right-18) */}
    <div
      className="absolute top-10 right-10 sm:top-12 sm:right-16 w-20 h-20 sm:w-24 sm:h-24 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(255,249,210,0.25) 0%, transparent 70%)',
        filter: 'blur(8px)',
      }}
    />
    <div
      className="absolute top-12 right-12 sm:top-14 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full pointer-events-none"
      style={{
        background: 'rgba(255,249,210,0.14)',
        border: '1px solid rgba(255,249,210,0.2)',
      }}
    />

    {/* Bottom gradient */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}
      className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 pointer-events-none"
      style={{ background: 'linear-gradient(to top, rgba(60,10,30,0.7) 0%, transparent 100%)' }}
    />

    {/* Main content */}
    <div className="relative flex flex-col items-center text-center gap-5 sm:gap-8 max-w-2xl w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        className="text-4xl sm:text-5xl mb-1 sm:mb-2"
      >
        🌙
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 50, damping: 18, delay: 0.1 }}
        className="font-serif font-light"
        style={{
          fontSize: 'clamp(1.8rem, 8vw, 3.5rem)',
          letterSpacing: '0.22em',
          color: 'rgba(255,235,220,0.9)',
          textShadow: '0 0 40px rgba(255,200,180,0.3)',
        }}
      >
        愿你如春
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-20 sm:w-24 h-px"
        style={{ background: 'rgba(255,182,193,0.5)' }}
      />

      <div className="flex flex-col gap-3 sm:gap-4">
        {WISHES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, damping: 18, delay: 0.25 + i * 0.12 }}
            className="font-serif"
            style={{
              fontSize: 'clamp(0.8rem, 3.5vw, 1rem)',
              letterSpacing: '0.15em',
              color: 'rgba(255,220,210,0.88)',
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 1 }}
        className="mt-2 flex flex-col items-center gap-2 sm:gap-3"
      >
        <motion.span
          className="text-3xl sm:text-4xl"
          animate={{ scale: [1, 1.22, 1, 1.12, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 12px rgba(255,100,120,0.6))' }}
        >
          ♡
        </motion.span>
        <p
          className="font-serif text-xs"
          style={{ color: 'rgba(255,182,193,0.75)', letterSpacing: '0.25em' }}
        >
          苏秋的秘密花园
        </p>
      </motion.div>
    </div>
  </section>
))

ClosingSection.displayName = 'ClosingSection'

export default ClosingSection
