import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);
  const currentFestival = path.length > 0 ? path[0] : "";
  const isFestivalRoute = [
    "urjotsav",
    "kaltarang",
    "energia",
    "sauhardya",
  ].includes(currentFestival);

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo (click to go Home) */}
          <a
            href="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-white font-bold text-base sm:text-lg md:text-xl tracking-wide">
              {isFestivalRoute
                ? currentFestival.charAt(0).toUpperCase() +
                  currentFestival.slice(1)
                : "URJA SANGAM"}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-4 md:ml-6 lg:ml-10 flex items-baseline space-x-2 md:space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-orange-400 px-2 md:px-2 lg:px-3 py-2 text-xs md:text-xs lg:text-sm font-medium tracking-wider transition-colors duration-200 hover:bg-white/5 rounded-md"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Register Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 md:px-4 lg:px-6 py-2 rounded-full text-xs md:text-xs lg:text-sm font-semibold tracking-wide transition-all duration-200 transform hover:scale-105 shadow-lg">
              REGISTER
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-400 p-2 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-md border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-orange-400 block px-3 py-2 text-sm md:text-base font-medium tracking-wide transition-colors duration-200 hover:bg-white/5 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-2">
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 md:px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg">
                REGISTER
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
