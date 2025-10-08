import { Link } from "react-router-dom";

interface FooterProps {
  brand: string; // e.g., Urja Sangam | Kaltarang | Urjotsav | Energia | Sauhardya
}

export function Footer({ brand }: FooterProps) {
  return (
    <footer className="relative z-10 w-full bg-black/60 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {/* Brand + Register */}
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
              <span>U</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold tracking-wider">
              {brand.toUpperCase()}
            </div>
          </div>
          <Link
            to="/register"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 sm:px-4 py-2 rounded-md transition text-sm sm:text-base"
          >
            REGISTER
          </Link>
        </div>

        {/* Participate */}
        <div>
          <h4 className="font-bold tracking-wider text-white/80 mb-2 sm:mb-3 text-sm sm:text-base">
            PARTICIPATE
          </h4>
          <ul className="space-y-1 sm:space-y-2 text-white/80 text-sm sm:text-base">
            <li>
              <Link to="#" className="hover:text-white">
                EVENTS PORTAL
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                JOIN THE COMMUNITY
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-bold tracking-wider text-white/80 mb-2 sm:mb-3 text-sm sm:text-base">
            EXPLORE MORE
          </h4>
          <ul className="space-y-1 sm:space-y-2 text-white/80 text-sm sm:text-base">
            <li>
              <Link to="#" className="hover:text-white">
                GALLERY
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                BROCHURE
              </Link>
            </li>
          </ul>
        </div>

        {/* Reach Out */}
        <div>
          <h4 className="font-bold tracking-wider text-white/80 mb-2 sm:mb-3 text-sm sm:text-base">
            REACH OUT TO US
          </h4>
          <ul className="space-y-1 sm:space-y-2 text-white/80 text-sm sm:text-base">
            <li>
              <Link to="#" className="hover:text-white">
                HAVE ANY QUERIES?
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                CONTACT US
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/70">
        <div>
          MADE WITH <span className="text-red-400">❤</span> BY URJA SANGAM TEAM.
        </div>
        <div>ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}
