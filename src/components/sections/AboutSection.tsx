import React, { memo } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 50, damping: 18, delay: i * 0.15 },
  }),
}

const POEM_LINES = [
  '你的名字里有一个秋',
  '却带着整个春天的气息',
  '',
  '苏秋——',
  '每次念起',
  '都像有风，轻轻地吹过心上',
  '',
  '有你在的地方',
  '四季都是春天',
]

const AboutSection: React.FC = memo(() => (
  <section
    id="about-section"
    className="relative z-30 py-28 px-6"
    style={{ background: 'rgba(255,249,240,0.92)', backdropFilter: 'blur(22px)' }}
  >
    <div className="max-w-3xl mx-auto">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex items-center gap-4 mb-14"
      >
        <span className="block h-px flex-1 bg-rose-200/70" />
        <span className="text-rose-300/80 text-sm font-serif tracking-[0.3em]">致亲爱的苏秋</span>
        <span className="block h-px flex-1 bg-rose-200/70" />
      </motion.div>

      {/* Big opening character */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        className="text-center mb-16"
      >
        <span
          className="text-[120px] md:text-[160px] font-serif text-rose-200/60 leading-none select-none"
          style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
        >
          秋
        </span>
      </motion.div>

      {/* Poem */}
      <div className="flex flex-col items-center gap-3 text-center">
        {POEM_LINES.map((line, i) =>
          line === '' ? (
            <div key={i} className="h-3" />
          ) : (
            <motion.p
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="font-serif text-rose-700/75"
              style={{
                fontSize: line === '苏秋——' ? '2rem' : '1.15rem',
                letterSpacing: '0.2em',
                fontWeight: line === '苏秋——' ? 300 : 300,
              }}
            >
              {line}
            </motion.p>
          )
        )}
      </div>

      {/* Decorative flower row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="flex justify-center gap-6 mt-16 text-rose-300/50 text-2xl"
      >
        {['✿', '❀', '✾', '❀', '✿'].map((f, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {f}
          </motion.span>
        ))}
      </motion.div>
    </div>
  </section>
))

AboutSection.displayName = 'AboutSection'

export default AboutSection
