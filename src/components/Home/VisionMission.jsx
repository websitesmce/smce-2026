import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type"; // For letter split animation
import { CheckCircle } from "lucide-react";

import visionImage from "/src/assets/home/vision.jpeg";
import missionImage from "/src/assets/home/mission.jpeg";
import quality from "/src/assets/home/quality.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function VisionMission() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General fade-ins
      gsap.utils.toArray(".fade-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Vision letter-by-letter split + fade-in
      const split = new SplitType(".vision-text .animate-text", {
        types: "chars",
      });

      gsap.set(split.chars, { opacity: 0.3 });

      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".vision-text",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const missionPoints = [
    "Provide Outcome-Based Quality Technical Education with civic sense by well-qualified and committed faculty.",
    "Manoeuvre human, financial and technological resources to support student-centric academics.",
    "Impart skills necessary to make students globally employable through contemporary teaching methodologies.",
    "Empower aspirants of higher education with appropriate abilities.",
    "Establish and maintain strong relations with industry, alumni, and academia.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 sm:px-12 md:px-20 py-24"
    >
      {/* About SMCE */}
      <div className="fade-in mb-20">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-amber-400"></div>
          <p className="font-semibold text-sm sm:text-base text-[#800000]">About SMCE</p>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl">
          Empowering Visionary Technocrats for a Better Tomorrow
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">
          Sri Mittapalli College of Engineering (SMCE) has always focused on holistic
          development, blending technical excellence with values, and building the
          bridge between education and industry relevance.
        </p>
      </div>

      {/* Vision */}
      <div className="fade-in relative w-full h-[70vh] mb-32 rounded-3xl overflow-hidden shadow-xl">
        <img
          src={visionImage}
          alt="Vision"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />
        <div className="vision-text relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 bg-black/50">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Vision
          </h3>
          <p className="animate-text text-white text-lg sm:text-xl md:text-3xl font-medium max-w-4xl leading-relaxed opacity-75 break-words whitespace-normal">
            To be a top-notch institute in fostering visionary ethical technocrats
            with global standards to contribute to the development of society & nation.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="fade-in grid md:grid-cols-2 gap-10 items-start mb-32">
        <div className="relative">
          <svg
            className="absolute left-4 top-0 h-full w-2 hidden sm:block"
            viewBox="0 0 10 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#800000" />
                <stop offset="100%" stopColor="#ffc107" />
              </linearGradient>
            </defs>
            <path d="M5 0 V1000" stroke="url(#grad)" strokeWidth="2" fill="none" />
          </svg>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">Mission</h3>
          <ul className="space-y-6 relative z-10">
            {missionPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-[#800000] text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-100">
          <img
            src={missionImage}
            alt="Mission"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Quality Policy */}
      <div className="fade-in flex flex-col items-center text-center">
        <div className="rounded-xl overflow-hidden shadow-lg aspect-video w-full max-w-3xl bg-gray-100 mb-6">
          <img
            src={quality}
            alt="Quality Policy"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-4">Quality Policy</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl">
            To strive relentlessly for consistent transformations, keeping in mind
            the trends of technical education through transparent and effective
            systems to meet the requirements of international accreditation bodies.
          </p>
        </div>
      </div>
    </section>
  );
}