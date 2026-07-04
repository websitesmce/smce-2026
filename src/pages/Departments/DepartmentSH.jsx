import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { BookText, FolderKanban, Info, Cpu, Users } from "lucide-react";
import departmentImage from "../../assets/department-img/sh.jpg";
import labImg1 from "../../assets/labs/sh-lab1.png";
import labImg2 from "../../assets/labs/sh-lab2.png";
import labImg3 from "../../assets/labs/sh-lab3.png";
import labImg4 from "../../assets/labs/sh-lab4.png";
import labImg5 from "../../assets/labs/sh-lab5.png";
import labImg6 from "../../assets/labs/sh-lab6.png";
import labImg7 from "../../assets/labs/sh-lab7.png";
import labImg8 from "../../assets/labs/sh-lab8.png";
import labImg9 from "../../assets/labs/sh-lab9.png";
import labImg10 from "../../assets/labs/sh-lab10.png";
import labImg11 from "../../assets/labs/sh-lab11.png";
import labImg12 from "../../assets/labs/sh-lab12.png";
import FacultyTable from "./FacultyTable";

const ashFaculty = [
  { name: "DR. VEMA MADHURI", designation: "Professor", qualification: "Ph.D, M.Sc (Physics)" },
  { name: "Dr. N.V.MAHESH BABU T", designation: "Professor", qualification: "Ph.D., M. Tech (Mech)" },
  { name: "Dr. RAMAVATH RAVI", designation: "Professor", qualification: "Ph.D, M.Sc (Chemistry)" },
  { name: "Dr. P.VIJAY ANAND", designation: "Professor", qualification: "Ph.D., MA (English)" },
  { name: "Dr. GANJI VENKATESWARLU", designation: "Professor", qualification: "Ph.D., M.Sc. (Maths)" },
  { name: "Ch.DANIEL DAYAKAR", designation: "Professor", qualification: "MA (English)" },
  { name: "LAGADAPATI HARIKA", designation: "Associate Professor", qualification: "M.Sc (Chemistry)" },
  { name: "GOSU MERY JANEEFA", designation: "Associate Professor", qualification: "M.Sc (Chemistry)" },
  { name: "K.MASTAN RAO", designation: "Associate Professor", qualification: "M.Sc (Maths)" },
  { name: "J.RADHIKA", designation: "Associate Professor", qualification: "M.Sc (Maths)" },
  { name: "M.LAVANYA", designation: "Associate Professor", qualification: "M.Sc. (Physics)" },
  { name: "SK.AMEER FAREED BASHA", designation: "Associate Professor", qualification: "M.Tech-MECH" },
  { name: "K.RAVI KUMAR", designation: "Associate Professor", qualification: "M.Tech-EEE" },
  { name: "Y.SIREESHA", designation: "Associate Professor", qualification: "MA (English)" },
  { name: "N VENKATA RAJESH", designation: "Associate Professor", qualification: "MCA" },
  { name: "GURRAM HEMALATHA", designation: "Associate Professor", qualification: "MA (English)" },
  { name: "KORITALA LAKSHMI BHAVANI", designation: "Associate Professor", qualification: "M.Sc (Maths)" },
  { name: "PANCHUMARTHY BHASKARA RAO", designation: "Associate Professor", qualification: "M.Sc (Maths)" },
  { name: "PUSHADAPU LAKSHMIPRASAD", designation: "Assistant Professor", qualification: "M.Sc (Chemistry)" },
  { name: "GAMINI BHARGAVI", designation: "Assistant Professor", qualification: "M.Sc (Maths)" },
  { name: "PUSHADAPU VIJAYALAKSHMI", designation: "Assistant Professor", qualification: "MA (English)" },
  { name: "KARKUTY SUBHASHINI", designation: "Assistant Professor", qualification: "M.Sc (Physics)" },
  { name: "G.VENJKATESWARA RAO", designation: "Assistant Professor", qualification: "M.Tech-EEE" },
  { name: "GONU RAJA KUMAR", designation: "Assistant Professor", qualification: "M.Sc (Chemistry)" },
  { name: "PAGELLI BALA NAGAIAH", designation: "Assistant Professor", qualification: "MA (English)" },
  { name: "V ANIL KUMAR", designation: "Assistant Professor", qualification: "M.Tech-MECH" },
  { name: "YADLAPALLI ASHOK", designation: "Assistant Professor", qualification: "M.Tech-CIVIL" },
  { name: "M.SUJANI", designation: "Assistant Professor", qualification: "MCA" },
  { name: "CH SRIKANYA", designation: "Assistant Professor", qualification: "M.Tech-ECE" },
  { name: "BOMMALA SRIVALLI", designation: "Assistant Professor", qualification: "M.Tech-ECE" },
  { name: "DARNASI SIREESHA", designation: "Assistant Professor", qualification: "M.Sc (Chemistry)" },
  { name: "V PRIYANKA", designation: "Assistant Professor", qualification: "MBA" },
  { name: "ANJI BAU CHANDRAJUPALLI", designation: "Assistant Professor", qualification: "M.Sc. (Maths)" },
  { name: "ANJANEYULU SIRASANI", designation: "Assistant Professor", qualification: "M.Sc. (Maths)" },
  { name: "R ANUSHA", designation: "Assistant Professor", qualification: "M.Tech-EEE" },
  { name: "BHIMA EDUKONDALU", designation: "Assistant Professor", qualification: "M.Tech-EEE" },
  { name: "A SRIJA", designation: "Assistant Professor", qualification: "M.Sc (Comp)" },
  { name: "A.ANUSHA", designation: "Assistant Professor", qualification: "MCA" },
  { name: "M.ANANTHA LAKSHMI", designation: "Assistant Professor", qualification: "MCA" },
  { name: "CHINNABATHULA BABU", designation: "Assistant Professor", qualification: "MPEd" },
  { name: "G.DEEPTHI", designation: "Assistant Professor", qualification: "MCA" },
  { name: "K.V NAGARJUNA", designation: "Assistant Professor", qualification: "MCA" },
  { name: "K.ANANTHA LAKSHMI", designation: "Assistant Professor", qualification: "MCA" },
  { name: "U.NAGA JYHOTHI", designation: "Assistant Professor", qualification: "MBA" },
  { name: "MD PARVEEN", designation: "Assistant Professor", qualification: "M.Tech-ECE" },
  { name: "CH. SIVA RAMA KRISHNA", designation: "Assistant Professor", qualification: "MBA" },
  { name: "PRAKASH POKURI", designation: "Assistant Professor", qualification: "M.Tech-ECE" },
];

