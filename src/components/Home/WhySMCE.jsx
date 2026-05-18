import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../../assets/whysmce/1.JPG";
import img2 from "../../assets/whysmce/2.JPG";
import img3 from "../../assets/whysmce/3.jpeg";
import img4 from "../../assets/whysmce/4.jpeg";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "98%",  label: "Placement Rate",      color: "text-emerald-400" },
  { value: "5K+",  label: "Alumni Network",       color: "text-blue-400"   },
  { value: "200+", label: "Recruiting Companies", color: "text-amber-400"  },
  { value: "25+",  label: "Years of Excellence",  color: "text-violet-400" },
];

const CREDENTIALS = [
  "NAAC A+ Grade", "UGC Autonomous", "Affiliated to JNTUK",
  "ISO 9001:2015", "Placement Rate: 98%", "AICTE Approved",
];

function Check({ text }) {
  return (
    <li className="flex items-center gap-2 text-white/75 text-xs">
      <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  );
}

export default function WhySMCE() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(".ws-heading",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".ws-heading", start: "top 87%" } }
      );
      // Bento cards stagger
      gsap.fromTo(".ws-bento-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".ws-bento", start: "top 85%" } }
      );
      // Campus banner
      gsap.fromTo(".ws-campus",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".ws-campus", start: "top 88%" } }
      );
      // Pills
      gsap.fromTo(".ws-pill",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: ".ws-pills", start: "top 92%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">

        {/* ── Heading ────────────────────────────────────────────────────────── */}
        <div className="ws-heading mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <p className="text-xs font-bold text-[#800000] uppercase tracking-widest">Why SMCE?</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] max-w-xl">
              We Don&apos;t Just Educate.{" "}
              <span className="text-[#800000]">We Empower Careers.</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs sm:text-right">
              Top accreditations, deep industry ties, and a student-first
              approach that turns classrooms into careers.
            </p>
          </div>
        </div>

        {/* ── Bento grid ─────────────────────────────────────────────────────── */}
        <div className="ws-bento grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

          {/* ── Col 1: Accreditation image card (tall) ───────────────────────── */}
          <div className="ws-bento-card relative rounded-2xl overflow-hidden min-h-[380px] md:min-h-[520px] group">
            <img
              src={img1}
              alt="SMCE Rankings & Accreditation"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />

            {/* Floating NAAC badge */}
            <div className="absolute top-4 left-4 bg-[#800000] text-white rounded-xl px-3.5 py-2 shadow-lg">
              <p className="text-xl font-extrabold leading-none">NAAC</p>
              <p className="text-[9px] text-white/70 tracking-widest uppercase">A+ Grade</p>
            </div>

            {/* Bottom text */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-bold text-lg leading-snug mb-3">
                Nationally Ranked &amp;<br />Multiply Accredited
              </h3>
              <ul className="space-y-1.5">
                {["NAAC A+ Accreditation", "NBA Approved Programs", "ISO 9001:2015 Certified", "UGC Autonomous Status"].map((t) => (
                  <Check key={t} text={t} />
                ))}
              </ul>
            </div>
          </div>

          {/* ── Col 2: Stats card + Industry image ───────────────────────────── */}
          <div className="ws-bento-card flex flex-col gap-4">

            {/* Dark stats card */}
            <div className="bg-[#0f172a] rounded-2xl p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[10px] text-white/35 font-bold uppercase tracking-widest mb-5">
                  Why 5000+ students chose SMCE
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map(({ value, label, color }) => (
                    <div key={label} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4">
                      <p className={`text-2xl sm:text-3xl font-extrabold leading-none ${color}`}>{value}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-wide mt-1.5 leading-snug">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white/25 text-xs leading-relaxed mt-4">
                Consistent performance tracked over 25 years of academic excellence
                and industry partnerships.
              </p>
            </div>

            {/* Industry image card */}
            <div className="ws-bento-card relative rounded-2xl overflow-hidden h-44 group">
              <img
                src={img3}
                alt="Industry Collaborations"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="text-white font-bold text-base leading-snug">Industry Collaborations</h3>
                <p className="text-white/60 text-xs mt-1">MoUs, guest lectures &amp; live project exposure</p>
              </div>
            </div>
          </div>

          {/* ── Col 3: Placement image card (tall) ───────────────────────────── */}
          <div className="ws-bento-card relative rounded-2xl overflow-hidden min-h-[380px] md:min-h-[520px] group">
            <img
              src={img2}
              alt="SMCE Career Placements"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />

            {/* Floating placement badge */}
            <div className="absolute top-4 right-4 bg-white rounded-xl px-3.5 py-2 shadow-lg text-center">
              <p className="text-xl font-extrabold text-emerald-600 leading-none">98%</p>
              <p className="text-[9px] text-gray-400 tracking-widest uppercase">Placed</p>
            </div>

            {/* Bottom text */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-bold text-lg leading-snug mb-3">
                A Placement Record That<br />Speaks for Itself
              </h3>
              <ul className="space-y-1.5">
                {["98% Placement Rate", "200+ Recruiting Companies", "5000+ Students Placed", "Dedicated T&P Cell"].map((t) => (
                  <Check key={t} text={t} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Campus wide banner ────────────────────────────────────────────── */}
        <div className="ws-campus relative rounded-2xl overflow-hidden mb-10 group">
          <div className="aspect-[21/7] sm:aspect-[21/6]">
            <img
              src={img4}
              alt="SMCE Modern Campus"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-center px-7 sm:px-12">
            <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-2">Campus Life</p>
            <h3 className="text-white text-2xl sm:text-3xl font-bold leading-tight max-w-xs">
              A Campus Built for Innovation
            </h3>
            <p className="text-white/60 text-sm mt-3 max-w-sm leading-relaxed">
              Smart classrooms, advanced research labs, a sports complex,
              and high-speed campus Wi-Fi across every corner.
            </p>
          </div>
        </div>

        {/* ── Credential pills ──────────────────────────────────────────────── */}
        <div className="ws-pills border-t border-gray-100 pt-8 flex flex-wrap gap-3">
          {CREDENTIALS.map((badge) => (
            <span
              key={badge}
              className="ws-pill bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
