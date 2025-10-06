import { Routes, Route } from "react-router-dom";
import { CosmicScene } from "./components/CosmicScene";
import { Navbar } from "./components/Navbar";
import { ScrollSections } from "./components/ScrollSections";
import { FestivalPage } from "./components/FestivalPage";

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
          </div>
        }
      />
      <Route
        path="/urjotsav"
        element={<FestivalPage festivalName="Urjotsav" />}
      />
      <Route
        path="/kaltarang"
        element={<FestivalPage festivalName="Kaltarang" />}
      />
      <Route
        path="/energia"
        element={<FestivalPage festivalName="Energia" />}
      />
    </Routes>
  );
}

export default App;
