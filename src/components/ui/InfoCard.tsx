import React, { memo } from 'react'
import { motion } from 'framer-motion'

interface InfoCardProps {
  icon: string
  title: string
  description: string
  delay?: number
}

const InfoCard: React.FC<InfoCardProps> = memo(
  ({ icon, title, description, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 55, damping: 18, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="rounded-2xl p-5 cursor-default select-none"
      style={{
        background: 'rgba(255,248,240,0.55)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,182,193,0.28)',
        boxShadow: '0 4px 26px rgba(255,182,193,0.14)',
      }}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <motion.span
          className="text-3xl"
          whileHover={{ scale: 1.35, rotate: 12 }}
          transition={{ type: 'spring', stiffness: 280 }}
        >
          {icon}
        </motion.span>
        <h3
          className="text-sm md:text-base font-serif text-rose-700"
          style={{ letterSpacing: '0.12em' }}
        >
          {title}
        </h3>
        <p
          className="text-xs md:text-sm text-rose-500/65 font-light leading-relaxed"
          style={{ letterSpacing: '0.06em' }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
)

InfoCard.displayName = 'InfoCard'

export default InfoCard
