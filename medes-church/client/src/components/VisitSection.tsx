/*
 * VisitSection — Urban Revival Design
 * Location info, map embed, contact details
 * Community image with warm overlay
 */

import { MapPin, Phone, Mail, ExternalLink, Navigation } from "lucide-react";

const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663419143126/P3xcbFesjEMNx5mGkkTWTm/medes-community-AvCzEMCA3jkvYqj5xZN4Nr.png";
const CHURCH_CENTER_URL = "https://medes.churchcenter.com";

export default function VisitSection() {
  return (
    <section id="visitanos" className="bg-[#0F0F0F] py-16 lg:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-0.5 flame-gradient" />
          <span className="text-[#FF6B35] font-['Nunito_Sans'] text-sm font-600 tracking-widest uppercase">
            Visítanos
          </span>
        </div>
        <h2 className="font-['Oswald'] font-700 text-4xl lg:text-5xl text-white uppercase tracking-tight mb-12">
          Ven y Conócenos
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Map + Address */}
          <div className="space-y-5">
            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden border border-white/8 shadow-2xl shadow-black/50 aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-74.4074!3d40.6201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b3e0c5c3c3c3%3A0x0!2s400+W+8th+St%2C+Plainfield%2C+NJ+07060!5e0!3m2!1ses!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MEDES Church Location"
              />
            </div>

            {/* Address Card */}
            <div className="bg-[#1A1A1A] rounded-xl border border-white/8 p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flame-gradient rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-900/20">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Oswald'] font-600 text-white text-lg uppercase tracking-wide mb-1">
                    Dirección
                  </h3>
                  <p className="font-['Nunito_Sans'] text-white/70 text-sm leading-relaxed">
                    400 West 8th Street<br />
                    Plainfield, NJ 07060
                  </p>
                  <a
                    href="https://maps.google.com/?q=400+W+8th+St+Plainfield+NJ+07060"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#FF6B35] font-['Nunito_Sans'] text-sm font-600 mt-3 hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Cómo llegar
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="tel:9087558460"
                className="flex items-center gap-3 bg-[#1A1A1A] rounded-xl border border-white/8 p-4 hover:border-white/15 transition-colors group"
              >
                <Phone className="w-5 h-5 text-[#FF6B35] flex-shrink-0" />
                <div>
                  <p className="font-['Nunito_Sans'] text-white/40 text-xs uppercase tracking-wide">Teléfono</p>
                  <p className="font-['Nunito_Sans'] font-600 text-white text-sm group-hover:text-[#FF6B35] transition-colors">
                    (908) 755-8460
                  </p>
                </div>
              </a>
              <a
                href="mailto:info@medeschurch.com"
                className="flex items-center gap-3 bg-[#1A1A1A] rounded-xl border border-white/8 p-4 hover:border-white/15 transition-colors group"
              >
                <Mail className="w-5 h-5 text-[#FF6B35] flex-shrink-0" />
                <div>
                  <p className="font-['Nunito_Sans'] text-white/40 text-xs uppercase tracking-wide">Email</p>
                  <p className="font-['Nunito_Sans'] font-600 text-white text-sm group-hover:text-[#FF6B35] transition-colors truncate">
                    info@medeschurch.com
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Community Image + Plan Visit CTA */}
          <div className="flex flex-col gap-5">
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50">
              <img
                src={COMMUNITY_IMG}
                alt="Comunidad MEDES Church"
                className="w-full h-72 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/70 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-['Oswald'] font-600 text-white text-2xl uppercase tracking-wide">
                  Somos una Familia
                </p>
                <p className="font-['Nunito_Sans'] text-white/70 text-sm mt-1">
                  Te esperamos con los brazos abiertos
                </p>
              </div>
            </div>

            {/* Plan Visit CTA */}
            <div className="bg-[#1A1A1A] rounded-xl border border-white/8 p-6">
              <h3 className="font-['Oswald'] font-600 text-white text-xl uppercase tracking-wide mb-3">
                Planifica tu Primera Visita
              </h3>
              <p className="font-['Nunito_Sans'] text-white/50 text-sm leading-relaxed mb-5">
                ¿Es tu primera vez? Regístrate en ChurchCenter para que podamos recibirte de la mejor manera.
              </p>
              <a
                href={`${CHURCH_CENTER_URL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg flame-gradient text-white font-['Nunito_Sans'] font-700 text-sm hover:opacity-90 transition-opacity shadow-lg shadow-orange-900/30"
              >
                Registrarme en ChurchCenter
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Pastors */}
            <div className="bg-[#1A1A1A] rounded-xl border border-white/8 p-5">
              <p className="font-['Nunito_Sans'] text-white/40 text-xs uppercase tracking-widest mb-3">Pastores</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flame-gradient rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-['Oswald'] font-700 text-sm">DE</span>
                </div>
                <div>
                  <p className="font-['Oswald'] font-600 text-white text-lg uppercase tracking-wide">
                    David & Dinorah Eghelshi
                  </p>
                  <p className="font-['Nunito_Sans'] text-white/50 text-sm">Pastores Principales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
