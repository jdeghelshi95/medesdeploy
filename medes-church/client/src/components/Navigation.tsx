/*
 * Navigation — Urban Revival Design
 * Frosted glass sticky nav with flame gradient accents
 * ChurchCenter links integrated directly in nav
 */

import { useState, useEffect } from "react";
import { Menu, X, Heart, Calendar, Home, BookOpen, Users, MapPin } from "lucide-react";

const CHURCH_CENTER_URL = "https://medes.churchcenter.com";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Predicas", href: "#predicas" },
  { label: "Biblia", href: "#biblia" },
  { label: "Visión", href: "#vision" },
  { label: "Servicios", href: "#servicios" },
  { label: "Visitanos", href: "#visitanos" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/5 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => { e.preventDefault(); handleNavClick("#inicio"); }}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-full flame-gradient flex items-center justify-center shadow-lg shadow-orange-900/30 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 6 8 6 13C6 16.3 8.7 19 12 19C15.3 19 18 16.3 18 13C18 8 12 2 12 2ZM12 17C9.8 17 8 15.2 8 13C8 10.5 10 7.2 12 4.8C14 7.2 16 10.5 16 13C16 15.2 14.2 17 12 17Z"/>
                  <path d="M12 9C12 9 9 12 9 14C9 15.7 10.3 17 12 17C13.7 17 15 15.7 15 14C15 12 12 9 12 9Z" opacity="0.6"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-['Oswald'] font-700 text-xl tracking-wider uppercase">MEDES</span>
                <span className="text-white/50 font-['Nunito_Sans'] text-xs tracking-widest uppercase ml-1.5">Church</span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-white/70 hover:text-white font-['Nunito_Sans'] text-sm font-600 tracking-wide uppercase transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 flame-gradient group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`${CHURCH_CENTER_URL}/registrations`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-['Nunito_Sans'] font-600 transition-colors px-3 py-1.5 rounded border border-white/10 hover:border-white/30"
              >
                <Calendar className="w-3.5 h-3.5" />
                Eventos
              </a>
              <a
                href={`${CHURCH_CENTER_URL}/giving`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white text-sm font-['Nunito_Sans'] font-600 px-4 py-2 rounded flame-gradient hover:opacity-90 transition-opacity shadow-lg shadow-orange-900/30"
              >
                <Heart className="w-3.5 h-3.5" />
                Ofrendar
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#0F0F0F]/95 backdrop-blur-lg" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-16 left-0 right-0 bg-[#141414] border-b border-white/10 transition-transform duration-300 ${
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="container py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-white/80 hover:text-white font-['Nunito_Sans'] text-base font-600 py-3 px-2 border-b border-white/5 hover:pl-4 transition-all uppercase tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 mt-4 pt-2">
              <a
                href={`${CHURCH_CENTER_URL}/registrations`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 text-white/80 text-sm font-['Nunito_Sans'] font-600 py-3 rounded border border-white/20 hover:border-white/40 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Eventos
              </a>
              <a
                href={`${CHURCH_CENTER_URL}/giving`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-['Nunito_Sans'] font-600 py-3 rounded flame-gradient"
              >
                <Heart className="w-4 h-4" />
                Ofrendar
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
