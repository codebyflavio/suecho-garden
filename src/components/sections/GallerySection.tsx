import React, { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlowerCard {
  src: string
  fallbackSrc: string
  chineseName: string
  latinName: string
  meaning: string
  poem: string
}

const FLOWERS: FlowerCard[] = [
  {
    src: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80',
    fallbackSrc: 'https://images.unsplash.com/photo-1490750967868-88df5691cc2b?w=800&q=80',
    chineseName: '樱花',
    latinName: 'Sakura',
    meaning: '短暂而璀璨',
    poem: '如每一次与你相遇，短暂却永恒',
  },
  {
    src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc2b?w=800&q=80',
    fallbackSrc: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80',
    chineseName: '芍药',
    latinName: 'Peony',
    meaning: '温柔与美丽',
    poem: '如你在我心中的模样，雍容而温柔',
  },
  {
    src: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80',
    fallbackSrc: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80',
    chineseName: '薰衣草',
    latinName: 'Lavender',
    meaning: '宁静与思念',
    poem: '闭上眼，满是你的气息',
  },
]

interface FlowerImageProps {
  flower: FlowerCard
  isHovered: boolean
}

const FlowerImage: React.FC<FlowerImageProps> = memo(({ flower, isHovered }) => {
  const [src, setSrc] = useState(flower.src)

  const handleError = useCallback(() => {
    if (src !== flower.fallbackSrc) setSrc(flower.fallbackSrc)
  }, [src, flower.fallbackSrc])

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
      <motion.img
        src={src}
        alt={flower.chineseName}
        onError={handleError}
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full h-full object-cover"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            'linear-gradient(to top, rgba(90,40,50,0.75) 0%, rgba(90,40,50,0.1) 55%, transparent 100%)',
        }}
      />
      {/* Text reveal */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-end justify-between">
          <div>
            <p
              className="text-white/90 text-2xl font-serif"
              style={{ letterSpacing: '0.15em' }}
            >
              {flower.chineseName}
            </p>
            <p className="text-white/50 text-xs mt-0.5" style={{ letterSpacing: '0.2em' }}>
              {flower.latinName}
            </p>
          </div>
          <p
            className="text-white/60 text-xs font-serif text-right"
            style={{ letterSpacing: '0.12em' }}
          >
            {flower.meaning}
          </p>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-white/70 text-sm font-serif leading-relaxed"
              style={{ letterSpacing: '0.08em' }}
            >
              {flower.poem}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
})
FlowerImage.displayName = 'FlowerImage'

const FlowerCardItem: React.FC<{ flower: FlowerCard; index: number }> = memo(
  ({ flower, index }) => {
    const [hovered, setHovered] = useState(false)

    return (
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 50, damping: 18, delay: index * 0.15 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="cursor-pointer"
        style={{ willChange: 'transform' }}
      >
        <FlowerImage flower={flower} isHovered={hovered} />
      </motion.div>
    )
  }
)
FlowerCardItem.displayName = 'FlowerCardItem'

const GallerySection: React.FC = memo(() => (
  <section
    className="relative z-30 py-28 px-6"
    style={{
      background: 'rgba(255,240,242,0.92)',
      backdropFilter: 'blur(22px)',
    }}
  >
    <div className="max-w-4xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 55, damping: 18 }}
        className="text-center mb-16"
      >
        <h2
          className="text-4xl md:text-5xl font-serif font-light text-rose-800/70"
          style={{ letterSpacing: '0.2em' }}
        >
          花园深处
        </h2>
        <p
          className="mt-3 text-rose-500/60 text-sm font-serif"
          style={{ letterSpacing: '0.2em' }}
        >
          每朵花都有它想说的话
        </p>
      </motion.div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {FLOWERS.map((flower, i) => (
          <FlowerCardItem key={flower.chineseName} flower={flower} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center mt-12 text-rose-400/55 text-sm font-serif"
        style={{ letterSpacing: '0.2em' }}
      >
        悬停，听花儿说话
      </motion.p>
    </div>
  </section>
))

GallerySection.displayName = 'GallerySection'

export default GallerySection
