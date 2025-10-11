import { Link } from "react-router-dom";

interface FooterProps {
  brand: string;
}

export function Footer({ brand }: FooterProps) {
  // 👇 Stone color conditions for different festivals
  const isUrjotsav = brand === "Urjotsav"; // Space Stone - Bluish
  const isEnergia = brand === "Energia"; // Power Stone - Purple
  const isSauhardya = brand === "Sauhardya"; // Soul Stone - Orange
  const isKaltarang = brand === "Kaltarang"; // Reality Stone - Reddish

  // 👇 Get stone colors based on current festival
  const getStoneColors = () => {
    if (isUrjotsav) {
      return {
        primary: "from-cyan-400 to-blue-600",
        secondary: "from-cyan-500 to-blue-600",
        hover: "from-cyan-600 to-blue-700",
        border: "border-blue-500/30",
        shadow: "shadow-blue-500/20",
        textGlow: "0 0 4px rgba(0, 191, 255, 0.7)",
        hoverEffect: "hover:drop-shadow-[0_0_4px_#00BFFF]",
        heartColor: "text-blue-400",
      };
    } else if (isEnergia) {
      return {
        primary: "from-purple-400 to-purple-600",
        secondary: "from-purple-500 to-purple-600",
        hover: "from-purple-600 to-purple-700",
        border: "border-purple-500/30",
        shadow: "shadow-purple-500/20",
        textGlow: "0 0 4px rgba(147, 51, 234, 0.7)",
        hoverEffect: "hover:drop-shadow-[0_0_4px_#9333EA]",
        heartColor: "text-purple-400",
      };
    } else if (isSauhardya) {
      return {
        primary: "from-orange-400 to-orange-600",
        secondary: "from-orange-500 to-orange-600",
        hover: "from-orange-600 to-orange-700",
        border: "border-orange-500/30",
        shadow: "shadow-orange-500/20",
        textGlow: "0 0 4px rgba(251, 146, 60, 0.7)",
        hoverEffect: "hover:drop-shadow-[0_0_4px_#FB923C]",
        heartColor: "text-orange-400",
      };
    } else if (isKaltarang) {
      return {
        primary: "from-red-400 to-red-600",
        secondary: "from-red-500 to-red-600",
        hover: "from-red-600 to-red-700",
        border: "border-red-500/30",
        shadow: "shadow-red-500/20",
        textGlow: "0 0 4px rgba(239, 68, 68, 0.7)",
        hoverEffect: "hover:drop-shadow-[0_0_4px_#EF4444]",
        heartColor: "text-red-400",
      };
    } else {
      // Default URJA SANGAM colors
      return {
        primary: "from-orange-400 to-red-500",
        secondary: "from-orange-500 to-red-500",
        hover: "from-orange-600 to-red-600",
        border: "border-white/10",
        shadow: "shadow-white/10",
        textGlow: "none",
        hoverEffect: "hover:text-white",
        heartColor: "text-red-400",
      };
    }
  };

  const stoneColors = getStoneColors();

  return (
    <footer
      // 👇 Dynamic styling for the main footer container based on stone
      className={`relative z-10 w-full text-white ${
        isUrjotsav || isEnergia || isSauhardya || isKaltarang
          ? `bg-black/30 backdrop-blur-md border-t ${stoneColors.border} shadow-lg ${stoneColors.shadow}`
          : "bg-black/60 border-t border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand + Register */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {/* 👇 Dynamic gradient for the logo based on stone */}
            <div
              className={`w-8 h-8 bg-gradient-to-br ${
                isUrjotsav || isEnergia || isSauhardya || isKaltarang
                  ? stoneColors.primary
                  : "from-orange-400 to-red-500"
              } rounded-full flex items-center justify-center font-bold`}
            >
              <span>{brand.charAt(0)}</span>
            </div>
            <div
              className="text-xl font-extrabold tracking-wider"
              // 👇 Dynamic font and glow for the brand name based on stone
              style={{
                fontFamily:
                  isUrjotsav || isEnergia || isSauhardya || isKaltarang
                    ? "'Times New Roman', Times, serif"
                    : "inherit",
                textShadow:
                  isUrjotsav || isEnergia || isSauhardya || isKaltarang
                    ? stoneColors.textGlow
                    : "none",
              }}
            >
              {brand.toUpperCase()}
            </div>
          </div>
          {/* 👇 Dynamic styling for the register button based on stone */}
          <Link
            to="/register"
            className={`inline-block font-semibold px-4 py-2 rounded-md transition ${
              isUrjotsav || isEnergia || isSauhardya || isKaltarang
                ? `bg-gradient-to-r ${stoneColors.secondary} text-white hover:${stoneColors.hover} transform hover:scale-105`
                : "bg-yellow-500 hover:bg-yellow-600 text-black"
            }`}
          >
            REGISTER
          </Link>
        </div>

        {/* Link Sections */}
        {[
          {
            title: "PARTICIPATE",
            links: [
              { name: "EVENTS PORTAL", href: "#" },
              { name: "JOIN THE COMMUNITY", href: "#" },
            ],
          },
          {
            title: "EXPLORE MORE",
            links: [
              { name: "GALLERY", href: "#" },
              { name: "BROCHURE", href: "#" },
            ],
          },
          {
            title: "REACH OUT TO US",
            links: [
              { name: "HAVE ANY QUERIES?", href: "#" },
              { name: "CONTACT US", href: "#" },
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4
              className="font-bold tracking-wider text-white/80 mb-3"
              style={{
                fontFamily:
                  isUrjotsav || isEnergia || isSauhardya || isKaltarang
                    ? "'Times New Roman', Times, serif"
                    : "inherit",
              }}
            >
              {section.title}
            </h4>
            <ul className="space-y-2 text-white/80">
              {section.links.map((link) => (
                <li key={link.name}>
                  {/* 👇 Dynamic hover effect for links based on stone */}
                  <Link
                    to={link.href}
                    className={`transition-all duration-300 ${
                      isUrjotsav || isEnergia || isSauhardya || isKaltarang
                        ? stoneColors.hoverEffect
                        : "hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 pb-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70">
        <div className="mb-2 sm:mb-0">
          MADE WITH <span className={stoneColors.heartColor}>❤</span> BY URJA
          SANGAM TEAM.
        </div>
        <div>ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}
