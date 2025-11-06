import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  BookText,
  FolderKanban,
  Info,
  Target,
  Cpu,
  FileText,
} from "lucide-react";
import {
  IconCpu,
  IconWaveSawTool,
  IconRadar,
  IconAntenna,
  IconWorldWww,
  IconRobot,
  IconTopologyFull,
  IconCertificate,
  IconCode,
} from "@tabler/icons-react";
import departmentImage from "../../assets/department-img/ece.png";
import labImg1 from "../../assets/labs/ece-lab1.jpeg";
import labImg2 from "../../assets/labs/ece-lab2.png";
import labImg3 from "../../assets/labs/ece-lab3.png";
import labImg4 from "../../assets/labs/ece-lab4.png";
import labImg5 from "../../assets/labs/ece-lab5.png";
import labImg6 from "../../assets/labs/ece-lab6.png";
import labImg7 from "../../assets/labs/ece-lab7.png";
import labImg8 from "../../assets/labs/ece-lab8.png";
import labImg9 from "../../assets/labs/ece-lab9.png";
import labImg10 from "../../assets/labs/ece-lab10.png";
import labImg11 from "../../assets/labs/ece-lab11.png";
import labImg12 from "../../assets/labs/ece-lab12.png";
import labImg13 from "../../assets/labs/ece-lab13.png";
import labImg14 from "../../assets/labs/ece-lab14.png";

const tabs = [
  { title: "About Department", icon: <Info size={16} /> },
  { title: "PEOs/POs/PSOs", icon: <Target size={16} /> },
  { title: "Course Structure", icon: <BookText size={16} /> },
  { title: "Laboratories", icon: <Cpu size={16} /> },
  { title: "Activities & Events", icon: <FolderKanban size={16} /> },
  { title: "Course Files & Lab Manuals", icon: <FileText size={16} /> },
];

