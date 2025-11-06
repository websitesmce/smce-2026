import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const academicYears = [
  "2017-2018",
  "2018-2019",
  "2019-2020",
  "2020-2021",
  "2021-2022",
  "2022-2023",
  "2023-2024",
  "2024-2025",
];

const calendarData = Object.fromEntries(
  academicYears.map((year) => [
    year,
    [
      {
        program: "B.Tech",
        description: "Academic calendar for B.Tech – " + year + " session.",
        fileUrl: "../../pdfs/academic-calendar/" +year+ "-btech.pdf",
        color: "bg-orange-100",
      },
      {
        program: "M.Tech",
        description: "Academic calendar for M.Tech – " + year + " session.",
        fileUrl: "../../pdfs/" + year + "-mtech.pdf",
        color: "bg-sky-100",
      },
      {
        program: "M.Tech2",
        description: "Academic calendar for M.Tech – " + year + " session.",
        fileUrl: "../../pdfs/" + year + "-mtech2.pdf",
        color: "bg-sky-100",
      },
      {
        program: "MBA",
        description: "Academic calendar for MBA – " + year + " session.",
        fileUrl: "../../pdfs/" + year + "-mba.pdf",
        color: "bg-rose-100",
      },
    ],
  ])
);

export default function AcademicCalendarPage() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState("2024-2025");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".calendar-hero", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".calendar-hero",
          start: "top bottom",
          once: true,
        },
      });
    }, sectionRef);

    setTimeout(() => {
      const container = scrollContainerRef.current;
      const activeButton = container?.querySelector('[data-active="true"]');
      if (container && activeButton) {
        container.scrollTo({
          left:
            activeButton.offsetLeft -
            container.offsetWidth / 2 +
            activeButton.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }, 200);

    return () => ctx.revert();
  }, []);

  const getMobileYearStyles = (year, index) => {
    const selectedIndex = academicYears.indexOf(selectedYear);
    if (year === selectedYear) {
      return "bg-[#800000] text-white scale-110 z-10 font-semibold";
    }
    if (index === selectedIndex - 1 || index === selectedIndex + 1) {
      return "bg-gray-200 text-gray-700 opacity-80 scale-95";
    }
    return "text-gray-400 opacity-50 scale-90";
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 sm:px-10 md:px-16 lg:px-24 pt-[120px] pb-20 relative min-h-screen"
    >
      {/* Hero */}
      <div className="calendar-hero text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#800000]">
          Academic Calendar
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mt-4 text-base sm:text-lg">
          View structured academic timelines for B.Tech, M.Tech, and MBA programs.
        </p>
      </div>

      {/* Year Selector */}
      <div className="relative mb-10">
        {/* Desktop & Tablet */}
        <div
          ref={scrollContainerRef}
          className="hidden sm:flex gap-3 overflow-x-auto overflow-visible justify-start items-center pb-2"
        >
          {academicYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              data-active={selectedYear === year}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                selectedYear === year
                  ? "bg-[#800000] text-white scale-105 shadow-md"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Mobile */}
        <div className="sm:hidden h-[260px] flex justify-center items-center overflow-hidden relative">
          <div
            ref={mobileScrollRef}
            className="flex flex-col items-center gap-2 transition-all duration-300"
          >
            {academicYears.map((year, index) => {
              const style = getMobileYearStyles(year, index);
              const visibleRange = 2;
              const selectedIndex = academicYears.indexOf(selectedYear);
              if (Math.abs(index - selectedIndex) <= visibleRange) {
                return (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`transition-all duration-300 px-6 py-2 rounded-full text-sm ${style}`}
                  >
                    {year}
                  </button>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
        {calendarData[selectedYear]?.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow-md border border-white/40 backdrop-blur-sm transition hover:scale-[1.02] flex flex-col justify-between ${item.color}`}
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {item.program}
              </h3>
              <p className="text-sm text-gray-700 mb-4">{item.description}</p>
            </div>
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#800000] text-sm font-medium hover:underline"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </div>
        ))}
      </div>

      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-72 h-72 bg-[#800000] opacity-20 rounded-full blur-3xl top-[-3rem] left-[-4rem] animate-pulse" />
        <div className="absolute w-80 h-80 bg-yellow-100 opacity-20 rounded-full blur-2xl top-[60%] right-[-4rem] animate-ping" />
      </div>
    </section>
  );
}