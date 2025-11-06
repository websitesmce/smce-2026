import React, { useEffect, useRef, useState } from "react";
import statImage1 from "../../../assets/home/1.jpeg";
import statImage2 from "../../../assets/home/2.jpeg";
import statImage3 from "../../../assets/home/3.jpeg";
import aboutBg from "../../../assets/img/about-us-bg.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  ShieldCheck,
  GraduationCap,
  CheckCircle,
  Briefcase,
  CalendarDays,
  University,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tags = [
  { icon: <BadgeCheck className="w-4 h-4 text-[#800000]" />, label: "NAAC Accredited with A+" },
  { icon: <ShieldCheck className="w-4 h-4 text-[#800000]" />, label: "NBA Accredited" },
  { icon: <ShieldCheck className="w-4 h-4 text-[#800000]" />, label: "ISO 9001:2015 Certified" },
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
  const imageRefs = useRef([]);

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

      // Parallax for images: side images scroll faster, center image scrolls slower
      if (imageRefs.current.length === 3) {
        // Left image (index 0) - faster
        gsap.to(imageRefs.current[0], {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: imageRefs.current[0],
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Center image (index 1) - slower
        gsap.to(imageRefs.current[1], {
          y: -15,
          ease: "none",
          scrollTrigger: {
            trigger: imageRefs.current[1],
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Right image (index 2) - faster
        gsap.to(imageRefs.current[2], {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: imageRefs.current[2],
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

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

      // Background parallax effect
      gsap.to(".about", {
        backgroundPositionY: "50%",
        ease: "none",
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="about min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 py-12 flex flex-col xl:flex-row items-center gap-12 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      {/* LEFT COLUMN & RIGHT COLUMN WRAPPED IN FLEX-COL */}
      <div className="flex flex-col xl:flex-row w-full items-center justify-center gap-8">
        {/* LEFT COLUMN */}
        <div className="p-2 flex-1 flex flex-col items-start gap-6" ref={textRef}>
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
                icon: <CalendarDays className="w-6 h-6 text-white" />,
                title: "Established in 2006",
                desc: "With an aim to accomplish distinction in Engineering and Technological pursuits.",
                bg: "from-blue-600 to-blue-400",
              },
              {
                icon: <University className="w-6 h-6 text-white" />,
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
                  className={`absolute -top-5 left-5 bg-gradient-to-tr ${item.bg} text-white p-2 rounded-full shadow-md flex items-center justify-center`}
                >
                  {item.icon}
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

        {/* IMAGES LAYOUT: one big center image with two smaller side images */}
        <div className="flex items-center justify-center flex-1 w-full max-w-4xl relative gap-6 xl:pt-0 pt-[120px]">
          {/* Left smaller image */}
          <div
            className="w-32 sm:w-40 md:w-48 rounded-2xl overflow-hidden filter saturate-[0.8] transition hover:saturate-100 cursor-pointer absolute left-0 top-[20%] md:top-[10%] xl:top-[-40%]"
            ref={(el) => (imageRefs.current[0] = el)}
          >
            <img src={statImage1} alt="Image 1" className="w-full h-auto object-cover rounded-2xl" />
          </div>

          {/* Center big image */}
          <div
            className="w-64 sm:w-80 md:w-96 rounded-3xl overflow-hidden filter saturate-[0.8] transition hover:saturate-100 cursor-pointer z-10"
            ref={(el) => (imageRefs.current[1] = el)}
          >
            <img src={statImage2} alt="Image 2" className="w-full h-auto object-cover rounded-3xl" />
          </div>

          {/* Right smaller image */}
          <div
            className="w-32 sm:w-40 md:w-48 rounded-2xl overflow-hidden filter saturate-[0.8] transition hover:saturate-100 cursor-pointer absolute right-0 top-[90%] xl:top-[90%]"
            ref={(el) => (imageRefs.current[2] = el)}
          >
            <img src={statImage3} alt="Image 3" className="w-full h-auto object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}