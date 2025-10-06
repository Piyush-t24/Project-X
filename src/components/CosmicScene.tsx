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
    "approaching" | "colliding" | "exploding" | "revealed"
  >("approaching");
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showText, setShowText] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [hasExploded, setHasExploded] = useState(false);
  const [explosionComplete, setExplosionComplete] = useState(false);

  const startTimeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundsEnabledRef = useRef(false);

  // Initialize Web Audio API
  useEffect(() => {
    const initAudio = () => {
      try {
        // Create AudioContext for generating sounds
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        soundsEnabledRef.current = true;
      } catch (error) {
        console.log("Web Audio API not supported, continuing without audio");
      }
    };

    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Function to create approach sound (whoosh)
  const playApproachSound = () => {
    if (!soundsEnabledRef.current || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Create whoosh sound
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      50,
      ctx.currentTime + 2.5
    );

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 2.5);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 2.5);
  };

  // Function to create explosion sound
  const playExplosionSound = () => {
    if (!soundsEnabledRef.current || !audioContextRef.current) return;

    const ctx = audioContextRef.current;

    // Create multiple oscillators for rich explosion sound
    for (let i = 0; i < 3; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Different frequencies for each layer
      const baseFreq = 80 + i * 40;
      oscillator.type = i === 0 ? "sawtooth" : "square";
      oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        baseFreq * 0.1,
        ctx.currentTime + 0.8
      );

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000 - i * 500, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.4 - i * 0.1,
        ctx.currentTime + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.8);
    }

    // Add noise burst for explosion
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }

    const noiseSource = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();

    noiseSource.buffer = buffer;
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(500, ctx.currentTime);

    noiseGain.gain.setValueAtTime(0.6, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    noiseSource.start(ctx.currentTime);
  };
  useEffect(() => {
    startTimeRef.current = Date.now();

    // Play approach sound when animation starts
    if (animationPhase === "approaching") {
      playApproachSound();
    }

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
      } else if (
        animationPhase === "colliding" &&
        elapsed >= 0.5 &&
        !hasExploded
      ) {
        // Play explosion sound
        playExplosionSound();

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
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      <Canvas className="w-full h-full">
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 8]}
          fov={
            window.innerWidth < 768 ? 85 : window.innerWidth < 1024 ? 80 : 75
          }
        />
        {animationComplete && (
          <OrbitControls
            enablePan={false}
            enableZoom={window.innerWidth >= 1024}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={window.innerWidth < 768 ? 0.3 : 0.5}
          />
        )}

        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={0.2} />

        <CosmicBackground />

        {!explosionComplete &&
          STONE_COLORS.map((color, index) => (
            <GlowingStone
              key={index}
              color={color}
              position={INITIAL_POSITIONS[index]}
              animationProgress={animationProgress}
              phase={animationPhase}
            />
          ))}

        {!explosionComplete && (
          <ExplosionEffect
            active={showExplosion}
            onComplete={handleExplosionComplete}
          />
        )}
      </Canvas>
    </div>
  );
}
