import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import img1 from "../../assets/whysmce/1.JPG";
import img2 from "../../assets/whysmce/2.JPG";
import img3 from "../../assets/whysmce/3.jpeg";
import img4 from "../../assets/whysmce/4.png";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    title: "Top Rankings",
    desc: "Recognized among the top engineering colleges for academic excellence and student outcomes.",
    img: img1,
  },
  {
    title: "Career-Focused Programs",
    desc: "Curriculum designed to align with industry needs, with real-world project exposure.",
    img: img2,
  },
  {
    title: "Industry Collaborations",
    desc: "Partnerships with leading MNCs, MoUs, and guest lectures from top professionals.",
    img: img3,
  },
  {
    title: "Campus Life & Facilities",
    desc: "A vibrant, inclusive campus with modern labs, sports, and creative spaces.",
    img: img4,
  },
];

const trustBadges = [
  "NAAC A+ Grade",
  "UGC Autonomous",
  "Affiliated to JNTUK",
  "ISO 9001:2015 Certified",
  "Placement Rate: 98%",
];

export default function WhySMCE() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16"
    >
      {/* Heading */}
      <div className="fade-in mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-amber-400"></div>
          <p className="font-semibold text-sm sm:text-base text-[#800000]">
            Why SMCE?
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl">
          We Don’t Just Educate. <br className="hidden sm:block" />
          We Empower Careers.
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">
          With top accreditations, deep industry integration, and student-first
          learning, SMCE ensures your journey from classroom to career is
          impactful.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="fade-in bg-white rounded-2xl overflow-hidden relative shadow-sm hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white text-lg font-semibold">
                  {item.title}
                </h3>
                <span className="bg-white/10 border border-white/30 text-white p-1 rounded-full transition-all group-hover:scale-110">
                  <ArrowRight size={16} />
                </span>
              </div>
              <p className="text-white text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="fade-in flex flex-wrap gap-3 justify-start items-center">
        {trustBadges.map((badge, idx) => (
          <span
            key={idx}
            className="bg-[#f8f8f8] text-[#800000] border border-[#800000] px-4 py-2 text-sm font-medium rounded-full"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}