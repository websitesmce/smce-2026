import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const UG_DATA = [
  {
    program: "B.Tech – Computer Science and Engineering",
    convener: 294,
    bCategory: 126,
    total: 420,
    image: "/images/cse.jpg",
    description: "Core CSE curriculum focused on programming, algorithms, systems, and software engineering."
  },
  {
    program: "B.Tech – Computer Science and Engineering (Data Science)",
    convener: 84,
    bCategory: 36,
    total: 120,
    image: "/images/ds.jpg",
    description: "Specialized track in big data, analytics, machine learning, and statistical modeling."
  },
  {
    program: "B.Tech – Computer Science and Engineering (Artificial Intelligence)",
    convener: 84,
    bCategory: 36,
    total: 120,
    image: "/images/ai.jpg",
    description: "Focused on AI, neural networks, robotics, computer vision, and NLP."
  },
  {
    program: "B.Tech – Information Technology",
    convener: 42,
    bCategory: 18,
    total: 60,
    image: "/images/it.jpg",
    description: "Courses in networking, security, web development, and software tools."
  },
  {
    program: "B.Tech – Electronics and Communication Engineering",
    convener: 63,
    bCategory: 27,
    total: 90,
    image: "/images/ece.jpg",
    description: "Combines electronics, signal processing, embedded systems and communication."
  }
];

const PG_DATA = [
  {
    program: "M.Tech - Computer Science & Engineering (CS)",
    convener: 13,
    bCategory: 5,
    total: 18,
    image: "/images/mtech-cse.jpg",
    description: "Advanced topics in algorithms, data systems, and computing architectures."
  },
  {
    program: "M.Tech - Electronics & Communication Engineering (VLSI & ES)",
    convener: 13,
    bCategory: 5,
    total: 18,
    image: "/images/vlsi.jpg",
    description: "Focus on microelectronics, chip design, and embedded systems."
  },
  {
    program: "Master of Business Administration (MBA)",
    convener: 42,
    bCategory: 18,
    total: 60,
    image: "/images/mba.jpg",
    description: "Curriculum covering management, finance, marketing, and entrepreneurship."
  }
];

export default function ProgrammesOffered() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const cardRef = useRef();

  useEffect(() => {
    if (!hoveredItem) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [hoveredItem]);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        x: e.clientX + 20,
        y: e.clientY - 30,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const renderTable = (data, type) => (
    <div className="relative overflow-x-auto mb-12">
      <h2 className="text-2xl font-bold text-[#800000] mb-4">
        {type === "UG" ? "Under Graduation Programs" : "Post Graduation Programs"}
      </h2>
      <table className="w-full text-sm text-left text-gray-700 border shadow rounded-xl">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="px-4 py-3">S.No</th>
            <th className="px-4 py-3">Programme</th>
            <th className="px-4 py-3">Convener Quota</th>
            <th className="px-4 py-3">B Category</th>
            <th className="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 cursor-pointer"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <td className="px-4 py-3">{idx + 1}</td>
              <td className="px-4 py-3 font-medium text-[#800000]">{item.program}</td>
              <td className="px-4 py-3">{item.convener}</td>
              <td className="px-4 py-3">{item.bCategory}</td>
              <td className="px-4 py-3 font-semibold">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <section className="relative bg-white px-6 sm:px-12 md:px-20 pt-[120px] pb-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#800000] mb-4">Programmes Offered</h1>
        <p className="text-gray-700 mb-8">
          We offer UG programmes – B.Tech – in Computer Science & Engineering, Electronics & Communication Engineering, Information Technology, Computer Science & Engineering (Artificial Intelligence), Computer Science & Engineering (Data Science). We also offer PG programmes – M.Tech – in Computer Science & Engineering, VLSI and Embedded systems.
        </p>

        {renderTable(UG_DATA, "UG")}
        {renderTable(PG_DATA, "PG")}

        <p className="text-sm text-gray-500 italic mt-6">* 10% Seats are extra under EWS Quota</p>
      </div>

      {/* Hover Card */}
      {hoveredItem && (
        <div
          ref={cardRef}
          className="fixed z-50 pointer-events-none w-64 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
        >
          <img
            src={hoveredItem.image}
            alt={hoveredItem.program}
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <h3 className="text-md font-semibold text-[#800000]">
            {hoveredItem.program}
          </h3>
          <p className="text-xs text-gray-600 mt-1 leading-snug">
            {hoveredItem.description}
          </p>
        </div>
      )}
    </section>
  );
}
