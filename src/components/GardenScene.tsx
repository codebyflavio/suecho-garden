import React, { Suspense, memo, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'

import FlowerField from './3d/FlowerField'
import SunRays from './3d/SunRays'
import ParticleSystem from './effects/ParticleSystem'
import ButterflyPath from './effects/ButterflyPath'
import HeroTitle from './ui/HeroTitle'
import FlowerButton from './ui/FlowerButton'
import InfoCard from './ui/InfoCard'

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1490750967868-88df5691cc2b?w=1920&q=80',
  'https://images.unsplash.com/photo-1487530811015-780eddac6b8c?w=1920&q=80',
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1920&q=80',
]

const INFO_CARDS = [
  { icon: '🌸', title: '春日繁花', description: '每一朵花都为你而开' },
  { icon: '🦋', title: '蝴蝶翩翩', description: '带去我最深的思念' },
  { icon: '☀️', title: '暖阳倾城', description: '愿你永远被温柔包围' },
]

const ThreeScene: React.FC = memo(() => (
  <Canvas
    camera={{ position: [0, 3, 13], fov: 58 }}
    gl={{ antialias: true, alpha: true }}
    style={{ width: '100%', height: '100%' }}
  >
    <ambientLight intensity={0.65} color="#fff4ef" />
    <directionalLight position={[6, 10, 6]} intensity={1.1} color="#ffe5b4" />
    <SunRays />
    <Suspense fallback={null}>
      <FlowerField spread={18} />
    </Suspense>
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
      autoRotate
      autoRotateSpeed={0.35}
    />
  </Canvas>
))
ThreeScene.displayName = 'ThreeScene'

const BackgroundImage: React.FC = memo(() => {
  const [srcIndex, setSrcIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  const handleError = useCallback(() => {
    if (srcIndex < BG_IMAGES.length - 1) {
      setSrcIndex((i) => i + 1)
    } else {
      setFailed(true)
    }
  }, [srcIndex])

  if (failed) return null

  return (
    <img
      key={srcIndex}
      src={BG_IMAGES[srcIndex]}
      alt=""
      onError={handleError}
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
  )
})
BackgroundImage.displayName = 'BackgroundImage'

const GardenScene: React.FC = memo(() => (
  <div className="relative w-full h-full overflow-hidden">
    {/* Background layer */}
    <div className="absolute inset-0 bg-gradient-to-br from-soft-pink via-spring-yellow to-fresh-green">
      <BackgroundImage />
      {/* Pastel overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,228,225,0.62) 0%, rgba(255,249,230,0.52) 45%, rgba(232,245,233,0.48) 100%)',
        }}
      />
    </div>

    {/* Three.js scene blended at low opacity */}
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.28 }}>
      <ThreeScene />
    </div>

    {/* Particle petals + sparkles */}
    <ParticleSystem petalCount={65} sparkleCount={22} />

    {/* Butterflies — interactive */}
    <ButterflyPath />

    {/* Main hero content */}
    <div className="relative z-30 flex flex-col items-center justify-center h-full gap-7 px-4">
      <HeroTitle />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1.2 }}
        className="pointer-events-auto"
      >
        <FlowerButton />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl w-full pointer-events-auto"
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
    </div>

    {/* Footer */}
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5, duration: 1.2 }}
      className="absolute bottom-5 inset-x-0 flex justify-center z-30 pointer-events-none"
    >
      <p
        className="text-rose-400/55 text-sm font-serif"
        style={{ letterSpacing: '0.18em' }}
      >
        愿你的每一天都如春日般温暖。
      </p>
    </motion.footer>
  </div>
))

GardenScene.displayName = 'GardenScene'

export default GardenScene
