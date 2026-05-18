import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import apply        from "/src/assets/home/apply.png";
import eligibility  from "/src/assets/home/eligibility.png";
import counselling  from "/src/assets/home/counselling.png";
import confirmation from "/src/assets/home/confirmation.png";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: "01",
    title: "How to Apply",
    desc: "Fill out our online enquiry form. Our team will call you within 24 hours to guide you through.",
    image: apply,
    accent: "bg-sky-500",
    ring: "ring-sky-500/30",
  },
  {
    step: "02",
    title: "Eligibility & Documents",
    desc: "Review eligibility criteria. Shortlisted candidates are invited for document verification.",
    image: eligibility,
    accent: "bg-violet-500",
    ring: "ring-violet-500/30",
  },
  {
    step: "03",
    title: "Counselling",
    desc: "Attend state-level EAPCET counselling. Select SMCE using college code MPLG.",
    image: counselling,
    accent: "bg-amber-500",
    ring: "ring-amber-500/30",
  },
  {
    step: "04",
    title: "Seat Confirmation",
    desc: "Pay the admission fee and receive your confirmed joining letter and instructions.",
    image: confirmation,
    accent: "bg-emerald-500",
    ring: "ring-emerald-500/30",
  },
];

const faqs = [
  {
    question: "What is the eligibility for B.Tech admission?",
    answer: "You must have completed 10+2 with Physics, Chemistry, and Mathematics. Entrance scores (EAPCET/JEE) may be required based on state norms.",
  },
  {
    question: "Is management quota available?",
    answer: "Yes, limited management quota seats are available. Contact our admissions office for detailed guidance and documentation requirements.",
  },
  {
    question: "How do I participate in counselling?",
    answer: "Register for the state-level EAPCET counselling and use college code MPLG to select Sri Mittapalli College of Engineering.",
  },
  {
    question: "Can I apply online?",
    answer: "Yes, our enquiry process is fully online. Submit your details and our counsellor will guide you through every step.",
  },
];

export default function AdmissionsInfo() {
  const sectionRef  = useRef(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ai-step",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".ai-steps", start: "top 85%" },
        }
      );
      gsap.fromTo(".ai-faq-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".ai-faq", start: "top 88%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">

      {/* ── Dark navy header — urgency + college code ────────────────────────── */}
      <div className="bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            {/* Left: heading */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Admissions 2026 — Now Open
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-3 max-w-lg">
                Your Path to SMCE<br />
                <span className="text-amber-400">Starts Here</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-sm">
                Limited seats available. A clear 4-step process — from application to confirmation.
              </p>
            </div>

            {/* Right: Code card + CTAs */}
            <div className="flex items-center gap-5 flex-wrap">
              {/* MPLG code */}
              <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl px-6 py-4 text-center min-w-[120px]">
                <p className="text-[11px] text-white/40 uppercase tracking-widest mb-1">College Code</p>
                <p className="text-4xl font-extrabold text-amber-400 leading-none tracking-wide">MPLG</p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="tel:+919000447117"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +91-90004-47117
                </a>
                <a
                  href="https://wa.me/919000447117?text=Hi!%20I%20have%20a%20question%20about%20admissions%20at%20SMCE."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm text-white/50 hover:text-white transition-colors font-medium"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Steps — white, horizontal timeline ──────────────────────────────── */}
      <div className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">

          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">4 Simple Steps to Join SMCE</h3>
            <p className="text-gray-500 text-sm mt-2">A guided process from application to your first day on campus.</p>
          </div>

          {/* Timeline grid */}
          <div className="ai-steps relative">
            {/* Connecting line — desktop */}
            <div
              className="hidden lg:block absolute top-7 h-px bg-gray-200 z-0"
              style={{ left: "calc(12.5% + 1.75rem)", right: "calc(12.5% + 1.75rem)" }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {steps.map((step, i) => (
                <div key={i} className="ai-step flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className={`relative z-10 w-14 h-14 rounded-full ${step.accent} ring-4 ${step.ring} text-white font-extrabold text-lg flex items-center justify-center mb-5 shadow-lg`}>
                    {step.step}
                  </div>

                  <h4 className="text-base font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5 flex-1">{step.desc}</p>

                  {/* Step image */}
                  <div className="w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3]">
                    <img
                      loading="lazy"
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA under steps */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/admission-form"
              className="inline-flex items-center justify-center gap-2 bg-[#800000] hover:bg-[#6a0000] text-white text-sm font-bold px-7 py-3 rounded-full transition-all shadow hover:shadow-md"
            >
              Fill Enquiry Form
            </Link>
            <Link
              to="/admission-procedure"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-7 py-3 rounded-full transition-all"
            >
              Full Admission Procedure
            </Link>
          </div>
        </div>
      </div>

      {/* ── FAQs — subtle bg ────────────────────────────────────────────────── */}
      <div className="bg-[#f8f9fb] py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
            <p className="text-gray-500 text-sm mt-1.5">
              Have more questions?{" "}
              <a href="tel:+919000447117" className="text-[#800000] font-semibold hover:underline">
                Call +91-90004-47117
              </a>
            </p>
          </div>

          <div className="ai-faq space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`ai-faq-item rounded-xl border overflow-hidden transition-all duration-200 ${
                  open === i ? "border-gray-300 shadow-sm" : "border-gray-200"
                } bg-white`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left gap-4"
                >
                  <span className="text-sm font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      open === i ? "rotate-180 text-[#800000]" : "text-gray-400"
                    }`}
                  />
                </button>
                <div
                  className={`px-5 text-sm text-gray-600 leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${
                    open === i ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
