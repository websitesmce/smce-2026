import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrincipalImage from "../../assets/board-members/mittapalliPrince.jpg"

gsap.registerPlugin(ScrollTrigger);

export default function Principal() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".princ-reveal").forEach((el, i) => {
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
      {/* Heading */}
      <div className="relative mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-1 relative z-10 princ-reveal">
          PRINCIPAL
        </h2>
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <span className="text-[26vw] sm:text-[12vw] font-extrabold text-gray-400 opacity-10 tracking-wide select-none">
            PRINCIPAL
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center">
        <img
          src={PrincipalImage}
          alt="Principal"
          className="w-44 sm:w-52 md:w-60 aspect-[3/4] mx-auto rounded-xl object-cover mb-6 princ-reveal"
        />
        <h2 className="text-xl sm:text-2xl font-semibold mt-4 princ-reveal">
          Dr. S. Gopi Krishna
        </h2>
        <p className="text-sm text-gray-500 mb-6 princ-reveal">
          M.Tech., Ph.D (CSE) — Principal
        </p>

        <blockquote className="flex items-center justify-center gap-3 my-12 px-4 sm:px-10 princ-reveal">
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">“</span>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium italic text-[#800000] leading-snug max-w-3xl">
            Education is the great engine of personal and professional development.
          </p>
          <span className="text-5xl sm:text-6xl text-gray-300 font-serif">”</span>
        </blockquote>

        <div className="mt-10 space-y-6 text-gray-700 text-sm sm:text-base text-justify max-w-3xl mx-auto">
          <p className="princ-reveal">
            It is my immense pleasure to welcome you to{" "}
            <span className="text-[#800000] font-medium">Sri Mittapalli College of Engineering</span>, an institution under the Sri Mittapalli Group of Institutions founded a decade ago by Sri M.V. Koteswararao. At SMCE, we believe{" "}
            <span className="text-[#800000] font-medium">education is the foundation of progress</span>, combining{" "}
            <span className="text-[#800000] font-medium">ethical values, innovative technical knowledge, and creative thinking</span>.
          </p>
          <p className="princ-reveal">
            We emphasize{" "}
            <span className="text-[#800000] font-medium">Outcome Based Education and experimental learning</span>. Our academic programs go beyond the university curriculum to build{" "}
            <span className="text-[#800000] font-medium">analytical frameworks, entrepreneurial spirit, and interpersonal skills</span>.
          </p>
          <p className="princ-reveal">
            SMCE has partnered with over thirty leading companies across India and offers{" "}
            <span className="text-[#800000] font-medium">ample opportunities in co-curricular and extracurricular activities</span> to foster a holistic learning environment.
          </p>
          <p className="princ-reveal">
            I admire our{" "}
            <span className="text-[#800000] font-medium">dedicated and qualified faculty</span> who not only teach but also{" "}
            <span className="text-[#800000] font-medium">instill the right attitude and skills</span> needed to excel globally.
          </p>
          <p className="princ-reveal">
            At SMCE, <span className="text-[#800000] font-medium">discipline is non-negotiable</span>. It builds the foundation for punctuality and time management — critical life skills for future engineers.
          </p>
          <p className="princ-reveal">
            I am proud to say our college, with its{" "}
            <span className="text-[#800000] font-medium">rich legacy and vision</span>, continues to shape the careers of youth and transform their{" "}
            <span className="text-[#800000] font-medium">potential into global leadership</span>.
          </p>
          <p className="princ-reveal text-right text-[#800000] font-medium italic">
            My Best Regards to All!
          </p>
        </div>
      </div>
    </section>
  );
}