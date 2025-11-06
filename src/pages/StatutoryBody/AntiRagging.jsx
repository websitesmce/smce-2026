import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AntiRagging() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );
    gsap.fromTo(
      contentRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen pt-[100px] pb-20 bg-white text-gray-800">
      {/* Hero */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/images/anti-ragging-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          Anti-Ragging Committee
        </h1>
      </div>

      {/* Content */}
      <section ref={contentRef} className="max-w-5xl mx-auto py-16 space-y-10">
        <p className="text-lg leading-relaxed">
          Sri Mittapalli Institute of Engineering and Technology maintains a
          healthy and congenial academic environment for the students. The
          institution offers protection to the new entrants from the menace of
          ragging. In this regard our Institute has constituted an Anti Ragging
          Cell. The cell is headed by Head of the Institution, along with
          several other committee members comprising of senior faculties.
        </p>

        <p className="text-lg">
          Arranges awareness programme for the seniors about anti-ragging with
          the local police officials. This committee forms Vigilance Committees
          and Flying Squads, every year to ensure the campus is free from
          menace of ragging.
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li>
            The responsibility of the Vigilance Committee is to ensure that all
            anti-ragging measures are in place to curb the menace of ragging.
          </li>
          <li>
            The responsibility of the Flying Squad is to maintain vigil to check
            ragging activities. To make surprise visits in the campus, bus
            stops and hostels and other places vulnerable to incidents & having
            the potential for ragging.
          </li>
        </ul>

        {/* Download Section */}
        <div className="bg-[#fef7f7] p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-3 text-[#800000]">Anti Ragging Committee</h2>
          <a
            href="https://drive.google.com/file/d/171imOO29B6bVgHoIhE4Cy7vUcRcjSQXr/preview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#800000] text-white px-6 py-2 rounded-md hover:bg-red-800 transition"
          >
            Download the Anti-Ragging Committee PDF
          </a>
        </div>

        {/* Functions */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#800000]">Functions of the Anti-Ragging Committee</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Maintaining passport size photo copy of each student along with
              necessary data and information, branch-wise/section-wise for an
              immediate identification of any student at any time.
            </li>
            <li>Developing brotherly movements among students by motivation.</li>
            <li>Closely watching the students and maintaining discipline.</li>
          </ul>
        </div>

        {/* IQAC Section */}
        <div className="space-y-4 pt-10">
          <h3 className="text-2xl font-bold text-[#800000]">IQAC Minutes</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="../../../public/pdfs/IQAC2021-2022-mins.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#800000] text-white px-4 py-2 rounded-md hover:bg-red-800 transition text-center"
            >
              2021-22 Semester 1 PDF
            </a>
            <a
              href="../../../public/pdfs/IQAC2021-2022-mins2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#800000] text-white px-4 py-2 rounded-md hover:bg-red-800 transition text-center"
            >
              2021-22 Semester 2 PDF
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}