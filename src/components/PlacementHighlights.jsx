import React, { useState, useEffect } from "react";
import { Award, Building2, Instagram, TrendingUp } from "lucide-react";
import logo from "../assets/logo/logo.png";

import tata from "../assets/placements/tata.png";
import tcs from "../assets/placements/tcs.png";
import infosys from "../assets/placements/infosys.png";
import wipro from "../assets/placements/wipro.png";
import accenture from "../assets/placements/accenture.png";
import capgemini from "../assets/placements/capgemini.png";
import ibm from "../assets/placements/ibm.png";
import techmahindra from "../assets/placements/techmahindra.png";
import deloitte from "../assets/placements/deloitte.png";
import adp from "../assets/placements/adp.png";

const recruiters = [tata, tcs, infosys, wipro, accenture, capgemini, ibm, techmahindra, deloitte, adp];

const INSTAGRAM_URL = "https://www.instagram.com/smce_guntur";

const PLACEMENT_STATS = [
  { icon: TrendingUp, value: "12 LPA", label: "Highest Package" },
  { icon: Award, value: "98%", label: "Placement Rate" },
  { icon: Building2, value: "200+", label: "Recruiting Companies" },
];

// Images live in public/placements-gallery/ as 1.jpeg ... 29.jpeg
const GALLERY_COUNT = 29;
const galleryImages = Array.from({ length: GALLERY_COUNT }, (_, i) => `/placements-gallery/${i + 1}.jpeg`);

function FadeGallery({ images }) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(t);
  }, [images.length]);

  useEffect(() => {
    setLoaded(false);
  }, [index]);

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full max-w-lg aspect-square mx-auto rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group"
    >
      {/* Placeholder while the image loads */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
        <img src={logo} alt="SMCE" className="w-20 h-20 sm:w-24 sm:h-24 opacity-25" />
      </div>

      <img
        key={index}
        src={images[index]}
        alt={`SMCE placement moment ${index + 1}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(false);
          e.target.style.opacity = "0";
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow group-hover:bg-white transition-colors">
        <Instagram size={14} className="text-[#800000]" /> @smce_guntur
      </div>
    </a>
  );
}

export default function PlacementHighlights({ ctaHref = "#apply-form", showCta = true }) {
  return (
    <section id="placements" className="bg-gradient-to-b from-[#fff8f0] to-white py-12 sm:py-16 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#800000]/10 text-[#800000] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <Award size={14} /> Placements &amp; Career Outcomes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Our Students, <span className="text-[#800000]">Placed in Top Companies</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            A glimpse of the career outcomes SMCE graduates achieve through our dedicated
            Training &amp; Placement Cell.
          </p>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {PLACEMENT_STATS.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#800000]/10 text-[#800000] flex items-center justify-center shrink-0">
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Placement Moments fade carousel */}
        <div className="mb-12">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4 flex items-center justify-center gap-2">
            <Instagram size={16} className="text-[#800000]" /> Placement Moments
            <span className="text-[10px] font-normal normal-case text-gray-400 hidden sm:inline">
              &mdash; follow us on Instagram for more
            </span>
          </h3>
          <FadeGallery images={galleryImages} />
        </div>

        {/* Recruiters marquee */}
        <div>
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
            200+ Companies That Trust Our Graduates
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex w-max animate-marquee gap-8 sm:gap-12 items-center">
              {[...recruiters, ...recruiters].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt=""
                  loading="lazy"
                  className="h-8 sm:h-10 object-contain grayscale opacity-70"
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        {showCta && (
          <div className="text-center mt-10">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-[#800000] hover:bg-[#6a0000] text-white text-sm font-bold px-8 py-3.5 rounded-full transition-all shadow hover:shadow-lg"
            >
              Start Your Journey — Apply Now
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
