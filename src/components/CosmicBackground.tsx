import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CosmicBackground() {
  const starsRef = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    const positions = new Float32Array(15000 * 3);
    for (let i = 0; i < 15000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = -Math.random() * 2000;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (starsRef.current) {
      // The speed multiplier has been reduced from 100 to 30
      starsRef.current.position.z += delta * 30;

      if (starsRef.current.position.z > 1000) {
        starsRef.current.position.z = -1000;
      }
    }

    state.camera.position.x +=
      (state.mouse.x * 0.2 - state.camera.position.x) * 0.02;
    state.camera.position.y +=
      (state.mouse.y * 0.2 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={15000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={1} color="#aaaaaa" transparent opacity={0.8} />
    </points>
  );
}
