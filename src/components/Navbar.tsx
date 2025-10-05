import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'EVENTS', href: '#events' },
    { name: 'MERCHANDISE', href: '#merchandise' },
    { name: 'SCHEDULE', href: '#schedule' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'SPONSORS', href: '#sponsors' },
    { name: 'CONTACTS', href: '#contacts' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">
              URJA SANGAM
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-orange-400 px-3 py-2 text-sm font-medium tracking-wider transition-colors duration-200 hover:bg-white/5 rounded-md"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Register Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 transform hover:scale-105 shadow-lg">
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
                className="text-white hover:text-orange-400 block px-3 py-2 text-base font-medium tracking-wide transition-colors duration-200 hover:bg-white/5 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-2">
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg">
                REGISTER
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}