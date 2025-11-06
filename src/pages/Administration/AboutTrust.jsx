import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chairman from "./Chairman";
import Director from "./Director";
import Principal from "./Principal";
import Secretary from "./Secretary";
import VicePresident from "./VicePresident";

gsap.registerPlugin(ScrollTrigger);

const trustMembers = [
  { name: "Sri Mittapalli Venkata Koteswara Rao", role: "Managing Trustee" },
  { name: "Sri Mittapalli Bala Parvathamma", role: "Trustee" },
  { name: "Sri Mittapalli Bheemeswara Venkata Satyanarayana", role: "Trustee" },
  { name: "Sri Mittapalli Srinivasa Chakravarthi", role: "Trustee" },
  { name: "Sri Mittapalli Kishore Kumar", role: "Trustee" },
  { name: "Sri Mittapalli Ramesh Babu", role: "Trustee" },
];

export default function AboutTrust() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-text").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 97%",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 mt-[70px] sm:px-12 md:px-20 py-24 text-gray-800 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading with background before */}
        <div className="relative mb-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-1 relative z-10 reveal-text">
            SRI MITTAPALLI TRUST
          </h2>
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <span className="text-[26vw] sm:text-[12vw] font-extrabold text-gray-400 opacity-30 tracking-wide select-none">
              TRUST
            </span>
          </div>
        </div>

        <p className="text-center text-[#800000] font-medium mb-8 reveal-text">
          (ESTABLISHED IN 2005)
        </p>

        <h3 className="text-2xl font-semibold mb-3 reveal-text text-gray-800">About Trust</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 reveal-text">
          Sri Mittapalli Trust is a non-profit organization registered in 2005. It strives
          hard to bring out the hidden sparks from the students to mould them as
          entrepreneurs of high order. It renders reliable service to the national cause of
          improving the quality of life of our people, with emphasis on the betterment of
          rural communities and their economic development. Our credo is to provide
          all-round development with a sound moral base. Surging ahead with a spirit of
          healthy competition, balancing a successful career with a contented life, is the
          gift offered to all students.
        </p>

        <h3 className="text-xl font-semibold mb-3 reveal-text text-gray-800">Trust Activities</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-12 reveal-text">
          <li>Scholarship is offered by the Trust to meritorious students.</li>
          <li>Maintenance, growth, and development of academic standards.</li>
          <li>Generating and promoting opportunities for self-employment.</li>
          <li>Dedicated to socio-economic change across class, culture, or religion.</li>
          <li>Fostering character building and nurturing the inquisitive spirit of students.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4 reveal-text text-gray-800">Trust Members</h3>
        <div className="overflow-x-auto reveal-text">
          <table className="min-w-full border border-gray-200 text-sm sm:text-base shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold text-gray-800">
                  Trustee Name
                </th>
                <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold text-gray-800">
                  Designation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trustMembers.map((member, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#f8f8f8] transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-gray-700">{member.name}</td>
                  <td className="px-4 py-3 text-gray-600">{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Chairman />
      <Secretary />
      <Director/>
      <Principal />
      <VicePresident />
    </section>
  );
}