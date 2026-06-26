import React, { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FLOWER_COUNT = 380

interface FlowerFieldProps {
  spread?: number
}

const FlowerField: React.FC<FlowerFieldProps> = memo(({ spread = 18 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const { positions, scales, rotOffsets } = useMemo(() => {
    const positions: Float32Array = new Float32Array(FLOWER_COUNT * 3)
    const scales: Float32Array = new Float32Array(FLOWER_COUNT)
    const rotOffsets: Float32Array = new Float32Array(FLOWER_COUNT)

    for (let i = 0; i < FLOWER_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread * 2
      positions[i * 3 + 1] = Math.random() * 0.2 - 0.1
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 2
      scales[i] = Math.random() * 0.28 + 0.12
      rotOffsets[i] = Math.random() * Math.PI * 2
    }
    return { positions, scales, rotOffsets }
  }, [spread])

  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.06, 0.9, 5)
    return geo
  }, [])

  const material = useMemo(
    () =>
      new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.96, 0.8, 0.84),
        side: THREE.DoubleSide,
      }),
    []
  )

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    for (let i = 0; i < FLOWER_COUNT; i++) {
      const px = positions[i * 3]
      const py = positions[i * 3 + 1]
      const pz = positions[i * 3 + 2]
      const scale = scales[i]
      const offset = rotOffsets[i]

      const wind = Math.sin(t * 0.7 + px * 0.45 + pz * 0.35 + offset) * 0.07

      dummy.position.set(px, py + scale * 0.45, pz)
      dummy.rotation.set(wind, offset * 0.1, wind * 0.5)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, FLOWER_COUNT]} />
  )
})

FlowerField.displayName = 'FlowerField'

export default FlowerField
