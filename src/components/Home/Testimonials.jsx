import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: "Ananya Rao",
    role: "B.Tech CSE Alumni · Software Engineer at Infosys",
    tag: "Student",
    quote:
      "SMCE gave me the foundation and confidence to thrive in the tech world. The industry connections, mentorship, and placement cell made all the difference in my career.",
    accent: {
      border: "border-l-blue-500",
      tag: "bg-blue-50 text-blue-700 border border-blue-200",
      avatar: "from-blue-500 to-blue-700",
      quoteMark: "text-blue-200",
    },
  },
  {
    name: "Rahul Dev",
    role: "Parent · Father of CSE 2023 Graduate",
    tag: "Parent",
    quote:
      "I'm deeply grateful for the holistic development SMCE provided my child. From academics to placements, the college's commitment to quality is absolutely commendable.",
    accent: {
      border: "border-l-emerald-500",
      tag: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      avatar: "from-emerald-500 to-emerald-700",
      quoteMark: "text-emerald-200",
    },
  },
  {
    name: "Sravani Iyer",
    role: "Staff · Head of Training & Placement Cell",
    tag: "Faculty",
    quote:
      "Every student deserves a fair shot at their dream career. Our 98% placement rate is not a number — it reflects years of hard work, industry partnerships, and genuine student support.",
    accent: {
      border: "border-l-violet-500",
      tag: "bg-violet-50 text-violet-700 border border-violet-200",
      avatar: "from-violet-500 to-violet-700",
      quoteMark: "text-violet-200",
    },
  },
  {
    name: "Manoj B",
    role: "Researcher · IEEE International Journal Contributor",
    tag: "Research",
    quote:
      "The research environment at SMCE is exceptional. The faculty support and lab access helped me publish my first international paper — an achievement I'll always be proud of.",
    accent: {
      border: "border-l-amber-500",
      tag: "bg-amber-50 text-amber-700 border border-amber-200",
      avatar: "from-amber-500 to-amber-600",
      quoteMark: "text-amber-200",
    },
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, gradient }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm`}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div
      className={`h-full flex flex-col bg-white rounded-2xl border border-gray-100 border-l-4 ${t.accent.border} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 p-6`}
    >
      {/* Stars + Tag */}
      <div className="flex items-center justify-between mb-4">
        <StarRating />
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${t.accent.tag}`}>
          {t.tag}
        </span>
      </div>

      {/* Opening quote mark */}
      <span
        className={`text-5xl font-serif leading-none ${t.accent.quoteMark} block -mb-1 select-none`}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote text — grows to fill card height */}
      <blockquote className="flex-1 mb-5">
        <p className="text-gray-700 text-[15px] leading-relaxed">{t.quote}</p>
      </blockquote>

      {/* Person row */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <Avatar name={t.name} gradient={t.accent.avatar} />
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{t.name}</p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".test-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".test-heading", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".test-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".test-grid", start: "top 84%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f8f9fb] py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">

        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <div className="test-heading mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-xs font-bold text-[#800000] uppercase tracking-widest">
                Testimonials &amp; Alumni Stories
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1]">
              Trusted by Students,<br className="hidden sm:block" />
              Parents &amp; Faculty
            </h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-md">
              Real voices from our community — students who landed their dream jobs,
              parents who saw the difference, and faculty who make it happen.
            </p>
          </div>

          {/* Rating widget */}
          <div className="shrink-0 flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm self-start md:self-end">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-gray-900 leading-none">4.9</p>
              <div className="flex justify-center mt-1.5">
                <StarRating />
              </div>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-sm font-bold text-gray-900">Excellent</p>
              <p className="text-xs text-gray-400 mt-0.5">Based on 500+ alumni reviews</p>
            </div>
          </div>
        </div>

        {/* ── 2×2 card grid ─────────────────────────────────────────────── */}
        <div className="test-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="test-card h-full">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        {/* ── Bottom strip ──────────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Join <span className="font-bold text-gray-800">5,000+ alumni</span> who built their careers at SMCE.
          </p>
          <a
            href="/admission-form"
            className="inline-flex items-center gap-2 bg-[#800000] hover:bg-[#6a0000] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 shadow hover:shadow-md whitespace-nowrap"
          >
            Start Your Journey
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
