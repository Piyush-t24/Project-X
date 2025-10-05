import { CosmicScene } from './components/CosmicScene';
import { Navbar } from './components/Navbar';
import { ScrollSections } from './components/ScrollSections';

function App() {
  return (
    <div className="relative min-h-[300vh]">
      {/* Transparent Navbar */}
      <Navbar />
      
      {/* Fixed cosmic background */}
      <CosmicScene />
      
      {/* Scrollable content overlay */}
      <div className="relative z-10">
        {/* First screen - transparent to show animation */}
        <div className="h-screen w-full" />
        
        {/* Scroll sections with transparent divs */}
        <ScrollSections />
      </div>
    </div>
  );
}

export default App;