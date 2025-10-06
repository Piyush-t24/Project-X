import { useLocation, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { CosmicBackground } from "../components/CosmicBackground";

// Urjotsav
import { UrjotsavEvents } from "../components/Urjotsav/Events";
import { UrjotsavSchedule } from "../components/Urjotsav/Schedule";
import { UrjotsavGallery } from "../components/Urjotsav/Gallery";
// Kaltarang
import { KaltarangEvents } from "../components/Kaltarang/Events";
import { KaltarangSchedule } from "../components/Kaltarang/Schedule";
import { KaltarangGallery } from "../components/Kaltarang/Gallery";
// Energia
import { EnergiaEvents } from "../components/Energia/Events";
import { EnergiaSchedule } from "../components/Energia/Schedule";
import { EnergiaGallery } from "../components/Energia/Gallery";
// Sauhardya
import { SauhardyaEvents } from "../components/Sauhardya/Events";
import { SauhardyaSchedule } from "../components/Sauhardya/Schedule";
import { SauhardyaGallery } from "../components/Sauhardya/Gallery";

export function FestivalSectionPage() {
  const { festival } = useParams();
  const { pathname } = useLocation();
  const section = pathname.split("/").pop(); // events | schedule | gallery

  const fest = (festival || "").toLowerCase();

  let Content: () => JSX.Element = () => (
    <div className="text-white">Not found</div>
  );
  if (section === "events") {
    if (fest === "urjotsav") Content = UrjotsavEvents;
    else if (fest === "kaltarang") Content = KaltarangEvents;
    else if (fest === "energia") Content = EnergiaEvents;
    else if (fest === "sauhardya") Content = SauhardyaEvents;
  } else if (section === "schedule") {
    if (fest === "urjotsav") Content = UrjotsavSchedule;
    else if (fest === "kaltarang") Content = KaltarangSchedule;
    else if (fest === "energia") Content = EnergiaSchedule;
    else if (fest === "sauhardya") Content = SauhardyaSchedule;
  } else if (section === "gallery") {
    if (fest === "urjotsav") Content = UrjotsavGallery;
    else if (fest === "kaltarang") Content = KaltarangGallery;
    else if (fest === "energia") Content = EnergiaGallery;
    else if (fest === "sauhardya") Content = SauhardyaGallery;
  }

  return (
    <div className="relative min-h-[200vh]">
      <Navbar />

      {/* Fixed cosmic background */}
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

      {/* Content overlay */}
      <div className="relative z-10 pt-24">
        <div className="h-screen w-full flex items-center justify-center">
          <Content />
        </div>
        <div className="h-screen w-full flex items-center justify-center">
          <p className="text-white/80">More content coming soon...</p>
        </div>
      </div>
      <Footer
        brand={(festival || "Urja Sangam").replace(/^./, (c) =>
          c.toUpperCase()
        )}
      />
    </div>
  );
}
