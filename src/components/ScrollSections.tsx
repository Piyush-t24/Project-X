import { useEffect, useState } from 'react';

interface ScrollSection {
  id: string;
  title: string;
  direction: 'bottom' | 'left' | 'right';
  visible: boolean;
  colors: string[];
}

export function ScrollSections() {
  const [sections, setSections] = useState<ScrollSection[]>([
    { 
      id: 'urjotsav', 
      title: 'Urjotsav', 
      direction: 'left', 
      visible: false,
      colors: ['#44ff44', '#ffff44'] // Green and Yellow stones
    },
    { 
      id: 'kaltarang', 
      title: 'Kaltarang', 
      direction: 'bottom', 
      visible: false,
      colors: ['#ff4444', '#4444ff'] // Red and Blue stones
    },
    { 
      id: 'energia', 
      title: 'Energia', 
      direction: 'right', 
      visible: false,
      colors: ['#ff44ff', '#ff8844'] // Magenta and Orange stones
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Start showing sections after first screen
      const triggerPoint = windowHeight;
      
      setSections(prevSections => 
        prevSections.map(section => ({
          ...section,
          visible: scrollY > triggerPoint // All appear at same time
        }))
      );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTransformClass = (section: ScrollSection) => {
    if (!section.visible) {
      switch (section.direction) {
        case 'bottom':
          return 'translate-y-full opacity-0';
        case 'left':
          return '-translate-x-full opacity-0';
        case 'right':
          return 'translate-x-full opacity-0';
        default:
          return 'opacity-0';
      }
    }
    return 'translate-x-0 translate-y-0 opacity-100';
  };

  const getStonePositions = (direction: string) => {
    switch (direction) {
      case 'bottom':
        return [
          { left: '25%', bottom: '-15%' },
          { right: '25%', bottom: '-15%' }
        ];
      case 'left':
        return [
          { left: '-15%', top: '25%' },
          { left: '-15%', bottom: '25%' }
        ];
      case 'right':
        return [
          { right: '-15%', top: '25%' },
          { right: '-15%', bottom: '25%' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="relative">
      {/* Single container for all three divs */}
      <div className="h-screen w-full relative flex items-center justify-center">
        <div className="flex items-center justify-center gap-16 w-full max-w-6xl px-8">
          {sections.map((section, index) => (
            <div key={section.id} className="relative">
              {/* Main transparent div */}
              <div
                className={`
                  relative w-80 h-60 
                  bg-white/10 backdrop-blur-md 
                  border border-white/20 
                  rounded-2xl shadow-2xl
                  transition-all duration-1000 ease-out
                  ${getTransformClass(section)}
                `}
              >
                {/* Content */}
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <h2 className="text-4xl font-bold text-white mb-4 tracking-wider">
                    {section.title}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-4"></div>
                  <p className="text-white/80 text-center text-lg">
                    Coming Soon
                  </p>
                </div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-sm -z-10"></div>
              </div>

              {/* Floating stones - same as explosion stones */}
              {getStonePositions(section.direction).map((position, stoneIndex) => (
                <div
                  key={stoneIndex}
                  className={`
                    absolute w-8 h-8 
                    rounded-full shadow-lg
                    transition-all duration-1000 ease-out delay-300
                    ${section.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                  `}
                  style={{
                    ...position,
                    background: `radial-gradient(circle, ${section.colors[stoneIndex]}, ${section.colors[stoneIndex]}88)`,
                    boxShadow: `0 0 20px ${section.colors[stoneIndex]}88, 0 0 40px ${section.colors[stoneIndex]}44`,
                    animation: section.visible ? `float-stone-${stoneIndex} 3s ease-in-out infinite` : 'none'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float-stone-0 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-10px) translateX(5px) scale(1.1); }
        }
        @keyframes float-stone-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-8px) translateX(-5px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}