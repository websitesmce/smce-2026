import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PlacementsCareers.css"; // You can keep this empty or use for extras

const recruiters = [
  "tcs.png",
  "infosys.png",
  "wipro.png",
  "accenture.png",
  "capgemini.png",
  "ibm.png",
  "techmahindra.png",
  "deloitte.png"
];

function PlacementsCareers() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    const row1Width = row1.scrollWidth / 2;
    const row2Width = row2.scrollWidth / 2;

    const loop1 = gsap.fromTo(
      row1,
      { x: 0 },
      {
        x: -row1Width,
        duration: 30,
        ease: "none",
        repeat: -1,
      }
    );

    const loop2 = gsap.fromTo(
      row2,
      { x: -row2Width },
      {
        x: 0,
        duration: 30,
        ease: "none",
        repeat: -1,
      }
    );

    return () => {
      loop1.kill();
      loop2.kill();
    };
  }, []);

  const renderLogos = () => (
    <>
      {recruiters.map((logo, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-32 h-16 grayscale hover:grayscale-0 transition duration-300 flex items-center justify-center"
        >
          <img
            src={`/assets/recruiters/${logo}`}
            alt={logo}
            width={128}
            height={64}
            className="object-contain"
          />
        </div>
      ))}
    </>
  );

  return (
    <section className="bg-white py-20 px-6 sm:px-12 md:px-20">
      {/* Header */}
      <div className="fade-in mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-amber-400"></div>
          <p className="font-semibold text-sm sm:text-base text-[#800000]">
            Placements & Career Outcomes
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-4xl">
          SMCE Graduates Are Industry-Ready — <br className="hidden sm:block" />
          Backed by Top Recruiters.
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">
          With over 98% placement success and a dedicated training & development cell,
          our students are equipped with the skills and confidence to excel in global
          career environments.
        </p>
      </div>

      {/* Infinite Scrolling Recruiter Logos */}
      <div className="overflow-hidden relative">
        <div ref={row1Ref} className="flex w-max space-x-6 mb-8">
          {renderLogos()}
          {renderLogos()}
        </div>
        <div ref={row2Ref} className="flex w-max space-x-6">
          {renderLogos()}
          {renderLogos()}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="/career-support"
          className="inline-block bg-[#800000] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-red-700 transition"
        >
          Career Support → Know More
        </a>
      </div>
    </section>
  );
}

export default PlacementsCareers;