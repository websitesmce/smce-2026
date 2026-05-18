import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import tata         from "../../assets/placements/tata.png";
import tcs          from "../../assets/placements/tcs.png";
import infosys      from "../../assets/placements/infosys.png";
import wipro        from "../../assets/placements/wipro.png";
import accenture    from "../../assets/placements/accenture.png";
import capgemini    from "../../assets/placements/capgemini.png";
import ibm          from "../../assets/placements/ibm.png";
import techmahindra from "../../assets/placements/techmahindra.png";
import deloitte     from "../../assets/placements/deloitte.png";
import adp          from "../../assets/placements/adp.png";

gsap.registerPlugin(ScrollTrigger);

const recruiters = [tata, tcs, infosys, wipro, accenture, capgemini, ibm, techmahindra, deloitte, adp];

const STATS = [
  { value: "98%",   label: "Placement Rate",       color: "text-emerald-400" },
  { value: "200+",  label: "Recruiting Companies",  color: "text-blue-400" },
  { value: "5000+", label: "Students Placed",        color: "text-amber-400" },
  { value: "50+",   label: "Student Clubs",          color: "text-rose-400" },
];

export default function PlacementsCareers() {
  const sectionRef = useRef(null);
  const row1Ref    = useRef(null);
  const row2Ref    = useRef(null);

  // Marquee animation
  useEffect(() => {
    const go = (row, dir = "left") => {
      const w = row.scrollWidth / 2;
      gsap.set(row, { x: dir === "left" ? 0 : -w });
      gsap.to(row, { x: dir === "left" ? -w : 0, duration: 28, ease: "none", repeat: -1 });
    };
    go(row1Ref.current, "left");
    go(row2Ref.current, "right");
    return () => gsap.killTweensOf([row1Ref.current, row2Ref.current]);
  }, []);

  // Stats entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".pc-stat",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".pc-stats", start: "top 85%" },
        }
      );
      gsap.fromTo(".pc-heading",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".pc-heading", start: "top 88%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const logos = () =>
    recruiters.map((logo, i) => (
      <div key={i} className="flex-shrink-0 w-32 sm:w-36 h-14 flex items-center justify-center px-3">
        <img
          loading="lazy"
          src={logo}
          alt={`Recruiter ${i + 1}`}
          className="h-9 sm:h-11 object-contain grayscale hover:grayscale-0 transition duration-300"
        />
      </div>
    ));

  return (
    <section ref={sectionRef} className="overflow-hidden">

      {/* ── Dark navy stats band ─────────────────────────────────────────────── */}
      <div className="bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-12 sm:py-16">
          <div className="pc-heading flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Placements &amp; Career Outcomes
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] max-w-xl">
                Our Graduates Go On to{" "}
                <span className="text-emerald-400">Build Things That Matter</span>
              </h2>
            </div>
            <p className="text-white/50 text-base leading-relaxed max-w-xs">
              A dedicated Training &amp; Placement Cell and 200+ company partnerships
              ensure our students launch careers at the world&apos;s best.
            </p>
          </div>

          {/* Stats row */}
          <div className="pc-stats grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {STATS.map((s, i) => (
              <div key={i} className="pc-stat bg-[#0f172a] px-6 py-6 text-center">
                <p className={`text-3xl sm:text-4xl font-extrabold leading-none ${s.color}`}>
                  {s.value}
                </p>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recruiter logos — white section ──────────────────────────────────── */}
      <div className="bg-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 mb-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
            200+ Companies That Trust Our Graduates
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div ref={row1Ref} className="flex w-max mb-5">
            {logos()}{logos()}
          </div>
          <div ref={row2Ref} className="flex w-max">
            {logos()}{logos()}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/career-support"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-sm font-semibold px-7 py-3 rounded-full transition-all duration-200"
          >
            Career Support &amp; Placement Cell
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
