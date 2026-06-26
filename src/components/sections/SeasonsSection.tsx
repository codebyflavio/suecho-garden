import React, { memo } from 'react'
import { motion } from 'framer-motion'

interface Season {
  kanji: string
  name: string
  poem: string
  detail: string
  from: string
  to: string
  accent: string
  icon: string
}

const SEASONS: Season[] = [
  {
    kanji: '春',
    name: '春日',
    poem: '初见你时，世界刚刚苏醒',
    detail: '像第一朵迎春花，悄悄地，让一切都明亮起来。',
    from: 'rgba(255,228,225,0.9)',
    to: 'rgba(255,241,240,0.6)',
    accent: '#f43f5e',
    icon: '🌸',
  },
  {
    kanji: '夏',
    name: '盛夏',
    poem: '你笑起来，比太阳还暖',
    detail: '每一个有你的午后，都是整个夏天最好的时光。',
    from: 'rgba(255,249,196,0.9)',
    to: 'rgba(255,253,230,0.6)',
    accent: '#f59e0b',
    icon: '🌻',
  },
  {
    kanji: '秋',
    name: '深秋',
    poem: '你的名字，住在这个季节',
    detail: '苏秋——念起来，像风穿过金色的树叶。',
    from: 'rgba(254,215,170,0.9)',
    to: 'rgba(255,237,213,0.6)',
    accent: '#ea580c',
    icon: '🍂',
  },
  {
    kanji: '冬',
    name: '寒冬',
    poem: '有你在，冬天也是春天',
    detail: '再冷的日子，只要想到你，心里就有一团火。',
    from: 'rgba(219,234,254,0.9)',
    to: 'rgba(239,246,255,0.6)',
    accent: '#3b82f6',
    icon: '❄️',
  },
]

const SeasonCard: React.FC<{ season: Season; index: number }> = memo(({ season, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ type: 'spring', stiffness: 55, damping: 18, delay: index * 0.12 }}
    whileTap={{ scale: 0.98 }}
    className="relative rounded-3xl overflow-hidden cursor-default"
    style={{
      background: `linear-gradient(145deg, ${season.from}, ${season.to})`,
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.6)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
    }}
  >
    <div className="p-5 sm:p-7 flex flex-col gap-3 sm:gap-4">
      <div className="flex items-start justify-between">
        <span
          className="text-6xl sm:text-7xl font-serif leading-none"
          style={{ color: season.accent, opacity: 0.18, fontWeight: 300 }}
        >
          {season.kanji}
        </span>
        <span className="text-2xl sm:text-3xl">{season.icon}</span>
      </div>

      <div>
        <p
          className="text-xs font-serif tracking-[0.3em] mb-1"
          style={{ color: season.accent, opacity: 0.7 }}
        >
          {season.name}
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
          className="h-px w-8 origin-left"
          style={{ background: season.accent, opacity: 0.4 }}
        />
      </div>

      <p
        className="text-sm sm:text-base font-serif leading-relaxed"
        style={{ color: '#5a3e4b', letterSpacing: '0.1em' }}
      >
        {season.poem}
      </p>

      <p
        className="text-xs sm:text-sm leading-relaxed"
        style={{ color: '#8b6570', letterSpacing: '0.06em', fontWeight: 300 }}
      >
        {season.detail}
      </p>
    </div>
  </motion.div>
))
SeasonCard.displayName = 'SeasonCard'

const SeasonsSection: React.FC = memo(() => (
  <section
    className="relative z-30 py-16 sm:py-24 md:py-28 px-4 sm:px-6"
    style={{ background: 'rgba(255,248,240,0.94)', backdropFilter: 'blur(22px)' }}
  >
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 55, damping: 18 }}
        className="text-center mb-10 sm:mb-16"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-rose-800/70"
          style={{ letterSpacing: '0.2em' }}
        >
          四季与你
        </h2>
        <p
          className="mt-2 sm:mt-3 text-rose-500/60 text-xs sm:text-sm font-serif"
          style={{ letterSpacing: '0.15em' }}
        >
          每一个季节，都有一个理由想着你
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {SEASONS.map((season, i) => (
          <SeasonCard key={season.kanji} season={season} index={i} />
        ))}
      </div>
    </div>
  </section>
))

SeasonsSection.displayName = 'SeasonsSection'

export default SeasonsSection
