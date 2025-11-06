import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AcademicsPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ugData = [
    {
      title: "MR23 Regulations",
      description: "Latest curriculum and regulations for UG programs under MR23 scheme.",
      fileUrl: "../../pdfs/ug-mr23.pdf",
      bg: "bg-orange-400",
    },
    {
      title: "R20 Regulations",
      description: "Curriculum guidelines and academic policies for UG under R20.",
      fileUrl: "../../pdfs/ug-r20.pdf",
      bg: "bg-neutral-100",
    },
  ];

  const pgData = [
    {
      title: "M.Tech Regulations",
      description: "Postgraduate engineering program regulations and structure.",
      fileUrl: "../../pdfs/pg-mtech.pdf",
      bg: "bg-rose-100",
    },
    {
      title: "MBA Regulations",
      description: "Master of Business Administration academic policies.",
      fileUrl: "../../pdfs/pg-mba.pdf",
      bg: "bg-yellow-300",
    },
  ];

  const renderCard = (item, idx) => (
    <div
      key={idx}
      className={`rounded-xl p-6 flex flex-col justify-between shadow-md ${item.bg} transition-all hover:scale-[1.02] min-h-[230px]`}
    >
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-800 leading-relaxed">
          {item.description}
        </p>
      </div>
      <a
        href={item.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-[#800000] text-sm font-medium"
      >
        <Download className="w-4 h-4" /> Download PDF
      </a>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white text-gray-900 px-6 sm:px-10 md:px-16 lg:px-24 pt-[120px] pb-20"
    >
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="hero-title text-4xl sm:text-5xl font-extrabold tracking-tight text-[#800000]">
          Academics
        </h1>
        <p className="hero-sub text-gray-600 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
          Explore our academic structure, regulations, and outcomes across Undergraduate and Postgraduate programs.
        </p>

        {/* Roadmap CTA */}
        <div className="mt-10">
          <h2 className="hero-title text-xl font-semibold text-gray-800 mb-3">
            Academic Roadmap & Future Guidance
          </h2>
          <p className="hero-sub text-gray-600 max-w-xl mx-auto mb-4 text-sm">
            Learn how to choose the right program and discover booming technologies with helpful online resources.
          </p>
          <a
            href="/roadmap"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#800000] text-white hover:bg-[#990000] transition font-medium text-sm sm:text-base"
          >
            🚀 View Academic Roadmap
          </a>
        </div>
      </div>

      {/* Undergraduate Programs */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">
          Undergraduate Programs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ugData.map(renderCard)}
        </div>
      </div>

      {/* Postgraduate Programs */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">
          Postgraduate Programs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pgData.map(renderCard)}
        </div>
      </div>
    </section>
  );
}