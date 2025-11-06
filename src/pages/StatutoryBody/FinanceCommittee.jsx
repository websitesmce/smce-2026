import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function FinanceCommittee() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
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
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative mb-10"
        style={{ backgroundImage: "url('/images/finance-committee-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          Finance Committee
        </h1>
      </div>

      {/* Content Section */}
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto bg-[#fff4f4] p-8 rounded-xl shadow space-y-6"
      >
        <a
          href="https://drive.google.com/file/d/1g8ykAydkyrekgx3Qx-axuQj23uZKWI9A/preview"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#800000] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition duration-300"
        >
          📄 Download the Finance Committee
        </a>
        <p className="text-sm text-gray-600 mt-2">
          Click the link above to view or download the official Finance Committee document in PDF format. This includes detailed structure and policy roles of the committee.
        </p>

        <div>
          <h2 className="text-2xl font-bold text-[#800000] mb-3">
            Functions of the Finance Committee :
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              The Finance Committee shall act as an advisory body to the
              Governing Body, to consider:
            </li>
            <li>
              Budget estimates relating to the grant received/receivable from
              UGC, and income from fees, etc. collected for the activities to
              undertake the scheme of autonomy; and
            </li>
            <li>Audited accounts for the above.</li>
          </ul>
        </div>
       
      </div>
    </div>
  );
}