/**
 * CommunityGallery - Urban Revival Design
 * Real photos from MEDES Church Instagram @medeschurch
 * Asymmetric masonry-style layout with hover overlays
 * Dark charcoal base, flame gradient accents
 */

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const photos = [
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663419143126/P3xcbFesjEMNx5mGkkTWTm/medes_worship_6_31e90a70.jpg",
    caption: "Servicios Familiares",
    description: "Adoración y alabanza en comunidad",
    size: "large", // takes up 2 rows
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663419143126/P3xcbFesjEMNx5mGkkTWTm/medes_guitar_10_5075ac08.jpg",
    caption: "La Palabra",
    description: "Predicando con gozo y autoridad",
    size: "small",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663419143126/P3xcbFesjEMNx5mGkkTWTm/medes_worship_leader_16_0789e541.jpg",
    caption: "Alabanza",
    description: "Levantando voces al Señor",
    size: "small",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663419143126/P3xcbFesjEMNx5mGkkTWTm/medes_pastor_podium_17_21110649.jpg",
    caption: "Pastor David",
    description: "Ministrando con amor y gracia",
    size: "medium",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663419143126/P3xcbFesjEMNx5mGkkTWTm/medes_congregation_19_0bc21425.jpg",
    caption: "Nuestra Comunidad",
    description: "Unidos en fe y propósito",
    size: "medium",
  },
];

export default function CommunityGallery() {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-[#E8520A] uppercase mb-3">
              Comunidad
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Vida en
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8520A] to-[#FF8C42]">
                MEDES
              </span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/medeschurch/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-[#E8520A] transition-colors duration-300 group"
          >
            <Instagram size={18} />
            <span className="text-sm font-medium tracking-wide">@medeschurch</span>
            <span className="text-xs text-white/40 group-hover:text-[#E8520A]/60 transition-colors">
              ↗
            </span>
          </a>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[220px]">
          {/* Large photo - spans 2 cols and 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 row-span-2 relative overflow-hidden rounded-xl group cursor-pointer"
          >
            <img
              src={photos[0].url}
              alt={photos[0].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
              <p className="text-[#E8520A] text-xs font-bold tracking-widest uppercase mb-1">
                {photos[0].caption}
              </p>
              <p className="text-white text-sm font-medium">{photos[0].description}</p>
            </div>
            {/* Flame accent corner */}
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#E8520A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Small photos - top right */}
          {[photos[1], photos[2]].map((photo, i) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="col-span-1 row-span-1 relative overflow-hidden rounded-xl group cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-bold tracking-wide">{photo.caption}</p>
              </div>
            </motion.div>
          ))}

          {/* Medium photos - bottom right */}
          {[photos[3], photos[4]].map((photo, i) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 * (i + 1) }}
              className="col-span-1 row-span-1 relative overflow-hidden rounded-xl group cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-bold tracking-wide">{photo.caption}</p>
                <p className="text-white/70 text-xs mt-0.5">{photo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 bg-white/10" />
          <a
            href="https://www.instagram.com/medeschurch/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 border border-white/20 rounded-full text-white/60 hover:text-white hover:border-[#E8520A]/60 transition-all duration-300 text-sm font-medium"
          >
            <Instagram size={14} />
            Ver más en Instagram
          </a>
          <div className="h-px flex-1 bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
