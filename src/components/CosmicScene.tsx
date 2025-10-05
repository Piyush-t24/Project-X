import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { CosmicBackground } from "./CosmicBackground";
import { GlowingStone } from "./GlowingStone";
import { ExplosionEffect } from "./ExplosionEffect";
import { TextReveal } from "./TextReveal";

const STONE_COLORS = [
  "#ff4444",
  "#4444ff",
  "#44ff44",
  "#ffff44",
  "#ff44ff",
  "#ff8844",
];

const INITIAL_POSITIONS: [number, number, number][] = [
  [15, 0, 0], // Right
  [-15, 0, 0], // Left
  [0, 15, 0], // Top
  [0, -15, 0], // Bottom
  [0, 0, 15], // Front
  [0, 0, -15], // Back
];

export function CosmicScene() {
  const [animationPhase, setAnimationPhase] = useState<
    "approaching" | "colliding" | "circle" | "exploding" | "revealed"
  >("approaching");
  const [animationProgress, setAnimationProgress] = useState(0);
  const [circleProgress, setCircleProgress] = useState(0);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showText, setShowText] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [hasExploded, setHasExploded] = useState(false);
  const [explosionComplete, setExplosionComplete] = useState(false);
  // Removed stone dispersal sync to keep stable sequence

  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      if (animationPhase === "approaching" && elapsed < 3) {
        const t = elapsed / 3;
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        setAnimationProgress(eased);
      } else if (animationPhase === "approaching" && elapsed >= 3) {
        setAnimationProgress(1);
        setAnimationPhase("colliding");
        startTimeRef.current = Date.now();
      } else if (animationPhase === "colliding" && elapsed >= 0.5) {
        // transition into circle formation lasting 1.5s
        setAnimationPhase("circle");
        startTimeRef.current = Date.now();
      } else if (animationPhase === "circle" && elapsed < 1.5) {
        const t = elapsed / 1.5;
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setCircleProgress(eased);
      } else if (
        animationPhase === "circle" &&
        elapsed >= 1.5 &&
        !hasExploded
      ) {
        setCircleProgress(1);
        setAnimationPhase("exploding");
        setShowExplosion(true);
        setHasExploded(true);
        startTimeRef.current = Date.now();
      }

      if (!animationComplete) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [animationPhase, animationComplete]);

  const handleExplosionComplete = () => {
    setShowExplosion(false);
    setShowText(true);
    setAnimationPhase("revealed");
    setAnimationComplete(true);
    setExplosionComplete(true);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
        {animationComplete && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        )}

        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={0.2} />

        <CosmicBackground />

        {!explosionComplete &&
          STONE_COLORS.map((color, index) => {
            const angle = (index / STONE_COLORS.length) * Math.PI * 2;
            const radius = 2.2;
            const target: [number, number, number] = [
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0,
            ];
            return (
              <GlowingStone
                key={index}
                color={color}
                position={INITIAL_POSITIONS[index]}
                animationProgress={animationProgress}
                phase={animationPhase}
                targetPosition={target}
                circleProgress={circleProgress}
              />
            );
          })}

        {!explosionComplete && (
          <ExplosionEffect
            active={showExplosion}
            onComplete={handleExplosionComplete}
          />
        )}
        {showText && <TextReveal visible={showText} />}
      </Canvas>
    </div>
  );
}
