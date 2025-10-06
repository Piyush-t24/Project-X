import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { CosmicScene } from "./components/CosmicScene";
import { Navbar } from "./components/Navbar";
import { ScrollSections } from "./components/ScrollSections";
import { KaltarangPage } from "./Pages/KaltarangPage";
import { UrjotsavPage } from "./Pages/UrjotsavPage";
import { EnergiaPage } from "./Pages/EnergiaPage";
import { SauhardyaPage } from "./Pages/SauhardyaPage";
import { FestivalSectionPage } from "./Pages/FestivalSectionPage";
import { Footer } from "./components/Footer";

function App() {
  useEffect(() => {
    const handler = () => {
      const hero = document.getElementById("home-hero");
      if (hero) hero.style.display = "block";
    };
    window.addEventListener("explosion-complete", handler as any);
    return () =>
      window.removeEventListener("explosion-complete", handler as any);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="relative min-h-[250vh] sm:min-h-[280vh] lg:min-h-[300vh]">
            {/* Transparent Navbar */}
            <Navbar />

            {/* Fixed cosmic background */}
            <CosmicScene />

            {/* Scrollable content overlay */}
            <div className="relative z-10">
              {/* Hero: becomes visible after explosion */}
              <section
                id="home-hero"
                style={{ display: "none" }}
                className="w-full px-6"
              >
                <div
                  className="w-full flex items-center justify-center"
                  style={{ minHeight: "calc(100vh - 64px)" }}
                >
                  <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-wider text-white mb-4">
                      URJA SANGAM
                    </h1>
                    <div className="w-28 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6" />
                    <p className="text-white/80 text-lg sm:text-xl">
                      Coming Soon...
                    </p>
                  </div>
                </div>
              </section>

              {/* Scroll sections with transparent divs */}
              <ScrollSections />
            </div>
            <div className="relative z-10 pt-24">
              <div className="h-screen w-full flex items-center justify-center">
                <p className="text-white/80">More content coming soon...</p>
              </div>
            </div>
            <Footer brand="Urja Sangam" />
          </div>
        }
      />
      <Route path="/urjotsav" element={<UrjotsavPage />} />
      <Route path="/kaltarang" element={<KaltarangPage />} />
      <Route path="/energia" element={<EnergiaPage />} />
      <Route path="/sauhardya" element={<SauhardyaPage />} />
      <Route path=":festival/events" element={<FestivalSectionPage />} />
      <Route path=":festival/schedule" element={<FestivalSectionPage />} />
      <Route path=":festival/gallery" element={<FestivalSectionPage />} />
    </Routes>
  );
}

export default App;
