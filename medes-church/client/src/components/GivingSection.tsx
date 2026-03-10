/*
 * GivingSection — Urban Revival Design
 * Giving CTA with ChurchCenter iframe embed option
 * Scripture quote + giving options
 */

import { Heart, ExternalLink, Shield, Repeat, Gift } from "lucide-react";

const CHURCH_CENTER_URL = "https://medes.churchcenter.com";

export default function GivingSection() {
  return (
    <section id="ofrendar" className="bg-[#111111] py-16 lg:py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 flame-gradient rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 flame-gradient rounded-full opacity-5 blur-3xl" />

      <div className="relative z-10 container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 flame-gradient" />
              <span className="text-[#FF6B35] font-['Nunito_Sans'] text-sm font-600 tracking-widest uppercase">
                Ofrendar
              </span>
              <div className="w-10 h-0.5 flame-gradient" />
            </div>
            <h2 className="font-['Oswald'] font-700 text-4xl lg:text-5xl text-white uppercase tracking-tight mb-4">
              Da con Generosidad
            </h2>
            <blockquote className="max-w-xl mx-auto">
              <p className="font-['Crimson_Pro'] italic text-white/60 text-lg leading-relaxed">
                "El que es generoso con el pobre presta al Señor, y él le pagará según su obra."
              </p>
              <cite className="text-[#FF6B35] font-['Nunito_Sans'] text-sm font-600 mt-2 block">
                — Proverbios 19:17
              </cite>
            </blockquote>
          </div>

          {/* Giving Options */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: Heart,
                title: "Una vez",
                desc: "Ofrenda única de cualquier monto",
                color: "text-[#FF6B35]",
              },
              {
                icon: Repeat,
                title: "Mensual",
                desc: "Diezmo automático mensual",
                color: "text-blue-400",
              },
              {
                icon: Gift,
                title: "Fondo Especial",
                desc: "Contribuye a proyectos específicos",
                color: "text-green-400",
              },
            ].map((opt) => (
              <a
                key={opt.title}
                href={`${CHURCH_CENTER_URL}/giving`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-[#1A1A1A] rounded-xl border border-white/8 hover:border-white/20 hover:bg-[#1E1E1E] transition-all group text-center"
              >
                <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <opt.icon className={`w-6 h-6 ${opt.color}`} />
                </div>
                <div>
                  <p className="font-['Oswald'] font-600 text-white text-lg uppercase tracking-wide">{opt.title}</p>
                  <p className="font-['Nunito_Sans'] text-white/50 text-sm mt-1">{opt.desc}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Main CTA */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/8 p-8 text-center">
            <div className="w-16 h-16 flame-gradient rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-orange-900/30">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <h3 className="font-['Oswald'] font-700 text-2xl text-white uppercase tracking-wide mb-3">
              Dar en Línea
            </h3>
            <p className="font-['Nunito_Sans'] text-white/50 text-sm mb-6 max-w-sm mx-auto">
              Tu generosidad hace posible el ministerio de MEDES Church en Plainfield y el mundo.
            </p>
            <a
              href={`${CHURCH_CENTER_URL}/giving`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl flame-gradient text-white font-['Nunito_Sans'] font-700 text-base hover:opacity-90 transition-opacity shadow-xl shadow-orange-900/30"
            >
              <Heart className="w-5 h-5 fill-white" />
              Ofrendar Ahora
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-white/30 font-['Nunito_Sans'] text-xs">
                <Shield className="w-3.5 h-3.5" />
                Pago Seguro
              </div>
              <div className="flex items-center gap-2 text-white/30 font-['Nunito_Sans'] text-xs">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                Visa / Mastercard
              </div>
              <div className="flex items-center gap-2 text-white/30 font-['Nunito_Sans'] text-xs">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                ACH / Banco
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
