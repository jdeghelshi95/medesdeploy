/*
 * VisionSection — Urban Revival Design
 * Full-bleed city background with vision statement overlay
 * Asymmetric layout with flame accent elements
 */

const VISION_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663419143126/P3xcbFesjEMNx5mGkkTWTm/medes-vision-bg-dZByrtgooawyVWCowwpEzQ.webp";
const WORSHIP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663419143126/P3xcbFesjEMNx5mGkkTWTm/medes_worship_leader_16_0789e541.jpg";

export default function VisionSection() {
  return (
    <section id="vision" className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${VISION_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/95 via-[#0F0F0F]/80 to-[#0F0F0F]/40" />

      <div className="relative z-10 container py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-0.5 flame-gradient" />
              <span className="text-[#FF6B35] font-['Nunito_Sans'] text-sm font-600 tracking-widest uppercase">
                Nuestra Visión
              </span>
            </div>

            <h2 className="font-['Oswald'] font-700 text-4xl lg:text-5xl xl:text-6xl text-white uppercase tracking-tight leading-tight mb-8">
              Ganando<br />
              <span className="flame-gradient-text">Plainfield</span><br />
              Para Cristo
            </h2>

            <blockquote className="border-l-2 border-[#FF6B35] pl-5 mb-8">
              <p className="font-['Crimson_Pro'] italic text-white/80 text-lg lg:text-xl leading-relaxed">
                "Misión Evangélica Del Espíritu Santo tiene como visión ganar la ciudad de Plainfield, NJ y las ciudades cercanas, en el estado de New Jersey y todos los Estados Unidos Para Cristo."
              </p>
            </blockquote>

            <p className="font-['Nunito_Sans'] text-white/60 text-base leading-relaxed mb-8">
              A través del método celular de Hechos 2:46, la gran comisión se nos hace más efectiva. Como iglesia misionera, nuestra visión es ganar Centro y Sur América para Cristo y todos los confines de la tierra (Mateo 28:18-20).
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "42K+", label: "Suscriptores" },
                { num: "3.7K", label: "Videos" },
                { num: "30+", label: "Años" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-white/5 rounded-lg border border-white/8">
                  <div className="font-['Oswald'] font-700 text-2xl flame-gradient-text mb-1">{stat.num}</div>
                  <div className="font-['Nunito_Sans'] text-white/50 text-xs uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/60">
              <img
                src={WORSHIP_IMG}
                alt="Adoración en MEDES Church"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/60 to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 flame-gradient rounded-xl opacity-20 blur-xl" />
            <div className="absolute -top-4 -right-4 w-16 h-16 flame-gradient rounded-full opacity-15 blur-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
