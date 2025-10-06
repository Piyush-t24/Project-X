import { Navbar } from "../components/Navbar";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { CosmicBackground } from "../components/CosmicBackground";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export function KaltarangPage() {
  return (
    <div className="relative min-h-[250vh] sm:min_h-[280vh] lg:min-h-[300vh]">
      <Navbar />

      {/* Fixed starfield background */}
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
            enableRotate
            autoRotate
            autoRotateSpeed={window.innerWidth < 768 ? 0.3 : 0.5}
          />
          <ambientLight intensity={0.1} />
          <directionalLight position={[10, 10, 5]} intensity={0.2} />
          <CosmicBackground />
        </Canvas>
      </div>

      {/* Scrollable overlay content */}
      <div className="relative z-10">
        {/* Hero screen */}
        <section className="h-screen w-full flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-wider text-white mb-4">
              KALTARANG'25
            </h1>
            <div className="w-28 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6" />
            <p className="text-white/80 text-lg sm:text-xl">
              RGIPT's Annual Cultural Fest
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/kaltarang/events"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition"
              >
                Events
              </Link>
              <Link
                to="/kaltarang/schedule"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition"
              >
                Schedule
              </Link>
              <Link
                to="/kaltarang/gallery"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition"
              >
                Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* About section screen */}
        <section className="h-screen w-full flex items-center justify-center px-6">
          <div className="relative max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-wide">
              About KALTARANG'25
            </h2>
            <p className="text-white/85 leading-relaxed text-base sm:text-lg">
              Kaltarang is RGIPTs annual cultural fest, renowned for being a
              dynamic and immersive celebration of art, culture, and talent.
              Since its inception, Kaltarang has grown into a prestigious
              platform where creativity meets competition. The 10th edition,
              Kaltarang25, promises to be the grandest yet, bringing together
              students from across the country to experience a world where
              fantasy and tradition intertwine. With a diverse array of
              competitions, performances, and workshops, Kaltarang celebrates
              the spirit of youth and innovation.
            </p>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-sm -z-10" />
          </div>
        </section>

        {/* CTA / Links screen */}
        <section className="h-screen w-full flex items-center justify-center px-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/80 text-lg">Explore more</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/kaltarang/events"
                className="bg-gradient-to-r from-orange-500/80 to-red-500/80 hover:from-orange-500 hover:to-red-500 text-white px-5 py-2 rounded-full text-sm sm:text-base transition"
              >
                Explore Events
              </Link>
              <Link
                to="/kaltarang/schedule"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2 rounded-full text-sm sm:text-base transition"
              >
                View Schedule
              </Link>
              <Link
                to="/kaltarang/gallery"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2 rounded-full text-sm sm:text-base transition"
              >
                Open Gallery
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer brand="Kaltarang" />
    </div>
  );
}
