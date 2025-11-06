import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GoverningBody() {
  const titleRef = useRef(null);
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
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  const members = [
    ["1", "Sri M. Srinivasa Chakravarthy", "Chairman", "Management"],
    ["2", "Sri M.V.Koteswara Rao", "Members of the Trust/Society/Management", "Management"],
    ["3", "Sri M.B.V.Satyanarayana", "Members of the Trust/Society/Management", "Management"],
    ["4", "Sri. M. Kishore Kumar", "Members of the Trust/Society/Management", "Management"],
    ["5", "Sri M. Ramesh Babu", "Members of the Trust/Society/Management", "Management"],
    ["6", "Sri Y.Srinivas", "Industrialist/Educationalist", "Management"],
    ["7", "Dr. M. Nageswara Rao", "Faculty Member", "Management"],
    ["8", "Dr.Sk.J.Shareef", "Faculty Member", "Management"],
    ["9", "Sri. Ch. Srinivasa Rao", "Administrative Officer", "Management"],
    ["10", "Principal, Govt.Polytechnic College, Repalle", "State Govt. Nominee", "State Govt. Nominee"],
    ["11", "Dr. K.Ravindra", "Member", "JNTUK, Kakinada"],
    ["12", "Dr. S.Gopi Krishna Member Secretary", "Principal, SMCE", "Management"],
  ];

  return (
    <div className="min-h-screen pt-[100px] pb-20 bg-white text-gray-800">
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex flex-col items-center justify-center relative text-center"
        style={{ backgroundImage: "url('/images/governing-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="z-10 px-4">
          <h1 ref={titleRef} className="text-white text-4xl sm:text-5xl font-extrabold">
            Governing Body
          </h1>
          <p className="text-white text-lg mt-4 max-w-2xl mx-auto">
            Empowering SMCE with strategic oversight and institutional development
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div ref={contentRef} className="mt-16 max-w-6xl mx-auto">
        <div className="overflow-x-auto shadow-md rounded-xl">
          <table className="min-w-full table-auto text-sm sm:text-base">
            <thead className="bg-[#800000] text-white">
              <tr>
                <th className="px-4 py-3 text-left">S.No</th>
                <th className="px-4 py-3 text-left">Member Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Nominated By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {members.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#fdf4f4] transition duration-200"
                >
                  {row.map((cell, idx) => (
                    <td key={idx} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Description Section */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#fff6f6] p-6 sm:p-10 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-bold text-[#800000]">Functions of the Governing Body</h2>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              Guide the college while fulfilling the objectives for which the
              college has been granted autonomous status.
            </li>
            <li>
              Institute scholarships, fellowships, studentships, medals, prizes and
              certificates on the recommendations of the Academic Council.
            </li>
            <li>Approve new programmes of study leading to degrees and/or diplomas.</li>
            <li>
              All recruitments of Teaching Faculty/Principal shall be made by the
              Governing Body/state government as applicable in accordance with the
              policies laid down by the UGC and State Government from time to time.
            </li>
            <li>
              To approve annual budget of the college before submitting the same at
              the UGC.
            </li>
            <li>
              Perform such other functions and institute committees, as may be
              necessary and deemed fit for the proper development of the college.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
