import { Navbar } from "../components/Navbar";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { CosmicBackground } from "../components/CosmicBackground";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export function SauhardyaPage() {
  return (
    <div className="relative min-h-[250vh] sm:min_h-[280vh] lg:min-h-[300vh]">
      <Navbar />
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
        <Canvas className="w-full h-full pointer-events-none">
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate
            autoRotate
            autoRotateSpeed={0.4}
          />
          <ambientLight intensity={0.1} />
          <directionalLight position={[10, 10, 5]} intensity={0.2} />
          <CosmicBackground />
        </Canvas>
      </div>
      <div className="relative z-10">
        <section className="h-screen w-full flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-wider text-white mb-4">
              SAUHARDYA'25
            </h1>
            <div className="w-28 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6" />
            <p className="text-white/80 text-lg sm:text-xl">
              A social initiative festival
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/sauhardya/events"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition"
              >
                Events
              </Link>
              <Link
                to="/sauhardya/schedule"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition"
              >
                Schedule
              </Link>
              <Link
                to="/sauhardya/gallery"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition"
              >
                Gallery
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer brand="Sauhardya" />
    </div>
  );
}
