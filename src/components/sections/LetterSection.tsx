import React, { memo } from 'react'
import { motion } from 'framer-motion'

const LETTER_PARAGRAPHS = [
  '遇见你之前，我不知道原来春天可以这样长——',
  '长到每次看见你，都像刚刚开始。',
  '你有时候安静，像一杯还未动过的茶；有时候又明亮，像突然穿透云层的光。',
  '而我每次见到你，心里总会有什么东西，悄悄地，松动了。',
  '我希望你知道，不是每个人都能让另一个人感受到这种温柔。但你，你轻易地就做到了。',
  '所以我想用这一座小小的花园，',
  '替我告诉你：',
]

const CLOSING_LINE = '你值得世界上所有的春天。'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 50, damping: 18, delay: i * 0.12 },
  }),
}

const LetterSection: React.FC = memo(() => (
  <section
    className="relative z-30 py-16 sm:py-24 md:py-28 px-4 sm:px-6"
    style={{ background: 'rgba(255,253,245,0.95)', backdropFilter: 'blur(22px)' }}
  >
    <div className="max-w-2xl mx-auto">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-4 mb-10 sm:mb-14"
      >
        <span className="block h-px flex-1 bg-rose-200/60" />
        <span className="text-rose-300/75 text-xs sm:text-sm font-serif tracking-[0.3em]">写给你的信</span>
        <span className="block h-px flex-1 bg-rose-200/60" />
      </motion.div>

      {/* Letter opener */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 55, damping: 18 }}
        className="font-serif text-rose-700/65 mb-6 sm:mb-8"
        style={{ fontSize: 'clamp(0.9rem, 3vw, 1.05rem)', letterSpacing: '0.12em' }}
      >
        亲爱的苏秋，
      </motion.p>

      {/* Paragraphs */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {LETTER_PARAGRAPHS.map((para, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="font-serif leading-loose sm:leading-[2] text-rose-800/65"
            style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', letterSpacing: '0.08em' }}
          >
            {para}
          </motion.p>
        ))}
      </div>

      {/* Highlighted closing line */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 55, damping: 18, delay: 0.3 }}
        className="mt-8 sm:mt-10 py-5 sm:py-7 px-5 sm:px-8 rounded-2xl text-center"
        style={{
          background: 'rgba(255,228,225,0.55)',
          border: '1px solid rgba(255,182,193,0.35)',
        }}
      >
        <p
          className="font-serif text-rose-700/80"
          style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', letterSpacing: '0.15em' }}
        >
          {CLOSING_LINE}
        </p>
      </motion.div>

      {/* Signature */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-10 sm:mt-12 flex flex-col items-end gap-1"
      >
        <p
          className="font-serif text-rose-500/55 text-xs sm:text-sm"
          style={{ letterSpacing: '0.15em' }}
        >
          永远爱你的人
        </p>
        <motion.span
          className="text-rose-300/60 text-2xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          ♡
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-12 sm:mt-16 flex justify-center gap-3 text-rose-200/60"
      >
        {['—', '✿', '—'].map((s, i) => (
          <span key={i} className="font-serif text-sm tracking-widest">
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
))

LetterSection.displayName = 'LetterSection'

export default LetterSection
