import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { BookText, FolderKanban, Cpu, Target } from "lucide-react";
import labImg1 from "../../assets/labs/cse-lab1.png";
import labImg2 from "../../assets/labs/cse-lab2.png";
import labImg3 from "../../assets/labs/cse-lab3.png";
import labImg4 from "../../assets/labs/cse-lab4.png";
import labImg5 from "../../assets/labs/cse-lab5.png";
import labImg6 from "../../assets/labs/cse-lab6.png";
import labImg7 from "../../assets/labs/cse-lab7.png";
import labImg8 from "../../assets/labs/cse-lab8.png";
import labImg9 from "../../assets/labs/cse-lab9.png";
import labImg10 from "../../assets/labs/cse-lab10.png";
import labImg11 from "../../assets/labs/cse-lab11.png";
import labImg12 from "../../assets/labs/cse-lab12.png";

const tabs = [
  { title: "POs", icon: <Target size={16} /> },
  { title: "Course Structure", icon: <BookText size={16} /> },
  { title: "Laboratories", icon: <Cpu size={16} /> },
  { title: "Activities & Events", icon: <FolderKanban size={16} /> },
];

export default function DepartmentMBA() {
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
        <h1 className="text-4xl font-extrabold text-[#800000]">MBA Department</h1>
        <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
          Learn about our MBA program, outcomes, curriculum, labs, and events.
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
          <div className="space-y-10 text-gray-800">
            <h2 className="text-3xl font-bold text-[#800000] text-center">
              Program Outcomes (POs)
            </h2>
            <div className="max-w-3xl mx-auto text-base leading-relaxed">
              <p>
                The MBA program aims to equip students with strong managerial and leadership skills, decision-making abilities, analytical thinking, and ethical values.
              </p>
              <h3 className="text-xl font-semibold text-[#800000] mt-6">Programmes Offered</h3>
              <ul className="list-disc ml-6">
                <li>PG Master Of Business Administration (MBA) – INTAKE: 60</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 1 && (
                  <div className="space-y-16 text-gray-800">
                    {/* Section Heading */}
                    <div className="text-center space-y-3">
                      <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                        Course Structure for all Years
                      </h2>
                      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Download the Course Structure and Syllabus of four years of MBA
                        course
                      </p>
                    </div>
        
                    {/* Downloads Section */}
                    <div className="max-w-2xl mx-auto space-y-6">
                      <div className="bg-white border-l-4 border-[#800000] p-5 sm:p-6 rounded-xl shadow-md flex items-start gap-4">
                        <BookText size={28} className="text-[#800000] mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#800000]">
                          MBA – MR23
                          </h3>
                          <p className="text-gray-700">
                            Download the detailed syllabus and structure for the MR23
                            regulation.
                          </p>
                          <a
                            href="/pdfs/ai-mr23.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-sm text-[#800000] font-medium underline hover:text-red-700 transition"
                          >
                            Download PDF
                          </a>
                        </div>
                      </div>
        
                      <div className="bg-white border-l-4 border-[#800000] p-5 sm:p-6 rounded-xl shadow-md flex items-start gap-4">
                        <BookText size={28} className="text-[#800000] mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#800000]">
                          MBA – R20
                          </h3>
                          <p className="text-gray-700">
                            Download the detailed syllabus and structure for the R20
                            regulation.
                          </p>
                          <a
                            href="/pdfs/ai-r20.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-sm text-[#800000] font-medium underline hover:text-red-700 transition"
                          >
                            Download PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

        {activeTab === 2 && (
          <div className="space-y-16 text-gray-800">
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                MBA Laboratories
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our fully-equipped computer labs designed to support management studies with modern systems and tools.
              </p>
            </div>
            <div className="bg-white border-l-4 border-[#800000] shadow-md p-6 sm:p-10 rounded-xl max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl font-semibold text-[#800000]">
                We Have Fully Equipped Laboratories
              </h3>
              <p className="text-base leading-relaxed">
                We have several Computer Labs equipped with the latest software and workstations. All systems have high-speed internet via leased line.
              </p>
              <p className="text-base leading-relaxed">
                The labs are connected through a structured network. Printer and copier facilities are also available.
              </p>
              <p className="text-base leading-relaxed">
                Our faculty and staff are well-qualified and committed to delivering top-tier academic and practical training.
              </p>
            </div>
            <div className="space-y-6">
                 <h3 className="text-2xl font-semibold text-[#800000] text-center">
                   Lab Facilities Gallery
                 </h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                   {[labImg1, labImg2, labImg3, labImg4, labImg5, labImg6, labImg7, labImg8, labImg9, labImg10, labImg11, labImg12].map((imgSrc, idx) => (
                     <div
                       key={idx}
                       className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden shadow-md group"
                     >
                       <img
                         src={imgSrc}
                         alt={`Lab ${idx + 1}`}
                         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                       />
                     </div>
                   ))}
                 </div>
               </div>
              </div>
            )}

        {activeTab === 3 && (
          <div className="text-center text-gray-500 py-10 text-sm">
            Content for "{tabs[activeTab].title}" coming soon.
          </div>
        )}
      </div>
    </section>
  );
}