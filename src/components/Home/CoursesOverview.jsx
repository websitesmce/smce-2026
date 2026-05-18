import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import departmentData from "../../../departmentData.json";

gsap.registerPlugin(ScrollTrigger);

// ── Per-program conversion data ──────────────────────────────────────────────
// Placement rates, career paths, and badge labels that help prospects decide.

const UG_META = {
  CSE: {
    badge: "Most Popular",
    badgeColor: "bg-blue-500",
    accent: "bg-blue-500",
    intake: 60,
    placement: "98%",
    paths: ["Software Engineer", "Full Stack Developer", "System Architect"],
  },
  "CSE-AI": {
    badge: "Future Tech",
    badgeColor: "bg-violet-500",
    accent: "bg-violet-500",
    intake: 60,
    placement: "97%",
    paths: ["ML Engineer", "AI Researcher", "Data Scientist"],
  },
  "CSE-DS": {
    badge: "High Demand",
    badgeColor: "bg-sky-500",
    accent: "bg-sky-500",
    intake: 60,
    placement: "96%",
    paths: ["Data Analyst", "BI Developer", "Data Engineer"],
  },
  IT: {
    badge: "Industry Ready",
    badgeColor: "bg-emerald-500",
    accent: "bg-emerald-500",
    intake: 60,
    placement: "95%",
    paths: ["Network Admin", "IT Consultant", "Security Analyst"],
  },
  ECE: {
    badge: "Core Engineering",
    badgeColor: "bg-amber-500",
    accent: "bg-amber-500",
    intake: 60,
    placement: "93%",
    paths: ["Embedded Engineer", "VLSI Designer", "Electronics R&D"],
  },
};

const PG_PROGRAMS = [
  {
    degree: "M.Tech",
    program: "CSE",
    desc: "Advanced Computer Science & Engineering with a strong research foundation.",
    tenure: "2 Years",
    intake: 18,
    placement: "100%",
    badge: "Research Track",
    badgeColor: "bg-blue-600",
    accent: "bg-blue-600",
    paths: ["Senior Developer", "Research Scientist", "Tech Lead"],
    href: "/",
  },
  {
    degree: "M.Tech",
    program: "VLSI & ES",
    desc: "VLSI Design & Embedded Systems — a niche, high-pay specialisation.",
    tenure: "2 Years",
    intake: 18,
    placement: "95%",
    badge: "High Pay",
    badgeColor: "bg-amber-600",
    accent: "bg-amber-600",
    paths: ["Chip Designer", "FPGA Developer", "Embedded Systems Lead"],
    href: "/",
  },
  {
    degree: "MBA",
    program: "Business Administration",
    desc: "Management education for future business leaders and entrepreneurs.",
    tenure: "2 Years",
    intake: 60,
    placement: "92%",
    badge: "Business Leaders",
    badgeColor: "bg-rose-500",
    accent: "bg-rose-500",
    paths: ["Business Analyst", "Marketing Manager", "Operations Lead"],
    href: "/mba-department",
  },
];

// ── Build UG programs from departmentData ────────────────────────────────────
function buildUGPrograms() {
  const ORDER = ["CSE", "CSE-AI", "CSE-DS", "IT", "ECE"];
  const result = [];

  ORDER.forEach((key) => {
    const dept = departmentData.departments?.[key];
    if (!dept) return;
    const meta = UG_META[key] || {};
    result.push({
      degree: "B.Tech",
      program: key,
      desc: dept.title || "",
      tenure: "4 Years",
      intake: meta.intake ?? 60,
      placement: meta.placement,
      badge: meta.badge,
      badgeColor: meta.badgeColor,
      accent: meta.accent || "bg-gray-400",
      paths: meta.paths || [],
      href: `/${key.toLowerCase()}-department`,
    });
  });

  return result;
}

// ── Course card ──────────────────────────────────────────────────────────────

