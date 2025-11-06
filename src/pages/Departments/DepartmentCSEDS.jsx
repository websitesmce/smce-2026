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
import departmentImage from "../../assets/department-img/cse-ds.jpeg";
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
// import labImg13 from "../../assets/labs/cse-lab13.png";
// import labImg14 from "../../assets/labs/cse-lab14.png";

const tabs = [
  { title: "About Department", icon: <Info size={16} /> },
  { title: "PEOs/POs/PSOs", icon: <Target size={16} /> },
  { title: "Course Structure", icon: <BookText size={16} /> },
  { title: "Laboratories", icon: <Cpu size={16} /> },
  { title: "Activities & Events", icon: <FolderKanban size={16} /> },
];

export default function DepartmentCSEDS() {
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
          CSE (DS) Department
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
                the CSE (DS) Department at SMCE.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <img
                src={departmentImage}
                alt="CSE DS Department"
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
                    Computer Science Engineering (Data Science)
                  </span>{" "}
                  (B.Tech. CSE - DS) branch in{" "}
                  <span className="font-semibold text-[#800000]">2020</span>{" "}
                  with an initial intake of{" "}
                  <span className="font-semibold text-[#800000]">120</span>.
                  Center of Excellence Labs have been functioning on cutting
                  edge technologies such as{" "}
                  <span className="font-medium text-[#800000]">
                    Artificial Intelligence & Machine Learning, IoT, Cyber
                    Security, Cloud & Fog Computing
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-[#800000]">
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
                    To educate students to the effective problem – solvers and
                    life – long learners in technical, innovative and
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
                Why Choose SMCE CSE
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
                    MongoDB, Java Full Stack Development etc.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Hardware skills:
                    </span>{" "}
                    Ardunio, Raspberry Pi Boards.
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
                PEOs / POs / PSOs
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Program Educational Objectives, Outcomes, and Specific Outcomes
                of the CSE (DS) Department.
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
                  Graduates able to solve wide range of computing-related
                  problems by applying the knowledge of mathematics and
                  innovative algorithms.
                </li>
                <li>
                  <span className="font-semibold text-[#800000]">PEO 2:</span>{" "}
                  Graduates pursue advanced degrees with a dedication for
                  lifelong learning and use their skills in an ethical &
                  professional manner.
                </li>
                <li>
                  <span className="font-semibold text-[#800000]">PEO 3:</span>{" "}
                  To be able to adapt to the evolving technical challenges and
                  changing career opportunities.
                </li>
              </ul>
            </div>

            {/* POs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#800000]">
                Program Outcomes (POs)
              </h3>
              <ul className="space-y-4 text-base leading-relaxed">
                <li>
                  <strong className="text-[#800000]">
                    PO 1 (Engineering knowledge):
                  </strong>{" "}
                  Apply the knowledge of mathematics, science, engineering
                  fundamentals, and an engineering specialization to the
                  solution of complex engineering problems.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 2 (Problem analysis):
                  </strong>{" "}
                  Identity, formulate, review research literature, and analyze
                  complex engineering problems reaching substantiated
                  conclusions using the first principles of mathematics, natural
                  sciences, and engineering sciences.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 3 (Design/development of solutions):
                  </strong>{" "}
                  Design solutions for complex engineering problems and design
                  system components or processes that meet the specified needs
                  with appropriate consideration for public health and safety,
                  and the cultural, societal, and environmental considerations.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 4 (Conduct investigations of complex problems):
                  </strong>{" "}
                  Use research-based knowledge and research methods including
                  design of experiments, analysis and interpretation of data,
                  and synthesis of the information to provide valid conclusions.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 5 (Modern tool usage):
                  </strong>{" "}
                  Create, select, and apply appropriate techniques, resources,
                  and modern engineering and IT tools including prediction and
                  modeling to complex engineering activities with an
                  understanding of the limitations.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 6 (The engineer and society):
                  </strong>{" "}
                  Apply reasoning informed by the contextual knowledge to assess
                  societal, health, safety, legal and cultural issues and the
                  consequent responsibilities relevant to the professional
                  engineering practice.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 7 (Environment and sustainability):
                  </strong>{" "}
                  Understand the impact of the professional engineering
                  solutions in societal and environmental contexts, and
                  demonstrate the knowledge of, and need for sustainable
                  development.
                </li>
                <li>
                  <strong className="text-[#800000]">PO 8 (Ethics):</strong>{" "}
                  Apply ethical principles and commit to professional ethics and
                  responsibilities and norms of the engineering practice.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 9 (Individual and team work):
                  </strong>{" "}
                  Function effectively as an individual, and as a member or
                  leader in diverse teams, and in multidisciplinary settings.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 10 (Communication):
                  </strong>{" "}
                  Communicate effectively on complex engineering activities with
                  the engineering community and with society at large, such as,
                  being able to comprehend and write effective reports and
                  design documentation, make effective presentations, and give
                  and receive clear instructions.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 11 (Project management and finance):
                  </strong>{" "}
                  Demonstrate knowledge and understanding of the engineering and
                  management principles and apply these to one’s own work, as a
                  member and leader in a team, to manage projects and in
                  multidisciplinary environments.
                </li>
                <li>
                  <strong className="text-[#800000]">
                    PO 12 (Life-long learning):
                  </strong>{" "}
                  Recognize the need for, and have the preparation and ability
                  to engage in independent and life-long learning in the
                  broadest context of technological change.
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
                  Analyze, Identify the data ,Design suitable algorithm by using
                  Latest software for Real Time Applications.
                </li>
                <li>
                  <span className="font-semibold text-[#800000]">PSO 2:</span>{" "}
                  Understand the progressive changes in computing posses data of
                  context-aware relevance of paradigms.
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
                Download the Course Structure and Syllabus of four years of CSE
                course
              </p>
            </div>

            {/* Downloads Section */}
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white border-l-4 border-[#800000] p-5 sm:p-6 rounded-xl shadow-md flex items-start gap-4">
                <BookText size={28} className="text-[#800000] mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#800000]">
                    AI&DS – MR23
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
                    AI&DS – R20
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

        {activeTab === 3 && (
          <div className="space-y-16 text-gray-800">
            {/* Heading */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                CSE(AI&ML) Laboratories
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                We have Fully Equipped Laboratories
              </p>
            </div>

            {/* About Labs Section */}
            <div className="bg-white border-l-4 border-[#800000] shadow-md p-6 sm:p-10 rounded-xl max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl font-semibold text-[#800000]">
                We Have Fully Equipped Laboratories
              </h3>
              <p className="text-base leading-relaxed">
                we have the several Computer Labs equipped with latest
                software's and workstations. It is connected to internet through
                a lease line to facilitate high speed internet access.
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
                {[labImg1, labImg2, labImg3, labImg4, labImg5, labImg6, labImg7, labImg8, labImg9, labImg10, labImg11, labImg12].map(
                  (imgSrc, idx) => (
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
                  )
                )}
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
