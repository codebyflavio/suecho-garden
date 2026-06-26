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

const ClosingSection: React.FC = memo(() => (
  <section
    className="relative z-30 min-h-screen flex flex-col items-center justify-center overflow-hidden"
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
        transition={{
          duration: star.duration,
          delay: star.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}

    {/* Moon glow */}
    <div
      className="absolute top-12 right-16 w-24 h-24 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(255,249,210,0.25) 0%, transparent 70%)',
        filter: 'blur(8px)',
      }}
    />
    <div
      className="absolute top-14 right-18 w-12 h-12 rounded-full"
      style={{
        background: 'rgba(255,249,210,0.14)',
        border: '1px solid rgba(255,249,210,0.2)',
      }}
    />

    {/* Cherry blossom silhouettes */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}
      className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
      style={{
        background:
          'linear-gradient(to top, rgba(60,10,30,0.7) 0%, transparent 100%)',
      }}
    />

    {/* Main content */}
    <div className="relative px-8 flex flex-col items-center text-center gap-8 max-w-2xl">
      {/* Moon icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        className="text-5xl mb-2"
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
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
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
        className="w-24 h-px"
        style={{ background: 'rgba(255,182,193,0.5)' }}
      />

      {[
        '愿你永远被温柔以待',
        '愿每一个清晨都有阳光等你',
        '愿你想笑的时候，身边总有人懂你',
        '愿这一生，你不缺爱，不缺春天',
      ].map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 50, damping: 18, delay: 0.25 + i * 0.12 }}
          className="font-serif"
          style={{
            fontSize: '1rem',
            letterSpacing: '0.2em',
            color: 'rgba(255,220,210,0.65)',
          }}
        >
          {line}
        </motion.p>
      ))}

      {/* Heartbeat */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 1 }}
        className="mt-4 flex flex-col items-center gap-3"
      >
        <motion.span
          className="text-4xl"
          animate={{ scale: [1, 1.22, 1, 1.12, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 12px rgba(255,100,120,0.6))' }}
        >
          ♡
        </motion.span>
        <p
          className="font-serif text-xs"
          style={{ color: 'rgba(255,182,193,0.45)', letterSpacing: '0.3em' }}
        >
          苏秋的秘密花园
        </p>
      </motion.div>
    </div>
  </section>
))

ClosingSection.displayName = 'ClosingSection'

export default ClosingSection
