import React, { Suspense, memo, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import FlowerField from './3d/FlowerField'
import SunRays from './3d/SunRays'
import ParticleSystem from './effects/ParticleSystem'
import ButterflyPath from './effects/ButterflyPath'

import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SeasonsSection from './sections/SeasonsSection'
import GallerySection from './sections/GallerySection'
import LetterSection from './sections/LetterSection'
import ClosingSection from './sections/ClosingSection'

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1490750967868-88df5691cc2b?w=1920&q=80',
  'https://images.unsplash.com/photo-1487530811015-780eddac6b8c?w=1920&q=80',
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1920&q=80',
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
  <div className="relative w-full">
    {/* ── Fixed background: always visible while scrolling ── */}
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-soft-pink via-spring-yellow to-fresh-green">
      <BackgroundImage />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,228,225,0.55) 0%, rgba(255,249,230,0.45) 45%, rgba(232,245,233,0.42) 100%)',
        }}
      />
    </div>

    {/* ── Fixed Three.js flower field ── */}
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.26 }}>
      <ThreeScene />
    </div>

    {/* ── Fixed particle petals + sparkles ── */}
    <ParticleSystem petalCount={65} sparkleCount={22} />

    {/* ── Fixed butterflies ── */}
    <ButterflyPath />

    {/* ── Scrollable page content ── */}
    <div className="relative z-30">
      <HeroSection />
      <AboutSection />
      <SeasonsSection />
      <GallerySection />
      <LetterSection />
      <ClosingSection />
    </div>
  </div>
))

GardenScene.displayName = 'GardenScene'

export default GardenScene