function CourseCard({ degree, program, desc, tenure, intake, placement, badge, badgeColor, accent, paths, href }) {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">

      {/* Accent bar */}
      <div className={`h-1 w-full ${accent}`} />

      <div className="p-5 flex flex-col flex-1 gap-4">

        {/* Header: degree label + badge */}
        <div className="flex items-start justify-between gap-2 min-h-[48px]">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{degree}</p>
            <h3 className="text-base font-extrabold text-gray-900 mt-0.5 leading-snug">{program}</h3>
          </div>
          {badge && (
            <span className={`shrink-0 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>

        {/* Description — always 2 lines */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 min-h-[32px]">{desc}</p>

        {/* Intake + placement row */}
        <div className="flex items-center gap-2 text-[11px] flex-wrap">
          <span className="flex items-center gap-1.5 text-gray-500 font-medium">
            <span className={`w-1.5 h-1.5 rounded-full ${accent}`} />
            {tenure}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-500 font-medium">{intake} Seats</span>
          {placement && (
            <span className="ml-auto flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {placement} Placed
            </span>
          )}
        </div>

        {/* Career paths — grows to fill remaining space */}
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Career Paths</p>
          <ul className="space-y-1.5">
            {paths.map((path) => (
              <li key={path} className="flex items-center gap-2 text-[11px] text-gray-600">
                <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                {path}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="pt-3 border-t border-gray-100 mt-auto">
          <Link
            to={href}
            className="block w-full text-center text-[11px] font-semibold text-gray-600 hover:text-[#800000] py-2 rounded-lg hover:bg-gray-50 border border-gray-200 transition-all duration-200"
          >
            Explore Program →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function CoursesOverview() {
  const sectionRef  = useRef(null);
  const [tab, setTab]       = useState("btech");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("MPLG").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const ugPrograms  = useMemo(buildUGPrograms, []);
  const programs    = tab === "btech" ? ugPrograms : PG_PROGRAMS;

  // Heading entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".co-heading",
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".co-heading", start: "top 87%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Cards animate on tab change
  useEffect(() => {
    gsap.fromTo(".co-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power3.out" }
    );
  }, [tab]);

  const totalUGSeats = ugPrograms.reduce((acc, p) => acc + (p.intake || 0), 0);

  return (
    <section ref={sectionRef} className="overflow-hidden">

      {/* ── Urgency strip (dark navy) ────────────────────────────────────────── */}
      <div className="bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-6 sm:py-5 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-5 text-center sm:text-left">

          {/* Left: status + seats */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-white text-sm sm:text-base font-bold">Admissions 2026 — Now Open</span>
            </div>
            <span className="text-white/40 hidden sm:inline">|</span>
            <p className="text-sm text-white/60">
              <span className="text-amber-400 font-bold">{totalUGSeats}</span> UG Seats ·{" "}
              <span className="text-amber-400 font-bold">54</span> PG Seats available
            </p>
          </div>

          {/* Right: MPLG code + copy + apply */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Code box with copy button */}
            <div className="flex items-center gap-2 bg-white/[0.07] border border-white/10 rounded-xl px-4 py-2.5">
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest leading-none mb-1">College Code</p>
                <p className="text-xl sm:text-2xl font-extrabold text-amber-400 leading-none tracking-wider">MPLG</p>
              </div>
              <button
                onClick={handleCopy}
                title="Copy college code"
                className="ml-1 flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Copy MPLG code"
              >
                {copied ? (
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>

            <a
              href="tel:+919000447117"
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +91-90004-47117
            </a>
          </div>
        </div>

        {/* Copied toast */}
        {copied && (
          <div className="text-center pb-2 text-xs text-emerald-400 font-semibold animate-pulse">
            Copied to clipboard!
          </div>
        )}
      </div>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div className="bg-[#f8f9fb] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">

          {/* Heading + tab toggle */}
          <div className="co-heading mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <p className="text-xs font-bold text-[#800000] uppercase tracking-widest">Explore Programs</p>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] max-w-lg">
                Courses That Shape<br />Your Future
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
                Industry-aligned programs with proven placement outcomes. Choose the
                path that matches your ambition.
              </p>
            </div>

            {/* Tab toggle */}
            <div className="shrink-0 flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm self-start sm:self-end">
              {[
                { key: "btech", label: "Undergraduate (B.Tech)" },
                { key: "pg",    label: "Postgraduate" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    tab === key
                      ? "bg-[#800000] text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-label */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold text-gray-500">
              {tab === "btech"
                ? `${ugPrograms.length} undergraduate programs · 4-year duration · ${totalUGSeats} total seats`
                : `${PG_PROGRAMS.length} postgraduate programs · 2-year duration · 96 total seats`}
            </p>
            <p className="text-xs text-gray-400 shrink-0">
              Each card shows placement rate &amp; career paths
            </p>
          </div>

          {/* Cards grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {programs.map((course, i) => (
              <div key={`${tab}-${i}`} className="co-card">
                <CourseCard {...course} />
              </div>
            ))}
          </div>

          {/* ── Counsellor CTA ──────────────────────────────────────────────── */}
          <div className="mt-10 bg-[#0f172a] rounded-2xl px-6 sm:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                Free Guidance — No Commitment
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                Not sure which program is right for you?
              </h3>
              <p className="text-white/50 text-sm mt-1.5 max-w-sm">
                Our academic counsellors will help you choose the best-fit course
                based on your interests, marks, and career goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/admission-form"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0f172a] text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow hover:shadow-md whitespace-nowrap"
              >
                Schedule a Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </Link>
              <a
                href="https://wa.me/919000447117?text=Hi!%20I%20need%20help%20choosing%20a%20program%20at%20SMCE."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/10 transition-all whitespace-nowrap"
              >
                <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href="tel:+919000447117"
                className="hidden lg:inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +91-90004-47117
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
