/*
 * ServicesSection — Urban Revival Design
 * Service schedule with ChurchCenter deep links
 * Clean dark cards with flame accents
 */

import { Calendar, Clock, ExternalLink, Users, Heart, Home, CheckSquare } from "lucide-react";

const CHURCH_CENTER_URL = "https://medes.churchcenter.com";

const services = [
  {
    day: "Domingo",
    abbrev: "DOM",
    services: [
      { name: "8:30 AM", time: "8:30 AM", type: "" },
      { name: "11:00 AM", time: "11:00 AM", type: "" },
      { name: "2:00 PM", time: "2:00 PM", type: "" },
    ],
  },
  {
    day: "Lunes",
    abbrev: "LUN",
    services: [
      { name: "Servicio de Oración", time: "7:30 PM", type: "Oración" },
    ],
  },
  {
    day: "Viernes",
    abbrev: "VIE",
    services: [
      { name: "Servicio de Jóvenes", time: "7:30 PM", type: "Jóvenes" },
    ],
  },
  {
    day: "Sábado",
    abbrev: "SÁB",
    services: [
      { name: "Servicio General", time: "7:00 PM", type: "General" },
    ],
  },
];

const churchCenterLinks = [
  {
    icon: Calendar,
    label: "Eventos",
    desc: "Próximos eventos de la iglesia",
    href: `${CHURCH_CENTER_URL}/registrations`,
    color: "text-blue-400",
  },
  {
    icon: Heart,
    label: "Ofrendar",
    desc: "Da en línea de forma segura",
    href: `${CHURCH_CENTER_URL}/giving`,
    color: "text-[#FF6B35]",
  },
  {
    icon: Users,
    label: "Grupos",
    desc: "Únete a un grupo de la iglesia",
    href: `${CHURCH_CENTER_URL}/groups`,
    color: "text-green-400",
  },
  {
    icon: CheckSquare,
    label: "Check-In",
    desc: "Registro de asistencia",
    href: `${CHURCH_CENTER_URL}/check-ins`,
    color: "text-purple-400",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="bg-[#111111] py-16 lg:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-0.5 flame-gradient" />
          <span className="text-[#FF6B35] font-['Nunito_Sans'] text-sm font-600 tracking-widest uppercase">
            Horarios & Servicios
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
          <h2 className="font-['Oswald'] font-700 text-4xl lg:text-5xl text-white uppercase tracking-tight">
            Únete a Nosotros
          </h2>
          <a
            href={`${CHURCH_CENTER_URL}/registrations`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-['Nunito_Sans'] font-600 text-sm px-5 py-2.5 rounded flame-gradient hover:opacity-90 transition-opacity w-fit"
          >
            Registrarse en ChurchCenter
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Schedule */}
          <div className="space-y-4">
            {services.map((day) => (
              <div
                key={day.day}
                className="bg-[#1A1A1A] rounded-xl border border-white/8 overflow-hidden hover:border-white/15 transition-colors"
              >
                <div className="flex items-center gap-4 px-5 py-4 border-b border-white/5">
                  <div className="w-12 h-12 flame-gradient rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-900/20">
                    <span className="font-['Oswald'] font-700 text-white text-xs tracking-wider">{day.abbrev}</span>
                  </div>
                  <span className="font-['Oswald'] font-600 text-white text-xl uppercase tracking-wide">{day.day}</span>
                </div>
                <div className="divide-y divide-white/5">
                  {day.services.map((svc) => (
                    <div key={svc.name} className="flex items-center justify-between px-5 py-3.5">
                      <div>
                        {svc.type && <p className="font-['Nunito_Sans'] font-600 text-white text-sm">{svc.name}</p>}
                        {svc.type && <p className="font-['Nunito_Sans'] text-white/40 text-xs mt-0.5">{svc.type}</p>}
                      </div>
                      <div className="flex items-center gap-1.5 text-[#FF6B35] font-['Oswald'] font-500 text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {svc.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: ChurchCenter Integration */}
          <div className="flex flex-col gap-4">
            {/* ChurchCenter Banner */}
            <div className="bg-[#1A1A1A] rounded-xl border border-white/8 p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                    <circle cx="20" cy="20" r="20" fill="#FF6B35" opacity="0.15"/>
                    <path d="M20 8C13.4 8 8 13.4 8 20C8 26.6 13.4 32 20 32C26.6 32 32 26.6 32 20C32 13.4 26.6 8 20 8ZM20 28C15.6 28 12 24.4 12 20C12 15.6 15.6 12 20 12C24.4 12 28 15.6 28 20C28 24.4 24.4 28 20 28Z" fill="#FF6B35"/>
                    <circle cx="20" cy="20" r="4" fill="#FF6B35"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-['Oswald'] font-600 text-white text-xl uppercase tracking-wide">ChurchCenter</h3>
                  <p className="font-['Nunito_Sans'] text-white/50 text-sm mt-1">
                    Tu portal para conectarte con MEDES Church en línea
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {churchCenterLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-2 p-4 bg-[#222] rounded-lg border border-white/5 hover:border-white/15 hover:bg-[#252525] transition-all group"
                  >
                    <link.icon className={`w-5 h-5 ${link.color}`} />
                    <div>
                      <p className="font-['Nunito_Sans'] font-700 text-white text-sm">{link.label}</p>
                      <p className="font-['Nunito_Sans'] text-white/40 text-xs mt-0.5 leading-tight">{link.desc}</p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors self-end" />
                  </a>
                ))}
              </div>

              <a
                href={CHURCH_CENTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-[#FF6B35]/30 text-[#FF6B35] font-['Nunito_Sans'] font-600 text-sm hover:bg-[#FF6B35]/10 transition-colors"
              >
                Abrir ChurchCenter
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* App Download */}
            <div className="bg-[#1A1A1A] rounded-xl border border-white/8 p-5">
              <h4 className="font-['Oswald'] font-600 text-white text-base uppercase tracking-wide mb-2">
                Descarga la App
              </h4>
              <p className="font-['Nunito_Sans'] text-white/50 text-sm mb-4">
                Accede a eventos, diezmos, grupos y más desde tu teléfono.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://apps.apple.com/app/church-center-app/id1357742931"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#222] border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-white/20 transition-all text-sm font-['Nunito_Sans'] font-600"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.ministrycentered.churchcenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#222] border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-white/20 transition-all text-sm font-['Nunito_Sans'] font-600"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M3.18 23.76c.3.17.64.24.99.2l12.3-7.1-2.68-2.68-10.61 9.58zM20.7 10.06l-2.78-1.6-3.02 3.02 3.02 3.02 2.8-1.62c.8-.46.8-1.36-.02-1.82zM2.18.25C1.8.46 1.5.9 1.5 1.5v21c0 .6.3 1.04.68 1.25l12.3-11.25L2.18.25zM16.47 9.34L4.17 2.24l10.61 9.58 1.69-2.48z"/></svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
