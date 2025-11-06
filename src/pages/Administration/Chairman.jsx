import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChairmanImage from "../../assets/board-members/chairman.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Chairman() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".char-reveal").forEach((el, i) => {
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
              start: "top 97%",
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
      {/* Heading with background */}
      <div className="relative mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-1 relative z-10 char-reveal">
          CHAIRMAN
        </h2>
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <span className="text-[26vw] sm:text-[12vw] font-extrabold text-gray-400 opacity-10 tracking-wide select-none">
            CHAIRMAN
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center">
        <img
          src={ChairmanImage}
          alt="Chairman"
          className="w-44 sm:w-52 md:w-60 aspect-[3/4] mx-auto rounded-xl object-cover mb-6 char-reveal"
        />
        <h2 className="text-xl sm:text-2xl font-semibold mt-4 char-reveal">
          Sri M.V.Koteswara Rao
        </h2>
        <p className="text-sm text-gray-500 mb-6 char-reveal">
          Founder and Chairman
        </p>

        <blockquote className="flex items-center justify-center gap-3 my-12 px-4 sm:px-10 char-reveal">
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">“</span>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium italic text-[#800000] leading-snug max-w-3xl">
            Everything is possible if our determination is strong and selfless.
          </p>
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">”</span>
        </blockquote>

        <div className="mt-10 space-y-6 text-gray-700 text-sm sm:text-base text-justify max-w-3xl mx-auto">
          <p className="char-reveal">
            I express my gratitude for your interest in Sri Mittapalli College of
            Engineering. I believe <span className="text-[#800000] font-medium">“Everything is possible if our determination is strong and selfless.”</span>{" "}
            My dream of establishing an engineering college to avail the{" "}
            <span className="text-[#800000] font-medium">finest science and technical education</span> for rural students had come true in
            2006 as Sri Mittapalli Group of Institutions at Tummalapalem in Guntur
            District and it is affiliated with Jawaharlal Nehru Technological University,
            Kakinada.
          </p>
          <p className="char-reveal">
            It is my deepest inclination to serve the rural society by moulding these
            technocrats into{" "}
            <span className="text-[#800000] font-medium">global business leaders of tomorrow</span> through dedicated staff and{" "}
            <span className="text-[#800000] font-medium">world-class infrastructure</span>. I was immensely pleased to signify that we
            have imparted an academic program in addition to the engineering curriculum
            for social, cultural, scientific, economic, and technical development.
          </p>
          <p className="char-reveal">
            SMCE aims at establishing{" "}
            <span className="text-[#800000] font-medium">standard academic excellence</span> and provides{" "}
            <span className="text-[#800000] font-medium">integrated training programs</span> for engineering students to meet the
            challenges in the rapid globalized economic conditions. Thus, our Sri Mittapalli
            Group of Institutions have earned{" "}
            <span className="text-[#800000] font-medium">goodwill from our students and society at large</span>.
          </p>
        </div>
      </div>
    </section>
  );
}