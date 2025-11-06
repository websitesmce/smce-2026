// src/pages/Secretary.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SecretaryImage from "../../assets/board-members/Secretary.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Secretary() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".sec-reveal").forEach((el, i) => {
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
      {/* Heading */}
      <div className="relative mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-1 relative z-10 sec-reveal">
          SECRETARY
        </h2>
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <span className="text-[26vw] sm:text-[12vw] font-extrabold text-gray-400 opacity-10 tracking-wide select-none">
            SECRETARY
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center">
        <img
          src={SecretaryImage}
          alt="Secretary"
          className="w-44 sm:w-52 md:w-60 aspect-[3/4] mx-auto rounded-xl object-cover mb-6 sec-reveal"
        />
        <h2 className="text-xl sm:text-2xl font-semibold mt-4 sec-reveal">
          Sri M.B.V. Satyanarayana
        </h2>
        <p className="text-sm text-gray-500 mb-6 sec-reveal">
          Secretary
        </p>

        <blockquote className="flex items-center justify-center gap-3 my-12 px-4 sm:px-10 sec-reveal">
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">“</span>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium italic text-[#800000] leading-snug max-w-3xl">
            Quality is our Motto.
          </p>
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">”</span>
        </blockquote>

        <div className="mt-10 space-y-6 text-gray-700 text-sm sm:text-base text-justify max-w-3xl mx-auto">
          <p className="sec-reveal">
            Sri Mittapalli College of Engineering was born out of the vision of founder Sri. Mittapalli Koteswararao in 2006. We provide quality technical education for rural students in the Guntur district and are renowned for academic excellence and sustain with the slogan <strong>“Quality is our Motto”.</strong>
          </p>
          <p className="sec-reveal">
            SMCE boasts of world-class infrastructure including digital libraries, technical labs, language labs and excellent facilities for sports. Faculty and students are encouraged to take part in research activities resulting in publications in prestigious journals with notable impact factors.
          </p>
          <p className="sec-reveal">
            It provides a dais every year to conduct a range of events from social, cultural, and technical to bring awareness and impart life skills, competencies, right attitude, and attributes greatly desirable in today’s global environment.
          </p>
          <p className="sec-reveal">
            We place special attention on communication skills in English, soft skills, aptitude, reasoning, and technical programs right from the first year—key skills for success in today’s competitive world.
          </p>
          <p className="sec-reveal">
            Sri Mittapalli Group of Institutions nurtures students through full-fledged value education and regular counselling. Our strong Industry-Academia network, guest lectures, and corporate interactions help ensure smooth campus-to-career transitions and boost employability.
          </p>
          <p className="sec-reveal font-semibold text-[#800000]">
            I warmly welcome you all.
          </p>
        </div>
      </div>
    </section>
  );
}