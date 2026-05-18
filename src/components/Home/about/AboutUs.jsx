import React, { useEffect, useRef, useState } from "react";
import statImage1 from "../../../assets/home/1.jpeg";
import statImage2 from "../../../assets/home/2.jpeg";
import statImage3 from "../../../assets/home/3.jpeg";
import aboutBg    from "../../../assets/img/about-us-bg.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck, ShieldCheck, GraduationCap,
  CheckCircle, Briefcase, CalendarDays, University,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tags = [
  { icon: <BadgeCheck  className="w-3.5 h-3.5 text-[#800000]" />, label: "NAAC A+" },
  { icon: <ShieldCheck className="w-3.5 h-3.5 text-[#800000]" />, label: "NBA Accredited" },
  { icon: <ShieldCheck className="w-3.5 h-3.5 text-[#800000]" />, label: "ISO 9001:2015" },
  { icon: <GraduationCap className="w-3.5 h-3.5 text-[#800000]" />, label: "Affiliated to JNTUK" },
  { icon: <CheckCircle className="w-3.5 h-3.5 text-[#800000]" />, label: "AICTE Approved" },
  { icon: <Briefcase   className="w-3.5 h-3.5 text-[#800000]" />, label: "100% Placement" },
];

const statCards = [
  {
    icon: <CalendarDays className="w-5 h-5 text-amber-400" />,
    title: "Established 2006",
    desc: "Building engineers for two decades with distinction in technology and innovation.",
    border: "border-amber-200",
    iconBg: "bg-amber-50",
  },
  {
    icon: <University className="w-5 h-5 text-blue-500" />,
    title: "Autonomous Since 2023",
    desc: "NAAC A+, NBA & ISO certified — academically independent under JNTUK.",
    border: "border-blue-100",
    iconBg: "bg-blue-50",
  },
];

const words = ["Confidence.", "Skill.", "Success.", "Impact."];

export default function AboutUs() {
  const [displayText, setDisplayText]     = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const wordIdx    = useRef(0);
  const charIndex  = useRef(0);
  const isDeleting = useRef(false);
  const intervalRef = useRef(null);
  const textRef = useRef(null);

  // ── Typing animation ─────────────────────────────────────────────────────
  useEffect(() => {
    const type = () => {
      const word = words[wordIdx.current];
      if (!isDeleting.current) {
        setDisplayText(word.slice(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === word.length) {
          isDeleting.current = true;
          clearInterval(intervalRef.current);
          setTimeout(() => { intervalRef.current = setInterval(type, 80); }, 1400);
        }
      } else {
        setDisplayText(word.slice(0, charIndex.current - 1));
        charIndex.current--;
        if (charIndex.current === 0) {
          isDeleting.current = false;
          wordIdx.current = (wordIdx.current + 1) % words.length;
        }
      }
    };
    intervalRef.current = setInterval(type, 80);
    return () => clearInterval(intervalRef.current);
  }, []);

  // ── Cursor blink ─────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  // ── Scroll entrance ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0, y: 40, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="about-section relative bg-cover bg-center py-14 sm:py-20 overflow-hidden"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      {/* Subtle white overlay so text stays readable over texture */}
      <div className="absolute inset-0 bg-white/80" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-20">

          {/* ── Left column ──────────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-5" ref={textRef}>

            {/* Label */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-xs font-bold text-[#800000] uppercase tracking-widest">About Us</p>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1]">
              We Nurture Potential Into
            </h2>

            {/* Typing animation */}
            <div className="inline-flex items-center bg-gradient-to-r from-[#800000] to-[#4a0000] text-white font-extrabold text-2xl sm:text-3xl md:text-4xl px-5 py-2.5 rounded-xl self-start">
              {displayText || " "}
              <span
                className={`inline-block w-[2px] ml-1.5 bg-white ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                style={{ height: "1em" }}
              />
            </div>

            {/* Credential tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm"
                >
                  {tag.icon}
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Stat cards — horizontal side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {statCards.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-4 items-start bg-white border ${item.border} rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <div className={`shrink-0 w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center mt-0.5`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — images ─────────────────────────────────────── */}
          <div className="flex-1 flex items-center justify-center w-full">

            {/* Desktop: 3-image collage */}
            <div className="hidden xl:flex items-center justify-center relative w-full min-h-[480px]">
              {/* Left smaller */}
              <div
                                className="absolute left-0 top-[12%] w-40 rounded-2xl overflow-hidden shadow-xl border-[3px] border-white z-20 hover:saturate-100 saturate-75 transition-all cursor-pointer"
              >
                <img src={statImage1} alt="Campus" loading="lazy" className="w-full h-auto object-cover" />
              </div>

              {/* Center main */}
              <div
                                className="relative z-10 w-72 sm:w-80 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white hover:saturate-100 saturate-75 transition-all cursor-pointer"
              >
                <img src={statImage2} alt="Students" loading="lazy" className="w-full h-auto object-cover" />

                {/* Floating stats badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0f172a]/90 backdrop-blur-sm rounded-xl px-4 py-3 grid grid-cols-3 gap-2 text-center">
                  {[
                    { v: "25+",  l: "Years",  c: "text-amber-400" },
                    { v: "98%",  l: "Placed",  c: "text-emerald-400" },
                    { v: "5K+",  l: "Alumni",  c: "text-blue-400" },
                  ].map(({ v, l, c }) => (
                    <div key={l}>
                      <p className={`text-base font-extrabold leading-none ${c}`}>{v}</p>
                      <p className="text-[9px] text-white/50 uppercase tracking-wide mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right smaller */}
              <div
                                className="absolute right-0 bottom-[10%] w-40 rounded-2xl overflow-hidden shadow-xl border-[3px] border-white z-20 hover:saturate-100 saturate-75 transition-all cursor-pointer"
              >
                <img src={statImage3} alt="Lab" loading="lazy" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Mobile / tablet: stacked images */}
            <div className="xl:hidden w-full max-w-sm mx-auto relative">
              <div
                                className="rounded-2xl overflow-hidden shadow-xl border-[3px] border-white"
              >
                <img src={statImage2} alt="Students" loading="lazy" className="w-full h-auto object-cover" />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div
                                    className="rounded-xl overflow-hidden shadow-md"
                >
                  <img src={statImage1} alt="Campus" loading="lazy" className="w-full h-32 object-cover" />
                </div>
                <div
                                    className="rounded-xl overflow-hidden shadow-md"
                >
                  <img src={statImage3} alt="Lab" loading="lazy" className="w-full h-32 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
