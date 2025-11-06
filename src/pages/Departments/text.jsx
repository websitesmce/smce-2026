import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { BookText, FolderKanban, Info, Target, Cpu } from "lucide-react";
import {
  IconBrain,
  IconMicrophone,
  IconWorldWww,
  IconRobot,
  IconLock,
  IconCertificate,
  IconTopologyFull,
} from "@tabler/icons-react";
import departmentImage from "../../assets/department-img/cse-ai-main.jpeg";

const tabs = [
  { title: "About Department", icon: <Info size={16} /> },
  { title: "PEOs/POs/PSOs", icon: <Target size={16} /> },
  { title: "Course Structure", icon: <BookText size={16} /> },
  { title: "Laboratories", icon: <Cpu size={16} /> },
  { title: "Activities & Events", icon: <FolderKanban size={16} /> },
];

export default function DepartmentCSEAI() {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef(null);
  const tabRefs = useRef([]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  useEffect(() => {
    tabRefs.current.forEach((ref, index) => {
      if (ref && window.innerWidth < 768) {
        const isActive = index === activeTab;
        gsap.to(ref, {
          width: isActive ? "auto" : "42px",
          paddingInline: "0.75rem",
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeTab]);

  return (
    <section className="pt-[120px] px-6 sm:px-10 md:px-16 lg:px-24 pb-24 bg-[#f9f9f9] to-white text-gray-800">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#800000]">
          CSE (AI) Department
        </h1>
        <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
          Learn about our department’s mission, curriculum, labs, and events.
        </p>
      </div>

      {/* Folder Tabs with Horizontal Scroll */}
<div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
  <div className="flex w-max gap-2 px-2">
    {tabs.map((tab, index) => {
      const isActive = activeTab === index;
      return (
        <button
          key={index}
          ref={(el) => (tabRefs.current[index] = el)}
          onClick={() => setActiveTab(index)}
          className={`flex-shrink-0 relative px-4 py-2 font-medium flex items-center gap-2 text-sm md:text-base transition-all rounded-t-lg border border-b-0 z-10
            ${
              isActive
                ? "text-[#800000] border-[#800000] bg-white"
                : "text-gray-600 border-gray-200 bg-gray-50 hover:text-[#800000] shadow-sm"
            }
          `}
          style={{
            marginBottom: "-1px",
            maxWidth: window.innerWidth < 768 ? (isActive ? "180px" : "42px") : "none",
            transition: "max-width 0.4s ease, padding 0.3s ease",
            paddingInline: window.innerWidth < 768 ? "12px" : undefined,
          }}
        >
          {/* Mobile */}
          <span className="block md:hidden">{tab.icon}</span>
          <span
            className={`block md:hidden ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out`}
            style={{
              opacity: isActive ? 1 : 0,
              maxWidth: isActive ? "120px" : "0px",
              transition: "max-width 0.4s ease, opacity 0.3s ease",
            }}
          >
            {tab.title}
          </span>

          {/* Desktop */}
          <span className="hidden md:flex items-center gap-2">
            {tab.icon} {tab.title}
          </span>
        </button>
      );
    })}
  </div>
</div>

      <div
        ref={contentRef}
        className="bg-white p-6 md:p-10 rounded-b-xl transition-all duration-300"
      >
        {activeTab === 0 && (
          <div className="space-y-20 text-gray-800">
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                About the Department
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the purpose, vision, and career-building potential of
                the CSE (AI) Department at SMCE.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <img
                src={departmentImage}
                alt="CSE AI Department"
                className="rounded-xl w-full h-auto object-cover shadow-md"
              />
              <div className="space-y-6 text-base leading-relaxed">
                <p className="text-xl">
                  To cater to the growing demand of software professionals from
                  global organizations,{" "}
                  <span className="font-semibold text-[#800000]">
                    Sri Mittapalli College of Engineering (SMCE)
                  </span>{" "}
                  has set up an undergraduate course in{" "}
                  <span className="font-semibold text-[#800000]">
                    Artificial Intelligence (CSE - AI)
                  </span>{" "}
                  branch in{" "}
                  <span className="font-semibold text-[#800000]">2020</span>{" "}
                  with an initial intake of{" "}
                  <span className="font-semibold text-[#800000]">60</span> and
                  later enhanced to{" "}
                  <span className="font-semibold text-[#800000]">240</span> in{" "}
                  <span className="font-semibold text-[#800000]">2025</span>.{" "}
                  <span className="font-medium text-[#800000]">
                    Center of Excellence Labs
                  </span>{" "}
                  have been functioning on cutting edge technologies such as{" "}
                  <span className="text-[#800000] font-medium">
                    Artificial Intelligence & Machine Learning, IoT, Cyber
                    Security, Cloud & Fog Computing
                  </span>{" "}
                  and{" "}
                  <span className="text-[#800000] font-medium">
                    Software Engineering
                  </span>
                  . Had{" "}
                  <span className="font-semibold text-[#800000]">
                    MoUs with reputed MNCs
                  </span>{" "}
                  such as{" "}
                  <span className="text-[#800000] font-medium">
                    Oracle, Microsoft, CISCO
                  </span>{" "}
                  etc to be in tune with industry developments and requirements.
                </p>
              </div>
            </div>

            <div className="bg-[#fffaf5] border-l-4 border-[#800000] p-6 sm:p-8 rounded-xl shadow-md max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-3">
                The SMCE Advantage
              </h3>
              <p className="text-gray-700 text-base sm:text-lg">
                SMCE blends academic rigor with industry relevance. With
                upgraded intake capacity, industry tie-ups, and active labs, the
                department ensures students gain hands-on exposure to both core
                and emerging technologies.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 space-y-10 text-center max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-3">
                  Vision of the Department
                </h3>
                <p className="text-base leading-relaxed">
                  To produce professional, ethical and globally competent
                  graduates by imparting quality education in the field of
                  Computer Science & Engineering with capabilities to solve a
                  wide range of complex, scientific, technological and societal
                  problems.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-3">
                  Mission of the Department
                </h3>
                <ul className="space-y-4 text-base text-left max-w-xl mx-auto leading-relaxed">
                  <li>
                    <span className="font-semibold text-[#800000]">M1</span> –
                    To educate students to the effective problem solvers and
                    life long learners in technical, innovative and
                    entrepreneurial skills.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">M2</span> –
                    To impart quality and value based education and contribute
                    towards the advancement of computing, science and technology
                    to raise satisfaction level of all stakeholders.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">M3</span> –
                    To establish a continuous Industry Institute Interaction,
                    participation, collaboration to contribute skilled IT
                    engineers.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#f9f9f9] rounded-xl shadow-inner p-6 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-6">
                Why Choose SMCE CSE (AI)
              </h3>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-6 text-base leading-relaxed">
                <li>✓ Qualified & Experienced Faculty</li>
                <li>✓ Industry ready course content</li>
                <li>✓ Well planned academic curriculum</li>
                <li>✓ Course delivery through real world applications</li>
                <li>✓ Career Prospects</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-200">
              <div className="pr-0 sm:pr-10 pb-10 sm:pb-0 space-y-5">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] flex items-center gap-2">
                  <IconBrain size={24} className="text-[#800000]" />
                  Focus Areas
                </h3>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-3">
                    <IconBrain size={20} className="mt-1 text-[#800000]" />
                    Deep Learning
                  </li>
                  <li className="flex items-start gap-3">
                    <IconTopologyFull
                      size={20}
                      className="mt-1 text-[#800000]"
                    />
                    Neural Networks
                  </li>
                  <li className="flex items-start gap-3">
                    <IconMicrophone size={20} className="mt-1 text-[#800000]" />
                    Speech Recognition Technologies
                  </li>
                  <li className="flex items-start gap-3">
                    <IconWorldWww size={20} className="mt-1 text-[#800000]" />
                    Internet of Things
                  </li>
                  <li className="flex items-start gap-3">
                    <IconWorldWww size={20} className="mt-1 text-[#800000]" />
                    Natural Language Processing
                  </li>
                  <li className="flex items-start gap-3">
                    <IconRobot size={20} className="mt-1 text-[#800000]" />
                    Robotic Applications
                  </li>
                  <li className="flex items-start gap-3">
                    <IconLock size={20} className="mt-1 text-[#800000]" />
                    Cyber Security
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCertificate
                      size={20}
                      className="mt-1 text-[#800000]"
                    />
                    Security Certifications
                  </li>
                </ul>
              </div>

              <div className="pl-0 sm:pl-10 pt-10 sm:pt-0 space-y-5">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#800000]">
                  Skill Development
                </h3>
                <ul className="space-y-3 text-base">
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Coding skills:
                    </span>{" "}
                    Programming skills in C, C++, Java, Python, R Programming,
                    etc.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Hardware skills:
                    </span>{" "}
                    Arduino, Raspberry Pi Boards
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Soft skills:
                    </span>{" "}
                    Hobby clubs, Mock Interviews
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 4 && (
          <div className="text-center text-gray-500 py-10 text-sm">
            Content for "{tabs[activeTab].title}" coming soon.
          </div>
        )}
      </div>
    </section>
  );
}
