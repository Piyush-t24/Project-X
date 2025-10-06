import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlowingStoneProps {
  color: string;
  position: [number, number, number];
  animationProgress: number;
  phase: 'approaching' | 'colliding' | 'exploding' | 'revealed';
}

export function GlowingStone({ 
  color, 
  position, 
  animationProgress, 
  phase
}: GlowingStoneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current && glowRef.current) {
      // Floating animation
      const time = Date.now() * 0.001;
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      
      // Glow pulsing
      const glowScale = phase === 'colliding' ? 1.5 + Math.sin(time * 10) * 0.3 : 1 + Math.sin(time * 2) * 0.1;
      glowRef.current.scale.setScalar(glowScale);
    }
  });

  // Calculate position based on animation phase
  let currentPosition: THREE.Vector3;
  
  if (phase === 'approaching') {
    // Move from initial position to center
    currentPosition = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...position),
      new THREE.Vector3(0, 0, 0),
      animationProgress
    );
  } else {
    // Stay at center during collision and explosion
    currentPosition = new THREE.Vector3(0, 0, 0);
  }

  return (
    <group position={currentPosition.toArray()}>
      {/* Outer Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[phase === 'colliding' ? 0.8 : 0.6, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={phase === 'colliding' ? 0.6 : 0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Main Stone */}
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[phase === 'colliding' ? 0.4 : 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={phase === 'colliding' ? 1.0 : 0.5}
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>
      
      {/* Point Light */}
      <pointLight 
        color={color} 
        intensity={phase === 'colliding' ? 5 : phase === 'exploding' ? 3 : 1} 
        distance={phase === 'colliding' ? 25 : phase === 'exploding' ? 20 : 10}
        decay={2}
      />
    </group>
  );
}