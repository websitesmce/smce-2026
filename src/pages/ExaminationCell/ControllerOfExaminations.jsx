import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineClipboardList,
  HiOutlineUserGroup,
  HiOutlineLockClosed,
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineLibrary,
} from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const responsibilities = [
  {
    title: "Exam Planning & Execution",
    icon: HiOutlineClipboardList,
    desc: "Responsible for scheduling, evaluating, and reporting all exams, including paying question setters and examiners.",
  },
  {
    title: "Supervision of Examination Wing",
    icon: HiOutlineUserGroup,
    desc: "Oversees all sub-sections like confidential wing, stores, computer section, and maintains proper records.",
  },
  {
    title: "Secure Document Management",
    icon: HiOutlineLockClosed,
    desc: "Ensures safe custody of documents, office files, and certificates by proper delegation and tracking.",
  },
  {
    title: "Meetings & Official Communication",
    icon: HiOutlineBriefcase,
    desc: "Convenes Board of Examiner meetings and handles official communication regarding examination matters.",
  },
  {
    title: "Maintaining Confidentiality",
    icon: HiOutlineShieldCheck,
    desc: "Ensures complete secrecy in all examination activities through protocols and monitoring.",
  },
  {
    title: "Infrastructure Readiness",
    icon: HiOutlineLibrary,
    desc: "Monitors rooms, labs, stores, and all infrastructure to ensure they are ready for smooth examination conduct.",
  },
];

export default function ControllerOfExaminations() {
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".responsibility-card");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="pt-[160px] pb-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#f9f9f9] text-gray-800"
    >
      {/* Heading with subtle background */}
      <div className="relative mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-1 relative z-10 dir-reveal">
        Examinations
        </h2>
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <span className="text-[1vw] sm:text-[12vw] font-extrabold text-gray-400 opacity-10 tracking-wide select-none">
        Examinations
          </span>
        </div>
        <p className="text-gray-600 text-lg mt-3 max-w-3xl mx-auto">
          Ensuring fairness, accuracy, and transparency in examination
          processes at SMCE.
        </p>
      </div>
     

      {/* About Section */}
      <div className="text-center p-6 sm:p-10 rounded-xl space-y-4 max-w-5xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-[#800000]">About</h2>
        <p className="text-base leading-relaxed text-gray-700">
          Sri Mittapalli College of Engineering, being an Autonomous Institution,
          has established an Examination Cell headed by the Controller of
          Examinations for conducting examinations, processing results, issuing
          certificates, and ensuring smooth academic assessments. The Controller
          reports periodically to the Principal regarding all activities and
          outcomes.
        </p>
      </div>

      {/* Responsibilities */}
      <div className="space-y-20">
        {responsibilities.map((item, index) => (
          <div key={index} className="responsibility-card flex justify-center">
            <div className="w-full md:w-4/5 flex flex-col items-center text-center gap-4">
              <item.icon className="text-[#800000] text-3xl flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#800000]">{item.title}</h3>
                <p className="text-base leading-relaxed text-gray-700">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}