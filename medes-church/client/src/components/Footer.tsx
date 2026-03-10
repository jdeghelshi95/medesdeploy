/*
 * Footer — Urban Revival Design
 * Dark footer with flame gradient logo, social links, ChurchCenter links
 */

import { Heart, ExternalLink, Youtube, Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

const CHURCH_CENTER_URL = "https://medes.churchcenter.com";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="container py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flame-gradient flex items-center justify-center shadow-lg shadow-orange-900/30">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 6 8 6 13C6 16.3 8.7 19 12 19C15.3 19 18 16.3 18 13C18 8 12 2 12 2ZM12 17C9.8 17 8 15.2 8 13C8 10.5 10 7.2 12 4.8C14 7.2 16 10.5 16 13C16 15.2 14.2 17 12 17Z"/>
                  <path d="M12 9C12 9 9 12 9 14C9 15.7 10.3 17 12 17C13.7 17 15 15.7 15 14C15 12 12 9 12 9Z" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <span className="font-['Oswald'] font-700 text-white text-xl tracking-wider uppercase">MEDES</span>
                <span className="font-['Nunito_Sans'] text-white/40 text-xs tracking-widest uppercase ml-1.5">Church</span>
              </div>
            </div>
            <p className="font-['Nunito_Sans'] text-white/40 text-sm leading-relaxed mb-5">
              Misión Evangélica Del Espíritu Santo — Ganando Plainfield, NJ y el mundo para Cristo.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Youtube, href: "https://www.youtube.com/@medeschurch", label: "YouTube" },
                { icon: Instagram, href: "https://www.instagram.com/medeschurch", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/medeschurch", label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-[#1A1A1A] border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 hover:bg-[#222] transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-['Oswald'] font-600 text-white text-sm uppercase tracking-widest mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Inicio", id: "#inicio" },
                { label: "Predicas", id: "#predicas" },
                { label: "Biblia RVR60", id: "#biblia" },
                { label: "Nuestra Visión", id: "#vision" },
                { label: "Servicios", id: "#servicios" },
                { label: "Visítanos", id: "#visitanos" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="font-['Nunito_Sans'] text-white/40 hover:text-white text-sm transition-colors hover:pl-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ChurchCenter */}
          <div>
            <h4 className="font-['Oswald'] font-600 text-white text-sm uppercase tracking-widest mb-5">
              ChurchCenter
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Ofrendar", href: `${CHURCH_CENTER_URL}/giving` },
                { label: "Eventos", href: `${CHURCH_CENTER_URL}/registrations` },
                { label: "Grupos", href: `${CHURCH_CENTER_URL}/groups` },
                { label: "Check-In", href: `${CHURCH_CENTER_URL}/check-ins` },
                { label: "Mi Perfil", href: `${CHURCH_CENTER_URL}/people/me` },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-['Nunito_Sans'] text-white/40 hover:text-white text-sm transition-colors group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Oswald'] font-600 text-white text-sm uppercase tracking-widest mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                <span className="font-['Nunito_Sans'] text-white/40 text-sm leading-relaxed">
                  400 West 8th Street<br />
                  Plainfield, NJ 07060
                </span>
              </li>
              <li>
                <a href="tel:9087558460" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
                  <Phone className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                  <span className="font-['Nunito_Sans'] text-sm">(908) 755-8460</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@medeschurch.com" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
                  <Mail className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                  <span className="font-['Nunito_Sans'] text-sm">info@medeschurch.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Nunito_Sans'] text-white/25 text-xs">
            © {currentYear} MEDES Church — Misión Evangélica Del Espíritu Santo. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5 font-['Nunito_Sans'] text-white/25 text-xs">
            Hecho con <Heart className="w-3 h-3 text-[#FF6B35] fill-[#FF6B35]" /> para la gloria de Dios
          </p>
        </div>
      </div>
    </footer>
  );
}
