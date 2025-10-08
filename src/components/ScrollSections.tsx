import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ScrollSection {
  id: string;
  title: string;
  direction: "bottom" | "left" | "right";
  visible: boolean;
  colors: string[];
  stoneCount: number;
}

export function ScrollSections() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<ScrollSection[]>([
    // First row
    {
      id: "urjotsav",
      title: "Urjotsav",
      direction: "left",
      visible: false,
      colors: ["#44ff44", "#ffff44"], // Green and Yellow stones
      stoneCount: 2,
    },
    {
      id: "kaltarang",
      title: "Kaltarang",
      direction: "right",
      visible: false,
      colors: ["#ff4444", "#4444ff"], // Red and Blue stones
      stoneCount: 2,
    },
    // Second row
    {
      id: "energia",
      title: "Energia",
      direction: "left",
      visible: false,
      colors: ["#ff44ff"], // Magenta stone
      stoneCount: 1,
    },
    {
      id: "sauhardya",
      title: "Sauhardya",
      direction: "right",
      visible: false,
      colors: ["#ff8844"], // Orange stone
      stoneCount: 1,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Reveal as soon as the second screen begins to enter (~70% of first screen scrolled)
      const triggerPoint = windowHeight * 0.7;

      setSections((prevSections) =>
        prevSections.map((section) => ({
          ...section,
          visible: scrollY >= triggerPoint,
        }))
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true } as any);
    // Run once on mount to set initial state if user is already scrolled
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll as any);
  }, []);

  const getTransformClass = (section: ScrollSection) => {
    if (!section.visible) {
      switch (section.direction) {
        case "bottom":
          return "translate-y-full opacity-0";
        case "left":
          return "-translate-x-full opacity-0";
        case "right":
          return "translate-x-full opacity-0";
        default:
          return "opacity-0";
      }
    }
    return "translate-x-0 translate-y-0 opacity-100";
  };

  const getStonePositions = (stoneCount: number) => {
    if (stoneCount === 1) {
      return [{ left: "50%", bottom: "-12%", transform: "translateX(-50%)" }];
    } else {
      return [
        { left: "30%", bottom: "-12%" },
        { right: "30%", bottom: "-12%" },
      ];
    }
  };

  const handleCardClick = (festivalId: string) => {
    navigate(`/${festivalId}`);
  };

  // Split sections into two rows
  const firstRow = sections.slice(0, 2);
  const secondRow = sections.slice(2, 4);

  const renderRow = (rowSections: ScrollSection[]) => (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-16 w-full max-w-7xl px-4 sm:px-6 md:px-8">
      {rowSections.map((section) => (
        <div key={section.id} className="relative">
          {/* Main transparent div */}
          <div
            onClick={() => handleCardClick(section.id)}
            className={`
              relative w-[85vw] max-w-[320px] sm:max-w-[340px] md:w-72 md:max-w-none lg:w-80 xl:w-96
              h-44 sm:h-48 md:h-56 lg:h-60 xl:h-64
              bg-white/10 backdrop-blur-md
              border border-white/20
              rounded-xl md:rounded-2xl shadow-2xl
              transition-all duration-1000 ease-out
              hover:bg-white/15 hover:border-white/30 hover:scale-105
              cursor-pointer
              ${getTransformClass(section)}
            `}
          >
            {/* Content */}
            <div className="flex flex-col items-center justify-center h-full p-4 sm:p-5 md:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-wider text-center">
                {section.title}
              </h2>
              <div className="w-10 sm:w-12 md:w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-2 sm:mb-3 md:mb-4"></div>
              <p className="text-white/80 text-center text-sm sm:text-base md:text-lg">
                Coming Soon
              </p>
            </div>

            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-sm -z-10"></div>
          </div>

          {/* Floating stones */}
          {getStonePositions(section.stoneCount).map((position, stoneIndex) => (
            <div
              key={stoneIndex}
              className={`
                absolute w-5 sm:w-6 md:w-7 lg:w-7 xl:w-8
                h-5 sm:h-6 md:h-7 lg:h-7 xl:h-8
                rounded-full shadow-lg
                transition-all duration-1000 ease-out delay-300
                ${
                  section.visible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50"
                }
              `}
              style={{
                ...position,
                background: `radial-gradient(circle, ${
                  section.colors[stoneIndex] || section.colors[0]
                }, ${section.colors[stoneIndex] || section.colors[0]}88)`,
                boxShadow: `0 0 20px ${
                  section.colors[stoneIndex] || section.colors[0]
                }88, 0 0 40px ${
                  section.colors[stoneIndex] || section.colors[0]
                }44`,
                animation: section.visible
                  ? `float-stone-${stoneIndex} 3s ease-in-out infinite`
                  : "none",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative">
      {/* Container for both rows */}
      <div className="min-h-screen w-full relative flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-14 lg:gap-20 py-6 sm:py-8 md:py-16">
        {/* First Row */}
        {renderRow(firstRow)}

        {/* Second Row */}
        {renderRow(secondRow)}
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float-stone-0 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) translateX(5px) scale(1.1);
          }
        }
        @keyframes float-stone-1 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) translateX(-5px) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
