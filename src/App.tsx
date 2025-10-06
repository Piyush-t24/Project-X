import { Routes, Route } from "react-router-dom";
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
              {/* First screen - transparent to show animation */}
              <div className="h-screen w-full overflow-hidden" />

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
