import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface TextRevealProps {
  visible: boolean;
}

export function TextReveal({ visible }: TextRevealProps) {
  const mainTextRef = useRef<THREE.Mesh>(null);
  const subTextRef = useRef<THREE.Mesh>(null);
  const [opacity, setOpacity] = useState(visible ? 0 : 0);

  useFrame(() => {
    if (visible && opacity < 1) {
      setOpacity(prev => Math.min(1, prev + 0.02));
    }
    
    if (mainTextRef.current && subTextRef.current) {
      const mainMaterial = mainTextRef.current.material as THREE.MeshStandardMaterial;
      const subMaterial = subTextRef.current.material as THREE.MeshStandardMaterial;
      
      mainMaterial.opacity = opacity;
      subMaterial.opacity = opacity;
      
      // Gentle floating animation
      const time = Date.now() * 0.001;
      mainTextRef.current.position.y = Math.sin(time * 0.3) * 0.05;
      subTextRef.current.position.y = Math.sin(time * 0.3) * 0.05 - 0.8;
    }
  });

  if (!visible) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Main Text - Urja Sangam */}
      <Text
        ref={mainTextRef}
        fontSize={1.8}
        letterSpacing={0.1}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2"
      >
        Urja Sangam –
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#4a90e2"
          emissiveIntensity={0.8}
          transparent
          opacity={0}
        />
      </Text>
      
      {/* Subtitle - COMING SOON */}
      <Text
        ref={subTextRef}
        position={[0, -0.8, 0]}
        fontSize={0.6}
        letterSpacing={0.15}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2"
      >
        COMING SOON
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.6}
          transparent
          opacity={0}
        />
      </Text>
      
      {/* Blue glow around main text */}
      <pointLight 
        position={[0, 0, 0.5]}
        color="#4a90e2"
        intensity={opacity * 4}
        distance={15}
        decay={2}
      />
      
      {/* White glow around subtitle */}
      <pointLight 
        position={[0, -0.8, 0.5]}
        color="#ffffff"
        intensity={opacity * 2}
        distance={10}
        decay={2}
      />
    </group>
  );
}