import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Download, GraduationCap, BookOpen } from "lucide-react";

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
      gsap.from(".prog-card", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".prog-grid", start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Undergraduate programs — single course (B.Tech)
  const ugCourses = [
    {
      name: "B.Tech",
      regulations: [
        { label: "MR23 Regulations", fileUrl: "/pdfs/btech-mr23.pdf" },
        { label: "R20 Regulations", fileUrl: "/pdfs/btech-r20.pdf" },
      ],
    },
  ];

  // Postgraduate programs — two courses (M.Tech, MBA)
  const pgCourses = [
    {
      name: "M.Tech",
      regulations: [
        { label: "MR25 Regulations", fileUrl: "/pdfs/mtech-mr25.pdf" },
        { label: "MR23 Regulations", fileUrl: "/pdfs/mtech-mr23.pdf" },
      ],
    },
    {
      name: "MBA",
      regulations: [
        { label: "MR24 Regulations", fileUrl: "/pdfs/mba-mr24.pdf" },
        { label: "MR23 Regulations", fileUrl: "/pdfs/mba-mr23.pdf" },
      ],
    },
  ];

  const renderRegulation = (reg, idx) => (
    <a
      key={idx}
      href={reg.fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      title={`Download ${reg.label}`}
      className="group flex items-center justify-between gap-3 rounded-xl border border-[#800000]/10 bg-white px-4 py-3 transition-all hover:border-[#800000]/30 hover:bg-[#800000]/[0.04] hover:shadow-md"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#800000] to-[#b22222] text-white shadow-sm">
          <FileText className="h-4 w-4" />
        </span>
        <span className="text-sm font-medium text-gray-800">{reg.label}</span>
      </span>
      <Download className="h-4 w-4 text-[#800000] opacity-50 transition-all group-hover:opacity-100 group-hover:translate-y-0.5" />
    </a>
  );

  const renderCourse = (course, idx) => (
    <div key={idx} className="flex flex-col">
      <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-[#800000]">
        <BookOpen className="h-4 w-4" />
        {course.name}
      </h4>
      <div className="flex flex-col gap-2.5">
        {course.regulations.map(renderRegulation)}
      </div>
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

      {/* Programs */}
      <div className="prog-grid grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Undergraduate Programs */}
        <div className="prog-card relative overflow-hidden rounded-2xl border border-[#800000]/10 bg-gradient-to-br from-white to-[#800000]/[0.03] p-6 sm:p-8 shadow-sm">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#800000]/5 blur-2xl" />
          <div className="relative mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#800000] to-[#b22222] text-white shadow-md">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Undergraduate</h2>
              <p className="text-xs text-gray-500">UG Programs</p>
            </div>
          </div>
          <div className="relative">{ugCourses.map(renderCourse)}</div>
        </div>

        {/* Postgraduate Programs */}
        <div className="prog-card relative overflow-hidden rounded-2xl border border-[#800000]/10 bg-gradient-to-br from-white to-[#800000]/[0.03] p-6 sm:p-8 shadow-sm lg:col-span-2">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#800000]/5 blur-2xl" />
          <div className="relative mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#800000] to-[#b22222] text-white shadow-md">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Postgraduate</h2>
              <p className="text-xs text-gray-500">PG Programs</p>
            </div>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {pgCourses.map(renderCourse)}
          </div>
        </div>
      </div>
    </section>
  );
}