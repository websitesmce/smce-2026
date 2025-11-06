import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  ShieldCheck,
  Globe,
  Newspaper,
  FileText,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function RecognitionsModern() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating icon animation
      gsap.utils.toArray(".float-icon").forEach((icon, i) => {
        gsap.fromTo(
          icon,
          { y: -10 },
          {
            y: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: 2 + i * 0.3,
          }
        );
      });

      // Fade-in cards
      gsap.utils.toArray(".stat-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Floating Icon Stats (top only — you’ll replace bottom cards later)
  const topIcons = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      bg: "bg-purple-600",
    },
    {
      icon: <Award className="w-5 h-5 text-white" />,
      bg: "bg-amber-500",
    },
    {
      icon: <Globe className="w-5 h-5 text-white" />,
      bg: "bg-blue-500",
    },
    {
      icon: <Newspaper className="w-5 h-5 text-white" />,
      bg: "bg-emerald-500",
    },
    {
      icon: <Award className="w-5 h-5 text-white" />,
      bg: "bg-red-600",
    },
  ];

  // Initial cards — you'll replace or extend these
  const stats = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      title: "NAAC Accredited",
      desc: "Certified by NAAC with high CGPA score.",
      link: "/assets/proofs/naac-certificate.pdf",
      bg: "bg-purple-600",
    },
    {
      icon: <Award className="w-5 h-5 text-white" />,
      title: "ISO 9001:2015",
      desc: "Quality Management System compliance.",
      link: "/assets/proofs/iso-certificate.pdf",
      bg: "bg-amber-500",
    },
    {
      icon: <Globe className="w-5 h-5 text-white" />,
      title: "UGC Autonomy",
      desc: "Recognized autonomous status by UGC.",
      link: "https://www.ugc.ac.in/autonomy/",
      bg: "bg-blue-500",
    },
    {
      icon: <Newspaper className="w-5 h-5 text-white" />,
      title: "Press Mentions",
      desc: "Featured in top regional and national media.",
      link: "https://example.com/press",
      bg: "bg-emerald-500",
    },
    {
      icon: <Award className="w-5 h-5 text-white" />,
      title: "NBA Accreditation",
      desc: "Accredited by the National Board of Accreditation.",
      link: "/assets/proofs/nba-certificate.pdf",
      bg: "bg-red-600",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 px-6 sm:px-12 md:px-20"
    >
      {/* Floating Icons */}
      <div className="relative flex justify-center gap-6 mb-12 flex-wrap">
        {topIcons.map((item, index) => (
          <div
            key={index}
            className={`float-icon w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shadow-lg`}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Rankings & Recognitions
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          Acknowledged by national bodies and institutions for consistent excellence in education, governance, and infrastructure.
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {stats.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="stat-card group bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${item.bg}`}>
                {item.icon}
              </div>
              <FileText className="w-4 h-4 text-gray-400 group-hover:text-[#800000]" />
            </div>
            <h4 className="text-base font-semibold text-gray-800 mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}