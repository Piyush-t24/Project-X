import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);
  const currentFestival = path.length > 0 ? path[0] : "";

  // 👇 Stone color conditions for different festivals
  const isUrjotsav = currentFestival === "urjotsav"; // Space Stone - Bluish
  const isEnergia = currentFestival === "energia"; // Power Stone - Purple
  const isSauhardya = currentFestival === "sauhardya"; // Soul Stone - Orange
  const isKaltarang = currentFestival === "kaltarang"; // Reality Stone - Reddish

  const isFestivalRoute = [
    "urjotsav",
    "kaltarang",
    "energia",
    "sauhardya",
  ].includes(currentFestival);

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
        hoverColor: "hover:text-cyan-400",
        hoverEffect: "hover:drop-shadow-[0_0_4px_#00BFFF]",
      };
    } else if (isEnergia) {
      return {
        primary: "from-purple-400 to-purple-600",
        secondary: "from-purple-500 to-purple-600",
        hover: "from-purple-600 to-purple-700",
        border: "border-purple-500/30",
        shadow: "shadow-purple-500/20",
        textGlow: "0 0 4px rgba(147, 51, 234, 0.7)",
        hoverColor: "hover:text-purple-400",
        hoverEffect: "hover:drop-shadow-[0_0_4px_#9333EA]",
      };
    } else if (isSauhardya) {
      return {
        primary: "from-orange-400 to-orange-600",
        secondary: "from-orange-500 to-orange-600",
        hover: "from-orange-600 to-orange-700",
        border: "border-orange-500/30",
        shadow: "shadow-orange-500/20",
        textGlow: "0 0 4px rgba(251, 146, 60, 0.7)",
        hoverColor: "hover:text-orange-400",
        hoverEffect: "hover:drop-shadow-[0_0_4px_#FB923C]",
      };
    } else if (isKaltarang) {
      return {
        primary: "from-red-400 to-red-600",
        secondary: "from-red-500 to-red-600",
        hover: "from-red-600 to-red-700",
        border: "border-red-500/30",
        shadow: "shadow-red-500/20",
        textGlow: "0 0 4px rgba(239, 68, 68, 0.7)",
        hoverColor: "hover:text-red-400",
        hoverEffect: "hover:drop-shadow-[0_0_4px_#EF4444]",
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
        hoverColor: "hover:text-orange-400",
        hoverEffect: "hover:bg-white/5 rounded-md",
      };
    }
  };

  const stoneColors = getStoneColors();

  const navItems = isFestivalRoute
    ? [
        { name: "HOME", href: `/${currentFestival}` },
        { name: "EVENTS", href: `/${currentFestival}/events` },
        { name: "SCHEDULE", href: `/${currentFestival}/schedule` },
        { name: "GALLERY", href: `/${currentFestival}/gallery` },
      ]
    : [
        { name: "HOME", href: "/" },
        { name: "EVENTS", href: "#events" },
        { name: "MERCHANDISE", href: "#merchandise" },
        { name: "SCHEDULE", href: "#schedule" },
        { name: "GALLERY", href: "#gallery" },
        { name: "SPONSORS", href: "#sponsors" },
        { name: "CONTACTS", href: "#contacts" },
      ];

  const brandName = isFestivalRoute
    ? currentFestival.charAt(0).toUpperCase() + currentFestival.slice(1)
    : "URJA SANGAM";

  return (
    <header
      // 👇 Dynamic border and shadow color based on stone
      className={`fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b ${
        isFestivalRoute
          ? `${stoneColors.border} shadow-lg ${stoneColors.shadow}`
          : "border-white/10"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
          >
            {/* 👇 Dynamic gradient for the logo based on stone */}
            <div
              className={`w-8 h-8 bg-gradient-to-br ${
                isFestivalRoute
                  ? stoneColors.primary
                  : "from-orange-400 to-red-500"
              } rounded-full flex items-center justify-center`}
            >
              <span
                className="text-white font-bold text-sm"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                {brandName.charAt(0)}
              </span>
            </div>
            <span
              className="text-white font-bold text-xl tracking-wide"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                // 👇 Dynamic text glow based on stone
                textShadow: isFestivalRoute ? stoneColors.textGlow : "none",
              }}
            >
              {brandName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div
              className="ml-10 flex items-baseline space-x-4"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  // 👇 Dynamic hover effect based on stone
                  className={`px-3 py-2 text-sm font-medium tracking-wider transition-all duration-300 ${
                    isFestivalRoute
                      ? `text-white/80 hover:text-white ${stoneColors.hoverEffect}`
                      : "text-white hover:text-orange-400 hover:bg-white/5 rounded-md"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Register Button */}
          <div className="hidden lg:block">
            {/* 👇 Dynamic gradient for the button based on stone */}
            <button
              className={`text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 transform hover:scale-105 shadow-lg ${
                isFestivalRoute
                  ? `bg-gradient-to-r ${stoneColors.secondary} hover:${stoneColors.hover}`
                  : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              }`}
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              REGISTER
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              // 👇 Dynamic hover color based on stone
              className={`text-white p-2 rounded-md transition-colors duration-200 ${
                isFestivalRoute
                  ? stoneColors.hoverColor
                  : "hover:text-orange-400"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className={`lg:hidden bg-black/50 backdrop-blur-lg border-t ${
            isFestivalRoute ? stoneColors.border : "border-white/10"
          }`}
        >
          <div
            className="px-2 pt-2 pb-3 space-y-1"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium tracking-wide transition-colors duration-200 rounded-md ${
                  isFestivalRoute
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-white hover:text-orange-400 hover:bg-white/5"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 px-2">
              <button
                className={`w-full text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg ${
                  isFestivalRoute
                    ? `bg-gradient-to-r ${stoneColors.secondary} hover:${stoneColors.hover}`
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                }`}
              >
                REGISTER
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
