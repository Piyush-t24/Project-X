import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExplosionEffectProps {
  active: boolean;
  onComplete: () => void;
}

export function ExplosionEffect({ active, onComplete }: ExplosionEffectProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const startTimeRef = useRef<number>(0);
  const [currentElapsed, setCurrentElapsed] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      // Start all particles at center
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }
    return positions;
  }, []);

  const particleVelocities = useMemo(() => {
    const velocities = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      // Random directions
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = Math.random() * 0.8 + 0.2;
      
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i * 3 + 2] = Math.cos(phi) * speed;
    }
    return velocities;
  }, []);

  useFrame(() => {
    if (!active || !particlesRef.current || hasCompleted) return;
    
    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }
    
    const elapsed = Math.min((Date.now() - startTimeRef.current) / 1000, 1.5);
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    setCurrentElapsed(elapsed);
    
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      positions[i3] = particleVelocities[i3] * elapsed * 15;
      positions[i3 + 1] = particleVelocities[i3 + 1] * elapsed * 15;
      positions[i3 + 2] = particleVelocities[i3 + 2] * elapsed * 15;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Fade out over time
    const material = particlesRef.current.material as THREE.PointsMaterial;
    material.opacity = Math.max(0, 1 - elapsed / 1.5);
    
    if (elapsed >= 1.5) {
      startTimeRef.current = 0;
      setHasCompleted(true);
      onComplete();
    }
  });

  if (!active || hasCompleted) return null;

  return (
    <>
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation={true}
          color="#ff8844"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}