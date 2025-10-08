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
        <section className="h-screen w-full flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-wider text-white mb-4">
              SAUHARDYA'25
            </h1>
            <div className="w-20 sm:w-24 md:w-28 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6" />
            <p className="text-white/80 text-base sm:text-lg md:text-xl">
              A social initiative festival
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <Link
                to="/sauhardya/events"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs sm:text-sm md:text-base transition"
              >
                Events
              </Link>
              <Link
                to="/sauhardya/schedule"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs sm:text-sm md:text-base transition"
              >
                Schedule
              </Link>
              <Link
                to="/sauhardya/gallery"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs sm:text-sm md:text-base transition"
              >
                Gallery
              </Link>
            </div>
          </div>
        </section>
        <div className="relative z-10 pt-24">
          <div className="h-screen w-full flex items-center justify-center">
            <p className="text-white/80">More content coming soon...</p>
          </div>
        </div>
      </div>
      <Footer brand="Sauhardya" />
    </div>
  );
}
