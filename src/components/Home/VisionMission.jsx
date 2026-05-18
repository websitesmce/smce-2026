import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import visionImage  from "/src/assets/home/vision.jpeg";
import missionImage from "/src/assets/home/mission.jpeg";

gsap.registerPlugin(ScrollTrigger);

const missionPoints = [
  "Provide outcome-based quality technical education with civic sense through well-qualified and committed faculty.",
  "Manoeuvre human, financial, and technological resources to support student-centric academics.",
  "Impart skills necessary to make students globally employable through contemporary teaching methodologies.",
  "Empower aspirants of higher education with appropriate abilities and a research-oriented mindset.",
  "Establish and maintain strong relations with industry, alumni, and academia for mutual growth.",
];

export default function VisionMission() {
  const sectionRef  = useRef(null);
  const visionBgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on vision background image
      gsap.to(visionBgRef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: ".vm-vision-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Vision content entrance
      gsap.fromTo(".vm-vision-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".vm-vision-section", start: "top 70%" },
        }
      );

      // Mission items stagger
      gsap.fromTo(".vm-point",
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".vm-mission", start: "top 80%" },
        }
      );

      // Mission image
      gsap.fromTo(".vm-mission-img",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1, scale: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".vm-mission-img", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="overflow-hidden">

      {/* ── Vision — full-bleed navy overlay + parallax bg ─────────────────── */}
      <section className="vm-vision-section relative min-h-[60vh] flex items-center justify-center overflow-hidden">

        {/* Background image with parallax */}
        <img
          ref={visionBgRef}
          src={visionImage}
          alt="SMCE Vision"
          loading="lazy"
          className="absolute inset-0 w-full h-[130%] object-cover object-center -top-[15%]"
        />

        {/* Dark navy overlay — NOT maroon (more academic, prestigious) */}
        <div className="absolute inset-0 bg-[#0f172a]/85" />
        {/* Subtle gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

        {/* Vision content */}
        <div className="vm-vision-content relative z-10 max-w-4xl mx-auto px-6 sm:px-10 md:px-16 py-20 text-center">
          <div className="flex items-center gap-2 justify-center mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Our Vision</p>
          </div>

          {/* Large opening quote */}
          <div className="text-[7rem] text-white/10 font-serif leading-none select-none -mb-6" aria-hidden="true">
            &ldquo;
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-relaxed italic max-w-3xl mx-auto">
            To be a top-notch institute in fostering visionary ethical technocrats
            with global standards, contributing to the development of society and nation.
          </p>

          <div className="text-[7rem] text-white/10 font-serif leading-none select-none mt-2 text-right" aria-hidden="true">
            &rdquo;
          </div>

          {/* Decorative line */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-white/20" />
            <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
              Sri Mittapalli College of Engineering
            </span>
            <div className="h-px w-16 bg-white/20" />
          </div>
        </div>
      </section>

      {/* ── Mission — white, clean grid ─────────────────────────────────────── */}
      <section className="vm-mission bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Left: Mission text */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <p className="text-xs font-bold text-[#800000] uppercase tracking-widest">Our Mission</p>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-8">
                What Drives Us Every Day
              </h2>

              <ol className="space-y-5">
                {missionPoints.map((point, idx) => (
                  <li key={idx} className="vm-point flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#0f172a] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{point}</p>
                  </li>
                ))}
              </ol>

              {/* Quality Policy callout */}
              <div className="mt-8 border-l-[3px] border-amber-400 bg-amber-50 rounded-r-xl px-5 py-4">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1.5">
                  Quality Policy
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To strive relentlessly for consistent transformation — keeping pace with global
                  trends in technical education through transparent and effective systems that
                  meet international accreditation standards.
                </p>
              </div>
            </div>

            {/* Right: Mission image */}
            <div
              className="vm-mission-img rounded-2xl overflow-hidden shadow-xl sticky top-24 aspect-[3/4] md:aspect-auto md:min-h-[420px]"
            >
              <img
                src={missionImage}
                alt="SMCE Mission in action"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