const tabs = [
  { title: "About Department", icon: <Info size={16} /> },
  { title: "Course Structure", icon: <BookText size={16} /> },
  { title: "Laboratories", icon: <Cpu size={16} /> },
  { title: "Activities & Events", icon: <FolderKanban size={16} /> },
  // { title: "Faculty", icon: <Users size={16} /> },
];

export default function DepartmentSH() {
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

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  return (
    <section className="pt-[120px] px-6 sm:px-10 md:px-16 lg:px-24 pb-24 bg-[#f9f9f9] text-gray-800">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#800000]">
          Applied Sciences &amp; Humanities
        </h1>
        <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
          Laying the scientific and humanistic foundation for engineering excellence at SMCE.
        </p>
      </div>

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
                  className="block md:hidden ml-2 overflow-hidden whitespace-nowrap"
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
                Discover the foundation and values of the AS&amp;H Department at SMCE.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <img
                loading="lazy"
                src={departmentImage}
                alt="AS&H Department"
                className="rounded-xl w-full h-auto object-cover shadow-md"
              />
              <div className="space-y-6 text-base leading-relaxed">
                <p className="text-xl">
                  Sri Mittapalli College of Engineering has a robust{" "}
                  <span className="font-semibold text-[#800000]">Sciences and Humanities</span>{" "}
                  department with dedicated faculty, excellent infrastructure, and fully equipped
                  laboratories for conducting experiments as prescribed by the{" "}
                  <span className="font-semibold text-[#800000]">AICTE guidelines</span>, Autonomous
                  syllabus based on the UGC Model Curriculum and beyond.
                </p>
                <p className="text-base leading-relaxed text-gray-700">
                  The department consists of a dynamic team with a unique combination of different
                  disciplines — Languages, Management Studies, Mathematics, Physics, Chemistry,
                  Professional Ethics, Environmental Studies, Physical Education, and Library and
                  Information Sciences.
                </p>
              </div>
            </div>

            <div className="bg-[#fffaf5] border-l-4 border-[#800000] p-6 sm:p-8 rounded-xl shadow-md max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-3">
                Our Purpose
              </h3>
              <p className="text-gray-700 text-base sm:text-lg">
                The department prepares incoming freshers for a successful college career in
                engineering and imbibes the qualities of continuous learning. It teaches on both UG
                and PG engineering programs, and plays an active role in conducting Soft Skills,
                Verbal Reasoning, Quantitative Aptitude, Critical Reading and Problem-Solving
                training through the finishing school program spread over all four years of B.Tech.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 space-y-10 text-center max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-3">
                  Vision
                </h3>
                <p className="text-base leading-relaxed">
                  To impart quality education through exploration and experimentation and generate
                  socially-conscious engineers, embedding ethics and values, for the advancement of
                  science and technology.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-3">
                  Mission
                </h3>
                <p className="text-base leading-relaxed text-left max-w-3xl mx-auto">
                  To lay the necessary scientific and mathematical foundations and prepare students
                  for the teamwork that integrates self-learning required for success in engineering
                  and related professions — including communication skills, mutual accountability,
                  and respect for individuals from different social strata; while also preparing
                  them to learn, practice and apply high ethical standards reflecting universal
                  human values for professional development.
                </p>
              </div>
            </div>

            <div className="bg-[#f9f9f9] rounded-xl shadow-inner p-6 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-6">
                Objectives
              </h3>
              <ul className="space-y-4 text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#800000] font-bold mt-1">✓</span>
                  Prepare students by introducing them to the skills, habits, and attitudes that
                  lead to success through the induction programme.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#800000] font-bold mt-1">✓</span>
                  Give a common starting point to all students by addressing varying weaknesses of
                  incoming students with a diverse background through bridge courses.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#800000] font-bold mt-1">✓</span>
                  Provide solid foundation in mathematical and scientific fundamentals necessary for
                  understanding engineering concepts.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#800000] font-bold mt-1">✓</span>
                  Develop communicative, managerial, analytical, quantitative, creative skills and
                  sportsmanship with a sharp focus on environmental issues and professional ethics.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#800000] font-bold mt-1">✓</span>
                  Produce a human engineer with universal human values who is willing to learn,
                  perform, excel, innovate and face the challenges of the globalized competitive
                  professional environment successfully.
                </li>
              </ul>
            </div>

            <div className="bg-[#f9f9f9] rounded-xl shadow-inner p-6 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-6">
                Strengths
              </h3>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4 text-base leading-relaxed">
                <li>✓ Vibrant academic environment</li>
                <li>✓ Well-experienced and dedicated faculty</li>
                <li>✓ Application-oriented teachings</li>
                <li>✓ Development of soft skills</li>
                <li>✓ Individual counselling for every student</li>
                <li>✓ Finishing school program across all 4 years</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-16 text-gray-800">
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
                Course Structure
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Download the Course Structure and Syllabus for AS&amp;H courses.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white border-l-4 border-[#800000] p-5 sm:p-6 rounded-xl shadow-md flex items-start gap-4">
                <BookText size={28} className="text-[#800000] mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#800000]">AS&amp;H – MR23</h3>
                  <p className="text-gray-700">
                    Download the detailed syllabus and structure for the MR23 regulation.
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
                  <h3 className="text-xl font-semibold text-[#800000]">AS&amp;H – R20</h3>
                  <p className="text-gray-700">
                    Download the detailed syllabus and structure for the R20 regulation.
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
                AS&amp;H Laboratories
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Our department houses foundational laboratories that support core science and
                communication skill development for first-year engineering students.
              </p>
            </div>

            <div className="bg-white border-l-4 border-[#800000] shadow-md p-6 sm:p-10 rounded-xl max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl font-semibold text-[#800000]">
                Fully Equipped Laboratories
              </h3>
              <p className="text-base leading-relaxed">
                The AS&amp;H department is equipped with an English Language and Communication Skills
                Lab, Physics Lab, and Chemistry Lab to provide strong fundamental knowledge and
                experimental exposure.
              </p>
              <p className="text-base leading-relaxed">
                These labs are structured to instil practical understanding and prepare students to
                grasp core engineering principles in higher semesters.
              </p>
              <p className="text-base leading-relaxed">
                All laboratories are well-maintained with modern instruments, audio-visual aids, and
                experienced faculty who guide students with individual attention and mentorship.
              </p>
            </div>

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
                        loading="lazy"
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

        {activeTab === 3 && (
          <div className="text-center text-gray-500 py-10 text-sm">
            Content for "{tabs[activeTab].title}" coming soon.
          </div>
        )}

        {activeTab === 4 && (
          <FacultyTable faculty={ashFaculty} departmentName="Applied Sciences & Humanities" />
        )}
      </div>
    </section>
  );
}
