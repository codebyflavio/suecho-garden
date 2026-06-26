import React, { memo } from 'react'
import { useParticleSystem } from '../../hooks/useParticleSystem'

interface ParticleSystemProps {
  petalCount?: number
  sparkleCount?: number
}

const ParticleSystem: React.FC<ParticleSystemProps> = memo(
  ({ petalCount = 65, sparkleCount = 25 }) => {
    const { setCanvasRef } = useParticleSystem({ petalCount, sparkleCount })

    return (
      <canvas
        ref={setCanvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />
    )
  }
)

ParticleSystem.displayName = 'ParticleSystem'

export default ParticleSystem
