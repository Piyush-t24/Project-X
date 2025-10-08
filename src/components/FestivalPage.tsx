import { Navbar } from "./Navbar";
import { CosmicBackground } from "./CosmicBackground";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";

interface FestivalPageProps {
  festivalName: string;
}

export function FestivalPage({ festivalName }: FestivalPageProps) {
  return (
    <div className="relative min-h-[250vh] sm:min-h-[280vh] lg:min-h-[300vh]">
      {/* Transparent Navbar */}
      <Navbar />

      {/* Fixed cosmic background without explosion */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
        <Canvas className="w-full h-full pointer-events-none">
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 8]}
            fov={
              window.innerWidth < 768 ? 85 : window.innerWidth < 1024 ? 80 : 75
            }
          />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={window.innerWidth < 768 ? 0.3 : 0.5}
          />

          <ambientLight intensity={0.1} />
          <directionalLight position={[10, 10, 5]} intensity={0.2} />

          <CosmicBackground />
        </Canvas>
      </div>

      {/* Content overlay - same scrollable structure as home */}
      <div className="relative z-10">
        {/* First screen - hero */}
        <div className="h-screen w-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 tracking-wider">
              {festivalName}
            </h1>
            <div className="w-20 sm:w-24 md:w-28 lg:w-32 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6"></div>
            <p className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl">
              Coming Soon...
            </p>
          </div>
        </div>

        {/* Second screen - placeholder sections for scroll parity */}
        <div className="h-screen w-full flex items-center justify-center px-4">
          <div className="relative w-[85vw] max-w-[320px] sm:max-w-[360px] md:w-96 h-48 sm:h-56 md:h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center">
            <p className="text-white/80 text-center px-4 sm:px-6 text-sm sm:text-base">
              Details reveal soon. Stay tuned.
            </p>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-sm -z-10"></div>
          </div>
        </div>

        {/* Third screen - placeholder */}
        <div className="h-screen w-full flex items-center justify-center px-4">
          <div className="relative w-[85vw] max-w-[320px] sm:max-w-[360px] md:w-96 h-48 sm:h-56 md:h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center">
            <p className="text-white/80 text-center px-4 sm:px-6 text-sm sm:text-base">
              Follow our socials for updates.
            </p>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-sm -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
