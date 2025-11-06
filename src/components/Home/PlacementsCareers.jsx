import tata from "../../assets/placements/tata.png";
import tcs from "../../assets/placements/tcs.png";
import infosys from "../../assets/placements/infosys.png";
import wipro from "../../assets/placements/wipro.png";
import accenture from "../../assets/placements/accenture.png";
import capgemini from "../../assets/placements/capgemini.png";
import ibm from "../../assets/placements/ibm.png";
import techmahindra from "../../assets/placements/techmahindra.png";
import deloitte from "../../assets/placements/deloitte.png";
import adp from "../../assets/placements/adp.png";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PlacementsCareers.css"; // Optional

const recruiters = [
  tata,
  tcs,
  infosys,
  wipro,
  accenture,
  capgemini,
  ibm,
  techmahindra,
  deloitte,
  adp
];

function PlacementsCareers() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const animateRow = (row, direction = "left") => {
      const totalWidth = row.scrollWidth / 2;

      gsap.set(row, { x: direction === "left" ? 0 : -totalWidth });

      gsap.to(row, {
        x: direction === "left" ? -totalWidth : 0,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    };

    animateRow(row1Ref.current, "left");
    animateRow(row2Ref.current, "right");

    return () => gsap.killTweensOf([row1Ref.current, row2Ref.current]);
  }, []);

  const renderLogos = () =>
    recruiters.map((logo, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-32 sm:w-36 md:w-40 h-16 grayscale hover:grayscale-0 transition duration-300 flex items-center justify-center"
      >
        <img
          src={logo}
          alt={`Recruiter logo ${i + 1}`}
          className="h-12 sm:h-14 object-contain"
        />
      </div>
    ));

  return (
    <section className="bg-white py-20 px-6 sm:px-12 md:px-20">
      {/* Heading */}
      <div className="fade-in mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-amber-400"></div>
          <p className="font-semibold text-sm sm:text-base text-[#800000]">
            Placements & Career Outcomes
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-4xl">
          SMCE Graduates Are Industry-Ready —{" "}
          <br className="hidden sm:block" />
          Backed by Top Recruiters.
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">
          With over 98% placement success and a dedicated training & development
          cell, our students are equipped with the skills and confidence to excel
          in global career environments.
        </p>
      </div>

      {/* Scrolling Logo Rows */}
      <div className="overflow-hidden relative">
        <div
          ref={row1Ref}
          className="flex w-max space-x-10 animate-row mb-8"
        >
          {renderLogos()}
          {renderLogos()}
        </div>
        <div
          ref={row2Ref}
          className="flex w-max space-x-10 animate-row"
        >
          {renderLogos()}
          {renderLogos()}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-14">
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