export default function DepartmentECE() {
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

  return (
    <section className="pt-[120px] px-6 sm:px-10 md:px-16 lg:px-24 pb-24 bg-[#f9f9f9] to-white text-gray-800">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#800000]">
          Electronics & Communication Engineering
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
                  maxWidth:
                    window.innerWidth < 768
                      ? isActive
                        ? "180px"
                        : "42px"
                      : "none",
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
          <div className="space-y-20 text-gray-800">
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                About the Department
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the purpose, vision, and mission of the ECE Department
                at SMCE.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <img
                src={departmentImage}
                alt="ECE Department"
                className="rounded-xl w-full h-auto object-cover shadow-md"
              />
              <div className="space-y-6 text-base leading-relaxed">
                <p className="text-xl">
                  To cater to the growing demand of Electronic professionals
                  from global organizations,{" "}
                  <span className="font-semibold text-[#800000]">
                    Sri Mittapalli College of Engineering (SMCE)
                  </span>{" "}
                  has set up an undergraduate course in
                  <span className="font-semibold text-[#800000]">
                    {" "}
                    Electronics and Communication Engineering (B.Tech. ECE)
                  </span>{" "}
                  branch in{" "}
                  <span className="font-semibold text-[#800000]">
                    2006
                  </span>{" "}
                  with an initial intake of{" "}
                  <span className="font-semibold text-[#800000]">60</span> and
                  to 90 in the following years. A post graduate course also has
                  been introduced in the year 2010 in Electronics and
                  Communication Engineering (M.Tech. VLSI&ES). Center of
                  Excellence Labs have been functioning on cutting edge
                  technologies such as Circuits Lab, Communications Lab,
                  Microwave and Optical Communication Lab, and Simulation Lab,
                  etc.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 space-y-10 text-center max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-3">
                  Vision of the Department
                </h3>
                <p className="text-base leading-relaxed">
                  To produce innovative Electronics & Communication engineers by
                  imparting quality technical education with ethical and moral
                  values to meet the Global Standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-3">
                  Mission of the Department
                </h3>
                <ul className="space-y-4 text-base text-left max-w-xl mx-auto leading-relaxed">
                  <li>
                    <span className="font-semibold text-[#800000]">M1</span> –
                    To establish an excellent teaching learning process that
                    enables the students to face the challenges of the
                    Electronics and Communication Engineering
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">M2</span> –
                    To promote the inventions of allied technologies in
                    Electronics and Communication Engineering to have exposure
                    of global scenario.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">M3</span> –
                    To develop value based ethical leadership among the students
                    for the prospective of society
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#f9f9f9] rounded-xl shadow-inner p-6 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-6">
                Why Choose SMCE ECE
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
                  <IconCpu size={24} className="text-[#800000]" />
                  Focus Areas
                </h3>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-3">
                    <IconWaveSawTool
                      size={20}
                      className="mt-1 text-[#800000]"
                    />
                    Embedded Systems
                  </li>
                  <li className="flex items-start gap-3">
                    <IconTopologyFull
                      size={20}
                      className="mt-1 text-[#800000]"
                    />
                    Neural Networks
                  </li>
                  <li className="flex items-start gap-3">
                    <IconRadar size={20} className="mt-1 text-[#800000]" />
                    Radar Systems
                  </li>
                  <li className="flex items-start gap-3">
                    <IconAntenna size={20} className="mt-1 text-[#800000]" />
                    Antennas
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
                    <IconWaveSawTool
                      size={20}
                      className="mt-1 text-[#800000]"
                    />
                    Signals & Systems
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCertificate
                      size={20}
                      className="mt-1 text-[#800000]"
                    />
                    Security Certifications
                  </li>
                  <li className="flex items-start gap-3">
                    <IconTopologyFull
                      size={20}
                      className="mt-1 text-[#800000]"
                    />
                    Communication Networks
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
                      Coding & Designing:
                    </span>{" "}
                    Programming skills in C, C++, VLSI, Chip Design, Ardunio,
                    Raspberry Pi Boards.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Soft skills:
                    </span>{" "}
                    Hobby clubs, Mock Interviews.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-16 text-gray-800">
            {/* Heading */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                PEOs / PSOs
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Program Educational Objectives and Specific Outcomes of the ECE
                Department.
              </p>
            </div>

            {/* PEOs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#800000]">
                Program Educational Objectives (PEOs)
              </h3>
              <ul className="space-y-4 text-base leading-relaxed">
                <li>
                  <span className="font-semibold text-[#800000]">PEO 1:</span>{" "}
                  To prepare graduates to become successful professionals in
                  industry, government, academia, research and entrepreneurship.
                </li>
                <li>
                  <span className="font-semibold text-[#800000]">PEO 2:</span>{" "}
                  To contribute for meeting the society needs in solving
                  technical problems using electronics communications
                  engineering ideology, tools and practices.
                </li>
                <li>
                  <span className="font-semibold text-[#800000]">PEO 3:</span>{" "}
                  To inculcate professional and human values, effective
                  communication skills, Team spirit & leadership qualities
                </li>
              </ul>
            </div>

            {/* PSOs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#800000]">
                Program Specific Outcomes (PSOs)
              </h3>
              <ul className="space-y-4 text-base leading-relaxed">
                <li>
                  <span className="font-semibold text-[#800000]">PSO 1:</span>{" "}
                  Apply domain specific knowledge for the design and analysis of
                  recent trends in Electronics and Communication Engineering
                  applications.
                </li>
                <li>
                  <span className="font-semibold text-[#800000]">PSO 2:</span>{" "}
                  Capability in using electronic modern IT tools (both software
                  and hardware) for solving complex problems in electronic and
                  communication systems.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-16 text-gray-800">
            {/* Section Heading */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                Course Structure for all Years
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Download the Course Structure and Syllabus of four years of ECE
                course
              </p>
            </div>

            {/* Downloads Section */}
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white border-l-4 border-[#800000] p-5 sm:p-6 rounded-xl shadow-md flex items-start gap-4">
                <BookText size={28} className="text-[#800000] mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#800000]">
                    ECE – MR23
                  </h3>
                  <p className="text-gray-700">
                    Download the detailed syllabus and structure for the MR23
                    regulation.
                  </p>
                  <a
                    href="/pdfs/ece-mr23.pdf"
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
                    ECE – R20
                  </h3>
                  <p className="text-gray-700">
                    Download the detailed syllabus and structure for the R20
                    regulation.
                  </p>
                  <a
                    href="/pdfs/ece-r20.pdf"
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
        {activeTab === 3 && (
          <div className="space-y-16 text-gray-800">
            {/* Heading */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                ECE Laboratories
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our fully equipped Electronics & Communication labs with
                cutting-edge tools and systems.
              </p>
            </div>

            {/* About Labs Section */}
            <div className="bg-white border-l-4 border-[#800000] shadow-md p-6 sm:p-10 rounded-xl max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl font-semibold text-[#800000]">
                We Have Fully Equipped Laboratories
              </h3>
              <p className="text-base leading-relaxed">
                We have several Computer Labs equipped with latest software's
                and workstations. It is connected to internet through a lease
                line to facilitate high speed internet access.
              </p>
              <p className="text-base leading-relaxed">
                All the computers are connected through a structured network.
                Printer and copier facilities are also available in the lab.
              </p>
              <p className="text-base leading-relaxed">
                Our dedicated faculty and staff are proud of their impressive
                credentials, which are comparable to those of the best career
                instructors.
              </p>
            </div>

            {/* Gallery */}
              {/* Gallery */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#800000] text-center">
                  Lab Facilities Gallery
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[labImg1, labImg2, labImg3, labImg4, labImg5, labImg6, labImg7, labImg8, labImg9, labImg10, labImg11, labImg12, labImg13, labImg14].map((imgSrc, idx) => (
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

        {activeTab === 4 && (
          <div className="text-center text-gray-500 py-10 text-sm">
            Content for "{tabs[activeTab].title}" coming soon.
          </div>
        )}
        {activeTab === 5 && (
          <div className="space-y-16 text-gray-800">
            {/* Section Heading */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                Course Files & Lab Manuals
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Access curated course files and detailed lab manuals essential
                for the ECE curriculum.
              </p>
            </div>

            {/* Course Files Section */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-[#800000] text-center">
                Course Files (PDF Downloads)
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-3 border-l-4 border-[#800000] hover:shadow-lg transition duration-300"
                  >
                    <h4 className="font-semibold text-[#800000] text-lg">
                      Course File {index + 1}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Download syllabus, notes, and materials for semester
                      courses.
                    </p>
                    <a
                      href={`#`} // replace with actual link
                      className="text-sm text-[#800000] font-medium underline hover:text-red-700 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Lab Manuals Section */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-[#800000] text-center">
                Lab Manuals
              </h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  { title: "DSP Lab Manual", id: 1 },
                  { title: "SS Lab Manual", id: 2 },
                  { title: "STLD Lab Manual", id: 3 },
                  { title: "VLSI Lab Manual", id: 4 },
                ].map((lab, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition flex items-start gap-4"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-[#800000] text-white rounded-full text-lg font-bold">
                      {lab.title.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#800000]">
                        {lab.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Comprehensive guide covering experiments, procedures,
                        and outcomes.
                      </p>
                      <a
                        href={`#`} // replace with actual link
                        className="text-sm mt-2 inline-block text-[#800000] underline font-medium hover:text-red-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download Manual
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
