import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const councilMembers = [
  { sno: 1, name: "Dr. S.Gopi Krishna, Chairman", category: "Principal, SMCE", nominated: "Ex-officio" },
  { sno: 2, name: "Dr. K.Venkata Reddy", category: "Director, Academic and Planning, JNTUK", nominated: "JNTUK, Kakinada" },
  { sno: 3, name: "Dr.B. Balakrishna", category: "Director of Evaluation, JNTUK", nominated: "JNTUK, Kakinada" },
  { sno: 4, name: "Dr.V.Srinivaulu", category: "Professor of CE, UCEK, JNTUK", nominated: "JNTUK, Kakinada" },
  { sno: 5, name: "Sri K. Seetharam", category: "Industrialist", nominated: "Governing Body" },
  { sno: 6, name: "Sri M.Narendra", category: "Industrialist", nominated: "Governing Body" },
  { sno: 7, name: "Sri T. Vijay Kumar", category: "Industrialist", nominated: "Governing Body" },
  { sno: 8, name: "Dr.P.V.Naganjaneyulu", category: "Educationalist", nominated: "Governing Body" },
  { sno: 9, name: "Mr. M.V. Ramana", category: "HoD CSE", nominated: "Ex-officio" },
  { sno: 10, name: "Dr. Sk. MD. Rafi", category: "HoD IT & AI", nominated: "Ex-officio" },
  { sno: 11, name: "Mr. P.L.N.Manoj Kumar", category: "HoD DS", nominated: "Ex-officio" },
  { sno: 12, name: "Mr. K. Tirupathaiah", category: "HoD ECE", nominated: "Ex-officio" },
  { sno: 13, name: "Dr. V. Madhuri", category: "HoD ASH", nominated: "Ex-officio" },
  { sno: 14, name: "Dr. Sk. J. Shareef", category: "HoD MBA", nominated: "Ex-officio" },
  { sno: 15, name: "Dr. M. Nageswara Rao", category: "Controller of Examinations", nominated: "Ex-officio" },
  { sno: 16, name: "Dr.SK.MD.Rafi", category: "Coordinator, R&D", nominated: "Ex-officio" },
  { sno: 17, name: "Dr.Sk.J.Shareef", category: "Coordinator, IQAC", nominated: "Ex-officio" },
  { sno: 18, name: "Mr. K.Vijay Kumar", category: "Training & Placement Officer", nominated: "Ex-officio" },
  { sno: 19, name: "Mr. M.V. Pavan Kumar", category: "Faculty Member", nominated: "Ex-officio" },
  { sno: 20, name: "Dr. Y. Saritha", category: "Faculty Member", nominated: "Ex-officio" },
  { sno: 21, name: "Mr. Y. Yesu Babu", category: "Faculty Member", nominated: "Ex-officio" },
  { sno: 22, name: "Mr. M. Parameswara Rao", category: "Faculty Member", nominated: "Ex-officio" }
];

export default function AcademicCouncil() {
  const titleRef = useRef(null);
  const tableRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );
    gsap.fromTo(
      tableRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 85%",
        },
      }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-[100px] pb-20">
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/images/statutory-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          Academic Council – SMCE
        </h1>
      </div>

      {/* Table Section */}
      <div ref={tableRef} className="mt-16 max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-[#800000] text-white">
            <tr>
              <th className="p-3 text-left">S.NO</th>
              <th className="p-3 text-left">Member Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Nominated By</th>
            </tr>
          </thead>
          <tbody>
            {councilMembers.map((member, index) => (
              <tr key={index} className="hover:bg-[#fff5f5] transition-all">
                <td className="p-3 border-t border-gray-200">{member.sno}</td>
                <td className="p-3 border-t border-gray-200">{member.name}</td>
                <td className="p-3 border-t border-gray-200">{member.category}</td>
                <td className="p-3 border-t border-gray-200">{member.nominated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Functions Section */}
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto mt-16 bg-[#fff6f6] p-6 sm:p-10 rounded-xl shadow space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#800000] mb-2">
          Functions of the Academic Council
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Scrutinize and approve proposals from the Boards of Studies on curricula,
            regulations, syllabus, and evaluation methods.
          </li>
          <li>
            Make regulations regarding student admissions in line with Government policy.
          </li>
          <li>
            Create rules for sports, hostels, and extra-curricular activities.
          </li>
          <li>
            Recommend new study programs to the Governing Body.
          </li>
          <li>
            Propose scholarships, fellowships, and prizes with awarding criteria.
          </li>
          <li>
            Advise the Governing Body on academic matters and policies.
          </li>
          <li>
            Perform any other academic functions assigned by the Governing Body.
          </li>
        </ul>
      </div>
    </div>
  );
}
