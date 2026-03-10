/*
 * HeroSection — Urban Revival Design
 * Full-bleed cinematic hero with left-aligned typography
 * Dark overlay on worship image, flame gradient CTA
 */

import { ChevronDown, Play, MapPin } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663419143126/P3xcbFesjEMNx5mGkkTWTm/medes-hero-bg-8i4rjqMQ9sLcMmxQ79njdF.webp";
const CHURCH_CENTER_URL = "https://medes.churchcenter.com";

export default function HeroSection() {
  const scrollToVideos = () => {
    const el = document.querySelector("#predicas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-[#0F0F0F]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container pb-20 pt-32">
        <div className="max-w-3xl">
          {/* Location tag */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-px flame-gradient" />
            <span className="flex items-center gap-1.5 text-white/60 font-['Nunito_Sans'] text-sm tracking-widest uppercase">
              <MapPin className="w-3.5 h-3.5" />
              Plainfield, NJ
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-['Oswald'] font-700 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white uppercase leading-none tracking-tight mb-2">
            MEDES
          </h1>
          <h2 className="font-['Oswald'] font-400 text-3xl sm:text-4xl lg:text-5xl text-white/80 uppercase tracking-widest mb-6">
            Church
          </h2>

          {/* Tagline */}
          <p className="font-['Nunito_Sans'] text-white/70 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed">
            Misión Evangélica Del Espíritu Santo — Ganando Plainfield, NJ y el mundo para Cristo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToVideos}
              className="flex items-center gap-3 text-white font-['Nunito_Sans'] font-700 text-base px-7 py-3.5 rounded flame-gradient hover:opacity-90 transition-opacity shadow-xl shadow-orange-900/40 group"
            >
              <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              Ver Predicas
            </button>
            <a
              href={`${CHURCH_CENTER_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white font-['Nunito_Sans'] font-600 text-base px-7 py-3.5 rounded border border-white/25 hover:border-white/50 hover:bg-white/5 transition-all"
            >
              Planifica tu Visita
            </a>
          </div>

          {/* Service times quick bar */}
          <div className="mt-12 flex flex-wrap gap-3">
            {[
              { day: "Dom", time: "8:30 AM · 11:00 AM · 5:00 PM" },
              { day: "Sáb", time: "7:00 PM" },
              { day: "Vie", time: "7:30 PM Jóvenes" },
            ].map((s) => (
              <div
                key={s.day}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded px-3 py-2"
              >
                <span className="text-[#FF6B35] font-['Oswald'] font-600 text-sm uppercase tracking-wide">{s.day}</span>
                <span className="text-white/60 font-['Nunito_Sans'] text-xs">{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToVideos}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
