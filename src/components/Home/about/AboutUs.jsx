import React, { useEffect, useRef, useState } from "react";
import statImage from "../../../assets/img/placeholder.jpeg"; // Replace with actual image
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  ShieldCheck,
  GraduationCap,
  CheckCircle,
  Briefcase,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tags = [
  { icon: <BadgeCheck className="w-4 h-4 text-[#800000]" />, label: "NAAC Accredited with A+" },
  { icon: <ShieldCheck className="w-4 h-4 text-[#800000]" />, label: "NBA & ISO 9001:2015 Certified" },
  { icon: <GraduationCap className="w-4 h-4 text-[#800000]" />, label: "Affiliated to JNTUK" },
  { icon: <CheckCircle className="w-4 h-4 text-[#800000]" />, label: "Approved by AICTE" },
  { icon: <Briefcase className="w-4 h-4 text-[#800000]" />, label: "100% Placement Assistance" },
];

const words = ["Confidence.", "Skill.", "Success.", "Impact."];

export default function AboutUs() {
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const index = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const typingInterval = useRef(null);
  const textRef = useRef(null);

  // Typing animation
  useEffect(() => {
    const type = () => {
      const word = words[index.current];
      if (!isDeleting.current) {
        setDisplayText(word.slice(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === word.length) {
          isDeleting.current = true;
          clearInterval(typingInterval.current);
          setTimeout(() => {
            typingInterval.current = setInterval(type, 100);
          }, 1500);
        }
      } else {
        setDisplayText(word.slice(0, charIndex.current - 1));
        charIndex.current--;
        if (charIndex.current === 0) {
          isDeleting.current = false;
          index.current = (index.current + 1) % words.length;
        }
      }
    };

    typingInterval.current = setInterval(type, 100);
    return () => clearInterval(typingInterval.current);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((prev) => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      // Fade in and parallax for images
      ["img-1", "img-3", "img-4", "img-center"].forEach((key) => {
        gsap.fromTo(
          `.${key}`,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: ".parallax-container",
              start: "top 80%",
              end: "bottom top",
              scrub: true,
            },
            duration: 1,
            ease: "power2.out",
          }
        );
      });

      // Animate text block
      gsap.from(textRef.current, {
        opacity: 0,
        y: 40,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 1,
        ease: "power3.out",
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-12 bg-white">
      {/* LEFT COLUMN */}
      <div className="p-2" ref={textRef}>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-amber-400"></div>
          <p className="font-semibold text-sm sm:text-base text-[#800000]">About us</p>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900">
          We Nurture Potential Into
        </h2>

        <div className="inline-block mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl whitespace-nowrap">
          {displayText}
          <span
            className={`inline-block w-[2px] ml-1 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: "1em", backgroundColor: "white" }}
          ></span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full"
            >
              {tag.icon}
              {tag.label}
            </span>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: "📅",
              title: "Established in 2006",
              desc: "With an aim to accomplish distinction in Engineering and Technological pursuits.",
              bg: "from-blue-600 to-blue-400",
            },
            {
              icon: "🏛️",
              title: "Autonomous Since 2023",
              desc: "NAAC A+ Grade, NBA and ISO 9001:2015 Certified. Awarded 2(f) status by UGC.",
              bg: "from-purple-600 to-indigo-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative group p-6 rounded-2xl bg-white border border-blue-100 shadow transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`absolute -top-5 left-5 bg-gradient-to-tr ${item.bg} text-white p-2 rounded-full shadow-md`}
              >
                <span className="text-sm font-bold">{item.icon}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2 mt-4">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN - PARALLAX IMAGE STACK */}
      <div className="parallax-container relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] flex items-center justify-center">
        {/* Center Image */}
        <div className="img-center z-30 w-64 h-64 sm:w-72 sm:h-72 md:w-[22rem] md:h-[22rem] bg-white rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
          <img src={statImage} alt="Center" className="w-full h-full object-cover" />
        </div>

        {/* Image 1 - Top Left */}
        <div className="img-1 absolute top-30 left-4 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white rounded-xl shadow-xl overflow-hidden z-40">
          <img src={statImage} alt="Top Left" className="w-full h-full object-cover" />
        </div>

        {/* Image 3 - Bottom Right */}
        <div className="img-3 absolute bottom-10 right-4 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-white rounded-xl shadow-xl overflow-hidden z-20">
          <img src={statImage} alt="Bottom Right" className="w-full h-full object-cover" />
        </div>

        {/* Image 4 - Bottom Left */}
        <div className="img-4 absolute bottom-20 left-6 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-xl shadow-xl overflow-hidden z-10">
          <img src={statImage} alt="Bottom Left" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}