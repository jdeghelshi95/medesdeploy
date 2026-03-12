/*
 * Navigation — Urban Revival Design
 * Frosted glass sticky nav with flame gradient accents
 * ChurchCenter links integrated directly in nav
 */

import { useState, useEffect } from "react";
import medesLogo from "../assets/MEDES 2019.PNG";
import { Menu, X, Heart, Calendar, Home, BookOpen, Users, MapPin } from "lucide-react";

const CHURCH_CENTER_URL = "https://medes.churchcenter.com";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Predicas", href: "#predicas" },
  { label: "Visión", href: "#vision" },
  { label: "Servicios", href: "#servicios" },
  { label: "Visitanos", href: "#visitanos" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#inicio");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`#${id}`);
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
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
              className="flex items-center group"
            >
              <img
                src={medesLogo}
                alt="MEDES Church"
                className="h-12 w-auto group-hover:scale-105 transition-transform"
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`font-['Nunito_Sans'] text-sm font-600 tracking-wide uppercase transition-colors relative group ${
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 transition-all duration-300 ${
                        isActive
                          ? "w-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]"
                          : "w-0 flame-gradient group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
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
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`font-['Nunito_Sans'] text-base font-600 py-3 px-2 border-b border-white/5 hover:pl-4 transition-all uppercase tracking-wide ${
                    isActive ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" />
                    )}
                  </span>
                </a>
              );
            })}
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
