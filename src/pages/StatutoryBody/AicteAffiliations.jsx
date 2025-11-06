import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function AicteAffiliations() {
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

  const years = [
    {
      year: "2024-2025",
      file: "../../pdfs/2024-2025-file.pdf",
      letter: "../../pdfs/2024-2025-letter.pdf",
    },
    {
      year: "2023-2024",
      file: "../../pdfs/2023-2024-file.pdf",
      letter: "../../pdfs/2023-2024-letter.pdf",
    },
    {
      year: "2022-2023",
      file: "../../pdfs/2022-2023-file.pdf",
      letter: "../../pdfs/2022-2023-letter.pdf",
    },
    {
      year: "2021-2022",
      file: "../../pdfs/2021-2022-file.pdf",
      letter: "../../pdfs/2021-2022-letter.pdf",
    },
    {
      year: "2020-2021",
      file: "../../pdfs/2020-2021-file.pdf",
      letter: "../../pdfs/2020-2021-letter.pdf",
    },
  ];

  return (
    <div className="min-h-screen pt-[100px] pb-20 bg-white text-gray-800">
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative mb-10"
        style={{ backgroundImage: "url('/images/aicte-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          AICTE Affiliation Letters
        </h1>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-6 sm:px-10 space-y-10">
        <p className="text-gray-600 text-center text-lg max-w-3xl mx-auto">
          Download official affiliation documents and approval letters for the academic years listed below. These documents confirm the institute's AICTE approval for each respective year.
        </p>

        <p className="text-sm text-gray-500 text-center mb-2">
          Each card below shows the AICTE Affiliation File and Approval Letter for the selected academic year.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {years.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-stretch w-full">
                {/* Stylized Year Display */}
                <div className="bg-[#f3f3f3] w-full sm:w-auto sm:min-w-[140px] flex flex-col justify-center items-center relative overflow-hidden p-4">
                  <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0">
                    <span className="text-[80px] sm:text-[100px] md:text-[120px] font-extrabold text-white opacity-50 leading-none">
                      {item.year.slice(2, 4)}
                    </span>
                    <span className="text-[80px] sm:text-[100px] md:text-[120px] font-extrabold text-white opacity-50 leading-none -mt-6">
                      {item.year.slice(7)}
                    </span>
                  </div>
                  <span className="relative z-10 text-sm font-semibold text-gray-800">
                    Academic Year
                  </span>
                  <span className="relative z-10 text-lg font-bold text-[#800000]">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 space-y-4 w-full">
                  {/* <h2 className="text-2xl font-bold text-[#800000]">{item.year}</h2> */}
                  <p className="text-gray-600 text-sm">
                    Download official documents for the academic year {item.year}, including both the AICTE Affiliation File and Approval Letter.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#800000] text-white px-4 py-2 rounded-md font-medium hover:bg-red-800 transition"
                    >
                      📄 Affiliation File
                    </a>
                    <a
                      href={item.letter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#800000] text-white px-4 py-2 rounded-md font-medium hover:bg-red-800 transition"
                    >
                      📨 Approval Letter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}