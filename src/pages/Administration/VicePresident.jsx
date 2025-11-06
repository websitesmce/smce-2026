import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VicePresidentImage from "../../assets/board-members/VicePresident.jpg"; // Update path if needed

gsap.registerPlugin(ScrollTrigger);

export default function VicePresident() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".vp-reveal").forEach((el, i) => {
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
        <h2 className="text-3xl sm:text-4xl font-bold mb-1 relative z-10 vp-reveal">
          VICE PRESIDENT
        </h2>
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <span className="text-[10vw] sm:text-[8vw] font-extrabold text-gray-400 opacity-10 tracking-wide select-none">
            VICE PRESIDENT
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center">
        <img
          src={VicePresidentImage}
          alt="Vice President"
          className="w-44 sm:w-52 md:w-60 aspect-[3/4] mx-auto rounded-xl object-cover mb-6 vp-reveal"
        />
        <h2 className="text-xl sm:text-2xl font-semibold mt-4 vp-reveal">
          Mr. M. Kishore Kumar
        </h2>
        <p className="text-sm text-gray-500 mb-6 vp-reveal">
          M.Pharmacy, Vice President
        </p>

        <blockquote className="flex items-center justify-center gap-3 my-12 px-4 sm:px-10 vp-reveal">
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">“</span>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium italic text-[#800000] leading-snug max-w-3xl">
            Quality is our motto — we strive to empower rural talent through world-class education.
          </p>
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">”</span>
        </blockquote>

        <div className="mt-10 space-y-6 text-gray-700 text-sm sm:text-base text-justify max-w-3xl mx-auto">
          <p className="vp-reveal">
            Sri Mittapalli College of Engineering was born out of the vision of founder Sri. Mittapalli Koteswararao in 2006. We provide{" "}
            <span className="text-[#800000] font-medium">quality technical education for rural students</span> in the Guntur district and sustain our reputation with the slogan{" "}
            <span className="text-[#800000] font-medium">“Quality is our Motto”</span>.
          </p>
          <p className="vp-reveal">
            SMCE boasts of <span className="text-[#800000] font-medium">world-class infrastructure</span> including digital libraries, technical labs, language labs, and facilities for sports. Faculty and students are encouraged to engage in{" "}
            <span className="text-[#800000] font-medium">research activities</span> leading to numerous publications in prestigious journals.
          </p>
          <p className="vp-reveal">
            Each year, we organize a variety of events — social, cultural, and technical — to help students develop{" "}
            <span className="text-[#800000] font-medium">life skills, competencies, and the right attitude</span> required in today’s global environment.
          </p>
          <p className="vp-reveal">
            From day one, we focus on building <span className="text-[#800000] font-medium">communication skills, soft skills, aptitude, and reasoning</span> abilities which are essential in the modern job market.
          </p>
          <p className="vp-reveal">
            Sri Mittapalli Group of Institutions also conducts{" "}
            <span className="text-[#800000] font-medium">value education classes and regular counselling sessions</span>. Our industry-academia network enables interactions with corporate professionals and professors for an{" "}
            <span className="text-[#800000] font-medium">enhanced campus-to-corporate transition</span>.
          </p>
          <p className="vp-reveal">
            <span className="text-[#800000] font-medium">I warmly welcome you all</span> to join this journey of excellence.
          </p>
        </div>
      </div>
    </section>
  );
}