import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    abbr: "NAAC",
    grade: "A+",
    title: "NAAC Accredited",
    desc: "Certified by the National Assessment and Accreditation Council with an A+ grade.",
    iconBg: "bg-violet-500",
    link: "/naac",
  },
  {
    abbr: "NBA",
    grade: null,
    title: "NBA Accreditation",
    desc: "Engineering programs accredited by the National Board of Accreditation.",
    iconBg: "bg-[#800000]",
    link: "/nba",
  },
  {
    abbr: "ISO",
    grade: "9001",
    title: "ISO 9001:2015",
    desc: "Quality Management System compliance recognised internationally.",
    iconBg: "bg-amber-500",
    link: "/iso",
  },
  {
    abbr: "UGC",
    grade: null,
    title: "UGC Autonomous",
    desc: "Recognised autonomous institution by the University Grants Commission.",
    iconBg: "bg-sky-500",
    link: "https://www.ugc.ac.in/autonomy/",
  },
  {
    abbr: "AICTE",
    grade: null,
    title: "AICTE Approved",
    desc: "All programs approved by the All India Council for Technical Education.",
    iconBg: "bg-emerald-500",
    link: "/aicte",
  },
];

const highlights = [
  { value: "A+",    label: "NAAC Grade",          color: "text-violet-400" },
  { value: "NBA",   label: "Accredited Programs",  color: "text-[#800000]" },
  { value: "UGC",   label: "Autonomous Status",   color: "text-sky-400" },
  { value: "ISO",   label: "9001:2015 Certified", color: "text-amber-400" },
];

export default function RankingsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".rk-top",
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".rk-top", start: "top 85%" },
        }
      );
      gsap.fromTo(".rk-hl",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".rk-hls", start: "top 88%" },
        }
      );
      gsap.fromTo(".rk-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".rk-grid", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0f172a] py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">

        {/* ── Heading ─────────────────────────────────────────────────────────── */}
        <div className="rk-top mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Rankings &amp; Recognitions
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1]">
              Recognised by the Best
            </h2>
            <p className="mt-3 text-white/45 text-base leading-relaxed max-w-md">
              Acknowledged by national bodies for consistent excellence in education,
              governance, research, and infrastructure.
            </p>
          </div>
        </div>

        {/* ── Key highlight numbers ─────────────────────────────────────────── */}
        <div className="rk-hls grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-10">
          {highlights.map((h, i) => (
            <div key={i} className="rk-hl bg-[#0f172a] px-6 py-5 text-center">
              <p className={`text-2xl sm:text-3xl font-extrabold leading-none ${h.color}`}>{h.value}</p>
              <p className="text-white/35 text-[11px] font-semibold uppercase tracking-widest mt-1.5">{h.label}</p>
            </div>
          ))}
        </div>

        {/* ── Credential cards ─────────────────────────────────────────────── */}
        <div className="rk-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="rk-card group flex gap-4 items-start bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/15 rounded-2xl p-5 transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <div className={`shrink-0 w-12 h-12 rounded-xl ${item.iconBg} flex flex-col items-center justify-center shadow-md`}>
                <span className="text-white text-xs font-extrabold leading-none">{item.abbr}</span>
                {item.grade && (
                  <span className="text-white/70 text-[9px] font-bold leading-none mt-0.5">{item.grade}</span>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{item.desc}</p>
              </div>

              {/* Arrow */}
              <svg className="w-4 h-4 text-white/20 group-hover:text-amber-400 shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          ))}
        </div>

        {/* ── Bottom credential text strip ──────────────────────────────────── */}
        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-wrap justify-center gap-x-8 gap-y-2">
          {["NAAC · A+ Grade", "NBA Accredited", "ISO 9001:2015", "UGC Autonomous", "AICTE Approved", "Affiliated to JNTUK"].map((l) => (
            <span key={l} className="text-[11px] font-semibold text-white/25 uppercase tracking-widest">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
