import React, { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RAY_COUNT = 10

const SunRays: React.FC = memo(() => {
  const groupRef = useRef<THREE.Group>(null!)

  const rays = useMemo(() => {
    return Array.from({ length: RAY_COUNT }, (_, i) => ({
      angle: (i / RAY_COUNT) * Math.PI * 2,
      length: Math.random() * 5 + 7,
      width: Math.random() * 0.12 + 0.04,
      opacity: Math.random() * 0.06 + 0.04,
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.04
  })

  return (
    <group ref={groupRef} position={[0, 9, -14]}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          rotation={[0, 0, ray.angle]}
          position={[
            Math.cos(ray.angle) * ray.length * 0.5,
            Math.sin(ray.angle) * ray.length * 0.5,
            0,
          ]}
        >
          <planeGeometry args={[ray.width, ray.length]} />
          <meshBasicMaterial
            color={new THREE.Color(1, 0.93, 0.65)}
            transparent
            opacity={ray.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
      <pointLight
        color={new THREE.Color(1, 0.88, 0.58)}
        intensity={2.5}
        distance={32}
        decay={2}
      />
    </group>
  )
})

SunRays.displayName = 'SunRays'

export default SunRays
