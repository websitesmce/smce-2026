import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DirectorImage from "../../assets/board-members/director.jpg"; // update path if needed

gsap.registerPlugin(ScrollTrigger);

export default function Director() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".dir-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
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
      className="bg-white text-gray-800 px-6 mt-[70px] sm:px-10 md:px-16 lg:px-24 pt-20 pb-28 relative overflow-hidden"
    >
      {/* Heading with subtle background */}
      <div className="relative mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-1 relative z-10 dir-reveal">
          DIRECTOR
        </h2>
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <span className="text-[26vw] sm:text-[12vw] font-extrabold text-gray-400 opacity-10 tracking-wide select-none">
            DIRECTOR
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center">
        <img
          src={DirectorImage}
          alt="Director"
          className="w-44 sm:w-52 md:w-60 aspect-[3/4] mx-auto rounded-xl object-cover mb-6 dir-reveal"
        />
        <h2 className="text-xl sm:text-2xl font-semibold mt-4 dir-reveal">
          Mr. M.S. Chakravarthi
        </h2>
        <p className="text-sm text-gray-500 mb-6 dir-reveal">M.S. (USA), Director</p>

        <blockquote className="flex items-center justify-center gap-3 my-12 px-4 sm:px-10 dir-reveal">
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">“</span>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium italic text-[#800000] leading-snug max-w-3xl">
            Leaping ahead to carry out the legacy of quality education.
          </p>
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">”</span>
        </blockquote>

        <div className="mt-10 space-y-6 text-gray-700 text-sm sm:text-base text-justify max-w-3xl mx-auto">
          <p className="dir-reveal">
            Sri Mittapalli College of Engineering, with more than a decade of its existence, has contributed to technical education in a big way and is{" "}
            <span className="text-[#800000] font-medium">leaping ahead to carry out the legacy</span>.
          </p>
          <p className="dir-reveal">
            Endowed with a well-laid-out campus, experienced faculty, and a rich academic ambience, the college aims to be a{" "}
            <span className="text-[#800000] font-medium">top-ranking institution</span> in Guntur and Chilakaluripet regions. Initiatives like hobby clubs, outreach programs, and a{" "}
            <span className="text-[#800000] font-medium">disciplined student community</span> mark SMCE as a center for quality education.
          </p>
          <p className="dir-reveal">
            We strive to combine{" "}
            <span className="text-[#800000] font-medium">education with creation, dissemination, and application of knowledge</span>. Our goal is to align technical learning with{" "}
            <span className="text-[#800000] font-medium">industry-relevant skills</span> and human values that shape ethical professionals and capable leaders.
          </p>
          <p className="dir-reveal">
            I warmly welcome all students to join our journey and make SMCE{" "}
            <span className="text-[#800000] font-medium">a place to grow, learn, and succeed</span>.
          </p>
        </div>
      </div>
    </section>
  );
}