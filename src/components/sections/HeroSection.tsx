import React, { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import HeroTitle from '../ui/HeroTitle'
import FlowerButton from '../ui/FlowerButton'
import InfoCard from '../ui/InfoCard'

const INFO_CARDS = [
  { icon: '🌸', title: '春日繁花', description: '每一朵花都为你而开' },
  { icon: '🦋', title: '蝴蝶翩翩', description: '带去我最深的思念' },
  { icon: '☀️', title: '暖阳倾城', description: '愿你永远被温柔包围' },
]

const ScrollArrow: React.FC = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 5.5, duration: 1 }}
    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-30"
  >
    <p className="text-rose-600/70 text-xs font-serif" style={{ letterSpacing: '0.18em' }}>
      向下探索
    </p>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      className="text-rose-500/70 text-lg"
    >
      ↓
    </motion.div>
  </motion.div>
))
ScrollArrow.displayName = 'ScrollArrow'

const HeroSection: React.FC = memo(() => {
  const scrollToAbout = useCallback(() => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center gap-4 sm:gap-7 px-4 py-12 sm:py-16">
      <HeroTitle />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1.2 }}
      >
        <FlowerButton onClick={scrollToAbout} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-xl w-full"
      >
        {INFO_CARDS.map((card, i) => (
          <InfoCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            delay={3.8 + i * 0.18}
          />
        ))}
      </motion.div>

      <ScrollArrow />
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
