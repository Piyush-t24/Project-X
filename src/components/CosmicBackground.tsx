import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function CosmicBackground() {
  const starsRef = useRef<THREE.Points>(null);
  
  const starPositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);

  const starSizes = useMemo(() => {
    const sizes = new Float32Array(2000);
    for (let i = 0; i < 2000; i++) {
      sizes[i] = Math.random() * 3 + 0.5;
    }
    return sizes;
  }, []);

  useFrame((state, delta) => {
    if (starsRef.current) {
      // Slow rotation for cosmic feel
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.005;
      
      // Move background based on scroll position - background moves up when scrolling down
      const scrollY = window.scrollY || 0;
      starsRef.current.position.y = scrollY * 0.02;
    }
  });

  return (
    <>
      {/* Cosmic Background Gradient */}
      <mesh>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial 
          color="#0a0a2a" 
          side={THREE.BackSide}
          fog={false}
        />
      </mesh>
      
      {/* Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2000}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={2000}
            array={starSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          sizeAttenuation={true}
          color="#ffffff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Nebula Effect */}
      <mesh position={[10, 5, -20]}>
        <sphereGeometry args={[15, 16, 16]} />
        <meshBasicMaterial 
          color="#4a0e6b"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh position={[-15, -8, -25]}>
        <sphereGeometry args={[12, 16, 16]} />
        <meshBasicMaterial 
          color="#0e4a6b"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}