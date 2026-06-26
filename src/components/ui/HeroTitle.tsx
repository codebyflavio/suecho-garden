import React, { memo } from 'react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.35, delayChildren: 0.6 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 55, damping: 18 },
  },
}

const HeroTitle: React.FC = memo(() => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="visible"
    className="relative z-30 flex flex-col items-center text-center px-4 pointer-events-none w-full"
  >
    {/* Main title — 7 CJK chars: text-3xl safe on 320px, scales up on larger screens */}
    <motion.h1
      variants={item}
      className="text-3xl sm:text-5xl md:text-7xl font-serif font-light text-rose-800/90 drop-shadow-md w-full"
      style={{ letterSpacing: '0.15em', textShadow: '0 2px 24px rgba(255,170,180,0.45)' }}
    >
      苏秋的秘密花园
    </motion.h1>

    <motion.div variants={item} className="mt-3 flex items-center gap-3">
      <span className="block w-10 sm:w-16 h-px bg-rose-300/55" />
      <motion.span
        className="text-rose-300/80 text-base"
        animate={{ rotate: [0, 15, 0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✿
      </motion.span>
      <span className="block w-10 sm:w-16 h-px bg-rose-300/55" />
    </motion.div>

    <motion.p
      variants={item}
      className="mt-3 text-base sm:text-xl md:text-2xl font-serif text-rose-700/85"
      style={{ letterSpacing: '0.18em' }}
    >
      春日暖阳，万物温柔
    </motion.p>

    <motion.p
      variants={item}
      className="mt-4 text-sm sm:text-base md:text-lg text-rose-700/80 font-light px-2"
      style={{ letterSpacing: '0.08em' }}
    >
      欢迎你，亲爱的。这里藏着一整个春天。
    </motion.p>

    <motion.p
      variants={item}
      className="mt-2 text-xs sm:text-sm md:text-base text-rose-600/70 italic px-2"
      style={{ letterSpacing: '0.06em' }}
    >
      轻轻触碰，花儿就会为你绽放。
    </motion.p>
  </motion.div>
))

HeroTitle.displayName = 'HeroTitle'

export default HeroTitle
