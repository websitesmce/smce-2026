import React, { useEffect, useRef, useState } from "react";
import { FileText, Users, Home } from "lucide-react";
import { gsap } from "gsap";

const tabs = [
  { title: "IQAC Home", icon: <Home size={16} /> },
  { title: "IQAC Members", icon: <Users size={16} /> },
  { title: "IQAC A.Y Reports", icon: <FileText size={16} /> },
];

export default function IQAC() {
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
    <section className="pt-[120px] px-6 sm:px-10 md:px-16 lg:px-24 pb-24 bg-[#f9f9f9] text-gray-800">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#800000]">IQAC</h1>
        <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
          Internal Quality Assurance Cell information, members and reports.
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
                  }`}
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

      {/* Content */}
      <div ref={contentRef} className="mt-10">
        {activeTab === 0 && (
          <div className="space-y-12 text-gray-800">
            {/* Section: Overview */}
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-md border-l-4 border-[#800000]">
              <h2 className="text-2xl font-bold text-[#800000] mb-4 flex items-center gap-2">
                <Home size={20} /> Overview
              </h2>
              <p className="text-base leading-relaxed">
                To sustain the quality of all the academic process and outcomes with continuous improvement,
                Internal Quality Assurance Cell (IQAC) established at the college level shall regularly monitor
                all the academic operations as per the academic regulations and SOPs set for each of the various
                processes. Towards realization of the goals of quality enhancement & sustenance, IQAC with external
                members nominated from universities of repute shall conduct academic audit annually while internal
                academic audit will be done every semester.
              </p>
            </div>

            {/* Section: Objectives */}
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-md border-l-4 border-[#800000]">
              <h2 className="text-2xl font-bold text-[#800000] mb-4 flex items-center gap-2">
                🎯 Objectives
              </h2>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li>
                  To develop a system for conscious, consistent and catalytic action to improve the academic
                  and administrative performance of the institution.
                </li>
                <li>
                  The IQAC will provide greater clarity and focus in institutional functioning towards quality
                  enhancement and facilitate internalization of the quality culture.
                </li>
                <li>
                  To promote measures for institutional functioning towards quality enhancement through internalization
                  of quality culture and institutionalization of best practices.
                </li>
              </ul>
            </div>

            {/* Section: Strategies */}
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-md border-l-4 border-[#800000]">
              <h2 className="text-2xl font-bold text-[#800000] mb-4 flex items-center gap-2">
                📌 Strategies
              </h2>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li>Ensuring timely, efficient and progressive performance of academic, administrative and financial tasks.</li>
                <li>The relevance and quality of academic and research programmes.</li>
                <li>Equitable access to and affordability of academic programmes for various sections of society.</li>
                <li>Optimization and integration of modern methods of teaching and learning.</li>
                <li>Ensuring the adequacy, maintenance and proper allocation of support structure and services.</li>
                <li>Sharing of research findings and networking with other institutions in India and abroad.</li>
              </ul>
            </div>

            {/* Section: Functions */}
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-md border-l-4 border-[#800000]">
              <h2 className="text-2xl font-bold text-[#800000] mb-4 flex items-center gap-2">
                🛠️ Functions
              </h2>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li>
                  Dissemination of information on various quality parameters of higher education. Acting as a
                  nodal agency of the Institution for coordinating quality-related activities.
                </li>
                <li>Development of Quality Culture in the institution.</li>
                <li>
                  Development and application of quality benchmarks/parameters for the various academic and administrative
                  activities of the institute.
                </li>
                <li>
                  Facilitating the creation of a learner-centric environment conductive for quality education and
                  faculty maturation to adopt the required knowledge and technology for participatory teaching and
                  learning process.
                </li>
                <li>
                  Arrangement for feedback responses from students, parents and other stakeholders on quality-related
                  institutional processes.
                </li>
                <li>
                  Organization of inter and intra institutional workshops, seminars on quality related themes and
                  promotion of quality circles.
                </li>
                <li>
                  Documentation of various programmes/activities of the institute leading to quality improvement.
                </li>
              </ul>
            </div>

            {/* Section: Benefits */}
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-md border-l-4 border-[#800000]">
              <h2 className="text-2xl font-bold text-[#800000] mb-4 flex items-center gap-2">
                💡 Benefits
              </h2>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li>Ensure heightened level of clarity and focus in institutional functioning towards quality enhancement.</li>
                <li>Act as a dynamic system for quality changes in HEIs.</li>
                <li>Ensure enhancement and coordination among various activities of the institution and institutionalize all good practices.</li>
                <li>Build an organized methodology of documentation and internal communication.</li>
                <li>Provide a sound basis for decision-making to improve institutional functioning.</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-[#800000] text-white">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">S.NO</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">MEMBER NAME</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">CATEGORY</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">POSITION</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {[
                  ["1", "Dr.S.Gopi Krishna", "Head of the Institute", "Chairman"],
                  ["2", "Dr. Sk. J. Shareef, Professor & HoD, MBA", "Coordinator of IQAC", "Secretary"],
                  ["3", "Dr. S. V. Naresh, Assoc. Professor, ECE", "Faculty Representatives", "Member"],
                  ["4", "M. Ashok Naga Sai, Asst. Professor, AI", "Faculty Representatives", "Member"],
                  ["5", "Dr. Sk. Md. Rafi, Professor & HoD, AI & IT", "Faculty Representatives", "Member"],
                  ["6", "S.V. Kishore Kumar, Asst. Professor, CSE", "Faculty Representatives", "Member"],
                  ["7", "M. Saraswathi, Assoc. Professor, MBA", "Faculty Representatives", "Member"],
                  ["8", "M. Jaya Rao, Asst. Professor, ASH", "Faculty Representatives", "Member"],
                  ["9", "M. V. Ramana, Asst. Professor, CSE", "Faculty Representatives", "Member"],
                  ["10", "K. Tirupathaiah, Asst. Professor, ECE", "Faculty Representatives", "Member"],
                  ["11", "E. Adi Narayana, Assoc. Professor, CSE", "Faculty Representatives", "Member"],
                  ["12", "M. Kishore Kumar, Vice-President, SMCE", "Management Representative", "Member"],
                  ["13", "Dr. S. Gopi Krishna, Vice-Principal, Professor & HoD CSE.", "Senior Administrative Faculty", "Member"],
                  ["14", "Dr. M. NageswaraRao, Assoc. Professor, ECE", "Senior Administrative Faculty", "Member"],
                  ["15", "Dr. V. Madhuri, Assoc. Professor & HoD ASH.", "Female Faculty Representative", "Member"],
                  ["16", "Dr. Y. Saritha, Assoc. Professor, ASH", "Female Faculty Representative", "Member"],
                  ["17", "M. NagaLakshmi, Assoc. Professor, ASH", "Female Faculty Representative", "Member"],
                  ["18", "MM. ParameswaraRao, Secretary, Alumni Association", "Nominee from Alumni", "Member"],
                  ["19", "A. Revanth, Savantis Solutions, Hyderabad", "Nominee from Employers", "Member"],
                  ["20", "G. Shasidhar, General Manager, Mittapalli Spinners Ltd.", "Nominee from Industrialists", "Member"],
                  ["21", "B. Sai Akash Reddy (19U91A0517)", "Student Representative", "Member"],
                  ["22", "MJ. Lahari (19U91A0565)", "Student Representative", "Member"],
                ].map(([no, name, category, position], index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#f5f0f0] transition-colors"
                  >
                    <td className="px-4 py-3">{no}</td>
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3">{category}</td>
                    <td className="px-4 py-3">{position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 2 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[#800000]">IQAC Minutes & Action Taken Reports</h2>
              <p className="text-gray-600">Download academic year-wise reports below.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                "2017-2018",
                "2018-2019",
                "2019-2020",
                "2020-2021",
                "2021-2022",
                "2022-2023",
                "2023-2024",
              ].map((year, index) => (
                <a
                  key={index}
                  href={`../../../public/pdfs/${year}IQAC.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3 border border-[#800000] rounded-md hover:bg-[#800000] hover:text-white transition duration-300"
                >
                  <span>{year}</span>
                  <span className="text-sm">Download PDF</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}